import '@testing-library/jest-dom';
declare module 'axios' {
    interface AxiosInstance {
      get: jest.Mock;
    }
  }