'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CallbackPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const provider = searchParams.get('provider') || 'google'; // Default to google
        
        if (!code) {
          setError('No authorization code received');
          setLoading(false);
          return;
        }

        // Determine the callback URL based on the current path or provider
        const currentPath = window.location.pathname;
        let callbackUrl = '';
        
        if (currentPath.includes('google') || provider === 'google') {
          callbackUrl = `http://localhost:8080/auth/callback/google?code=${code}&state=${state}`;
        } else if (currentPath.includes('github') || provider === 'github') {
          callbackUrl = `http://localhost:8080/auth/callback/github?code=${code}&state=${state}`;
        } else {
          // Try to determine from referrer or default to google
          callbackUrl = `http://localhost:8080/auth/callback/google?code=${code}&state=${state}`;
        }

        const response = await fetch(callbackUrl, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
          // Store token and user data
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          
          // Redirect to home page
          router.push('/');
        } else {
          setError(data.error || 'Authentication failed');
          setLoading(false);
        }
      } catch (err) {
        console.error('Callback error:', err);
        setError('Network error during authentication');
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Completing authentication...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-red-400 mb-2">Authentication Error</h2>
            <p className="text-red-300">{error}</p>
          </div>
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-500 transition-all"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return null;
}