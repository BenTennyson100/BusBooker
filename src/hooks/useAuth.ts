import { useState, useEffect } from 'react';
import { User, AuthState } from '../types/auth';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('busBooker_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        localStorage.removeItem('busBooker_user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, this would be an API call
      if (email && password.length >= 6) {
        const user: User = {
          id: Date.now().toString(),
          name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          email,
          phone: '+91 9876543210'
        };
        
        localStorage.setItem('busBooker_user', JSON.stringify(user));
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
        
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (name: string, email: string, phone: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration - in real app, this would be an API call
      if (name && email && phone && password.length >= 6) {
        const user: User = {
          id: Date.now().toString(),
          name,
          email,
          phone
        };
        
        localStorage.setItem('busBooker_user', JSON.stringify(user));
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
        
        return { success: true };
      } else {
        return { success: false, error: 'Please fill all fields correctly' };
      }
    } catch (error) {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('busBooker_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  return {
    ...authState,
    login,
    register,
    logout
  };
};