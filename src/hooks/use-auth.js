import React, { useState, useContext, createContext } from "react";
import { signInByEmailAndPasswordApi, signOutApi, signUpApi } from "../api/api";

const unAuthenticatedUser = {
    authenticated: false,
    userName: '',
    token: '',
};

const authContext = createContext({
    user: unAuthenticatedUser,
    signIn: () => { },
    signUp: () => { },
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
    const [user, setUser] = useState(null);
    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signIn = async ({ userNameOrEmailAddress, password, rememberMe = true }) => {
        setUser({ ...user, authenticated: true })
        return;
        const response = await signInByEmailAndPasswordApi({ userNameOrEmailAddress, password, rememberMe });
        console.log(response);
        setUser(response.user);
        return response.user;
    };

    const signUp = async ({ userName, email, password }) => {
        const response = await signUpApi({ userName, email, password });
        setUser(response.user);
        return response.user;
    };

    const signOut = () => {
        signOutApi();
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
        signUp,
        signOut,
        sendPasswordResetEmail,
        confirmPasswordReset,
    };
}