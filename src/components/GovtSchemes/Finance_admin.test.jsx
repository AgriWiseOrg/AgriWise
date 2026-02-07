import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FinanceAdmin from './Finance_admin';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('FinanceAdmin Component', () => {
  const mockSchemes = [
    { _id: '1', name: 'Crop Loan', type: 'Loan', interest: '4.5%' },
  ];

  const mockRequests = [
    {
      _id: 'r1',
      farmerEmail: 'farmer@test.com',
      schemeName: 'Crop Loan',
      interestRate: '4.5%',
      appliedAt: new Date().toISOString(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loads and displays schemes', async () => {
    axios.get
      .mockResolvedValueOnce({ data: mockSchemes })
      .mockResolvedValueOnce({ data: [] });

    render(
      <BrowserRouter>
        <FinanceAdmin />
      </BrowserRouter>
    );

    expect(await screen.findByText(/Crop Loan/i)).toBeInTheDocument();
  });

  test('switches to farmer requests tab', async () => {
    axios.get
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({ data: mockRequests });

    render(
      <BrowserRouter>
        <FinanceAdmin />
      </BrowserRouter>
    );

    fireEvent.click(await screen.findByText(/Farmer Requests/i));
    expect(await screen.findByText(/farmer@test.com/i)).toBeInTheDocument();
  });

  test('opens add scheme modal', async () => {
    axios.get
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({ data: [] });

    render(
      <BrowserRouter>
        <FinanceAdmin />
      </BrowserRouter>
    );

    fireEvent.click(await screen.findByText(/Add New Scheme/i));

    expect(
      await screen.findByPlaceholderText(/Scheme Name/i)
    ).toBeInTheDocument();
  });

  test('adds a new scheme', async () => {
    axios.get
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({ data: [] });

    axios.post.mockResolvedValue({
      data: { _id: '2', name: 'Subsidy Plan', type: 'Subsidy', interest: '2%' },
    });

    render(
      <BrowserRouter>
        <FinanceAdmin />
      </BrowserRouter>
    );

    fireEvent.click(await screen.findByText(/Add New Scheme/i));

    fireEvent.change(screen.getByPlaceholderText(/Scheme Name/i), {
      target: { value: 'Subsidy Plan' },
    });

    fireEvent.change(screen.getByPlaceholderText(/Category/i), {
      target: { value: 'Subsidy' },
    });

    fireEvent.change(screen.getByPlaceholderText(/Interest/i), {
      target: { value: '2%' },
    });

    fireEvent.click(screen.getByText(/Save Product/i));

    expect(await screen.findByText(/Subsidy Plan/i)).toBeInTheDocument();
  });

  test('deletes a scheme', async () => {
    window.confirm = jest.fn(() => true);

    axios.get
      .mockResolvedValueOnce({ data: mockSchemes })
      .mockResolvedValueOnce({ data: [] });

    axios.delete.mockResolvedValue({});

    render(
      <BrowserRouter>
        <FinanceAdmin />
      </BrowserRouter>
    );

    await screen.findByText(/Crop Loan/i);

    const buttons = screen.getAllByRole('button');
    const deleteBtn = buttons[buttons.length - 1];

    fireEvent.click(deleteBtn);

    expect(axios.delete).toHaveBeenCalledWith(
      'http://localhost:5001/api/schemes/1'
    );
  });
});
