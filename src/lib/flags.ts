import { generatePermutations, precompute, flag } from 'flags/next';

// Define flag configurations with multiple variations
export const flagConfigs = {
  'hero-banner-text': {
    key: 'hero-banner-text',
    defaultValue: {
      'banner-text': 'Fresh, healthy meals crafted in Gravity Falls',
      'banner-text-color': '#FFFFFF',
      'horiz-justification': 'center',
      'image-file': 'hero-control.jpeg',
      'sub-banner-text': "Start your pup's journey to better health with our free trial",
      'sub-banner-text-color': '#FFFFFF',
      'vert-justification': 'top'
    }
  },
  'number-of-days-trial': {
    key: 'number-of-days-trial',
    defaultValue: 7
  },
  'seasonal-sale-banner-text': {
    key: 'seasonal-sale-banner-text',
    defaultValue: ''
  },
  'show-trial-button': {
    key: 'show-trial-button',
    defaultValue: true
  }
};

// Create flags array for Vercel Flags SDK - using only default values as fallbacks
export const flags = [
  flag({
    key: 'hero-banner-text',
    defaultValue: {
      'banner-text': 'Fresh, healthy meals crafted in Gravity Falls',
      'banner-text-color': '#FFFFFF',
      'horiz-justification': 'center',
      'image-file': 'hero-control.jpeg',
      'sub-banner-text': "Start your pup's journey to better health with our free trial",
      'sub-banner-text-color': '#FFFFFF',
      'vert-justification': 'top'
    },
    decide: () => ({
      'banner-text': 'Fresh, healthy meals crafted in Gravity Falls',
      'banner-text-color': '#FFFFFF',
      'horiz-justification': 'center',
      'image-file': 'hero-control.jpeg',
      'sub-banner-text': "Start your pup's journey to better health with our free trial",
      'sub-banner-text-color': '#FFFFFF',
      'vert-justification': 'top'
    })
  }),
  flag({
    key: 'number-of-days-trial',
    defaultValue: 7,
    decide: () => 7
  }),
  flag({
    key: 'seasonal-sale-banner-text',
    defaultValue: '',
    decide: () => ''
  }),
  flag({
    key: 'show-trial-button',
    defaultValue: true,
    decide: () => true
  })
]; 