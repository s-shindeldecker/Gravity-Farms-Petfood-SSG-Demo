import { getPrecomputed } from 'flags/next';
import { flags } from '@/lib/flags';
import { HeroSection } from '@/components/HeroSection';
import { LaunchDarklyDebug } from '@/components/LaunchDarklyDebug';

export default async function HomePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  console.log('[DEBUG] Page render - code:', code);

  try {
    // Decode the precomputed flag values
    const flagValues = await getPrecomputed(flags, flags, code) as any[];
    
    console.log('[DEBUG] Flag values:', flagValues);
    
    // Extract values based on the order in the flags array
    // flags[0] = hero-banner-text, flags[1] = number-of-days-trial, etc.
    const heroBanner = flagValues[0];
    const trialDays = flagValues[1];
    const seasonalBanner = flagValues[2];
    const showTrialButton = flagValues[3];

    console.log('[DEBUG] Extracted values:', {
      heroBanner,
      trialDays,
      showTrialButton,
      seasonalBanner
    });

    return (
      <div className="min-h-screen bg-gray-50">
        <HeroSection />
        {/* Debug Information Panel */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Debug Information</h2>
              
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
      </div>
    );
  } catch (error) {
    console.error('[DEBUG] Error in page:', error);
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-2xl font-bold text-red-600">Error Loading Page</h1>
        <pre className="mt-4 p-4 bg-red-100 rounded text-sm">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </div>
    );
  }
} 