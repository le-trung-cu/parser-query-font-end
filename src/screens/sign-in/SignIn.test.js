import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node'
import { Router } from 'react-router-dom';
import { handlers } from '../../mocks/handlers';
import { SignIn } from './SignIn';
import { createMemoryHistory } from 'history';
import { ProvideAuth } from '../../hooks/use-auth';
import { wait } from '@testing-library/user-event/dist/utils';

describe('SignIn Screen', () => {
    const history = createMemoryHistory();

    const renderWithRouter = () => render(<Router location={history.location} navigator={history}><SignIn /></Router>);
    it('render a form', () => {
        renderWithRouter();
        expect(screen.getByTestId('sign-in')).toBeInstanceOf(HTMLFormElement);
    })

    describe('email field', () => {
        it('render the email field as a text input', () => {
            renderWithRouter();
            const form = screen.getByTestId('sign-in');
            const email = form.elements.email;
            expect(email).toBeInstanceOf(HTMLInputElement);
            expect(email.type).toBe('text');
        })

        it('show 1 error message for email field when submited with empty email', () => {
            renderWithRouter();
            fireEvent.click(screen.getByTestId('btn-submit'));
            expect(screen.getByText('Email is required')).not.toBeNull();
        })
    })

    it('render the password field as a password input', () => {
        renderWithRouter();
        const form = screen.getByTestId('sign-in');
        const password = form.elements.password;

        expect(password).toBeInstanceOf(HTMLInputElement);
        expect(password.type).toBe('password');
    })

    it('show 1 error message for password field when submited with empty password', () => {
        renderWithRouter();
        fireEvent.click(screen.getByTestId('btn-submit'));

        expect(screen.getByText('Password is required')).not.toBeNull();
    })

    describe('server response sign in request', () => {
        const server = setupServer(
            ...handlers
        )
        const history = createMemoryHistory();
        const renderWithRouter = () => render(
            <ProvideAuth>
                <Router location={history.location} navigator={history}><SignIn /></Router>
            </ProvideAuth>);

        beforeAll(() => server.listen())

        afterEach(() => server.restoreHandlers())

        afterAll(() => server.close())

        it('show 1 error message when submited with incorrect uername and password', async () => {
            renderWithRouter();
            const form = screen.getByTestId('sign-in').elements;
            fireEvent.change(form.email, { target: { value: "random@gmail.com" } });
            fireEvent.change(form.password, { target: { value: "123" } });
            fireEvent.click(screen.getByTestId('btn-submit'));
            await screen.findByText('Invalid user name or password', { exact: false, }, { timeout: 2000 });
        })

        it('save auth token in localstorage when sign in was success', async () => {
            renderWithRouter();

            // mock localStorage
            const localStorageMock = (function () {
                let store = {}

                return {
                    getItem: function (key) {
                        return store[key] || null
                    },
                    setItem: function (key, value) {
                        store[key] = value.toString()
                    },
                    removeItem: function (key) {
                        delete store[key]
                    },
                    clear: function () {
                        store = {}
                    }
                }
            })()

            Object.defineProperty(window, 'localStorage', {
                value: localStorageMock,
                writable: true,
            })

            expect(window.localStorage.getItem('TOKEN_BEARER')).toBeNull();

            const form = screen.getByTestId('sign-in').elements;
            fireEvent.change(form.email, { target: { value: "test@gmail.com" } });
            fireEvent.change(form.password, { target: { value: "User@123" } });
            fireEvent.click(screen.getByTestId('btn-submit'));
            await waitFor(() =>  expect(window.localStorage.getItem('TOKEN_BEARER')).not.toBeNull(), {timeout: 2000});
            const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1QTRDM0EzNTAyQzdBRTNGQjIzQTVGNkI3NjNGNjg2IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NTk2Mzk5NDYsImV4cCI6MTY5MTE3NTk0NiwiaXNzIjoiaHR0cHM6Ly90ZXN0LXBsYWNlLnZpbWFwLnZuIiwiYXVkIjoiUGxhY2VBcHAiLCJjbGllbnRfaWQiOiJQbGFjZUFwcF9BcHAiLCJzdWIiOiI1Yzg3MGJjMC03YmMwLTk3YWItNjYxYy0zYTA1NmE1N2IxNTkiLCJhdXRoX3RpbWUiOjE2NTk2Mzk5NDUsImlkcCI6ImxvY2FsIiwicm9sZSI6ImFkbWluIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJlbWFpbCI6ImFkbWluQGFicC5pbyIsImVtYWlsX3ZlcmlmaWVkIjoiRmFsc2UiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTk2Mzk5NDYsInNjb3BlIjpbIlBsYWNlQXBwIl0sImFtciI6WyJwd2QiXX0.Rsu_qX8RWamIrWp6--KIxQzsrK8A-ihL5B5Mu0VCld_5AiwA8g853kDXjUhqzxKbVVZTty54MrBNtKEunYtvnjELBA1KFRdzNycmxlCsxyzPkpXSY-9QNza5zaWWbDE9WQTeZ2Aj7G0IxuFQNfcRypcVRt5-XkDDzh2YQLIfIXUZ2zlso-OWX90xSsoZaz9-gTtsokw3UQaRXiTWG0pWA_fmQCkL0qlEzrsiWVyjJsduMnee06X1-PBpCoQrsME2OxWujqXTB7kkj4U-yCWlzEa8IyOzJ7y6MYwA2ezzqo34Y5jc08W5ksHhvhcBaEz6jg-xRKLa-_bjH5c1e_YiwA"
            expect(window.localStorage.getItem('TOKEN_BEARER')).toEqual(token);
        })
    })
})