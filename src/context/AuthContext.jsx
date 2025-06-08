import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', {
                email,
                password
            });
            const { token } = response.data;
            localStorage.setItem('token', token);
            setUser({ token, email });
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const register = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:4000/api/auth/register', {
                email,
                password
            });
            const { token } = response.data;
            localStorage.setItem('token', token);
            setUser({ token, email });
            return true;
        } catch (error) {
            console.error('Registration error:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
