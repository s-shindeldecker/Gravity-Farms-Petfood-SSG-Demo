'use client';

import { useFlags } from 'launchdarkly-react-client-sdk';
import { useUser } from '@/context/UserContext';

export const LaunchDarklyDebug = () => {
  const flags = useFlags();
  const { user } = useUser();

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg max-w-md z-50">
      <h3 className="font-bold mb-2">LaunchDarkly Debug</h3>
      <div className="text-xs space-y-1">
        <div><strong>User Key:</strong> {user?.key || 'Anonymous'}</div>
        <div><strong>Build Time:</strong> {process.env.NEXT_PUBLIC_BUILD_TIME || 'Unknown'}</div>
        <div><strong>Deploy ID:</strong> {process.env.NEXT_PUBLIC_VERCEL_DEPLOY_ID || 'Unknown'}</div>
        <div><strong>Flags Loaded:</strong> {Object.keys(flags).length}</div>
        <div className="mt-2">
          <strong>Flag Values:</strong>
          <pre className="text-xs mt-1 overflow-auto max-h-32">
            {JSON.stringify(flags, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}; 