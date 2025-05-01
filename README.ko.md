## 1️⃣ 프로젝트 관리
**monorepo**에 맞는 **Trunk based development** 전략을 사용하며 (Main branch만 허용) Main branch에 Merge될 때마다 dev 환경에 배포합니다.

필요에 따라 test, prod 환경에 배포 및 release version을 추가합니다.

## 2️⃣ 프로젝트 버전 관리
**auto-changelog** library로 Changelog를 자동 생성하여 version 별 commit history를 관리합니다.

**Git tag**로 release version을 관리합니다.

## 3️⃣ 파일 관리
- `knip`을 사용하여 사용되지 않는 파일 및 코드를 정리합니다.
- 재사용 가능성이 충분히 검증되지 않은 상태에서 성급한 추상화를 하지 않습니다.
- 중복을 줄이는 것보다 유지보수성을 고려하여 적절한 중복을 허용합니다.
- 중복되지 않는 컴포넌트, 훅, 유틸 함수는 각각 pages에서 관리하여 수정 및 삭제를 용이하게 합니다.
- 동일한 기능이 여러 곳에서 사용되고 유지보수 측면에서 이점이 있는 경우에만 공통 폴더로 분리합니다.

## 4️⃣ 라이브러리 버전 관리
**pnpm catalog** 기능으로 모노레포 통합 라이브러리 버전을 관리합니다.

## 5️⃣ 코드 스타일 및 린트 규칙
본 프로젝트에서는 코드 일관성을 유지하고 코드 품질을 보장하기 위해 `commitlint`와 `Biome`를 사용하여 lint를 수행하고 `TypeScript`를 통해 타입을 검사합니다.

### 1. 커밋 메시지 규칙 (`commitlint`)
`commitlint`를 사용하여 커밋 메시지가 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 형식을 따르도록 강제합니다.

#### 1-1. 커밋 메시지 형식
`<타입>(<스코프>): <변경 사항 요약>`

#### 1-2. 타입
| 타입  | 설명 |
|------|------|
| `feat`  | 새로운 기능 추가 |
| `fix`  | 버그 수정 |
| `perf`  | 성능을 개선하는 코드 변경 |
| `refactor`  | 기능 추가나 버그 수정이 아닌 코드 개선 |
| `style`  | 영향을 주지 않는 스타일 변경 (공백, 포맷팅, 오타, 세미콜론 등) |
| `test`  | 누락된 테스트 추가 또는 기존 테스트 수정 |
| `docs`  | 문서 추가/수정 |
| `chore`  | 유지보수 작업 (라이브러리 업데이트, 파일 이동 등) |


#### 1-3. 스코프
모노레포에서는 여러 패키지와 모듈이 하나의 저장소에 포함되기 때문에, **커밋 메시지**만으로 어떤 부분이 변경되었는지 파악하기 어렵습니다.

따라서 `scope-empty: [2, 'never']` 규칙을 적용하여 **스코프를 반드시 명시**해야 합니다.

| 스코프 | 설명 |
|--------|------|
| `*` | 저장소 전체에 영향을 주는 변경 |
| `mobile` | 모바일 애플리케이션 관련 변경 |
| `web` | 웹 애플리케이션 관련 변경 |
| `admin` | 관리자 페이지 관련 변경 |
| `api` | API 관련 변경 |
| `tanstack-query` | Tanstack Query 설정 변경 |
| `tsconfig` | TypeScript 설정 변경 |
| `ui` | UI 컴포넌트 및 디자인 시스템 관련 변경 |
| `utils` | 공통 유틸리티 함수 변경 |

> **예시**
> - feat(auth): 로그인 기능 추가
> - fix(api): 응답 데이터 형식 수정

### 2. 코드 린트 규칙 (`Biome`)

`Biome`를 사용하여 코드 스타일, 접근성, 복잡성 등을 검사하며 기본 설정 외에 추가한 규칙은 아래와 같습니다.

#### 2-1. 복잡성 (`complexity`)
| 규칙 | 설명 |
|------|------|
| `noVoid` | `void` 연산자의 사용을 금지 |
| `noBannedTypes` | 금지된 타입 사용 방지 |
| `noExtraBooleanCast` | 불필요한 불리언 변환 방지 (`!!`) |
| `noExcessiveCognitiveComplexity` | 지나치게 복잡한 코드 방지 |

