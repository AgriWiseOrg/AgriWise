import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FarmingTips from './FarmingTips_admin';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

// mock navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('FarmingTips Admin Component', () => {
  const mockTips = [
    {
      _id: '1',
      title: 'Water Saving',
      desc: 'Use drip irrigation',
      iconType: 'water',
      color: 'text-blue-600',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loads and shows tips from API', async () => {
    axios.get.mockResolvedValue({ data: mockTips });

    render(
      <BrowserRouter>
        <FarmingTips />
      </BrowserRouter>
    );

    expect(await screen.findByText(/Water Saving/i)).toBeInTheDocument();
  });

  test('opens add tip form', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(
      <BrowserRouter>
        <FarmingTips />
      </BrowserRouter>
    );

    fireEvent.click(await screen.findByText(/Add Tip/i));
    expect(screen.getByText(/Add New Advisory/i)).toBeInTheDocument();
  });

  test('adds a new tip', async () => {
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockResolvedValue({
      data: {
        _id: '2',
        title: 'Pest Control',
        desc: 'Use neem oil',
        iconType: 'bug',
        color: 'text-red-600',
      },
    });

    render(
      <BrowserRouter>
        <FarmingTips />
      </BrowserRouter>
    );

    fireEvent.click(await screen.findByText(/Add Tip/i));

    fireEvent.change(screen.getByPlaceholderText(/Title/i), {
      target: { value: 'Pest Control' },
    });

    fireEvent.change(screen.getByPlaceholderText(/Description/i), {
      target: { value: 'Use neem oil' },
    });

    fireEvent.click(screen.getByText(/Save/i));

    expect(await screen.findByText(/Pest Control/i)).toBeInTheDocument();
  });

  test('deletes a tip', async () => {
    window.confirm = jest.fn(() => true);
    axios.get.mockResolvedValue({ data: mockTips });
    axios.delete.mockResolvedValue({});

    render(
      <BrowserRouter>
        <FarmingTips />
      </BrowserRouter>
    );

    await screen.findByText(/Water Saving/i);

    // last button = delete button
    const buttons = screen.getAllByRole('button');
    const deleteBtn = buttons[buttons.length - 1];

    fireEvent.click(deleteBtn);

    expect(axios.delete).toHaveBeenCalledWith(
      'http://localhost:5001/api/farming-tips/1'
    );
  });
});
