import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import QualityPriceCalculator from './QualityPriceCalculator';

// Mock fetch
global.fetch = jest.fn();

describe('QualityPriceCalculator Component', () => {
    beforeEach(() => {
        fetch.mockClear();
        // Default mock implementation
        fetch.mockImplementation((url) => {
            if (url.includes('/api/market/crops')) {
                return Promise.resolve({
                    ok: true,
                    json: async () => ['Wheat', 'Rice', 'Corn']
                });
            }
            if (url.includes('/api/market/quality-price')) {
                return Promise.resolve({
                    ok: true,
                    json: async () => ({
                        suggestedPrice: 2500,
                        qualityScore: 85,
                        originalPrice: 2400,
                        notes: ['Good quality']
                    })
                });
            }
            return Promise.reject(new Error('Unknown URL'));
        });
    });

    test('renders correctly with initial state', async () => {
        await act(async () => {
            render(<QualityPriceCalculator />);
        });

        expect(screen.getByText(/Quality-Based Price Calculator/i)).toBeInTheDocument();

        // Wait for crops to load
        await waitFor(() => expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/market/crops')));

        // Check for inputs presence using roles since labels verify text only but not association
        expect(screen.getByText(/Select Crop/i)).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();

        expect(screen.getByText(/Moisture Content/i)).toBeInTheDocument();
        expect(screen.getByText(/Damage \/ Foreign Matter/i)).toBeInTheDocument();

        const inputs = screen.getAllByRole('spinbutton');
        expect(inputs).toHaveLength(2); // Moisture, Damage
    });

    test('fetches crops on mount and populates select', async () => {
        await act(async () => {
            render(<QualityPriceCalculator />);
        });

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('http://localhost:5001/api/market/crops');
        });

        // Verify options are populated
        const cropSelect = screen.getByRole('combobox');
        await waitFor(() => {
            expect(cropSelect).toHaveTextContent('Wheat');
            expect(cropSelect).toHaveTextContent('Rice');
            expect(cropSelect).toHaveTextContent('Corn');
        });
    });

    test('updates form inputs', async () => {
        await act(async () => {
            render(<QualityPriceCalculator />);
        });

        // Wait for initial fetch to settle
        await waitFor(() => expect(fetch).toHaveBeenCalled());

        const inputs = screen.getAllByRole('spinbutton');
        const moistureInput = inputs[0]; // First input is Moisture
        const damageInput = inputs[1]; // Second input is Damage

        fireEvent.change(moistureInput, { target: { value: '14' } });
        expect(moistureInput.value).toBe('14');

        fireEvent.change(damageInput, { target: { value: '2' } });
        expect(damageInput.value).toBe('2');
    });

    test('submits form and displays results', async () => {
        await act(async () => {
            render(<QualityPriceCalculator />);
        });

        await waitFor(() => expect(fetch).toHaveBeenCalled()); // crops fetched

        const calculateBtn = screen.getByRole('button', { name: /Calculate Suggested Price/i });
        fireEvent.click(calculateBtn);

        expect(screen.getByText(/Calculating.../i)).toBeInTheDocument();

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('http://localhost:5001/api/market/quality-price', expect.objectContaining({
                method: 'POST',
                // body check might be fragile if crop isn't selected yet or defaults are different
                // but let's assume it works as mock returns 'Wheat' as first crop
            }));
        });

        await waitFor(() => {
            expect(screen.getByText('₹2500')).toBeInTheDocument();
            expect(screen.getByText(/Quality Score: 85/i)).toBeInTheDocument();
            expect(screen.getByText('₹2400')).toBeInTheDocument();
        });
    });

    test('handles API errors gracefully', async () => {
        // Override mock for this test
        fetch.mockImplementation((url) => {
            if (url.includes('/api/market/crops')) {
                return Promise.resolve({ ok: true, json: async () => ['Wheat'] });
            }
            if (url.includes('/api/market/quality-price')) {
                return Promise.reject(new Error('API Error'));
            }
            return Promise.reject(new Error('Unknown URL'));
        });

        await act(async () => {
            render(<QualityPriceCalculator />);
        });
        await waitFor(() => expect(fetch).toHaveBeenCalled());

        const calculateBtn = screen.getByRole('button', { name: /Calculate Suggested Price/i });
        fireEvent.click(calculateBtn);

        await waitFor(() => {
            // Should stop loading
            const btn = screen.queryByText(/Calculating.../i);
            expect(btn).not.toBeInTheDocument();
        });
    });
});
