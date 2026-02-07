import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GovtSchemes from './GovtSchemes';
import { BrowserRouter } from 'react-router-dom';

// Mock navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('GovtSchemes Component', () => {
  test('renders heading text', () => {
    render(
      <BrowserRouter>
        <GovtSchemes />
      </BrowserRouter>
    );

    // user sees "Support" clearly
    expect(screen.getByText(/Support/i)).toBeInTheDocument();
  });

  test('navigates back to home when Back to Home is clicked', () => {
    render(
      <BrowserRouter>
        <GovtSchemes />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Back to Home/i));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('navigates when a hub card is clicked', () => {
    render(
      <BrowserRouter>
        <GovtSchemes />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Schemes for Me/i));
    expect(mockNavigate).toHaveBeenCalledWith('/schemes/list');
  });

  test('View All Alerts button navigates correctly', () => {
    render(
      <BrowserRouter>
        <GovtSchemes />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/View All Alerts/i));
    expect(mockNavigate).toHaveBeenCalledWith('/schemes/updates');
  });
});
