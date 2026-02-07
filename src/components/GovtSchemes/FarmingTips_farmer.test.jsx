import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FarmingTips from './FarmingTips_farmer';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('FarmingTips Farmer Component', () => {
  const mockTips = [
    { _id: '1', title: 'Water Saving', desc: 'Use drip irrigation', iconType: 'water', color: 'text-blue-600' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loads and displays tips', async () => {
    axios.get.mockResolvedValue({ data: mockTips });

    render(
      <BrowserRouter>
        <FarmingTips />
      </BrowserRouter>
    );

    expect(await screen.findByText(/Water Saving/i)).toBeInTheDocument();
  });

  test('navigates back to hub', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(
      <BrowserRouter>
        <FarmingTips />
      </BrowserRouter>
    );

    fireEvent.click(await screen.findByText(/Back to Hub/i));
    expect(mockNavigate).toHaveBeenCalledWith('/govt-schemes');
  });
});
