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
  
  return { value: undefined, isLoading: false };
};

export const useTrialDays = () => {
  const flags = useFlags();
  return { value: flags['numberOfDaysTrial'], isLoading: false };
};

export const useShowTrialButton = () => {
  const flags = useFlags();
  return { value: flags['showTrialButton'], isLoading: false };
};

export const useSeasonalBannerText = () => {
  const flags = useFlags();
  return { value: flags['seasonalSaleBannerText'], isLoading: false };
}; 