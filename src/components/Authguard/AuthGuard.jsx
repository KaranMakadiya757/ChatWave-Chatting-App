import React from 'react';
import { Navigate } from 'react-router-dom';

export function AuthGuard({ children }) {
    let auth = undefined;
    (sessionStorage.getItem('QBtoken') === null) ? auth = false : auth = true;
    if (auth) {
        return children;
    } else {
        return <Navigate to="/login" />
    }
}

export function LoginAuth({ children }) {
    let auth = undefined;
    (sessionStorage.getItem('QBtoken') === null) ? auth = false : auth = true;
    if (!auth) {
        return children;
    } else {
        return <Navigate to="/home" />
    }
}