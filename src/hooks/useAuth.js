import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    return { ...ctx }
}