import React, { useState, useContext, createContext, useEffect } from "react";
import { signInByEmailAndPasswordApi, signOutApi, signUpApi } from "../api/api";

const unAuthenticatedUser = {
    authenticated: false,
    userName: '',
    roles: [],
    token: '',
    id: ''
};

const authContext = createContext({
    user: unAuthenticatedUser,
    signIn: async ({ userNameOrEmailAddress, password, rememberMe }) => ({data: null,  error: null}),
    signOut: () => { },
});

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(unAuthenticatedUser);

    useEffect(() => {
        const user = getUserFormToken();
        if (user !== null) {
            setUser(user);
        }
    }, []);

    const signIn = async ({ userNameOrEmailAddress, password, rememberMe = true }) => {
        const { data, error } = await signInByEmailAndPasswordApi({ userNameOrEmailAddress, password, rememberMe });
        if (data?.result === 1) {
            saveToken(data.token);
            const user = getUserFormToken();
            setUser(user);
            return { data };
        } else if (data?.result === 2) {
            return {
                data,
                error: {
                    message: 'Invalid user name or password'
                },
            }
        }
    };

    const signOut = () => {
        clearToken();
        setUser(unAuthenticatedUser);
    };

    const sendPasswordResetEmail = (email) => {
        throw Error('not implement')
    };

    const confirmPasswordReset = (code, password) => {
        throw Error('not implement')
    };

    // Return the user object and auth methods
    return {
        user,
        signIn,
        signOut,
        sendPasswordResetEmail,
        confirmPasswordReset,
    };
}

function saveToken(token) {
    token && localStorage.setItem('TOKEN_BEARER', token);
}

function getToken() {
    return localStorage.getItem('TOKEN_BEARER') ?? null;
}

function clearToken() {
    localStorage.removeItem('TOKEN_BEARER');
}

function getUserFormToken() {
    const token = getToken();
    if (token === null) {
        return null;
    }
    const { exp, name, role, sub } = parseJwt(token);
    return {
        ...unAuthenticatedUser,
        authenticated: true,
        userName: name,
        roles: [role],
        token,
        id: sub,
        exp,
    }
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};