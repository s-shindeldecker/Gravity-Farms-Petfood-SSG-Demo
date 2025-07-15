import { useLDClient } from 'launchdarkly-react-client-sdk';

export const useLaunchDarklyContextUpdater = () => {
  const client = useLDClient();

  const updateContext = (newContext: any) => {
    if (client) {
      console.log('[LaunchDarkly] Updating context:', newContext);
      client.identify(newContext);
    }
  };

  const updateUserContext = (userProfile: any) => {
    if (client && userProfile) {
      const context = {
        kind: 'user',
        key: userProfile.key, // Use the stable user key from the profile
        email: userProfile.email,
        name: userProfile.name,
        custom: {
          country: userProfile.country,
          state: userProfile.state,
          petType: userProfile.petType,
          planType: userProfile.planType,
          paymentType: userProfile.paymentType,
          loginTime: Date.now(),
        }
      };
      
      console.log('[LaunchDarkly] Updating user context:', context);
      client.identify(context);
    }
  };

  const resetToAnonymous = () => {
    if (client) {
      // Get the existing anonymous key from localStorage
      const storedKey = localStorage.getItem('ld_user_key');
      const anonymousKey = storedKey || `anonymous_${Math.random().toString(36).substr(2, 9)}`;
      
      const anonymousContext = {
        kind: 'user',
        key: anonymousKey,
        custom: {
          sessionId: Math.random().toString(36).substr(2, 9),
          timestamp: Date.now(),
        }
      };
      
      console.log('[LaunchDarkly] Resetting to anonymous:', anonymousContext);
      client.identify(anonymousContext);
    }
  };

  return {
    client,
    updateContext,
    updateUserContext,
    resetToAnonymous,
  };
}; 