// Flightsdetails.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Flightsdetails from './Flightsdetails';
import { useLocation, useNavigate } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { API_URL } from '../Service';

// Properly type axios mock
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock other dependencies
jest.mock('react-spinners', () => ({
  ClipLoader: () => <div data-testid="clip-loader" />
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('../Service', () => ({
  API_URL: 'http://mock-api-url',
}));

// Cast mocks to proper types
const mockedUseLocation = useLocation as jest.Mock;
const mockedUseNavigate = useNavigate as jest.Mock;

describe('Flightsdetails Component', () => {
  const mockNavigate = jest.fn();
  const mockLocation = (state: number) => ({
    state,
    pathname: '/flightsDetails',
    search: '',
    hash: '',
  });

  beforeEach(() => {
    mockedUseNavigate.mockImplementation(() => mockNavigate);
    jest.clearAllMocks();
  });

  test('navigates back when back button is clicked', async () => {
    mockedUseLocation.mockImplementation(() => mockLocation(1));
    mockedAxios.get.mockResolvedValue({ data: {} });
    
    render(<Flightsdetails />, { wrapper: MemoryRouter });
    const backButton = await screen.findByText(/Back to Flights/i);
    userEvent.click(backButton);
    
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('fetches data using flightId from location.state', async () => {
    const flightId = 1;
    mockedUseLocation.mockImplementation(() => mockLocation(flightId));
    mockedAxios.get.mockResolvedValue({ data: {} });
    
    render(<Flightsdetails />, { wrapper: MemoryRouter });
    
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL}/${flightId}`);
    });
  });
});