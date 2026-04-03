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
