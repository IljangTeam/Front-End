// Jenkinsfile for gakhalmo-front (Next.js)
pipeline {
    agent none

    environment {
        OCIR_REGISTRY = 'yny.ocir.io'
        OCIR_NAMESPACE = 'axlgn2n9ijoa'
        IMAGE_NAME = 'gakhalmo/front'
        GITOPS_REPO = 'https://github.com/leestana01/gitops.git'
        GITOPS_CREDENTIALS = 'github-credentials'
    }

    stages {
        stage('Determine Environment') {
            // pipeline-level `agent none` 환경이라 `agent any` 로는 배정 가능한
            // executor 가 없어 "Still waiting to schedule task" 로 무한 대기한다.
            // 가벼운 alpine 파드를 띄워 env 결정만 수행한다.
            agent {
                kubernetes {
                    label 'gakhalmo-front-resolve'
                    yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: shell
      image: docker.io/alpine:3.20
      command: ['cat']
      tty: true
"""
                }
            }
            steps {
                script {
                    if (env.BRANCH_NAME == 'main') {
                        env.TARGET_ENV = 'prod'
                        env.GITOPS_KUSTOMIZE_DIR = 'apps/gakhalmo-front/overlays/prod'
                    } else if (env.BRANCH_NAME == 'develop') {
                        env.TARGET_ENV = 'dev'
                        env.GITOPS_KUSTOMIZE_DIR = 'apps/gakhalmo-front/overlays/dev'
                    } else {
                        error "Branch ${env.BRANCH_NAME} is not configured for deployment"
                    }
                    env.IMAGE_TAG = "${env.TARGET_ENV}-${env.BUILD_NUMBER}"
                    env.FULL_IMAGE = "${OCIR_REGISTRY}/${OCIR_NAMESPACE}/${IMAGE_NAME}:${env.IMAGE_TAG}"
                }
            }
        }

        stage('Build & Push Docker Image') {
            agent {
                kubernetes {
                    label 'kaniko'
                }
            }
            steps {
                container('jnlp') {
                    sh """
                        /tools/kubectl exec -n jenkins \$(cat /etc/hostname) -c kaniko -- /kaniko/executor \\
                            --context=dir://\${WORKSPACE} \\
                            --dockerfile=\${WORKSPACE}/Dockerfile \\
                            --destination=${env.FULL_IMAGE} \\
                            --destination=${OCIR_REGISTRY}/${OCIR_NAMESPACE}/${IMAGE_NAME}:${env.TARGET_ENV} \\
                            --customPlatform=linux/arm64 \\
                            --cache=true \\
                            --cache-repo=${OCIR_REGISTRY}/${OCIR_NAMESPACE}/${IMAGE_NAME}/cache
                    """
                }
            }
        }

        stage('Update GitOps Repository') {
            agent {
                kubernetes {
                    label 'kaniko'
                }
            }
            steps {
                container('jnlp') {
                    withCredentials([usernamePassword(credentialsId: "${GITOPS_CREDENTIALS}", usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
                        sh """
                            git clone https://\${GIT_USER}:\${GIT_TOKEN}@github.com/leestana01/gitops.git gitops-repo
                            cd gitops-repo

                            sed -i "s|newTag:.*|newTag: ${env.IMAGE_TAG}|" ${env.GITOPS_KUSTOMIZE_DIR}/kustomization.yaml

                            git config user.email "jenkins@klr.kr"
                            git config user.name "Jenkins CI"
                            git add ${env.GITOPS_KUSTOMIZE_DIR}/kustomization.yaml
                            git commit -m "update ${IMAGE_NAME} to ${env.IMAGE_TAG}" || echo "No changes to commit"
                            git push origin HEAD:main
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                notifyDiscord('success')
            }
        }
        failure {
            script {
                notifyDiscord('failure')
            }
        }
        aborted {
            script {
                notifyDiscord('aborted')
            }
        }
    }
}

// Discord 알림 헬퍼.
//   pipeline-level `agent none` 이라 post 블록에서 sh 를 직접 실행할 수 없다.
//   curl 만 들어있는 경량 파드를 띄워 webhook POST 만 수행한다.
//   webhook URL 은 Jenkins "Secret text" credential(Discord-Webhook) 로 주입되어
//   Groovy 레벨에는 노출되지 않고 shell env 로만 전달된다. 알림 실패가 파이프라인
//   결과를 뒤집지 않도록 try/catch 로 감싼다.
def notifyDiscord(String status) {
    def color
    def emoji
    def text
    switch (status) {
        case 'success': color = 3066993;  emoji = ':white_check_mark:'; text = 'Success'; break
        case 'failure': color = 15158332; emoji = ':x:';                text = 'Failure'; break
        case 'aborted': color = 15105570; emoji = ':warning:';          text = 'Aborted'; break
        default:        color = 9807270;  emoji = ':information_source:'; text = status
    }
    def jobName   = (env.JOB_NAME   ?: '').toString()
    def buildNum  = (env.BUILD_NUMBER ?: '').toString()
    def branch    = (env.BRANCH_NAME ?: '-').toString()
    def buildUrl  = (env.BUILD_URL  ?: '').toString()
    def targetEnv = (env.TARGET_ENV ?: '-').toString()
    def imageTag  = (env.IMAGE_TAG  ?: '-').toString()
    def duration  = (currentBuild.durationString ?: '-').replace(' and counting', '')

    // podTemplate.label 을 로컬 변수로 바인딩 — kubernetes plugin 버전에 따라
    // POD_LABEL implicit binding 이 주입되지 않는 경우가 있어 node() 인자는
    // 반드시 같은 라벨 문자열을 직접 넘긴다.
    def podLabel = "gakhalmo-front-discord-${env.BUILD_NUMBER}"
    // 이미지는 bitnami/kubectl(Debian 기반, curl 포함) 을 사용한다.
    // curlimages/curl 같은 Alpine/busybox 이미지의 /bin/sh 는 durable-task
    // 의 프로세스 종료 감지와 충돌해 `sh` 스텝이 완료 후에도 hang 된다.
    try {
        podTemplate(
            label: podLabel,
            yaml: '''
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: shell
      image: docker.io/bitnami/kubectl:latest
      command: ['cat']
      tty: true
      securityContext:
        runAsUser: 0
      resources:
        requests:
          cpu: '50m'
          memory: '64Mi'
        limits:
          cpu: '200m'
          memory: '128Mi'
'''
        ) {
            node(podLabel) {
                container('shell') {
                    def payload = groovy.json.JsonOutput.toJson([
                        username: 'Jenkins',
                        avatar_url: 'https://www.jenkins.io/images/logos/jenkins/jenkins.png',
                        embeds: [[
                            title: "${emoji} ${jobName} #${buildNum}".toString(),
                            url: buildUrl,
                            color: color,
                            fields: [
                                [name: 'Status',   value: text,      inline: true],
                                [name: 'Branch',   value: branch,    inline: true],
                                [name: 'Env',      value: targetEnv, inline: true],
                                [name: 'Image',    value: imageTag,  inline: true],
                                [name: 'Duration', value: duration,  inline: true]
                            ]
                        ]]
                    ])
                    writeFile file: 'discord-payload.json', text: payload
                    withCredentials([string(credentialsId: 'Discord-Webhook', variable: 'DISCORD_WEBHOOK_URL')]) {
                        sh '''
                            set +x
                            curl -sS --max-time 15 --retry 2 --retry-delay 2 \
                                -o /dev/null -w "discord webhook HTTP %{http_code}\\n" \
                                -H "Content-Type: application/json" \
                                -X POST --data-binary @discord-payload.json \
                                "$DISCORD_WEBHOOK_URL"
                        '''
                    }
                }
            }
        }
    } catch (err) {
        echo "Discord notification failed: ${err.message}"
    }
}
