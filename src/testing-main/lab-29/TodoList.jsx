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
