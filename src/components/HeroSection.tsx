'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useHeroBannerText, useTrialDays, useShowTrialButton } from '@/hooks/useLaunchDarklyFlag';
import { useLDClient } from 'launchdarkly-react-client-sdk';

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
  const [email, setEmail] = useState('');
  const client = useLDClient();

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

  const handleTrialButtonClick = () => {
    // Track trial button click
    if (client) {
      client.track('trial_button_click', {
        trial_days: trialDays
      });
      console.log('[HeroSection] Tracked trial_button_click event');
    }
    setShowModal(true);
  };

  const handleTrialSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track trial signup
    if (client) {
      client.track('trial_signup', {
        email: email,
        trial_days: trialDays
      });
      console.log('[HeroSection] Tracked trial_signup event');
    }
    
    setShowModal(false);
    setEmail('');
    alert('Thank you for your interest! This is a demo site.');
  };

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
            onClick={handleTrialButtonClick}
            className="px-12 py-6 bg-[#FFD166] text-[#35524A] border-none rounded-xl font-bold cursor-pointer transition-all duration-300 hover:bg-[#D7263D] hover:text-white hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ fontSize: '1.875rem' }}
          >
            {trialButtonText}
          </button>
        </div>
      )}
      
      {showModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-[1000]" 
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)'
          }}
          onClick={() => setShowModal(false)}
        >
          <div 
            className="p-8 rounded-2xl max-w-[500px] w-full mx-4" 
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <h2 className="font-bold mb-4 text-[#35524A]" style={{ fontSize: '1.875rem' }}>Start Your Free Trial Today!</h2>
            <p className="mb-6 text-[#666] leading-relaxed" style={{ fontSize: '1.125rem' }}>{trialModalText}</p>
            <form className="space-y-4" onSubmit={handleTrialSignup}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#35524A]/20 focus:border-[#35524A] transition-all duration-200"
                style={{ fontSize: '1rem' }}
              />
              <button 
                type="submit" 
                className="w-full py-4 bg-[#FFD166] text-[#35524A] rounded-xl font-semibold transition-all duration-200 hover:bg-[#FFC233] hover:shadow-lg transform hover:scale-[1.02]" 
                style={{ fontSize: '1.125rem' }}
              >
                Get Started
              </button>
            </form>
            <p className="text-gray-500 mt-6 text-center" style={{ fontSize: '0.875rem' }}>No commitment required. Cancel anytime.</p>
            <button 
              onClick={() => setShowModal(false)} 
              className="mt-6 w-full py-3 text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200" 
              style={{ fontSize: '1rem' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 