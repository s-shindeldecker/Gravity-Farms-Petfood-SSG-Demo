import { useFlags } from 'launchdarkly-react-client-sdk';

export const useLaunchDarklyFlag = (flagKey: string) => {
  const flags = useFlags();
  return flags[flagKey];
};

// Specific hooks for different flag types
export const useHeroBannerText = () => {
  const flags = useFlags();
  const heroBannerText = flags['heroBannerText'];
  
  // If LaunchDarkly returns a nested object, flatten it to match SSG structure
  if (heroBannerText && typeof heroBannerText === 'object') {
    return {
      value: {
        'banner-text': heroBannerText['banner-text'],
        'banner-text-color': heroBannerText['banner-text-color'],
        'sub-banner-text': heroBannerText['sub-banner-text'],
        'sub-banner-text-color': heroBannerText['sub-banner-text-color'],
        'horiz-justification': heroBannerText['horiz-justification'],
        'vert-justification': heroBannerText['vert-justification'],
        'image-file': heroBannerText['image-file'],
      },
      isLoading: false
    };
  }
  
  // Fallback to mock data if no flags loaded
  return { 
    value: {
      'banner-text': 'Fresh, healthy meals crafted in Gravity Falls',
      'banner-text-color': '#FFFFFF',
      'sub-banner-text': "Start your pup's journey to better health with our free trial",
      'sub-banner-text-color': '#FFFFFF',
      'horiz-justification': 'center',
      'vert-justification': 'top',
      'image-file': 'hero-control.jpeg',
    }, 
    isLoading: false 
  };
};

export const useTrialDays = () => {
  const flags = useFlags();
  const trialDays = flags['numberOfDaysTrial'];
  
  // Ensure we return a number value
  const value = typeof trialDays === 'number' ? trialDays : 7;
  
  return { value, isLoading: false };
};

export const useShowTrialButton = () => {
  const flags = useFlags();
  const showButton = flags['showTrialButton'];
  
  // Ensure we return a boolean value
  const value = typeof showButton === 'boolean' ? showButton : true;
  
  return { value, isLoading: false };
};

export const useSeasonalBannerText = () => {
  const flags = useFlags();
  const bannerText = flags['seasonalSaleBannerText'];
  
  // Ensure we return a string value
  const value = typeof bannerText === 'string' ? bannerText : '🎉 Limited Time: 20% off your first order!';
  
  return { value, isLoading: false };
}; 