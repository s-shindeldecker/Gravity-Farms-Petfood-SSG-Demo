'use client';

import { useState, useEffect } from 'react';
import { LaunchDarklyDebug } from './LaunchDarklyDebug';

interface DebugPanelProps {
  code: string;
  heroBanner: any;
  trialDays: number;
  showTrialButton: boolean;
  seasonalBanner: string;
}

export const DebugPanel = ({ 
  code, 
  heroBanner, 
  trialDays, 
  showTrialButton, 
  seasonalBanner 
}: DebugPanelProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Cmd+D (Mac) or Ctrl+D (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key === 'd') {
        event.preventDefault(); // Prevent default browser behavior
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Debug Information</h2>
            <div className="text-sm text-gray-500">
              Press <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">⌘+D</kbd> to hide
            </div>
          </div>
          
          {/* LaunchDarkly Debug Component */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">LaunchDarkly Real-time Status</h3>
            <LaunchDarklyDebug />
          </div>
          
          <div className="space-y-4">
            <div>
              <strong>Current URL Code:</strong> {code}
            </div>
            <div>
              <strong>Hero Banner Configuration:</strong>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">
                {JSON.stringify(heroBanner, null, 2)}
              </pre>
            </div>
            <div>
              <strong>Trial Days:</strong> {trialDays} days
            </div>
            <div>
              <strong>Show Trial Button:</strong> {showTrialButton ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Seasonal Banner:</strong> {seasonalBanner || 'No banner'}
            </div>
          </div>
          <div className="mt-8 p-4 bg-blue-50 rounded">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This page demonstrates hybrid SSG + LaunchDarkly integration. 
              The hero section above responds to both SSG flag values (from URL) and real-time LaunchDarkly flags.
              LaunchDarkly flags take precedence over SSG values when available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 