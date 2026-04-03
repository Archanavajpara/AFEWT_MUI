# Lab 29 – Component Testing & E2E Testing (Cypress + Playwright) — Complete Guide

> **Goal:** Learn three levels of frontend testing on a single React + Vite project — component tests with Jest, E2E with Cypress, and E2E with Playwright — from absolute scratch.

---

## Table of Contents

1. [Why Do We Need Testing?](#1-why-do-we-need-testing)
2. [Types of Testing — Component vs E2E](#2-types-of-testing--component-vs-e2e)
3. [Why Cypress?](#3-why-cypress)
4. [Why Playwright?](#4-why-playwright)
5. [Cypress vs Playwright — Quick Comparison](#5-cypress-vs-playwright--quick-comparison)
6. [Project Folder Structure](#6-project-folder-structure)
7. [Package Dependencies — What Was Added & Why](#7-package-dependencies--what-was-added--why)
8. [Configuration Files — Complete Code & Explanation](#8-configuration-files--complete-code--explanation)
9. [React Components (The UI We Test)](#9-react-components-the-ui-we-test)
10. [Component Tests (Jest + React Testing Library)](#10-component-tests-jest--react-testing-library)
11. [Cypress E2E Test — Complete Code & Walkthrough](#11-cypress-e2e-test--complete-code--walkthrough)
12. [Playwright E2E Test — Complete Code & Walkthrough](#12-playwright-e2e-test--complete-code--walkthrough)
13. [Step-by-Step: What Students Must Do](#13-step-by-step-what-students-must-do)
14. [Running All Tests — Commands Cheat-Sheet](#14-running-all-tests--commands-cheat-sheet)
15. [Understanding the Testing Workflow](#15-understanding-the-testing-workflow)
16. [Why Each File Exists — File Creation Explained](#16-why-each-file-exists--file-creation-explained)
17. [Common Troubleshooting](#17-common-troubleshooting)
18. [Live Demo Flow (For Class)](#18-live-demo-flow-for-class)

---

## 1. Why Do We Need Testing?

When we build a UI, we want **confidence** that clicking a button, typing input, or navigating a page does what we expect — **every single time**, even after code changes.

### The Problem Without Tests

- You change one component → another component breaks silently.
- A teammate pushes code → the feature you built last week stops working.
- You refactor code → no way to know if everything still works without manually clicking through every page.

### What Testing Gives Us

| Benefit              | Explanation                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| **Catch bugs early** | Automated tests find regressions the moment code changes, before users ever see them.             |
| **Refactor safely**  | When tests pass after a refactor, you know you didn't break anything.                             |
| **Documentation**    | Tests describe *how* the code is supposed to behave. New developers can read tests to learn the UI logic. |
| **Team confidence**  | Multiple people can work on the same codebase. Tests protect against accidental breakage.         |
| **Speed**            | Running 50 tests takes seconds. Manually testing 50 flows takes hours.                            |

### How It Works (Simplified)

```
You write test code  →  Test runner executes it  →  PASS ✅ or FAIL ❌
```

A test **passes** when the UI behaves as expected. A test **fails** when something is wrong — and tells you *exactly what* broke.

---

## 2. Types of Testing — Component vs E2E

### A) Component Testing

A **component test** renders a single React component (or a small group) **in isolation** — inside a fake browser DOM (JSDOM), not a real browser.

**How it works:**

```
Your component → rendered in JSDOM (fake browser) → you simulate clicks/types → you assert the UI updated
```

**Strengths:**

- ⚡ Extremely fast (no real browser launched)
- 🎯 Tests one component at a time — easy to pinpoint failures
- 🔄 Can run hundreds of tests in seconds

**Weaknesses:**

- ❌ Does NOT test real browser behavior (CSS rendering, network requests, routing)
- ❌ Does NOT test how multiple pages work together

**Tools used here:** Jest (test runner) + React Testing Library (renders components & provides query functions)

---

### B) End-to-End (E2E) Testing

An **E2E test** launches a **real browser**, navigates to your running app, and interacts with it exactly like a human user would — clicking buttons, typing text, scrolling, navigating between pages.

**How it works:**

```
Your app runs on localhost → Test launches real Chrome/Firefox → Automates clicks/types → Asserts real page content
```

**Strengths:**

- ✅ Tests the **entire system** — frontend + routing + backend + CSS
- ✅ Catches bugs that component tests miss (integration issues, network issues)
- ✅ Highest confidence that the app truly works

**Weaknesses:**

- 🐢 Slower than component tests (real browser takes time)
- 🔧 More setup needed (dev server must be running)

**Tools used here:** Cypress and Playwright

---

### The Testing Pyramid

```
        /  E2E Tests  \          ← Few, slow, high confidence
       /  Integration   \
      / Component Tests   \      ← Many, fast, focused
     ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
```

**Best practice:** Write *many* component tests (cheap & fast) and *fewer* E2E tests (expensive but high confidence). This lab demonstrates both.

---

## 3. Why Cypress?

[Cypress](https://www.cypress.io/) is one of the most popular E2E testing frameworks in the JavaScript ecosystem.

### Key Features

- **Interactive Test Runner** — Opens a browser window where you can watch tests execute in real-time, step through each action, and "time travel" to see the DOM at any point.
- **Automatic Waiting** — Cypress automatically waits for elements to appear, animations to finish, and network requests to complete. No manual `setTimeout` or `waitFor`.
- **Simple API** — Chainable commands like `cy.get('[data-cy="count"]').should('contain.text', 'Count: 0')` read almost like English.
- **Screenshots & Videos** — Automatically captures screenshots on failure and records videos of test runs.
- **Great Documentation** — One of the best-documented testing tools available.

### When to Use Cypress

- When you want a beginner-friendly, visual testing experience
- When your team needs an interactive debugging tool
- For UI regression testing during development

---

## 4. Why Playwright?

[Playwright](https://playwright.dev/) is a modern E2E testing framework by Microsoft.

### Key Features

- **Multi-Browser Support** — Test on Chromium, Firefox, and WebKit (Safari) with one test file.
- **Speed** — Playwright tests run faster than most competitors because it communicates directly with browser APIs.
- **Auto-Wait** — Like Cypress, Playwright waits for elements to be actionable before interacting.
- **Built-In Test Runner** — `@playwright/test` includes parallel execution, retries, HTML reports, and trace viewer.
- **Web Server Integration** — Can automatically start your dev server before tests run (no need for a separate terminal).
- **Powerful Selectors** — Role-based, text-based, CSS, and custom selectors out of the box.

### When to Use Playwright

- When you need cross-browser testing
- When you need tests to run in CI/CD pipelines efficiently
- When you need advanced features like multi-tab testing, network interception, or file downloads

---

## 5. Cypress vs Playwright — Quick Comparison

| Feature              | Cypress                          | Playwright                          |
| -------------------- | -------------------------------- | ----------------------------------- |
| **Made by**          | Cypress.io                       | Microsoft                           |
| **Language**         | JavaScript                       | JavaScript, TypeScript, Python, C#  |
| **Browsers**         | Chrome, Firefox, Edge             | Chromium, Firefox, WebKit (Safari)  |
| **Interactive UI**   | ✅ Built-in Test Runner           | ✅ UI Mode (`--ui`)                 |
| **Auto-wait**        | ✅ Yes                            | ✅ Yes                              |
| **Parallel tests**   | Paid (Cloud) / workarounds       | ✅ Built-in, free                   |
| **Auto dev server**  | ❌ You start it manually          | ✅ `webServer` config starts it     |
| **Speed**            | Good                             | Very fast                           |
| **Learning curve**   | Easier for beginners             | Slightly more concepts              |
| **Best for**         | Visual debugging, rapid dev      | CI/CD, cross-browser, automation    |

**In industry:** Some teams pick one, some use both. Learning both helps you understand E2E concepts regardless of which tool a company uses.

---

## 6. Project Folder Structure

Here is how the lab-29 folder fits into the project:

```
Adv_frontend_lab/                    ← Project root
├── package.json                     ← All dependencies live here
├── babel.config.cjs                 ← Babel config for Jest (JSX transform)
├── jest.config.mjs                  ← Jest configuration
├── cypress.config.js                ← Cypress configuration
├── playwright.config.js             ← Playwright configuration
├── vite.config.js                   ← Vite dev server config
├── node_modules/                    ← Installed packages
│
└── src/
    └── Labs/
        └── lab-29/                  ← THIS LAB
            ├── README.md            ← You are reading this file
            │
            │── Lab29Demo.jsx        ← Main page component (renders Counter + TodoList)
            │── Counter.jsx          ← Counter component (increment, decrement, reset)
            │── TodoList.jsx         ← Todo list component (add, clear todos)
            │
            │── Counter.test.jsx     ← Component test for Counter (Jest)
            │── TodoList.test.jsx    ← Component test for TodoList (Jest)
            │
            ├── cypress/
            │   └── lab29.cy.js      ← Cypress E2E test
            │
            └── playwright/
                └── lab29.spec.js    ← Playwright E2E test
```

### Why this structure?

- **Components** live alongside their tests (`.test.jsx` right next to `.jsx`) — this is a widely adopted convention called **co-location**. You can find the test for any component immediately.
- **E2E tests** live in their own subdirectories (`cypress/` and `playwright/`) because they test the *entire page*, not individual components.
- **Config files** live at the project root because testing tools look for them there by default.

---

## 7. Package Dependencies — What Was Added & Why

The following dependencies were added to `package.json` specifically for this lab. Here is the complete `package.json` with explanations:

```json
{
  "name": "unit-1",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "jest",
    "test:unit": "jest",
    "test:unit:watch": "jest --watch",
    "test:e2e:cypress:open": "cypress open",
    "test:e2e:cypress:run": "cypress run",
    "test:e2e:playwright": "playwright test",
    "test:e2e:playwright:ui": "playwright test --ui",
    "test:e2e:playwright:report": "playwright show-report"
  },
  "dependencies": {
    "@babel/preset-env": "^7.26.0",
    "@babel/preset-react": "^7.26.0",
    "@emotion/react": "^11.14.0",
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.3.0",
    "@emotion/styled": "^11.14.1",
    "@mui/icons-material": "^7.3.6",
    "babel-jest": "^29.7.0",
    "@mui/material": "^7.3.6",
    "@reduxjs/toolkit": "^2.11.2",
    "@tailwindcss/vite": "^4.1.17",
    "formik": "^2.4.9",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "vite": "^7.2.2",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-redux": "^9.2.0",
    "tailwindcss": "^4.1.17",
    "yup": "^1.7.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.2",
    "@types/react-dom": "^19.2.2",
    "@vitejs/plugin-react": "^5.1.0",
    "@playwright/test": "^1.55.0",
    "cypress": "^14.5.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.2"
  }
}
```

### Dependencies Added for Lab 29

#### For Component Testing (Jest + React Testing Library)

| Package                         | Why It's Needed                                                                                                                                       |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jest` (^29.7.0)                | **The test runner.** Jest discovers test files, runs them, and reports pass/fail results. Think of it as the engine that executes your tests.           |
| `jest-environment-jsdom` (^29.7.0) | **Fake browser for Jest.** Since Jest runs in Node.js (no browser), JSDOM simulates a browser's DOM so we can render React components and query elements. |
| `babel-jest` (^29.7.0)          | **Transforms JSX for Jest.** Our components use JSX (`<Counter />`). Node.js doesn't understand JSX natively, so `babel-jest` transpiles it before running tests. |
| `@babel/preset-env` (^7.26.0)   | **Babel preset** that compiles modern JavaScript (ES modules, arrow functions, etc.) down to a version Node.js can execute.                             |
| `@babel/preset-react` (^7.26.0) | **Babel preset** that transforms JSX syntax (e.g., `<button>Click</button>`) into regular JavaScript function calls (`React.createElement(...)`).      |
| `@testing-library/react` (^16.3.0) | **Renders React components in tests** and provides utility functions like `render()`, `screen.getByText()`, `fireEvent.click()` to interact with them. |
| `@testing-library/jest-dom` (^6.5.0) | **Custom Jest matchers** like `.toBeInTheDocument()`, `.toBeVisible()`, `.toHaveTextContent()`. Makes assertions more readable and expressive.       |

#### For E2E Testing

| Package                        | Why It's Needed                                                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `cypress` (^14.5.1)            | **Cypress E2E framework.** Provides the test runner, interactive browser UI, and the `cy.*` API for writing E2E tests.    |
| `@playwright/test` (^1.55.0)   | **Playwright test framework.** Provides the test runner, browser automation library, and all the `page.*` APIs for E2E.   |

> **Note:** `cypress` and `@playwright/test` are in `devDependencies` because they are development/testing tools — they are NOT shipped to production.

### Scripts Added for Lab 29

```json
"test": "jest",                                    // Run all Jest tests
"test:unit": "jest",                               // Same — semantic alias
"test:unit:watch": "jest --watch",                 // Re-run tests on file change
"test:e2e:cypress:open": "cypress open",           // Open Cypress interactive runner
"test:e2e:cypress:run": "cypress run",             // Run Cypress headless in terminal
"test:e2e:playwright": "playwright test",          // Run Playwright tests
"test:e2e:playwright:ui": "playwright test --ui",  // Open Playwright UI mode
"test:e2e:playwright:report": "playwright show-report"  // View HTML test report
```

### How to Install Everything

```bash
# Step 1: Install all npm dependencies
npm install

# Step 2: Install Playwright browser binaries (required once)
npx playwright install
```

---

## 8. Configuration Files — Complete Code & Explanation

### 8.1 `babel.config.cjs` — Babel Configuration

**Why this file exists:** Jest runs in Node.js, which does NOT understand JSX or ES module `import` syntax. Babel transforms our modern React code into plain JavaScript that Node.js can execute.

**Why `.cjs` extension?** Our project uses `"type": "module"` in `package.json` (so `.js` files are treated as ES modules). Babel's config needs to be a CommonJS file, hence `.cjs`.

```javascript
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ]
};
```

**Line-by-line explanation:**

| Line                                                     | What It Does                                                                                                        |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `module.exports = { ... }`                                | CommonJS export — Babel reads this object as its configuration.                                                     |
| `'@babel/preset-env'`                                     | Transforms modern JS (ES2020+, `import`, arrow functions) into code compatible with the current Node.js version.     |
| `{ targets: { node: 'current' } }`                        | Tells Babel: "Only transform features that the current Node.js version doesn't support." Keeps transforms minimal.   |
| `'@babel/preset-react'`                                   | Transforms JSX (`<Counter />`) into JavaScript function calls.                                                       |
| `{ runtime: 'automatic' }`                                | Uses React 17+ "automatic" JSX runtime. This means you do NOT need `import React from 'react'` at the top of every file. |

---

### 8.2 `jest.config.mjs` — Jest Configuration

**Why this file exists:** Jest needs to know where to find test files, what environment to use (browser-like vs Node), and how to transform files before running.

**Why `.mjs` extension?** We use ES module `export default` syntax, and `.mjs` tells Node.js this is an ES module file.

```javascript
const config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'jsx'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testMatch: [
    '**/src/Labs/lab-27/**/*.test.[jt]s?(x)',
    '**/src/Labs/lab-29/**/*.test.[jt]s?(x)'
  ]
};

export default config;
```

**Line-by-line explanation:**

| Option                  | What It Does                                                                                                               |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `testEnvironment: 'jsdom'` | Tells Jest to simulate a browser DOM. Without this, `document`, `window`, `HTMLElement` etc. would not exist.              |
| `transform`             | Any file ending in `.js`, `.jsx`, `.ts`, `.tsx` gets transformed by `babel-jest` before Jest runs it. This handles JSX.     |
| `moduleFileExtensions`  | Jest will resolve imports with these extensions. So `import Counter from './Counter'` will find `Counter.jsx`.              |
| `setupFilesAfterEnv`    | Runs `@testing-library/jest-dom` after the test environment is set up. This adds matchers like `.toBeInTheDocument()`.       |
| `testMatch`             | Jest only runs test files matching these glob patterns. We include `lab-27` (previous lab) and `lab-29` (this lab).         |

---

### 8.3 `cypress.config.js` — Cypress Configuration

**Why this file exists:** Cypress needs to know what URL to visit and where to find test spec files.

```javascript
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'src/Labs/lab-29/cypress/**/*.cy.js'
  }
});
```

**Line-by-line explanation:**

| Option        | What It Does                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `baseUrl`     | When a test calls `cy.visit('/')`, Cypress appends `/` to `http://localhost:5173`. This is the Vite dev server URL.       |
| `specPattern` | Tells Cypress to find test files matching this glob. Our tests are in `src/Labs/lab-29/cypress/` and end with `.cy.js`.    |

> **Important:** Cypress does NOT start the dev server automatically. You must run `npm run dev` in a separate terminal BEFORE running Cypress tests.

---

### 8.4 `playwright.config.js` — Playwright Configuration

**Why this file exists:** Playwright needs to know where test files live, which browsers to test in, and (optionally) how to start the dev server.

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'src/Labs/lab-29/playwright',
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry'
  },
  webServer: {
    command: 'npm run dev -- --port 5173',
    port: 5173,
    reuseExistingServer: !process.env.CI
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
```

**Line-by-line explanation:**

| Option                         | What It Does                                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `testDir`                      | Directory containing Playwright test files.                                                                                          |
| `timeout: 30_000`              | Each test gets 30 seconds max. If a test hangs beyond this, it fails.                                                                |
| `retries`                      | In CI (automated pipeline), retry failed tests once. Locally (`!process.env.CI`), no retries — you want to see failures immediately. |
| `baseURL`                      | When a test calls `page.goto('/')`, Playwright prepends this URL.                                                                    |
| `trace: 'on-first-retry'`     | Records a trace (timeline of actions, screenshots, network) only on the first retry — helpful for debugging CI failures.             |
| `webServer.command`            | **Playwright starts your dev server automatically!** It runs `npm run dev -- --port 5173` before tests begin.                        |
| `webServer.port`               | Playwright waits for this port to be available before running tests.                                                                 |
| `reuseExistingServer`          | Locally: if the dev server is already running, Playwright reuses it. In CI: always starts a fresh server.                            |
| `projects`                     | We test in Chromium (Chrome-based). You could add Firefox, WebKit, or mobile devices here.                                           |

> **Key Difference from Cypress:** Playwright's `webServer` config **automatically starts the dev server** — you don't need a separate terminal.

---

### 8.5 `vite.config.js` — Vite Configuration

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

This is the standard Vite config. The `react()` plugin enables JSX/HMR, and `tailwindcss()` enables Tailwind CSS processing. This file was **not changed** for lab-29 — it already existed in the project.

---

## 9. React Components (The UI We Test)

These are the components that our tests interact with. They are intentionally simple so students can focus on **testing concepts**, not component complexity.

### 9.1 `Lab29Demo.jsx` — Main Demo Page

This is the **entry point** component that renders the Counter and TodoList on one page.

```jsx
import Counter from './Counter';
import TodoList from './TodoList';

export default function Lab29Demo() {
  return (
    <main style={{ width: 'min(900px, 92vw)' }}>
      <h1>Lab 29 – Component Testing + E2E Testing</h1>
      <p>
        This page exists so we have a stable UI to test with three levels of testing:
        component tests (Jest) and E2E tests (Cypress + Playwright).
      </p>

      <div style={{ display: 'grid', gap: 24 }}>
        <Counter initial={0} />
        <TodoList />
      </div>
    </main>
  );
}
```

**Why this file exists:**

- Provides a **single page** that both Cypress and Playwright can visit at `/`.
- Composes both components so E2E tests can test the counter AND the todo list in one visit.
- The `<h1>` contains "Lab 29" which E2E tests use to verify the page loaded correctly.

---

### 9.2 `Counter.jsx` — Counter Component

```jsx
import { useState } from 'react';

export default function Counter({ initial = 0 }) {
  const [count, setCount] = useState(initial);

  return (
    <section aria-label="Counter">
      <h2>Counter</h2>
      <p data-cy="count">Count: {count}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button data-cy="increment" onClick={() => setCount((value) => value + 1)}>
          Increment
        </button>
        <button data-cy="decrement" onClick={() => setCount((value) => value - 1)}>
          Decrement
        </button>
        <button data-cy="reset" onClick={() => setCount(initial)}>
          Reset
        </button>
      </div>
    </section>
  );
}
```

**Key design decisions for testing:**

| Feature                      | Why                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| `initial` prop               | Allows tests to set a known starting value (e.g., `initial={5}`).                                |
| `data-cy="count"`            | A **stable test selector**. CSS classes change, IDs might change, but `data-cy` is specifically for testing. |
| `data-cy="increment"` etc.   | Each button has a unique test hook. E2E tests can reliably find them.                            |
| `aria-label="Counter"`       | Accessibility attribute — also usable in tests via `getByRole('region', { name: /counter/i })`.  |
| Functional state update `(value) => value + 1` | Ensures correct behavior even if React batches multiple state updates.              |

---

### 9.3 `TodoList.jsx` — Todo List Component

```jsx
import { useState } from 'react';

export default function TodoList() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setItems((prev) => [...prev, trimmed]);
    setText('');
  };

  return (
    <section aria-label="Todo">
      <h2>Todo List</h2>

      <label htmlFor="todo-input">New todo</label>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          id="todo-input"
          data-cy="todo-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g., Read about E2E testing"
        />
        <button data-cy="todo-add" onClick={addItem}>
          Add
        </button>
        <button
          data-cy="todo-clear"
          onClick={() => {
            setText('');
            setItems([]);
          }}
        >
          Clear
        </button>
      </div>

      {items.length === 0 ? (
        <p>No todos yet.</p>
      ) : (
        <ul aria-label="Todo items">
          {items.map((item, index) => (
            <li data-cy="todo-item" key={`${item}-${index}`}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
```

**Key design decisions for testing:**

| Feature                        | Why                                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `label htmlFor="todo-input"`   | Component tests use `getByLabelText('New todo')` — tests elements the way a user finds them.            |
| `data-cy="todo-input"`        | E2E tests use `[data-cy="todo-input"]` — stable selector that won't break when styling changes.         |
| `text.trim()` check            | Business logic to test: blank todos should NOT be added. We have a test for this.                       |
| `data-cy="todo-item"` on `<li>` | E2E tests can assert items appear in the list.                                                         |
| Conditional rendering          | "No todos yet." vs the `<ul>` — tests verify both states.                                              |

---

## 10. Component Tests (Jest + React Testing Library)

### 10.1 `Counter.test.jsx` — Complete Code

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Lab 29 - Counter component', () => {
  test('renders initial count', () => {
    render(<Counter initial={5} />);
    expect(screen.getByText(/Count: 5/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /increment/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /decrement/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  test('increments and decrements', () => {
    render(<Counter initial={0} />);

    fireEvent.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByText(/Count: 1/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /decrement/i }));
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();
  });

  test('reset returns to initial value', () => {
    render(<Counter initial={2} />);

    fireEvent.click(screen.getByRole('button', { name: /increment/i }));
    fireEvent.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByText(/Count: 4/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(screen.getByText(/Count: 2/i)).toBeInTheDocument();
  });
});
```

**Detailed walkthrough:**

**Test 1: `renders initial count`**

- `render(<Counter initial={5} />)` — Renders the Counter component in a fake DOM with initial value 5.
- `screen.getByText(/Count: 5/i)` — Searches the rendered output for text matching "Count: 5" (case-insensitive). If not found, the test fails.
- `screen.getByRole('button', { name: /increment/i })` — Finds a `<button>` element whose accessible name matches "increment". This simulates how a screen reader (or user) would find the button.
- `.toBeInTheDocument()` — Custom matcher from `@testing-library/jest-dom`. Asserts the element exists in the DOM.

**Test 2: `increments and decrements`**

- `fireEvent.click(...)` — Simulates a user clicking the button. This triggers the `onClick` handler in the component.
- After clicking "Increment", we assert the count text changed to "Count: 1".
- After clicking "Decrement", we assert it went back to "Count: 0".

**Test 3: `reset returns to initial value`**

- Starts with `initial={2}`, clicks increment twice (count should be 4).
- Clicks "Reset" — count should go back to the initial value of 2 (not 0).
- This tests that the reset button truly returns to the *initial* prop value, not just zero.

---

### 10.2 `TodoList.test.jsx` — Complete Code

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

describe('Lab 29 - TodoList component', () => {
  test('starts with empty message', () => {
    render(<TodoList />);
    expect(screen.getByText(/No todos yet\./i)).toBeInTheDocument();
  });

  test('adds a todo item', () => {
    render(<TodoList />);

    const input = screen.getByLabelText(/New todo/i);
    fireEvent.change(input, { target: { value: 'Learn Cypress' } });
    fireEvent.click(screen.getByRole('button', { name: /^Add$/i }));

    expect(screen.getByText('Learn Cypress')).toBeInTheDocument();
    expect(screen.queryByText(/No todos yet\./i)).not.toBeInTheDocument();
  });

  test('does not add blank todos', () => {
    render(<TodoList />);

    const input = screen.getByLabelText(/New todo/i);
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: /^Add$/i }));

    expect(screen.getByText(/No todos yet\./i)).toBeInTheDocument();
  });
});
```

**Detailed walkthrough:**

**Test 1: `starts with empty message`**

- Renders TodoList with no items.
- Asserts the "No todos yet." message is visible — confirming the empty state renders correctly.

**Test 2: `adds a todo item`**

- `screen.getByLabelText(/New todo/i)` — Finds the input by its associated `<label>`. This is the recommended way because it tests accessibility.
- `fireEvent.change(input, { target: { value: 'Learn Cypress' } })` — Simulates typing "Learn Cypress" into the input field.
- `fireEvent.click(screen.getByRole('button', { name: /^Add$/i }))` — Clicks the "Add" button. The `^Add$` regex ensures we match exactly "Add" and not "Add something else".
- After adding, the todo text should appear, and the empty message should be gone (`queryByText` returns `null` instead of throwing, so we can assert `.not.toBeInTheDocument()`).

**Test 3: `does not add blank todos`**

- Types only whitespace (`'   '`) and clicks Add.
- The component's `text.trim()` check should prevent adding the item.
- Asserts the empty message is still shown — confirming blank todos are rejected.

---

## 11. Cypress E2E Test — Complete Code & Walkthrough

### `src/Labs/lab-29/cypress/lab29.cy.js`

```javascript
describe('Lab 29 - Cypress E2E', () => {
  it('loads the lab page', () => {
    cy.visit('/');
    cy.contains('h1', 'Lab 29').should('be.visible');
  });

  it('increments the counter', () => {
    cy.visit('/');

    cy.get('[data-cy="count"]').should('contain.text', 'Count: 0');
    cy.get('[data-cy="increment"]').click();
    cy.get('[data-cy="count"]').should('contain.text', 'Count: 1');
  });

  it('adds a todo item', () => {
    cy.visit('/');

    cy.get('[data-cy="todo-input"]').type('Explain component testing');
    cy.get('[data-cy="todo-add"]').click();

    cy.get('[data-cy="todo-item"]').should('contain.text', 'Explain component testing');
  });
});
```

**Detailed walkthrough:**

**Test 1: `loads the lab page`**

- `cy.visit('/')` — Opens `http://localhost:5173/` (baseUrl from config + `/`).
- `cy.contains('h1', 'Lab 29')` — Finds an `<h1>` element whose text contains "Lab 29".
- `.should('be.visible')` — Asserts it's visible on screen (not hidden by CSS).

**Test 2: `increments the counter`**

- `cy.get('[data-cy="count"]')` — Uses a CSS attribute selector to find the element with `data-cy="count"`. This is the `<p>` tag showing "Count: 0".
- `.should('contain.text', 'Count: 0')` — Asserts the text content includes "Count: 0". Cypress will **automatically retry** this assertion for up to 4 seconds if the element isn't ready yet.
- `cy.get('[data-cy="increment"]').click()` — Finds the Increment button and clicks it.
- After clicking, asserts the count text updated to "Count: 1".

**Test 3: `adds a todo item`**

- `cy.get('[data-cy="todo-input"]').type('Explain component testing')` — Finds the input and types text character by character (simulating real typing).
- `.click()` on the Add button.
- Asserts a `<li>` with `data-cy="todo-item"` now contains the typed text.

### Cypress API Concepts Used

| API                         | Description                                                                  |
| --------------------------- | ---------------------------------------------------------------------------- |
| `cy.visit(url)`             | Navigate the browser to a URL.                                               |
| `cy.get(selector)`          | Find one or more DOM elements by CSS selector.                               |
| `cy.contains(selector, text)` | Find an element matching the selector whose text includes the given string. |
| `.click()`                  | Click the element.                                                           |
| `.type(text)`               | Type text into an input field.                                               |
| `.should(assertion, value)` | Assert something about the element. Cypress retries until it passes or times out. |

---

## 12. Playwright E2E Test — Complete Code & Walkthrough

### `src/Labs/lab-29/playwright/lab29.spec.js`

```javascript
import { test, expect } from '@playwright/test';

test.describe('Lab 29 - Playwright E2E', () => {
  test('loads the lab page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Lab 29/i })).toBeVisible();
  });

  test('increments the counter', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('[data-cy="count"]')).toContainText('Count: 0');
    await page.locator('[data-cy="increment"]').click();
    await expect(page.locator('[data-cy="count"]')).toContainText('Count: 1');
  });

  test('adds a todo item', async ({ page }) => {
    await page.goto('/');

    await page.locator('[data-cy="todo-input"]').fill('Prepare demo for students');
    await page.locator('[data-cy="todo-add"]').click();

    await expect(page.locator('[data-cy="todo-item"]')).toContainText('Prepare demo for students');
  });
});
```

**Detailed walkthrough:**

**Key difference from Cypress:** Playwright tests are `async`/`await` based. Every browser action returns a Promise, so we must `await` each step.

**Test 1: `loads the lab page`**

- `await page.goto('/')` — Navigates the browser to the base URL.
- `page.getByRole('heading', { name: /Lab 29/i })` — Finds a heading element (`<h1>`, `<h2>`, etc.) whose accessible name matches "Lab 29". This is **role-based selection** — the recommended Playwright approach.
- `await expect(...).toBeVisible()` — Asserts the heading is visible. Playwright auto-waits for the element to appear.

**Test 2: `increments the counter`**

- `page.locator('[data-cy="count"]')` — Creates a locator (similar to Cypress's `cy.get()`). Locators are lazy — they don't search the DOM until you interact with them.
- `.toContainText('Count: 0')` — Asserts the element's text includes "Count: 0".
- `.click()` — Clicks the element. Playwright auto-waits for the element to be clickable (visible, enabled, stable).
- After clicking, asserts the count updated.

**Test 3: `adds a todo item`**

- `.fill('Prepare demo for students')` — Fills the input field. Unlike Cypress's `.type()`, Playwright's `.fill()` clears the field first and sets the value directly (faster).
- After adding, asserts the todo item appears.

### Playwright API Concepts Used

| API                              | Description                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------ |
| `page.goto(url)`                | Navigate the browser to a URL.                                                 |
| `page.locator(selector)`        | Create a locator for finding elements. Lazy — doesn't query until used.        |
| `page.getByRole(role, options)` | Find elements by their ARIA role (heading, button, textbox, etc.).              |
| `.click()`                       | Click the element. Auto-waits for it to be actionable.                         |
| `.fill(text)`                    | Clear and fill an input field with text.                                       |
| `expect(locator).toBeVisible()` | Assert the element is visible on page.                                         |
| `expect(locator).toContainText()` | Assert the element's text includes the given string.                         |

### Key Differences Between Cypress & Playwright Syntax

| Concept          | Cypress                                          | Playwright                                                    |
| ---------------- | ------------------------------------------------ | ------------------------------------------------------------- |
| Navigate         | `cy.visit('/')`                                  | `await page.goto('/')`                                        |
| Find element     | `cy.get('[data-cy="count"]')`                    | `page.locator('[data-cy="count"]')`                           |
| Click            | `.click()`                                       | `await .click()`                                              |
| Type text        | `.type('hello')`                                 | `await .fill('hello')`                                        |
| Assert text      | `.should('contain.text', 'hello')`               | `await expect(...).toContainText('hello')`                    |
| Assert visible   | `.should('be.visible')`                          | `await expect(...).toBeVisible()`                             |
| Async model      | Implicit (Cypress queues commands)               | Explicit (`async`/`await`)                                    |
| Dev server       | You start it manually                            | Auto-started via `webServer` config                           |

---

## 13. Step-by-Step: What Students Must Do

### Prerequisites

- **Node.js 18+** installed on your machine
- A code editor (VS Code recommended)
- Basic React knowledge

### Step 1: Clone / Open the Project

```bash
cd E:/college/Extra/Adv_frontend_lab
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all packages listed in `package.json`, including Jest, Cypress, and Playwright.

### Step 3: Install Playwright Browsers

```bash
npx playwright install
```

Playwright downloads actual browser binaries (Chromium, Firefox, WebKit). This step is required **once** — if you skip it, Playwright tests will fail with "browser not found".

### Step 4: Run the App (Make Sure It Works)

```bash
npm run dev
```

Open `http://localhost:5173` in your browser. You should see:

- **Lab 29 – Component Testing + E2E Testing** heading
- A **Counter** with Increment / Decrement / Reset buttons
- A **Todo List** with an input, Add, and Clear buttons

### Step 5: Run Component Tests (Jest)

```bash
npm run test:unit
```

Expected output:

```
PASS  src/Labs/lab-29/Counter.test.jsx
  Lab 29 - Counter component
    ✓ renders initial count
    ✓ increments and decrements
    ✓ reset returns to initial value

PASS  src/Labs/lab-29/TodoList.test.jsx
  Lab 29 - TodoList component
    ✓ starts with empty message
    ✓ adds a todo item
    ✓ does not add blank todos

Test Suites: 2 passed, 2 total
Tests:       6 passed, 6 total
```

### Step 6: Run Cypress E2E Tests

**Terminal 1 — Start the dev server:**

```bash
npm run dev
```

**Terminal 2 — Open Cypress interactive runner:**

```bash
npm run test:e2e:cypress:open
```

In the Cypress interactive window (first-time setup + how to run):

#### A) First time you open Cypress (configuration screens)
1. Cypress may show a welcome screen. Click **Continue**.
2. When it asks for a testing type, select **E2E Testing**.
3. Cypress may show a “Quick Configuration” / “Project setup” screen.
   - If it asks to create example files, you can **skip** examples.
   - Our project already has what Cypress needs:
     - `cypress.config.js`
     - `cypress/support/e2e.js` (Cypress expects this support file)
4. Choose a browser (Chrome is recommended for beginners).
5. Click **Start E2E Testing in <Browser>**.

#### B) Running the lab test
6. You should now see the **Specs** list.
7. Click `lab29.cy.js`.
8. Watch the test runner automate the browser.

#### C) What students should observe (teaching points)
- The left panel shows each Cypress command (visit, get, click, type).
- Clicking a command “time travels” the UI back to that moment.
- If a step fails, Cypress highlights the exact command and selector.

#### D) If you don’t see `lab29.cy.js`
- Confirm the dev server is running in Terminal 1 (`npm run dev`).
- Confirm `cypress.config.js` has:
  - `specPattern: 'src/Labs/lab-29/cypress/**/*.cy.js'`
- Confirm the spec exists at `src/Labs/lab-29/cypress/lab29.cy.js`.

**Or run headless (no GUI):**

```bash
npm run test:e2e:cypress:run
```

### Step 7: Run Playwright E2E Tests

```bash
npm run test:e2e:playwright
```

Playwright will **automatically start the dev server** for you (no separate terminal needed).

Expected output:

```
Running 3 tests using 1 worker
  ✓ Lab 29 - Playwright E2E > loads the lab page
  ✓ Lab 29 - Playwright E2E > increments the counter
  ✓ Lab 29 - Playwright E2E > adds a todo item

  3 passed
```

**Optional — Use Playwright UI mode:**

```bash
npm run test:e2e:playwright:ui
```

This opens an interactive window similar to Cypress where you can watch tests and inspect traces.

---

## 14. Running All Tests — Commands Cheat-Sheet

| Command                             | What It Does                                                |
| ------------------------------------ | ----------------------------------------------------------- |
| `npm run test:unit`                  | Run all Jest component tests                                |
| `npm run test:unit:watch`            | Jest in watch mode — re-runs tests when files change        |
| `npm run test:e2e:cypress:open`      | Open Cypress interactive test runner (needs dev server)     |
| `npm run test:e2e:cypress:run`       | Run Cypress tests headless in terminal (needs dev server)   |
| `npm run test:e2e:playwright`        | Run Playwright tests (auto-starts dev server)               |
| `npm run test:e2e:playwright:ui`     | Open Playwright interactive UI mode                         |
| `npm run test:e2e:playwright:report` | View the HTML report from the last Playwright run           |

---

## 15. Understanding the Testing Workflow

### How the Pieces Fit Together

```
┌─────────────────────────────────────────────────────────────────┐
│                        YOUR REACT APP                           │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐    │
│  │  Counter.jsx  │  │ TodoList.jsx │  │   Lab29Demo.jsx    │    │
│  └──────┬───────┘  └──────┬───────┘  └─────────┬──────────┘    │
│         │                 │                     │               │
└─────────┼─────────────────┼─────────────────────┼───────────────┘
          │                 │                     │
    ┌─────▼─────┐    ┌─────▼─────┐         ┌─────▼─────┐
    │  Jest /   │    │  Jest /   │         │  Vite Dev │
    │  RTL      │    │  RTL      │         │  Server   │
    │ (JSDOM)   │    │ (JSDOM)   │         │ :5173     │
    └───────────┘    └───────────┘         └─────┬─────┘
    Component Tests   Component Tests            │
                                           ┌─────▼─────┐
                                           │  REAL     │
                                           │  BROWSER  │
                                           └─────┬─────┘
                                        ┌────────┼────────┐
                                   ┌────▼───┐       ┌────▼──────┐
                                   │ Cypress│       │ Playwright│
                                   │  E2E   │       │   E2E     │
                                   └────────┘       └───────────┘
```

### The Workflow Step-by-Step

1. **Write your React components** (`Counter.jsx`, `TodoList.jsx`)
   - Add `data-cy` attributes to elements you'll test
   - Use `aria-label`, `<label>`, and semantic HTML for accessibility-based testing

2. **Write component tests** (`Counter.test.jsx`, `TodoList.test.jsx`)
   - Import `render`, `screen`, `fireEvent` from React Testing Library
   - Render the component → find elements → simulate interactions → assert results
   - Run with `npm run test:unit`

3. **Configure Config Files** (once, at project root)
   - `babel.config.cjs` — so Jest can process JSX
   - `jest.config.mjs` — tell Jest where tests live and to use JSDOM
   - `cypress.config.js` — tell Cypress the base URL and spec pattern
   - `playwright.config.js` — tell Playwright the test dir, base URL, and dev server command

4. **Write Cypress E2E tests** (`cypress/lab29.cy.js`)
   - Use `cy.visit()`, `cy.get()`, `.click()`, `.type()`, `.should()`
   - Run with `npm run test:e2e:cypress:open` (interactive) or `npm run test:e2e:cypress:run` (headless)

5. **Write Playwright E2E tests** (`playwright/lab29.spec.js`)
   - Use `page.goto()`, `page.locator()`, `.click()`, `.fill()`, `expect().toContainText()`
   - Run with `npm run test:e2e:playwright`

---

## 16. Why Each File Exists — File Creation Explained

| File                            | Type           | Why We Created It                                                                                      |
| ------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| `Lab29Demo.jsx`                  | Component      | The main page that composes Counter + TodoList. E2E tests visit this page at `/`.                      |
| `Counter.jsx`                    | Component      | A simple stateful component (increment/decrement/reset) that's easy to test.                           |
| `TodoList.jsx`                   | Component      | A CRUD-like component (add/clear items) to demonstrate testing user input + list rendering.            |
| `Counter.test.jsx`               | Component Test | Tests Counter behavior in isolation — rendering, button clicks, state changes.                         |
| `TodoList.test.jsx`              | Component Test | Tests TodoList behavior — empty state, adding items, rejecting blank input.                            |
| `cypress/lab29.cy.js`            | Cypress E2E    | Tests the same features but through a real browser — page load, counter interaction, todo creation.    |
| `playwright/lab29.spec.js`       | Playwright E2E | Same E2E tests using Playwright — demonstrates the alternative syntax and auto-server feature.        |
| `babel.config.cjs`               | Config         | Enables Babel to transform JSX + modern JS so Jest can run test files.                                 |
| `jest.config.mjs`                | Config         | Configures Jest: JSDOM environment, Babel transform, test file patterns, custom matchers.              |
| `cypress.config.js`              | Config         | Tells Cypress the app URL (`localhost:5173`) and where to find `.cy.js` spec files.                    |
| `playwright.config.js`           | Config         | Tells Playwright the test directory, browser to use, and how to auto-start the dev server.             |

---

## 17. Common Troubleshooting

### Jest: "No tests found"

- **Cause:** Test files are not matching `testMatch` patterns in `jest.config.mjs`.
- **Fix:** Ensure your test files are inside `src/Labs/lab-29/` and end with `.test.js` or `.test.jsx`.

### Jest: "Cannot use import statement outside a module"

- **Cause:** Babel is not transforming your test files.
- **Fix:** Verify `babel.config.cjs` exists at the project root with both presets (`@babel/preset-env` and `@babel/preset-react`).

### Cypress: "Cypress could not verify that this server is running: http://localhost:5173"

- **Cause:** The Vite dev server is not running.
- **Fix:** Open a separate terminal and run `npm run dev` before starting Cypress.

### Cypress: "No specs found"

- **Cause:** `specPattern` in `cypress.config.js` doesn't match your test file location.
- **Fix:** Verify the glob pattern matches your file path. Test files must end in `.cy.js`.

### Playwright: "browserType.launch: Executable doesn't exist"

- **Cause:** Playwright browsers are not installed.
- **Fix:** Run `npx playwright install` to download the required browser binaries.

### Playwright: "Cannot find module" or import errors

- **Cause:** Missing `@playwright/test` package.
- **Fix:** Run `npm install` to install all dependencies from `package.json`.

### Playwright: Port 5173 is already in use

- **Cause:** Vite dev server is already running.
- **Fix:** That's totally fine! Playwright's config has `reuseExistingServer: true` for local development — it will reuse the running server.

### All Tests: "Module not found: Counter / TodoList"

- **Cause:** File paths are wrong or components weren't created.
- **Fix:** Ensure `Counter.jsx`, `TodoList.jsx`, and `Lab29Demo.jsx` exist in `src/Labs/lab-29/`.

---

## 18. Live Demo Flow (For Class)

Here's a suggested order for demonstrating this lab to students:

1. **Show the running app** — `npm run dev` → open browser → show Counter and Todo List working.

2. **Run component tests** — `npm run test:unit` → show all 6 tests pass instantly (< 2 seconds).

3. **Break a component on purpose** — In `Counter.jsx`, change `value + 1` to `value + 2`. Save.

4. **Re-run component tests** — `npm run test:unit` → show the "increments and decrements" test **fails** with a clear error message. Ask: *"What does this failure message tell you?"*

5. **Fix the code** — Change it back to `value + 1`. Tests pass again.

6. **Open Cypress interactive runner** — `npm run test:e2e:cypress:open` → select E2E Testing → choose Chrome → click `lab29.cy.js` → watch the browser automate clicks in real-time.

7. **Run Playwright tests** — `npm run test:e2e:playwright` → show terminal output with all 3 tests passing. Point out that Playwright started the dev server automatically.

8. **Key takeaway for students:**
   - Component tests = fast, catch logic bugs early, run without a browser
   - E2E tests = slower, but prove the entire app works in a real browser
   - **Use both in real projects.** Many component tests + a few critical E2E tests.

---

> **You now have a complete, working example of component testing and E2E testing. Use this README as your reference — all the code is here, ready to copy and use.**
