import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SPS logo', () => {
  render(<App />);
  const linkElement = screen.getByText(/SPS logo/i);
  expect(linkElement).toBeInTheDocument();
});