#### 2-2. 코드 정확성 (`correctness`)
| 규칙 | 설명 |
|------|------|
| `noUnusedImports` | 사용하지 않는 import 금지 |
| `noUnusedVariables` | 사용되지 않는 변수 금지 |
| `useArrayLiterals` | 배열 선언 시 `Array()` 대신 `[]` 사용 |
| `useHookAtTopLevel` | React 훅을 최상위에서만 사용하도록 강제 |

#### 2-3. 실험적 규칙 (`nursery`)
| 규칙 | 설명 |
|------|------|
| `useAtIndex` | 배열 요소 접근 시 `arr.at(index)` 사용 권장 |
| `useGuardForIn` | `for...in` 사용 시 `hasOwnProperty` 검사 강제 |
| `useCollapsedIf` | `if` 중첩을 줄여 가독성 개선 |
| `useConsistentCurlyBraces` | 중괄호 `{}` 사용 방식 일관성 유지 |
| `noSubstr` | `string.substr()` 사용 금지 |
| `noCommonJs` | CommonJS(`require`) 대신 ESM(`import`) 사용 |
| `noNestedTernary` | 중첩 삼항 연산자 사용 금지 |
| `noDocumentCookie` | `document.cookie` 사용 금지 |
| `noExportedImports` | 다시 export할 import 금지 |
| `noUnknownPseudoClass` | 잘못된 CSS 의사 클래스 사용 금지 |
| `noUnknownTypeSelector` | 알 수 없는 CSS 타입 선택자 사용 금지 |

#### 2-4. 성능 (`performance`)
| 규칙 | 설명 |
|------|------|
| `noBarrelFile` | 배럴 파일(index.ts) 사용 금지 |
| `noReExportAll` | `export * from` 사용 금지 |
| `noDelete` | `delete` 연산자 사용 금지 |

#### 2-5. 보안 (`security`)
| 규칙 | 설명 |
|------|------|
| `noDangerouslySetInnerHtml` | React의 `dangerouslySetInnerHTML` 사용 금지 |

#### 2-6. 스타일 (`style`)
| 규칙 | 설명 |
|------|------|
| `noUselessElse` | 불필요한 `else` 문 제거 |
| `useCollapsedElseIf` | `else if`를 `if`로 변경 가능하면 변경 |
| `noNonNullAssertion` | `!`(non-null assertion) 사용 금지 |
| `useShorthandArrayType` | `Array<T>` 대신 `T[]` 사용 |
| `useBlockStatements` | 단일 구문이라도 `{}` 사용 강제 |
| `noNamespace` | TypeScript `namespace` 사용 금지 |
| `noYodaExpression` | `if (42 === x)` 형태의 요다 조건문 금지 |
| `useConsistentBuiltinInstantiation` | `new Array()` 대신 `[]` 사용 |
| `useDefaultSwitchClause` | `switch` 문에 `default` 케이스 추가 필수 |
| `useFragmentSyntax` | `<React.Fragment>` 대신 `<>` 사용 |
| `useThrowNewError` | `throw new Error()` 필수 |
| `useThrowOnlyError` | `throw`는 `Error` 객체만 허용 |
| `useFilenamingConvention` | 파일명은 `camelCase` 또는 `PascalCase` |

#### 2-7. 의심스러운 코드 (`suspicious`)
| 규칙 | 설명 |
|------|------|
| `noArrayIndexKey` | React `key`로 배열 인덱스 사용 금지 |
| `noAssignInExpressions` | 할당문(`=`)을 조건문 내에서 사용 금지 |
| `noConfusingVoidType` | `void` 타입 혼란 방지 |
| `noConsole` | `console` 사용 금지 |
| `noDebugger` | `debugger` 사용 금지 |
| `noExplicitAny` | `any` 타입 사용 금지 |
| `noRedeclare` | 동일한 변수 재선언 금지 |

## 6️⃣ 상태 관리 전략

