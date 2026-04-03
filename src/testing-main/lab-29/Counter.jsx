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
