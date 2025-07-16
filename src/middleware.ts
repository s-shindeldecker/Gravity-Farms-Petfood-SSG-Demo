import { NextRequest, NextResponse } from 'next/server';
import { precompute } from 'flags/next';
import { flags } from '@/lib/flags';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log('[MIDDLEWARE] Running for path:', pathname);
  
  // Only rewrite root paths (/, /index) to their precomputed variants
  // Leave all other paths untouched
  if (pathname !== '/' && pathname !== '/index') {
    console.log('[MIDDLEWARE] Skipping non-root path:', pathname);
    return NextResponse.next();
  }
  
  try {
    // Generate precomputed code using Vercel Flags SDK
    const code = await precompute(flags);
    console.log('[MIDDLEWARE] Generated precomputed code:', code);
    
    // Rewrite to the precomputed route
    const rewriteUrl = new URL(`/${code}`, request.url);
    console.log('[MIDDLEWARE] Rewriting to:', rewriteUrl.toString());
    
    return NextResponse.rewrite(rewriteUrl, { request });
  } catch (error) {
    console.error('[MIDDLEWARE] Error generating precomputed code:', error);
    // If there's an error, continue to the original page
    return NextResponse.next();
  }
} 