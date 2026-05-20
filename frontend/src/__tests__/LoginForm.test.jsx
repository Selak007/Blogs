import React from 'react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from '../App';

const renderLogin = () => render(
  <MemoryRouter>
    <Login />
  </MemoryRouter>
);

describe('Login form validation', () => {
  it('shows an error when email is missing', async () => {
    renderLogin();

    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(screen.queryByText('Successfully logged in!')).not.toBeInTheDocument();
  });

  it('shows an error when password is shorter than six characters', async () => {
    renderLogin();

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), '123');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText('Password must be at least 6 characters')).toBeInTheDocument();
    expect(screen.queryByText('Successfully logged in!')).not.toBeInTheDocument();
  });

  it('shows success message after valid submission', async () => {
    renderLogin();

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'secret1');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText('Successfully logged in!')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /sign in/i })).not.toBeInTheDocument();
  });
});
