'use client';

import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import { useUser } from '@/context/UserContext';
import { useEffect, useState } from 'react';

export const LaunchDarklyDebug = () => {
  const flags = useFlags();
  const client = useLDClient();
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);
  const [clientStatus, setClientStatus] = useState<string>('Unknown');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (client) {
      console.log('[LaunchDarklyDebug] Client available:', client);
      
      // Check client status
      client.on('ready', () => {
        console.log('[LaunchDarklyDebug] Client ready - flags should be available');
        setClientStatus('Ready');
      });
      
      client.on('error', (error) => {
        console.error('[LaunchDarklyDebug] Client error:', error);
        setClientStatus('Error');
      });
      
      client.on('change', (changes) => {
        console.log('[LaunchDarklyDebug] Client changes:', changes);
      });
      
      // Log initial flags
      console.log('[LaunchDarklyDebug] Initial flags:', flags);
      console.log('[LaunchDarklyDebug] Flag count:', Object.keys(flags).length);
    } else {
      console.log('[LaunchDarklyDebug] No client available yet');
    }
  }, [client, flags]);

  // Don't render until we're on the client to avoid hydration mismatches
  if (!isClient) {
    return (
      <div className="centered-container py-8">
        <div className="card">
          <h2 className="text-2xl font-bold text-[#35524A] mb-4">LaunchDarkly Debug Info</h2>
          <p className="text-[#555]">Loading debug information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="centered-container py-8">
      <div className="card">
        <h2 className="text-2xl font-bold text-[#35524A] mb-4">LaunchDarkly Debug Info</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-[#35524A] mb-2">Client Status</h3>
            <div className="bg-[#f5f5f5] p-4 rounded-lg">
              <p className="text-sm text-[#555]">
                Status: {clientStatus}
              </p>
              <p className="text-sm text-[#555]">
                Client Available: {client ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-[#35524A] mb-2">Current User</h3>
            <div className="bg-[#f5f5f5] p-4 rounded-lg">
              <pre className="text-sm text-[#555] whitespace-pre-wrap">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-bold text-[#35524A] mb-2">Feature Flags ({Object.keys(flags).length})</h3>
          <div className="bg-[#f5f5f5] p-4 rounded-lg">
            <p className="text-sm text-[#555] mb-2">Available flag keys:</p>
            <div className="text-sm text-[#555] mb-4">
              {Object.keys(flags).length > 0 ? Object.keys(flags).join(', ') : 'No flags loaded'}
            </div>
            <p className="text-sm text-[#555] mb-2">Expected flag keys (camelCase):</p>
            <div className="text-sm text-[#555] mb-4">
              heroBannerText, numberOfDaysTrial, seasonalSaleBannerText, showTrialButton
            </div>
            <pre className="text-sm text-[#555] whitespace-pre-wrap">
              {JSON.stringify(flags, null, 2)}
            </pre>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-bold text-[#35524A] mb-2">Flag Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(flags).map(([key, value]) => (
              <div key={key} className="bg-[#F6E7CB] p-3 rounded-lg border border-[#35524A]">
                <div className="font-medium text-[#35524A] text-sm">{key}</div>
                <div className="text-[#555] text-sm mt-1">
                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 