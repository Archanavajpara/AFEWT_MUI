import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Counter } from './Counter';

test('renders the correct initial text', () => {
  render(<Counter />);
  expect(screen.getByText(/Current Count: 0/i)).toBeInTheDocument();
});

test('button click increments the value', () => {
  render(<Counter />);
  const button = screen.getByText(/Increment/i);
  fireEvent.click(button);
  expect(screen.getByText(/Current Count: 1/i)).toBeInTheDocument();
});