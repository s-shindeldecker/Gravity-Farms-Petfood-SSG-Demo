import { getPrecomputed } from 'flags/next';
import { flags } from '@/lib/flags';
import { AppContent } from '@/components/AppContent';
import { LaunchDarklyDebug } from '@/components/LaunchDarklyDebug';
import { DebugPanel } from '@/components/DebugPanel';

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
      <>
        <AppContent seasonalBannerText={seasonalBanner || "The raccoon told us not to share this. Click anyway."} />
        
        {/* Debug Information Panel - Hidden by default, toggle with Cmd+D */}
        <DebugPanel 
          code={code}
          heroBanner={heroBanner}
          trialDays={trialDays}
          showTrialButton={showTrialButton}
          seasonalBanner={seasonalBanner}
        />
      </>
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