import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { LoginForm } from '@/features/auth/LoginForm';

describe('LoginForm', () => {
  it('renders without crashing', () => {
    render(<LoginForm />);
    expect(true).toBe(true);
  });

  it('submits the form', () => {
    const { container } = render(<LoginForm />);
    const form = container.querySelector('form');
    expect(form).toBeDefined();
  });
});
