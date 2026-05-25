import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsletterSignup from './NewsletterSignup';

describe('NewsletterSignup', () => {
  test('renders input and button', () => {
    render(<NewsletterSignup />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });

  test('shows error when email is empty', () => {
    render(<NewsletterSignup />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });

  test('shows error for invalid email', () => {
    render(<NewsletterSignup />);
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'invalidemail' } });
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
  });

  test('shows success message on valid email', () => {
    render(<NewsletterSignup />);
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/thank you for subscribing/i)).toBeInTheDocument();
  });
});
