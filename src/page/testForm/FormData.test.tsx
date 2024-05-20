import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormDataTest from './index';

// Mock the window.alert function
beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('FormDataTest Component', () => {
  test('renders the form fields and submits with correct data', async () => {
    render(<FormDataTest />);

    // Check if the form fields are rendered
    expect(screen.getByLabelText(/Họ tên/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tuổi/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gmail/i)).toBeInTheDocument();

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Họ tên/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/Tuổi/i), {
      target: { value: '25' }
    });
    fireEvent.change(screen.getByLabelText(/Gmail/i), {
      target: { value: 'john.doe@example.com' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Assert alert with correct data
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        'Thông tin đăng ký bao gồm: Họ tên: John Doe, Tuổi: 25, Gmail:john.doe@example.com'
      );
    });
  });

  test('shows validation errors for invalid inputs', async () => {
    render(<FormDataTest />);

    // Submit the form without filling out the fields
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Check for validation error messages
    expect(await screen.findByText(/Yêu cầu nhập tên/i)).toBeInTheDocument();
    expect(await screen.findByText(/Yêu cầu nhập tuổi/i)).toBeInTheDocument();
    expect(await screen.findByText(/Yêu cầu nhập gmail/i)).toBeInTheDocument();

    // Fill out the form with invalid data
    fireEvent.change(screen.getByLabelText(/Họ tên/i), {
      target: { value: ' ' }
    });
    fireEvent.change(screen.getByLabelText(/Tuổi/i), {
      target: { value: '17' }
    });
    fireEvent.change(screen.getByLabelText(/Gmail/i), {
      target: { value: 'invalid-email' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Check for validation error messages
    expect(await screen.findByText(/Yêu cầu nhập tên/i)).toBeInTheDocument();
    expect(await screen.findByText(/Tuổi từ 18/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Email không đúng định dạng/i)
    ).toBeInTheDocument();
  });
});
