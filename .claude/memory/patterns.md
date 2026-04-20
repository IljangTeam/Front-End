# Approved Patterns

팀이 표준으로 채택한 설계 패턴. 예시 코드와 함께 저장한다. `planner`와 `implementer`가 적극 인용한다.

## 포맷

```markdown
## PATTERN-XXX: <이름>
- **Category**: structural | behavioral | data-access | error-handling | async | testing
- **Source PR**: #<번호> (첫 도입)
- **Status**: active | deprecated

### When to Use
<어떤 상황에서 이 패턴을 쓰는가>

### When NOT to Use
<쓰면 안 되는 상황>

### Example (Good)
`​``<language>
...
​`​``

### Anti-Example (Bad)
`​``<language>
...
​`​``

### Related
- CONV-XXX, LESSON-XXX, ADR-XXX
```

---

## 예시 시드 패턴

## PATTERN-001: Domain Result Wrapper
- **Category**: error-handling
- **Source PR**: seed
- **Status**: active

### When to Use
도메인 레이어 함수가 실패할 수 있을 때.

### When NOT to Use
인프라 레이어 내부 유틸 (변환 어댑터 경계에서만 Result 사용).

### Example (Good)
```ts
type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

async function createOrder(input: OrderInput): Promise<Result<Order, OrderError>> {
  if (!input.items.length) {
    return { ok: false, error: OrderError.EmptyCart };
  }
  // ...
  return { ok: true, value: order };
}
```

### Anti-Example (Bad)
```ts
async function createOrder(input: OrderInput): Promise<Order> {
  if (!input.items.length) throw new EmptyCartError();
  // ...
}
```

### Related
- CONV-002, LESSON-001, ADR-001

---

## PATTERN-002: Retry With Exponential Backoff
- **Category**: async
- **Source PR**: seed
- **Status**: active

### When to Use
idempotent한 외부 API 호출 실패 시.

### When NOT to Use
- 사용자 입력 실패 (재시도 해도 동일)
- non-idempotent API (중복 결제 등)

### Example (Good)
```ts
async function withRetry<T>(fn: () => Promise<T>, maxAttempts = 3): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (!isRetryable(err)) throw err;
      await sleep(2 ** i * 100 + jitter());
    }
  }
  throw lastErr;
}
```

### Related
- CONV-007 (성능 고려)
