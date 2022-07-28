import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node'
import { handlers } from '../../mocks/handlers';
import { SignIn } from './SignIn';

describe('SignIn Screen', () => {

    it('render a form', () => {
        render(<SignIn />);
        expect(screen.getByTestId('sign-in')).toBeInstanceOf(HTMLFormElement);
    })

    it('render the email field as a text input', () => {
        render(<SignIn />);
        const form = screen.getByTestId('sign-in');
        const email = form.elements.email;

        expect(email).toBeInstanceOf(HTMLInputElement);
        expect(email.type).toBe('text');
    })

    it('show 1 error message for email field when submited with empty email', () => {
        render(<SignIn />);
        fireEvent.click(screen.getByTestId('btn-submit'));

        expect(screen.getByText('Email is required')).not.toBeNull();
    })

    it('render the password field as a password input', () => {
        render(<SignIn />);
        const form = screen.getByTestId('sign-in');
        const password = form.elements.password;

        expect(password).toBeInstanceOf(HTMLInputElement);
        expect(password.type).toBe('password');
    })

    it('show 1 error message for password field when submited with empty password', () => {
        render(<SignIn />);
        fireEvent.click(screen.getByTestId('btn-submit'));

        expect(screen.getByText('Password is required')).not.toBeNull();
    })

    describe('server response sign in request', () => {
        const server = setupServer(
            ...handlers
        )
        beforeAll(() => {
            server.listen();
        })

        afterAll(() => {
            server.close();
        })

        it('show 1 error message when submited with incorrect uername and password', async () => {
            render(<SignIn />);
            const form = screen.getByTestId('sign-in').elements;
            fireEvent.change(form.email, { target: { value: "random@gmail.com" } });
            fireEvent.change(form.password, { target: { value: "123" } });
            fireEvent.click(screen.getByTestId('btn-submit'));
            await screen.findByText('You have entered an incorrect username or password');
        })

        it.skip('save auth token in localstorage when sign in was success', () => {
            render(<SignIn />);
            expect(localStorage.getItem('auth_token')).toBeNull();

            const form = screen.getByTestId('sign-in').elements;
            fireEvent.change(form.email, { target: { value: "test@gmail.com" } });
            fireEvent.change(form.password, { target: { value: "password" } });
            fireEvent.click(screen.getByTestId('btn-submit'));

            expect(localStorage.getItem('auth_token')).not.toBeNull();
            expect(localStorage.getItem('auth_token').length).toBeGreaterThan(0);
        })
    })
})