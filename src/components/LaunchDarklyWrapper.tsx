'use client';

import { LDProvider, useLDClient } from 'launchdarkly-react-client-sdk';
import { useEffect, useState, useRef } from 'react';
import { useUser } from '@/context/UserContext';

interface LaunchDarklyWrapperProps {
  children: React.ReactNode;
}

// Separate component to handle context updates - must be used after UserProvider
export const LaunchDarklyContextUpdater = () => {
  const { user } = useUser();
  const client = useLDClient();
  const lastUserKey = useRef<string>('');

  useEffect(() => {
    console.log('[LaunchDarkly ContextUpdater] Client available:', !!client);
    console.log('[LaunchDarkly ContextUpdater] User:', user);
    
    if (!client || !user) return;
    
    // Only update if the user key has actually changed
    if (lastUserKey.current === user.key) return;
    
    if (user.anonymous) {
      // Handle anonymous user
      const anonymousContext = {
        kind: 'user' as const,
        key: user.key,
        custom: {
          sessionId: Math.random().toString(36).substr(2, 9),
          timestamp: Date.now(),
          anonymous: true,
        }
      };
      
      console.log('[LaunchDarkly ContextUpdater] Setting anonymous context:', anonymousContext);
      client.identify(anonymousContext);
    } else {
      // Handle logged-in user with persona attributes
      const context = {
        kind: 'user' as const,
        key: user.key,
        name: user.name,
        // User attributes at top level (not nested under custom)
        petType: user.petType,
        country: user.country,
        state: user.state,
        planType: user.planType,
        paymentType: user.paymentType,
        // Add custom fields for additional data
        custom: {
          loginTime: Date.now(),
          anonymous: false,
        }
      };
      
      console.log('[LaunchDarkly ContextUpdater] Setting user context:', context);
      client.identify(context);
    }
    
    lastUserKey.current = user.key;
  }, [client, user]);

  return null;
};

export const LaunchDarklyWrapper: React.FC<LaunchDarklyWrapperProps> = ({ children }) => {
  // Get the client-side ID from environment variables
  const clientSideId = process.env.NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_KEY;
  const [context, setContext] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  
  console.log('[LaunchDarkly Wrapper] Client Side ID:', clientSideId);
  console.log('[LaunchDarkly Wrapper] Environment check:', {
    hasClientSideId: !!clientSideId,
    clientSideIdLength: clientSideId?.length,
    clientSideIdPrefix: clientSideId?.substring(0, 10),
  });
  
  useEffect(() => {
    setIsClient(true);
    
    // Generate a unique user key for each page load to simulate new users
    const generateUserKey = () => {
      // Always generate a new unique key (no localStorage persistence)
      const newKey = `user_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
      return newKey;
    };
    
    // Create initial context
    const initialContext = {
      kind: 'user' as const,
      key: generateUserKey(),
      custom: {
        sessionId: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
      }
    };
    
    setContext(initialContext);
    
    console.log('[LaunchDarkly Wrapper] Generated initial context:', initialContext);
  }, []);
  
  if (!clientSideId) {
    console.warn('NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_KEY is not set. LaunchDarkly will not be initialized.');
    return <>{children}</>;
  }

  // Don't render LaunchDarkly until we're on the client to avoid hydration mismatches
  if (!isClient || !context) {
    console.log('[LaunchDarkly Wrapper] Waiting for client or context...');
    return <>{children}</>;
  }

  console.log('[LaunchDarkly Wrapper] Initializing with context:', context);

  try {
    return (
      <LDProvider 
        clientSideID={clientSideId}
        context={context}
      >
        {children}
      </LDProvider>
    );
  } catch (error) {
    console.error('[LaunchDarkly Wrapper] Error initializing LDProvider:', error);
    return <>{children}</>;
  }
}; 