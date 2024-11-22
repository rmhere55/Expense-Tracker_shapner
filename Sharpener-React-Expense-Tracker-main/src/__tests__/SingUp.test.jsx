import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import SingUp from '../Pages/Auth/SingUp';
import store from '../Store/store';

test('renders head line', () => {
    // Arrange
    render(
        <Provider store={store}>
            <BrowserRouter>
                <SingUp />
            </BrowserRouter>
        </Provider>
    );
    // Act...
    // Assert
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
});
test('renders email input field', () => {
    // Arrange
    render(
        <Provider store={store}>
            <BrowserRouter>
                <SingUp />
            </BrowserRouter>
        </Provider>
    );
    // Act...
    // Assert
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
});

test('renders password input field', () => {
    // Arrange
    render(
        <Provider store={store}>
            <BrowserRouter>
                <SingUp />
            </BrowserRouter>
        </Provider>
    );
    // Act...
    // Assert
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
});

test('renders confirm password input field', () => {
    // Arrange
    render(
        <Provider store={store}>
            <BrowserRouter>
                <SingUp />
            </BrowserRouter>
        </Provider>
    );
    // Act...
    // Assert
    expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
});

test('renders Sign Up button', () => {
    // Arrange
    render(
        <Provider store={store}>
            <BrowserRouter>
                <SingUp />
            </BrowserRouter>
        </Provider>
    );

    // Act...
    // Assert
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
});