#### 1. 동기 상태 (Synchronous State)
- **Jotai**를 사용하여 상태를 관리합니다. **Jotai**는 Atomic 상태 관리를 제공하며 각 상태를 개별적으로 관리할 수 있어 필요에 따라 상태를 업데이트하고 종속된 상태만 변경할 수 있는 유연성을 제공합니다.
- 동기 상태는 하향식 (top-down) 관리가 아니라 상향식 (bottom-up) 방식으로 관리되며 이는 각 상태가 독립적으로 존재하고 다른 상태들에 영향을 받지 않기 때문에 효율적으로 상태를 쌓아 올릴 수 있습니다.

#### 2. 비동기 상태 (Asynchronous State)
- 성공, 실패, 대기, 취소, 경쟁, 비어있음 등 여러 비동기 상태를 관리할 때 직접적으로 모든 상태를 store에 구현하지 않고 **Tanstack Query**가 제공하는 훅을 통해 관리합니다.

## 7️⃣ 컴포넌트 관리

#### 1. Domain 컴포넌트 (apps/*/components)
- 도메인 로직을 포함한 컴포넌트로 비즈니스 로직과 API 응답에 강하게 결합되어 있습니다.
- API에서 받은 데이터를 상태로 관리하며 비즈니스 로직을 처리합니다. 예를 들어, API 응답 데이터를 변형하거나 계산하는 등의 작업을 합니다.
- 외부 서비스나 API와의 통신을 담당하며 다른 컴포넌트에서 이를 호출하여 데이터를 사용할 수 있습니다.

#### 2. UI 컴포넌트 (packages/ui)
- 도메인과 분리된 상태로 데이터를 받아 보여주는 역할만을 합니다.
- 필요한 데이터는 부모 컴포넌트로부터 props로 전달받습니다.
- 레이아웃, 스타일, 상호작용 등 UI 요소를 정의하며, 데이터를 시각적으로 표현하는 데 집중합니다.

#### 3. 내부 선언 순서
1. useRef
2. useState
3. customHook
4. derived state
5. useMemo
5. function(useCallback)
6. useEffect

#### 4. 외부 선언 규칙
상수는 컴포넌트 외부에 선언합니다.
```
const MAX_ITEMS = 10;
export function Component() {
  return <div>...</div>;
}
```

## 8️⃣ 장애 허용성
Frontend는 사용자의 네트워크 환경, API 서버 장애, API 응답 데이터 등 다양한 외부 환경에 영향을 받습니다.

외부 혹은 내부에 장애가 발생하더라도 시스템이 완전히 멈추지 않고 사용자에게 적절한 피드백을 제공하여 앱이 계속해서 작동하도록 소프트웨어를 개발해야 합니다.

#### 1. 느린 사용자 네트워크 환경
- 로딩 스피너, 스켈레톤 UI를 제공하여 명확하게 대기 상태임을 인지시킬 수 있어야 합니다.
> API 응답이 빠를 경우 (250ms 이하) 로딩 스피너, 스켈레톤 UI가 불필요할 수 있으므로 로딩 스피너, 스켈레톤 UI에 Delay를 주는 것이 좋습니다.
>
> 불필요한 Layout shift 혹은 깜빡임이 생기지 않도록 주의해야 합니다.

#### 2. 일시적인 사용자 네트워크 끊김
- 네트워크가 끊길 경우 재시도 간격을 점차 늘려가며 요청을 다시 보냅니다. (지수 백오프)
- 네트워크가 끊겼다가 다시 연결될 경우 요청을 다시 보냅니다.
- 에러 경계(ErrorBoundary) 처리하여 장애가 발생한 부분을 제외하고 계속해서 앱이 작동하도록 합니다.
- 사용자가 네트워크 연결이 끊길 경우 Toast message로 다시 네트워크에 연결하도록 요청합니다.

#### 3. API 서버 장애
- API 요청이 실패할 경우 재시도 간격을 점차 늘려가며 요청을 다시 보냅니다. (지수 백오프)
- 에러 경계(ErrorBoundary) 처리하여 장애가 발생한 부분을 제외하고 계속해서 앱이 작동하도록 합니다.

#### 4. 런타임에 API 응답 데이터 에러
- 에러 경계(ErrorBoundary) 처리하여 장애가 발생한 부분을 제외하고 계속해서 앱이 작동하도록 합니다.