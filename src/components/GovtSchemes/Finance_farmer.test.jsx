import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FinanceFarmer from './Finance_farmer';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('FinanceFarmer Component', () => {
  const mockSchemes = [
    {
      _id: '1',
      name: 'Crop Loan',
      type: 'Loan',
      interest: '4.5%',
      color: 'indigo',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loads and displays schemes', async () => {
    axios.get
      .mockResolvedValueOnce({ data: mockSchemes }) // schemes
      .mockResolvedValueOnce({ data: [] }); // applications

    render(
      <BrowserRouter>
        <FinanceFarmer user={{ email: 'farmer@test.com' }} />
      </BrowserRouter>
    );

    expect(await screen.findByText(/Crop Loan/i)).toBeInTheDocument();
  });

  test('shows apply button', async () => {
    axios.get
      .mockResolvedValueOnce({ data: mockSchemes })
      .mockResolvedValueOnce({ data: [] });

    render(
      <BrowserRouter>
        <FinanceFarmer user={{ email: 'farmer@test.com' }} />
      </BrowserRouter>
    );

    expect(await screen.findByText(/Apply Now/i)).toBeInTheDocument();
  });

  test('applies to a scheme', async () => {
    window.alert = jest.fn();

    axios.get
      .mockResolvedValueOnce({ data: mockSchemes })
      .mockResolvedValueOnce({ data: [] });

    axios.post.mockResolvedValue({ status: 201 });

    render(
      <BrowserRouter>
        <FinanceFarmer user={{ email: 'farmer@test.com' }} />
      </BrowserRouter>
    );

    const applyBtn = await screen.findByText(/Apply Now/i);
    fireEvent.click(applyBtn);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5001/api/finance/apply',
        expect.objectContaining({
          farmerEmail: 'farmer@test.com',
          schemeName: 'Crop Loan',
        })
      );
    });
  });

  test('shows applied state after applying', async () => {
    axios.get
      .mockResolvedValueOnce({ data: mockSchemes })
      .mockResolvedValueOnce({ data: [] });

    axios.post.mockResolvedValue({ status: 201 });

    render(
      <BrowserRouter>
        <FinanceFarmer user={{ email: 'farmer@test.com' }} />
      </BrowserRouter>
    );

    fireEvent.click(await screen.findByText(/Apply Now/i));

    expect(await screen.findByText(/Applied/i)).toBeInTheDocument();
  });
});
