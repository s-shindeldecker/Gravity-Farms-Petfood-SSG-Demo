import { generatePermutations, getPrecomputed } from 'flags/next';
import { flags } from '@/lib/flags';
import { UserProvider } from '@/context/UserContext';
import { AppContent } from '@/components/AppContent';
import { LaunchDarklyWrapper, LaunchDarklyContextUpdater } from '@/components/LaunchDarklyWrapper';

export async function generateStaticParams() {
  const codes = await generatePermutations(flags);
  return codes.map((code) => ({ code }));
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  
  // Decode the precomputed flag values
  const flagValues = await getPrecomputed(flags, flags, code) as any[];
  const seasonalBannerText = flagValues[2]; // seasonal-sale-banner-text is the 3rd flag

  return (
    <LaunchDarklyWrapper>
      <UserProvider>
        <LaunchDarklyContextUpdater />
        <AppContent seasonalBannerText={seasonalBannerText}>
          {children}
        </AppContent>
      </UserProvider>
    </LaunchDarklyWrapper>
  );
} 