'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useHeroBannerText, useTrialDays, useShowTrialButton } from '@/hooks/useLaunchDarklyFlag';

const DEFAULT_BANNER = {
  'banner-text': 'Fresh, healthy meals delivered',
  'banner-text-color': '#FFFFFF',
  'sub-banner-text': "Start your pup's journey to better health with our free trial",
  'sub-banner-text-color': '#FFFFFF',
  'horiz-justification': 'center',
  'vert-justification': 'top',
  'image-file': 'hero-control.jpeg',
};

export const HeroSection = () => {
  const { value: showTrialButton, isLoading: isButtonLoading } = useShowTrialButton();
  const { value: bannerConfig = DEFAULT_BANNER } = useHeroBannerText();
  const { value: trialDays = 7, isLoading: isTrialDaysLoading } = useTrialDays();
  const [showModal, setShowModal] = useState(false);

  const imageFile = bannerConfig['image-file'] || DEFAULT_BANNER['image-file'];
  const isFlagValid = imageFile && typeof imageFile === 'string' && imageFile.trim() !== '';

  // Defensive: fallback to defaults if any field is missing
  const bannerText = bannerConfig['banner-text'] || DEFAULT_BANNER['banner-text'];
  const bannerTextColor = bannerConfig['banner-text-color'] || DEFAULT_BANNER['banner-text-color'];
  const subBannerText = bannerConfig['sub-banner-text'] || DEFAULT_BANNER['sub-banner-text'];
  const subBannerTextColor = bannerConfig['sub-banner-text-color'] || DEFAULT_BANNER['sub-banner-text-color'];
  const horiz = bannerConfig['horiz-justification'] || DEFAULT_BANNER['horiz-justification'];
  const vert = bannerConfig['vert-justification'] || DEFAULT_BANNER['vert-justification'];

  // Create dynamic trial text
  const trialButtonText = `Try ${trialDays} Days Free`;
  const trialModalText = `Get ${trialDays} days of fresh, customized meals for your dog.`;

  // Position classes based on justification
  const getPositionClasses = () => {
    const horizClasses = {
      'left': 'text-left',
      'center': 'text-center',
      'right': 'text-right'
    };
    
    const vertClasses = {
      'top': 'top-[15%]',
      'center': 'top-[40%]',
      'bottom': 'bottom-[15%]'
    };
    
    return `${horizClasses[horiz as keyof typeof horizClasses] || 'text-center'} ${vertClasses[vert as keyof typeof vertClasses] || 'top-[15%]'}`;
  };

  return (
    <div className="w-full min-h-[700px] relative overflow-hidden flex items-stretch justify-center md:min-h-[550px] sm:min-h-[400px]">
      {isFlagValid ? (
        <Image
          src={`/images/${imageFile}`}
          alt="Pet food subscription"
          fill
          className="object-cover object-center-[30%] absolute top-0 left-0 z-10"
        />
      ) : (
        <div className="absolute top-0 left-0 w-full bg-[#ff9800] text-[#222] p-2 z-30 font-bold">
          LaunchDarkly flag not set or not working. No hero image to display.
        </div>
      )}
      
      <div className={`absolute left-1/2 transform -translate-x-1/2 z-20 text-white w-full ${getPositionClasses()}`}>
        <div 
          className="inline-block p-12 px-16 rounded-xl shadow-2xl max-w-[1000px] mx-auto border border-white/30"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)'
          }}
        >
          <h1 
            className="font-bold mb-6 leading-tight"
            style={{ 
              fontSize: '4.5rem', 
              lineHeight: '1.1',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}
          >
            {bannerText}
          </h1>
          <p 
            className="leading-relaxed"
            style={{ 
              fontSize: '1.5rem', 
              lineHeight: '1.6',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            {subBannerText}
          </p>
        </div>
      </div>
      
      {(!isButtonLoading && !isTrialDaysLoading && showTrialButton) && (
        <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 z-20 w-full flex justify-center">
          <button 
            onClick={() => setShowModal(true)}
            className="px-12 py-6 bg-[#FFD166] text-[#35524A] border-none rounded-xl font-bold cursor-pointer transition-all duration-300 hover:bg-[#D7263D] hover:text-white hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ fontSize: '1.875rem' }}
          >
            {trialButtonText}
          </button>
        </div>
      )}
      
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]" onClick={() => setShowModal(false)}>
          <div className="bg-white p-10 rounded-xl max-w-[600px] w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="font-bold mb-8 text-[#35524A]" style={{ fontSize: '2.25rem' }}>Start Your Free Trial Today!</h2>
            <p className="mb-8 text-[#555]" style={{ fontSize: '1.25rem' }}>{trialModalText}</p>
            <form className="trial-form" onSubmit={e => {e.preventDefault(); setShowModal(false); alert('Thank you for your interest! This is a demo site.');}}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required 
                className="w-full p-5 mb-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#35524A] focus:border-transparent"
                style={{ fontSize: '1.125rem' }}
              />
              <button type="submit" className="cta-button w-full py-5" style={{ fontSize: '1.125rem' }}>Get Started</button>
            </form>
            <p className="text-gray-600 mt-8" style={{ fontSize: '1rem' }}>No commitment required. Cancel anytime.</p>
            <button onClick={() => setShowModal(false)} className="mt-8 px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200" style={{ fontSize: '1.125rem' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}; 