import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import MarketPrices from './MarketPrices';
import { BrowserRouter } from 'react-router-dom';

// Mock child components
jest.mock('./QualityPriceCalculator', () => () => <div data-testid="quality-calculator">Quality Calculator Component</div>);

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }) => <div {...props}>{children}</div>,
    },
}));

// Mock fetch
global.fetch = jest.fn();

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('MarketPrices Component', () => {
    beforeEach(() => {
        fetch.mockClear();
        // Default mocks for initial load
        fetch.mockImplementation((url) => {
            // console.log('Mock fetch called with:', url); // Uncomment for debugging
            if (url.includes('/api/market/crops')) {
                return Promise.resolve({
                    ok: true,
                    json: async () => ['Wheat', 'Rice']
                });
            }
            if (url.includes('/api/market/prices')) {
                return Promise.resolve({
                    ok: true,
                    json: async () => [
                        { id: 1, crop: 'Wheat', mandi: 'Mandi A', price: 2200, trend: 'up' },
                        { id: 2, crop: 'Rice', mandi: 'Mandi B', price: 3000, trend: 'stable' }
                    ]
                });
            }
            if (url.includes('/api/market/history')) {
                return Promise.resolve({
                    ok: true,
                    json: async () => ({
                        data: [
                            { month: 'Jan', price: 2000 },
                            { month: 'Mar', price: 2500 }
                        ]
                    })
                });
            }
            if (url.includes('/api/market/demand')) {
                return Promise.resolve({
                    ok: true,
                    json: async () => [
                        { month: 'Jan', demand: 100 }
                    ]
                });
            }
            if (url.includes('/api/market/forecast-30-days')) {
                return Promise.resolve({
                    ok: true,
                    json: async () => ({
                        data: [
                            { date: '2023-01-01', price: 2050 },
                            { date: '2023-01-02', price: 2060 }
                        ]
                    })
                });
            }
            if (url.includes('/api/predict-price')) {
                return Promise.resolve({
                    ok: true,
                    json: async () => ({
                        predictedPrice: 2450,
                        confidence: 'High'
                    })
                });
            }
            return Promise.reject(new Error(`Unknown URL: ${url}`));
        });
    });

    test('renders live market prices by default', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <MarketPrices />
                </BrowserRouter>
            );
        });

        expect(screen.getByText(/Live Market Prices/i)).toBeInTheDocument();

        // Wait for price data to be rendered
        await waitFor(() => {
            expect(screen.getByText('Mandi A')).toBeInTheDocument();
            expect(screen.getByText('2200')).toBeInTheDocument(); // Corrected expectation
            expect(screen.getByText('Mandi B')).toBeInTheDocument();
            expect(screen.getByText('3000')).toBeInTheDocument(); // Corrected expectation
        });
    });

    test('navigates to Trends tab and displays history', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <MarketPrices />
                </BrowserRouter>
            );
        });

        const trendsTab = screen.getByText(/Trends/i);
        fireEvent.click(trendsTab);

        expect(screen.getByText(/Price Trends/i)).toBeInTheDocument();
        expect(screen.getByText(/6-Month Price History/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/market/history'));
        });

        await waitFor(() => {
            expect(screen.getByText('Jan')).toBeInTheDocument();
        });
    });

    test('navigates to Demand tab and displays forecast', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <MarketPrices />
                </BrowserRouter>
            );
        });

        const demandTab = screen.getByText(/Demand/i);
        fireEvent.click(demandTab);

        expect(screen.getByText(/Demand Forecasts/i)).toBeInTheDocument();
        expect(screen.getByText(/30-Day Price Forecast/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/market/demand'));
            expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/market/forecast-30-days'));
        });
    });

    test('navigates to AI Predictor tab and submits prediction', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <MarketPrices />
                </BrowserRouter>
            );
        });

        const predictTab = screen.getByText(/AI Predictor/i);
        fireEvent.click(predictTab);

        expect(screen.getByText(/AI Price Predictor/i)).toBeInTheDocument();

        // Check form presence
        expect(screen.getByText(/Forecast Parameters/i)).toBeInTheDocument();

        const predictBtn = screen.getByText(/Run AI Prediction/i);
        fireEvent.click(predictBtn);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('http://localhost:5001/api/predict-price', expect.anything());
        });

        await waitFor(() => {
            expect(screen.getByText(/Prediction Result/i)).toBeInTheDocument();
            expect(screen.getByText(/₹2450/i)).toBeInTheDocument();
        });
    });

    test('navigates to Quality Check tab and renders calculator', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <MarketPrices />
                </BrowserRouter>
            );
        });

        const qualityTab = screen.getByText(/Quality Check/i);
        fireEvent.click(qualityTab);

        expect(screen.getByText(/Quality Price Calculator/i)).toBeInTheDocument();
        expect(screen.getByTestId('quality-calculator')).toBeInTheDocument();
    });

    test('navigates back when Back button is clicked', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <MarketPrices />
                </BrowserRouter>
            );
        });

        const backBtn = screen.getByText(/Back/i);
        fireEvent.click(backBtn);

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
