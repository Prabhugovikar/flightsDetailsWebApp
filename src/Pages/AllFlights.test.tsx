import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import AllFlights from './AllFlights';
import { useNavigate } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { API_URL } from '../Service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('react-spinners', () => ({
  ClipLoader: () => <div data-testid="clip-loader" />
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../Service', () => ({
  API_URL: 'http://mock-api-url',
}));

const mockedUseNavigate = useNavigate as jest.Mock;

describe('AllFlights Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    mockedUseNavigate.mockImplementation(() => mockNavigate);
    jest.clearAllMocks();
  });

  test('displays loading spinner initially', () => {
    mockedAxios.get.mockImplementation(() => new Promise(() => {}));
    render(<AllFlights />, { wrapper: MemoryRouter });
    expect(screen.getByTestId('clip-loader')).toBeInTheDocument();
  });

  test('displays error message on fetch failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Failed to fetch'));
    render(<AllFlights />, { wrapper: MemoryRouter });
    const errorMessage = await screen.findByText(/Failed to fetch flight data./i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('renders flight data after successful fetch', async () => {
    const mockFlights = [{
      id: 1,
      flightNumber: 'FL123',
      airline: 'Airline 1',
      origin: 'Origin 1',
      destination: 'Destination 1',
      departureTime: '2024-01-01T12:00:00Z',
      status: 'On Time'
    }];
    mockedAxios.get.mockResolvedValue({ data: mockFlights });
    render(<AllFlights />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(screen.getByText('FL123')).toBeInTheDocument();
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(2); // Header + 1 data row
    });
  });

  test('refetches data after 50 seconds', async () => {
    jest.useFakeTimers();
    mockedAxios.get.mockResolvedValue({ data: [] });
    render(<AllFlights />, { wrapper: MemoryRouter });

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
    act(() => jest.advanceTimersByTime(50000));
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    jest.useRealTimers();
  });

  test('clears interval on unmount', () => {
    jest.useFakeTimers();
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const { unmount } = render(<AllFlights />, { wrapper: MemoryRouter });
    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
    jest.useRealTimers();
  });

  test('navigates to flight details on row click', async () => {
    const mockFlights = [{
      id: 1,
      flightNumber: 'FL123',
      airline: 'Airline 1',
      origin: 'Origin 1',
      destination: 'Destination 1',
      departureTime: '2024-01-01T12:00:00Z',
      status: 'On Time'
    }];
    mockedAxios.get.mockResolvedValue({ data: mockFlights });
    render(<AllFlights />, { wrapper: MemoryRouter });

    const flightCell = await screen.findByText('FL123');
const flightRow = flightCell.closest('tr');

    // const flightRow = await screen.findByText('FL123').closest('tr');
    if (flightRow) userEvent.click(flightRow);
    expect(mockNavigate).toHaveBeenCalledWith('/flightsDetails', { state: 1 });
  });
});