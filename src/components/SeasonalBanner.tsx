'use client';

import { useSeasonalBannerText } from '@/hooks/useLaunchDarklyFlag';

export const SeasonalBanner = () => {
  const { value: bannerText, isLoading } = useSeasonalBannerText();

  // Don't render anything if there's no banner text or if still loading
  if (isLoading || !bannerText || bannerText.trim() === '') {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-r from-[#FFD166] to-[#6A994E] text-white text-center py-3 px-4 font-semibold text-sm relative z-50 shadow-md cursor-pointer transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-[#FFC233] hover:to-[#5A8A3E] hover:-translate-y-px hover:shadow-lg active:translate-y-0 active:shadow-md">
      <div className="centered-container">
        <span className="inline-block max-w-[1200px] mx-auto">
          {bannerText}
        </span>
      </div>
    </div>
  );
}; 