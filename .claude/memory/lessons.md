# Lessons Learned

과거 실수와 교훈. `memory-curator`가 머지된 PR의 사람 리뷰어 코멘트와 에이전트 원안의 차이에서 자동으로 추출한다.

## 포맷

```markdown
## LESSON-XXX
- **Date**: YYYY-MM-DD
- **Source PR**: #<번호>
- **Tags**: [security, performance, testing, api, ...]

### Situation
<어떤 상황에서 발생했는지>

### Mistake
<무엇이 잘못되었나>

### Correction
<어떻게 해야 했나>

### Code Reference
<file:line 또는 diff 발췌>
```

## 사용 규칙

- `test-engineer`, `security-reviewer`, `performance-reviewer`는 관련 태그로 필터링해 항상 읽는다.
- `planner`, `implementer`는 이슈와 유사한 `situation`을 grep으로 검색해 읽는다.
- 최근 100개로 유지한다. 초과 시 오래된 것을 `lessons.archive.md`로 이동.

---

## 예시 시드 교훈

## LESSON-001
- **Date**: seed
- **Source PR**: #seed-1
- **Tags**: [error-handling, domain]

### Situation
결제 실패 도메인 에러가 예외로 던져져 상위 HTTP 레이어에서 500 응답으로 나갔음.

### Mistake
도메인 실패를 예외로 전파하여 HTTP 레이어에서 의미 있는 4xx 응답으로 변환되지 못함.

### Correction
도메인 함수는 `Result<T, DomainError>`를 반환하고, HTTP 어댑터에서 에러 종류에 따라 4xx/5xx를 매핑한다.

### Code Reference
(시드 예시)

---

## LESSON-002
- **Date**: seed
- **Source PR**: #seed-2
- **Tags**: [security, logging, pii]

### Situation
디버그 로그에 사용자 이메일이 그대로 기록되어 로그 수집 시스템에 PII가 적재됨.

### Mistake
개발자가 "디버그 전용"이라 생각했으나 프로덕션 로그 레벨 조정 시 함께 노출.

### Correction
로그에 PII를 넣지 말고, 필요 시 SHA-256 해시로 식별자만 남긴다. CONV-004 참고.

### Code Reference
(시드 예시)

---

## LESSON-003
- **Date**: seed
- **Source PR**: #seed-3
- **Tags**: [performance, orm, n+1]

### Situation
주문 목록 API가 각 주문의 사용자 정보를 별도 쿼리로 조회해 N+1 쿼리 발생.

### Mistake
ORM의 lazy loading을 무의식적으로 사용.

### Correction
`preload` 또는 `join`으로 한 번에 조회하고, API에 N개 항목 이상 반환 시 반드시 로컬 벤치.

### Code Reference
(시드 예시)
