import '@testing-library/jest-dom/vitest';
import { afterEach, describe, it, expect } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './components/LoginForm';

afterEach(() => {
  cleanup();
});

describe('LoginForm', () => {
  it('shows an error when the email field is empty on submit', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(passwordInput, 'secret1');

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.queryByText('Password must be at least 6 characters')).not.toBeInTheDocument();
  });

  it('shows an error when the password is shorter than six characters', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'reader@example.com');

    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(passwordInput, '123');

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);

    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
  });

  it('shows the success message when both fields are valid', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), 'animalfan@example.com');
    await user.type(screen.getByLabelText(/password/i), 'hunter22');

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(screen.getByText('Successfully logged in!')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /sign in/i })).not.toBeInTheDocument();
  });
});
