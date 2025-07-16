'use client';

import { Header } from './Header';
import { Footer } from './Footer';
import { SeasonalBanner } from './SeasonalBanner';

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <>
      <SeasonalBanner />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}; 