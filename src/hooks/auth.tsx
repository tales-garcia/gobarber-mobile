import React, { useCallback, useContext, useEffect, useState } from 'react';
import { createContext } from "react";
import storage from '@react-native-community/async-storage';
import api from '../services/api';

interface IUser {
    _id: string;
    name: string;
    avatarUrl: string;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthState {
    token: string;
    user: IUser;
}

interface AuthContextData {
    user: IUser;
    loading: boolean;
    updateUser(user: Partial<IUser>): void;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth() {
    const authContext = useContext(AuthContext);

    if (!authContext) throw new Error('useAuth must be used within an AuthProvider');

    return authContext;
}

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const [[, user], [, token]] = await storage.multiGet(['user', 'token']);

            if (user && token) {
                const parsedUser = JSON.parse(user) as IUser;

                api.defaults.headers.authorization = `Bearer ${token}`;
    
                setData({ user: parsedUser, token });
            }

            setLoading(false);
        })();
    }, []);

    const updateUser = useCallback(async (user: Partial<IUser>) => {

        await storage.multiSet([['token', data.token], ['user', JSON.stringify({
            ...data.user,
            ...user
        })]]);

        setData(previousState => ({
            token: previousState.token,
            user: {
                ...previousState.user,
                ...user
            }
        }));
    }, [setData, data]);

    const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
        const res = await api.post('sessions', {
            email,
            password
        });

        const { user, token } = res.data;

        api.defaults.headers.authorization = `Bearer ${token}`;

        await storage.multiSet([['token', token], ['user', JSON.stringify(user)]]);

        setData({ user, token });
    }, []);

    const signOut = useCallback(async () => {
        await storage.multiRemove(['token', 'user']);

        api.defaults.headers.authorization = undefined;

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, updateUser, signIn, signOut, loading }}>
            { children}
        </AuthContext.Provider>
    );
}