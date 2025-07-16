import { NextRequest, NextResponse } from 'next/server';
import { init, LDClient } from '@launchdarkly/vercel-server-sdk';
import { createClient } from '@vercel/edge-config';

// Create Edge Config client with local development stub
let edgeConfigClient = null;
let ldClient: LDClient | null = null;

try {
  // Try to create Edge Config client (works on Vercel)
  edgeConfigClient = createClient(process.env.EDGE_CONFIG);
  ldClient = init(process.env.LAUNCHDARKLY_SDK_KEY || '', edgeConfigClient);
  console.log('[API] Using Vercel Edge Config for LaunchDarkly');
} catch (error) {
  // Fallback for local development
  console.log('[API] Edge Config not available locally, using stub');
  ldClient = null;
}

// Define persona types to match the client-side personas
interface PersonaProfile {
  key: string;
  anonymous: boolean;
  name?: string;
  country?: string;
  state?: string;
  petType?: string;
  planType?: string;
  paymentType?: string;
}

// Parse persona from cookie string
function parsePersonaFromCookie(cookieValue: string): PersonaProfile | null {
  try {
    const persona = JSON.parse(decodeURIComponent(cookieValue));
    
    // Validate required fields
    if (!persona.key || typeof persona.anonymous !== 'boolean') {
      console.warn('[API] Invalid persona cookie structure:', persona);
      return null;
    }
    
    return persona as PersonaProfile;
  } catch (error) {
    console.error('[API] Error parsing persona cookie:', error);
    return null;
  }
}

// Mock flag values for local development
const getMockFlags = (user: PersonaProfile) => {
  return {
    'hero-banner-text': {
      value: {
        'banner-text': 'Fresh, healthy meals crafted in Gravity Falls',
        'banner-text-color': '#FFFFFF',
        'horiz-justification': 'center',
        'image-file': 'hero-control.jpeg',
        'sub-banner-text': "Start your pup's journey to better health with our free trial",
        'sub-banner-text-color': '#FFFFFF',
        'vert-justification': 'top'
      },
      variation: 0,
      version: 1,
      trackEvents: false
    },
    'number-of-days-trial': {
      value: 7,
      variation: 0,
      version: 1,
      trackEvents: false
    },
    'seasonal-sale-banner-text': {
      value: '🎉 Limited Time: 20% off your first order!',
      variation: 1,
      version: 1,
      trackEvents: false
    },
    'show-trial-button': {
      value: true,
      variation: 0,
      version: 1,
      trackEvents: false
    }
  };
};

export async function GET(request: NextRequest) {
  try {
    // Read persona from cookies
    const cookies = request.cookies;
    const personaCookie = cookies.get('persona')?.value;
    
    let user: PersonaProfile;
    
    if (personaCookie) {
      // Try to parse persona from cookie
      const persona = parsePersonaFromCookie(personaCookie);
      
      if (persona) {
        user = persona;
        console.log('[API] LaunchDarkly bootstrap - Using persona from cookie:', {
          key: user.key,
          name: user.name,
          country: user.country,
          petType: user.petType,
          planType: user.planType
        });
      } else {
        // Invalid persona cookie, fallback to anonymous
        user = {
          key: 'anonymous',
          anonymous: true
        };
        console.log('[API] LaunchDarkly bootstrap - Invalid persona cookie, using anonymous');
      }
    } else {
      // No persona cookie, use anonymous
      user = {
        key: 'anonymous',
        anonymous: true
      };
      console.log('[API] LaunchDarkly bootstrap - No persona cookie, using anonymous');
    }
    
    let values;
    
    if (ldClient) {
      // Use real LaunchDarkly SDK (Vercel production)
      await ldClient.waitForInitialization();
      const allFlags = await ldClient.allFlagsState(user);
      values = allFlags.toJSON();
      console.log('[API] LaunchDarkly bootstrap - Real flags evaluated:', Object.keys(values));
    } else {
      // Use mock flags (local development)
      values = getMockFlags(user);
      console.log('[API] LaunchDarkly bootstrap - Mock flags used for local development');
    }
    
    // Return flags as JSON with proper cache headers (per Alan Barker's blog post)
    return NextResponse.json(
      { user, values },
      {
        headers: {
          "Cache-Control": "private, max-age=60",
          "Vary": "Cookie",
          "Content-Type": "application/json",
        },
      }
    );
    
  } catch (error) {
    console.error('[API] LaunchDarkly bootstrap error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to bootstrap LaunchDarkly flags',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 