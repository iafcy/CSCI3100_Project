import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import supabase from '../../utils/supabase';
import { AuthError } from '@supabase/supabase-js';

describe('LoginForm', () => {
  it('renders email and password input fields', () => {
    render(<LoginForm onClose={() => {}} />);
    const passwordInput = screen.getByLabelText((content) =>
      content.startsWith('Password'),
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('allows user to type into email and password', async () => {
    const user = userEvent.setup();
    render(<LoginForm onClose={() => {}} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText((content) =>
      content.startsWith('Password'),
    );

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'Password-1234');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('Password-1234');
  });

  it('Login button should be disabled if form is invalid', async () => {
    render(<LoginForm onClose={() => {}} />);

    const submitButton = screen.getByRole('button', { name: /login/i });

    expect(submitButton).toBeDisabled();
  });

  it('shows validation errors if email and password are empty and form is submitted', async () => {
    render(<LoginForm onClose={() => {}} />);

    const form = screen.getByTestId('login-form');

    fireEvent.submit(form);

    expect(await screen.findAllByText(/required/i)).not.toHaveLength(0);
  });

  it('shows validation errors if password is empty and form is submitted', async () => {
    const user = userEvent.setup();
    render(<LoginForm onClose={() => {}} />);

    const form = screen.getByTestId('login-form');

    const emailInput = screen.getByLabelText(/email/i);

    await user.type(emailInput, 'test@example.com');

    fireEvent.submit(form);

    expect(await screen.findAllByText(/required/i)).not.toHaveLength(0);
  });

  it('shows validation errors if email is invalid and form is submitted', async () => {
    const user = userEvent.setup();
    render(<LoginForm onClose={() => {}} />);

    const form = screen.getByTestId('login-form');

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText((content) =>
      content.startsWith('Password'),
    );

    await user.type(emailInput, 'testexample.com');
    await user.type(passwordInput, 'Password-1234');

    fireEvent.submit(form);

    expect(
      await screen.findAllByText(/Please enter a valid email address./i),
    ).not.toHaveLength(0);
  });

  it('shows validation errors if email is empty and form is submitted', async () => {
    const user = userEvent.setup();
    render(<LoginForm onClose={() => {}} />);

    const form = screen.getByTestId('login-form');

    const passwordInput = screen.getByLabelText((content) =>
      content.startsWith('Password'),
    );

    await user.type(passwordInput, 'Password-1234');

    fireEvent.submit(form);

    expect(await screen.findAllByText(/required/i)).not.toHaveLength(0);
  });

  it('toggles password visibility when the show/hide button is clicked', async () => {
    render(<LoginForm onClose={() => {}} />);
    const user = userEvent.setup();

    const passwordInput = screen.getByLabelText((content) =>
      content.startsWith('Password'),
    );
    const showHideButton = screen.getByRole('button', {
      name: /show password/i,
    });

    expect(passwordInput).toHaveAttribute('type', 'password');

    await user.click(showHideButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    await user.click(showHideButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('disables the button while submitting', async () => {
    vi.spyOn(supabase.auth, 'signInWithPassword').mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: {
                session: {
                  access_token: 'mock_access_token',
                  refresh_token: 'mock_refresh_token',
                  expires_in: 3600,
                  token_type: 'bearer',
                  user: {
                    id: 'mock_user_id',
                    aud: 'authenticated',
                    role: 'authenticated',
                    email: 'test@example.com',
                    email_confirmed_at: '2023-10-27T10:00:00Z',
                    phone: '',
                    created_at: '2023-10-27T09:59:59Z',
                    updated_at: '2023-10-27T10:00:00Z',
                    app_metadata: {},
                    user_metadata: {},
                    identities: [],
                    factors: [],
                  },
                },
                user: {
                  id: 'mock_user_id',
                  aud: 'authenticated',
                  role: 'authenticated',
                  email: 'test@example.com',
                  email_confirmed_at: '2023-10-27T10:00:00Z',
                  phone: '',
                  created_at: '2023-10-27T09:59:59Z',
                  updated_at: '2023-10-27T10:00:00Z',
                  app_metadata: {},
                  user_metadata: {},
                  identities: [],
                  factors: [],
                },
              },
              error: null,
            }); // Simulate a successful login after a delay
          }, 1000);
        }),
    );

    render(<LoginForm onClose={() => {}} />);
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText((content) =>
      content.startsWith('Password'),
    );
    const loginButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'Password-1234');
    const form = screen.getByTestId('login-form');
    fireEvent.submit(form);

    expect(loginButton).toBeDisabled();
  });

  it('calls onClose on successful login', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    vi.spyOn(supabase.auth, 'signInWithPassword').mockResolvedValue({
      data: {
        session: {
          access_token: 'mock_access_token',
          refresh_token: 'mock_refresh_token',
          expires_in: 3600,
          token_type: 'bearer',
          user: {
            id: 'dummy-id',
            aud: 'authenticated',
            created_at: 'dummy-date',
            app_metadata: {},
            user_metadata: {},
          },
        },
        user: {
          id: 'dummy-id',
          aud: 'authenticated',
          created_at: 'dummy-date',
          app_metadata: {},
          user_metadata: {},
        },
      },
      error: null,
    });

    vi.spyOn(supabase.auth, 'getUser').mockResolvedValue({
      data: {
        user: {
          id: 'dummy-id',
          aud: 'authenticated',
          created_at: 'dummy-date',
          app_metadata: {},
          user_metadata: {},
        },
      },
      error: null,
    });

    render(<LoginForm onClose={onClose} />);

    const passwordInput = screen.getByLabelText((content) =>
      content.startsWith('Password'),
    );

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(passwordInput, 'Password-1234');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('shows error message on failed login', async () => {
    vi.spyOn(supabase.auth, 'signInWithPassword').mockResolvedValue({
      data: {
        user: null,
        session: null,
      },
      error: new AuthError('Invalid credentials'),
    });

    render(<LoginForm onClose={() => {}} />);
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText((content) =>
      content.startsWith('Password'),
    );

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'Password-1234');
    const form = screen.getByTestId('login-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });
});
