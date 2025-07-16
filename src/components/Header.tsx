'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useUser, getRandomUserProfile } from '@/context/UserContext';
import { PersonaModal } from './PersonaModal';

// Helper function to set persona cookie
const setPersonaCookie = (profile: any) => {
  const cookieValue = encodeURIComponent(JSON.stringify(profile));
  document.cookie = `persona=${cookieValue}; path=/; max-age=86400; SameSite=Lax`; // 24 hours
  console.log('[Header] Set persona cookie for:', profile.key);
};

// Helper function to clear persona cookie
const clearPersonaCookie = () => {
  document.cookie = 'persona=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  console.log('[Header] Cleared persona cookie');
};

export const Header = () => {
  const { user, login, logout } = useUser();
  const [showPersonaModal, setShowPersonaModal] = useState(false);

  console.log('[Header] Current user:', user.key, 'anonymous:', user.anonymous);

  return (
    <nav className="w-full bg-transparent border-b-0 flex flex-col p-0 sticky top-0 z-50">
      {/* Logo and Company Name - Centered */}
      <div className="centered-container bg-[#F6E7CB] border-b border-[#eee] flex items-center py-6 px-8">
        <div className="centered-container flex items-center justify-center">
          <div className="font-bold text-4xl text-[#4caf50]">
            <Link href="/" className="flex items-center no-underline">
              <Image
                src="/gravity-farms-logo.png"
                alt="Gravity Farms Petfood logo"
                width={140}
                height={140}
                className="mr-4 align-middle"
              />
              <span 
                className="font-bold text-[#35524A]"
                style={{ 
                  fontSize: '3.5rem', 
                  lineHeight: '1.1',
                  fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: '700'
                }}
              >
                Gravity Farms Petfood
              </span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu - Full Width */}
      <div className="centered-container bg-[#F6E7CB] border-b border-[#eee] py-4 px-8">
        <ul className="list-none flex justify-center m-0 p-0 items-center">
          <li style={{ margin: '0 32px' }}><Link href="/" className="no-underline text-[#333] font-medium transition-colors duration-200 hover:text-[#4caf50] whitespace-nowrap" style={{ fontSize: '1.125rem' }}>Home</Link></li>
          <li style={{ margin: '0 32px' }}><Link href="/reviews" className="no-underline text-[#333] font-medium transition-colors duration-200 hover:text-[#4caf50] whitespace-nowrap" style={{ fontSize: '1.125rem' }}>Reviews</Link></li>
          <li style={{ margin: '0 32px' }}><Link href="/about" className="no-underline text-[#333] font-medium transition-colors duration-200 hover:text-[#4caf50] whitespace-nowrap" style={{ fontSize: '1.125rem' }}>About Us</Link></li>
          <li style={{ margin: '0 32px' }}><Link href="/why-gravity-farms" className="no-underline text-[#333] font-medium transition-colors duration-200 hover:text-[#4caf50] whitespace-nowrap" style={{ fontSize: '1.125rem' }}>Why Gravity Farms?</Link></li>
          <li style={{ margin: '0 32px' }}><Link href="/faq" className="no-underline text-[#333] font-medium transition-colors duration-200 hover:text-[#4caf50] whitespace-nowrap" style={{ fontSize: '1.125rem' }}>FAQ</Link></li>
          <li style={{ margin: '0 32px' }}><a href="#" className="no-underline text-[#333] font-medium transition-colors duration-200 hover:text-[#4caf50] whitespace-nowrap" style={{ fontSize: '1.125rem' }}>For Vet Professionals</a></li>
          {user && !user.anonymous && (
            <li style={{ margin: '0 32px' }}><a href="#" onClick={() => {}} className="no-underline text-[#333] font-medium transition-colors duration-200 hover:text-[#4caf50] whitespace-nowrap" style={{ fontSize: '1.125rem' }}>Account</a></li>
          )}
          <li style={{ margin: '0 32px' }}>
            {user && !user.anonymous ? (
              <a href="#" onClick={(e) => { 
                e.preventDefault(); 
                console.log('[Header] Logging out, current user:', user.key, 'anonymous:', user.anonymous);
                clearPersonaCookie(); // Clear persona cookie on logout
                logout(); 
                console.log('[Header] Logout called');
              }} className="no-underline text-[#333] font-medium transition-colors duration-200 hover:text-[#4caf50] whitespace-nowrap" style={{ fontSize: '1.125rem' }}>Log Out</a>
            ) : (
              <a href="#" onClick={(e) => { 
                e.preventDefault(); 
                console.log('[Header] Opening persona modal');
                setShowPersonaModal(true);
              }} className="no-underline text-[#333] font-medium transition-colors duration-200 hover:text-[#4caf50] whitespace-nowrap" style={{ fontSize: '1.125rem' }}>Log In</a>
            )}
          </li>
        </ul>
      </div>
      
      <PersonaModal
        open={showPersonaModal}
        onClose={() => setShowPersonaModal(false)}
        onSelect={(profile) => {
          console.log('[Header] Selected persona:', profile);
          setPersonaCookie(profile); // Set persona cookie on login
          login(profile);
          setShowPersonaModal(false);
        }}
      />
    </nav>
  );
}; 