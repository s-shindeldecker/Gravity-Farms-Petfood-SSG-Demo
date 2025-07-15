import { generatePermutations, getPrecomputed } from 'flags/next';
import { flags } from '@/lib/flags';

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
  return (
    <>
      {children}
    </>
  );
} 