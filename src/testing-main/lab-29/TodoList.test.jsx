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
