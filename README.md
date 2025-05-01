## 0️⃣ Intro
- You can use an Expo mobile app, Vite web app (Expo WebView, admin), and Storybook app.
- Vite and Storybook apps are built with CI/CD using GitHub Actions.
- Vite and Storybook apps are deployed to Firebase Hosting.
- use Turborepo for efficient monorepo task execution.
- API types are automatically generated from Swagger specifications.
- Changelog generation and release processes are managed via GitHub Actions.

## 1️⃣ Project Management
We use a **Trunk Based Development** strategy suitable for a **monorepo** (only allowing the `main` branch). Every merge into the `main` branch triggers a deployment to the `dev` environment.

Deployments to `test` and `prod` environments and release versioning are managed as needed.

## 2️⃣ Version Control
We use the **auto-changelog** library to automatically generate a changelog and manage commit history per version.

Release versions are managed using **Git tags**.

## 3️⃣ File Management
- `knip` is used to clean up unused files and code.
- We avoid premature abstraction until reusability is well-validated.
- We prioritize maintainability over reducing duplication and allow reasonable redundancy when necessary.
- Non-reusable components, hooks, and utility functions are managed within `pages` to facilitate modifications and removal.
- Common folders are used only when multiple features require the same functionality, benefiting maintainability.

## 4️⃣ Library Version Management
We manage unified library versions in the monorepo using the **pnpm catalog** feature.

## 5️⃣ Code Style & Linting Rules
To maintain code consistency and quality, we use `commitlint` and `Biome` for linting.

### 1. Commit Message Rules (`commitlint`)
We enforce commit messages to follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format.

#### 1-1. Commit Message Format
`<type>(<scope>): <summary>`

#### 1-2. Types
| Type  | Description |
|------|------|
| `feat`  | Adds a new feature |
| `fix`  | Fixes a bug |
| `perf`  | Improves performance |
| `refactor`  | Code improvement without adding features or fixing bugs |
| `style`  | Code style changes (whitespace, formatting, typos, semicolons, etc.) |
| `test`  | Adds or updates tests |
| `docs`  | Updates documentation |
| `chore`  | Maintenance tasks (library updates, file moves, etc.) |

#### 1-3. Scopes
| Scope | Description |
|--------|------|
| `*` | Affects the entire repository |
| `mobile` | Related to the mobile app |
| `web` | Related to the web app |
| `admin` | Related to the admin page |
| `api` | Related to API changes |
| `tanstack-query` | Changes to Tanstack Query settings |
| `tsconfig` | TypeScript configuration changes |
| `ui` | Related to UI components or design system |
| `utils` | Changes to common utility functions |

> **Example:**
> - feat(auth): Add login functionality
> - fix(api): Modify response data format

### 2. Code Linting Rules (`Biome`)
`Biome` is used for checking code style, accessibility, and complexity. Some additional enforced rules include:

#### 2-1. Complexity
| Rule | Description |
|------|------|
| `noVoid` | Disallows the `void` operator |
| `noBannedTypes` | Prevents banned type usage |
| `noExtraBooleanCast` | Disallows unnecessary boolean conversions (`!!`) |
| `noExcessiveCognitiveComplexity` | Prevents overly complex code |

#### 2-2. Code Accuracy
| Rule | Description |
|------|------|
| `noUnusedImports` | Disallows unused imports |
| `noUnusedVariables` | Disallows unused variables |
| `useArrayLiterals` | Enforces `[]` instead of `Array()` for array declarations |
| `useHookAtTopLevel` | Ensures React hooks are only used at the top level |

#### 2-3. Experimental Rules
| Rule | Description |
|------|------|
| `useAtIndex` | Suggests using `arr.at(index)` for array indexing |
| `useGuardForIn` | Requires `hasOwnProperty` check in `for...in` loops |
| `useCollapsedIf` | Reduces nested `if` statements for readability |
| `noSubstr` | Disallows `string.substr()` |
| `noCommonJs` | Enforces ESM (`import`) over CommonJS (`require`) |

#### 2-4. Security
| Rule | Description |
|------|------|
| `noDangerouslySetInnerHtml` | Disallows `dangerouslySetInnerHTML` in React |
| `noExportedImports` | Prevents exporting imported modules |

## 6️⃣ State Management Strategy

### 1. Synchronous State
- **Jotai** is used for state management, allowing atomic state management where each state remains independent.
- This follows a bottom-up approach rather than top-down, improving efficiency.

### 2. Asynchronous State
- We manage complex async states (loading, error, retries, etc.) using **Tanstack Query** rather than handling them manually.

## 7️⃣ Component Management

### 1. Domain Components (`apps/*/components`)
- Contain domain-specific logic and are tightly coupled with API responses.
- Manage API response data and handle business logic transformations.

### 2. UI Components (`packages/ui`)
- Strictly responsible for rendering UI elements without domain logic.
- Receive necessary data as props from parent components.
- Focus on layout, styling, and interaction.

## 8️⃣ Fault Tolerance
Frontend applications are affected by network conditions, API server failures, and response data issues. We implement robust solutions to ensure continued operation and proper feedback to users.

### 1. Slow Network Conditions
- Use loading spinners and skeleton UI to indicate ongoing processes.
> If API responses are fast (< 250ms), loading indicators may be unnecessary, so adding a delay can improve UX.
> Avoid unnecessary layout shifts or flickering.

### 2. Temporary Network Disconnection
- Implement exponential backoff for retrying requests after network failure.
- Automatically retry requests when the network reconnects.
- Use **Error Boundaries** to isolate failures while keeping the app functional.
- Notify users via toast messages when they lose connection.

### 3. API Server Failures
- Implement exponential backoff for retrying failed requests.
- Use **Error Boundaries** to prevent complete app failure when a service is down.

### 4. Runtime API Response Errors
- Use **Error Boundaries** to gracefully handle API response issues.

