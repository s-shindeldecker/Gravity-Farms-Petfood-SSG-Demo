import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
  // Get user from cookie or create anonymous
  const user = {
    kind: 'user' as const,
    key: 'anonymous-user',
    anonymous: true
  };
  
  // Return mock flag values for now
  const values = {
    'hero-banner-text': {
      'banner-text': 'Fresh, healthy meals crafted in Gravity Falls',
      'banner-text-color': '#FFFFFF',
      'horiz-justification': 'center',
      'image-file': 'hero-control.jpeg',
      'sub-banner-text': "Start your pup's journey to better health with our free trial",
      'sub-banner-text-color': '#FFFFFF',
      'vert-justification': 'top'
    },
    'number-of-days-trial': 7,
    'seasonal-sale-banner-text': '',
    'show-trial-button': true
  };
  
  return NextResponse.json({ 
    user, 
    values
  }, {
    headers: {
      "Cache-Control": "private, max-age=60",
      Vary: "Cookie",
    },
  });
} 