'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/AuthenticationHook';
import SchedulingContent from './SchedulingContent';

export default function Scheduling() {
  const { user, loading } = useAuth(); // Using a custom hook to access the authentication context
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login if the user is not logged in
      router.push('/login');
    }
  }, [user, loading]);

  if (loading) {
    return <p>Loading...</p>; // Optional: Add a loading spinner here
  }

  return user ? <SchedulingContent user={user} /> : null; // Render the page only if the user is authenticated
}