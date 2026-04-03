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
