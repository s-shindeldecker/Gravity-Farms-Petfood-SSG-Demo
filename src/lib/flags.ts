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

// Create flags array for Vercel Flags SDK with dynamic variations
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
    decide: () => {
      // Return different variations for better SSG utilization
      const variations = [
        {
          'banner-text': 'Fresh, healthy meals crafted in Gravity Falls',
          'banner-text-color': '#FFFFFF',
          'horiz-justification': 'center',
          'image-file': 'hero-control.jpeg',
          'sub-banner-text': "Start your pup's journey to better health with our free trial",
          'sub-banner-text-color': '#FFFFFF',
          'vert-justification': 'top'
        },
        {
          'banner-text': 'Premium pet nutrition from Gravity Falls',
          'banner-text-color': '#FFFFFF',
          'horiz-justification': 'center',
          'image-file': 'hero-variant-a.jpeg',
          'sub-banner-text': "Give your best friend the nutrition they deserve",
          'sub-banner-text-color': '#FFFFFF',
          'vert-justification': 'top'
        },
        {
          'banner-text': 'Farm-fresh pet food delivered to your door',
          'banner-text-color': '#FFFFFF',
          'horiz-justification': 'center',
          'image-file': 'hero-variant-b.jpeg',
          'sub-banner-text': "Join thousands of happy pets and their owners",
          'sub-banner-text-color': '#FFFFFF',
          'vert-justification': 'top'
        }
      ];
      
      // Use timestamp to create variation (for demo purposes)
      const index = Math.floor(Date.now() / 1000) % variations.length;
      return variations[index];
    }
  }),
  flag({
    key: 'number-of-days-trial',
    defaultValue: 7,
    decide: () => {
      // Return different trial periods
      const variations = [7, 14, 30];
      const index = Math.floor(Date.now() / 1000) % variations.length;
      return variations[index];
    }
  }),
  flag({
    key: 'seasonal-sale-banner-text',
    defaultValue: '',
    decide: () => {
      // Return different seasonal banner texts
      const variations = [
        '',
        '🎉 Limited Time: 20% off your first order!',
        '🐕 New customers get 50% off their first month!',
        '🌟 Free shipping on orders over $50!'
      ];
      const index = Math.floor(Date.now() / 1000) % variations.length;
      return variations[index];
    }
  }),
  flag({
    key: 'show-trial-button',
    defaultValue: true,
    decide: () => {
      // Return different button visibility states
      const variations = [true, false];
      const index = Math.floor(Date.now() / 1000) % variations.length;
      return variations[index];
    }
  })
]; 