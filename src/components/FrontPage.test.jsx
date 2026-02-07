import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FrontPage from './FrontPage';
import { BrowserRouter } from 'react-router-dom';

// Mock useCart
jest.mock('./CartContext', () => ({
  useCart: () => ({ totalItems: 3 }),
}));

// Mock navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('FrontPage Component', () => {
  test('renders greeting text', () => {
    render(
      <BrowserRouter>
        <FrontPage onLogout={jest.fn()} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Good/i)).toBeInTheDocument();
  });

  test('shows cart item count badge', () => {
    render(
      <BrowserRouter>
        <FrontPage onLogout={jest.fn()} />
      </BrowserRouter>
    );

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('navigates to cart on cart button click', () => {
    render(
      <BrowserRouter>
        <FrontPage onLogout={jest.fn()} />
      </BrowserRouter>
    );

    const cartBadge = screen.getByText('3');
    const cartButton = cartBadge.closest('button');

    fireEvent.click(cartButton);

    expect(mockNavigate).toHaveBeenCalledWith('/cart');
  });

  test('calls logout function on logout button click', () => {
    const mockLogout = jest.fn();

    render(
      <BrowserRouter>
        <FrontPage onLogout={mockLogout} />
      </BrowserRouter>
    );

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]); // logout button

    expect(mockLogout).toHaveBeenCalled();
  });
});
