import { NextRequest, NextResponse } from 'next/server';
import { precompute } from 'flags/next';
import { flags } from '@/lib/flags';

export const config = {
  matcher: ['/'],
};

export async function middleware(request: NextRequest) {
  console.log('[MIDDLEWARE] Running for path:', request.nextUrl.pathname);
  
  try {
    const code = await precompute(flags);
    console.log('[MIDDLEWARE] Generated code:', code);
    
    const nextUrl = new URL(
      `/${code}${request.nextUrl.pathname}${request.nextUrl.search}`,
      request.url,
    );
    console.log('[MIDDLEWARE] Redirecting to:', nextUrl.toString());
    
    return NextResponse.rewrite(nextUrl, { request });
  } catch (error) {
    console.error('[MIDDLEWARE] Error:', error);
    // If there's an error, just continue to the original page
    return NextResponse.next();
  }
} 