'use client';

import { useState, useEffect } from 'react';
import { LDProvider } from 'launchdarkly-react-client-sdk';

interface BootstrapData {
  user: {
    key: string;
    anonymous: boolean;
    name?: string;
    country?: string;
    state?: string;
    petType?: string;
    planType?: string;
    paymentType?: string;
  };
  values: Record<string, any>;
}

interface BootstrappedLDProviderProps {
  children: React.ReactNode;
}

export const BootstrappedLDProvider = ({ children }: BootstrappedLDProviderProps) => {
  const [bootstrapData, setBootstrapData] = useState<BootstrapData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBootstrapData = async () => {
      try {
        console.log('[BootstrappedLDProvider] Fetching bootstrap data...');
        
        const response = await fetch('/api/launchdarkly-bootstrap');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: BootstrapData = await response.json();
        
        console.log('[BootstrappedLDProvider] Bootstrap data received:', {
          user: data.user,
          flagCount: Object.keys(data.values).length,
        });
        
        setBootstrapData(data);
      } catch (err) {
        console.error('[BootstrappedLDProvider] Error fetching bootstrap data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load LaunchDarkly data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBootstrapData();
  }, []);

  // Show loading spinner while fetching data
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A994E] mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontSize: '1.125rem' }}>
            Loading Gravity Farms...
          </p>
        </div>
      </div>
    );
  }

  // Show error state if bootstrap failed
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 mb-4" style={{ fontSize: '3rem' }}>⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4" style={{ fontSize: '1rem' }}>
            Unable to load LaunchDarkly configuration. Please refresh the page.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#6A994E] text-white px-4 py-2 rounded hover:bg-[#5A8A3E] transition-colors"
            style={{ fontSize: '1rem' }}
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  // If no bootstrap data, show fallback
  if (!bootstrapData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600" style={{ fontSize: '1.125rem' }}>
            No LaunchDarkly data available
          </p>
        </div>
      </div>
    );
  }

  const clientSideId = process.env.NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_KEY;
  
  if (!clientSideId) {
    console.warn('[BootstrappedLDProvider] NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_KEY is not set');
    return <>{children}</>;
  }

  // Create user context for LaunchDarkly from bootstrap data
  const user = {
    key: bootstrapData.user.key,
    anonymous: bootstrapData.user.anonymous,
    ...(bootstrapData.user.name && { name: bootstrapData.user.name }),
    ...(bootstrapData.user.country && { country: bootstrapData.user.country }),
    ...(bootstrapData.user.state && { state: bootstrapData.user.state }),
    ...(bootstrapData.user.petType && { petType: bootstrapData.user.petType }),
    ...(bootstrapData.user.planType && { planType: bootstrapData.user.planType }),
    ...(bootstrapData.user.paymentType && { paymentType: bootstrapData.user.paymentType }),
  };

  console.log('[BootstrappedLDProvider] Initializing LDProvider with:', {
    user,
    bootstrapFlagCount: Object.keys(bootstrapData.values).length,
    personaInfo: bootstrapData.user.anonymous ? 'anonymous' : `${bootstrapData.user.name} (${bootstrapData.user.petType})`,
    clientSideId: clientSideId?.substring(0, 10) + '...',
    environment: process.env.NODE_ENV
  });

  return (
    <LDProvider
      clientSideID={clientSideId}
      context={user}
      timeout={5}
    >
      {children}
    </LDProvider>
  );
}; 