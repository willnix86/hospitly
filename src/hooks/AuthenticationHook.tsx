'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

import { AuthContextType, AuthProviderProps, User } from '@/types';

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a custom hook for accessing the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Create the AuthProvider component with correct typing
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);  // User can be null initially
  const [loading, setLoading] = useState<boolean>(true);  // Loading state

  // Simulate fetching user data (replace this with your actual logic)
  useEffect(() => {
    const fetchUser = async () => {
      const testUser: User = { 
        id: 172!,
        name: "Muir",
        position: {
          id: 2,
          name: "PGY2"
        },
        department: {
          id: 16,
          name: "Plastics"
        },
        isEditor: true,
      }
      // TODO: Remove test user
      setUser(testUser);
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};