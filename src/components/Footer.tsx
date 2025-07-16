'use client';

import { useSeasonalBannerText } from '@/hooks/useLaunchDarklyFlag';
import Link from 'next/link';

export const Footer = () => {
  const { value: tagline = "Crafted in Gravity Falls, delivered to your door", isLoading } = useSeasonalBannerText();

  return (
    <footer className="w-full bg-[#F6E7CB] border-t border-[#eee] py-12 pb-6 flex flex-col items-center text-base text-[#555]">
      <div className="centered-container">
        <ul className="list-none flex flex-wrap mb-6 p-0 justify-center">
          <li style={{ margin: '0 16px' }}><Link href="/reviews" className="no-underline text-[#555] transition-colors duration-200 hover:text-[#4caf50]" style={{ fontSize: '1.125rem' }}>Reviews</Link></li>
          <li style={{ margin: '0 16px' }}><Link href="/about" className="no-underline text-[#555] transition-colors duration-200 hover:text-[#4caf50]" style={{ fontSize: '1.125rem' }}>About Us</Link></li>
          <li style={{ margin: '0 16px' }}><Link href="/faq" className="no-underline text-[#555] transition-colors duration-200 hover:text-[#4caf50]" style={{ fontSize: '1.125rem' }}>FAQ</Link></li>
          <li style={{ margin: '0 16px' }}><a href="#" className="no-underline text-[#555] transition-colors duration-200 hover:text-[#4caf50]" style={{ fontSize: '1.125rem' }}>Careers</a></li>
          <li style={{ margin: '0 16px' }}><a href="#" className="no-underline text-[#555] transition-colors duration-200 hover:text-[#4caf50]" style={{ fontSize: '1.125rem' }}>Affiliates</a></li>
          <li style={{ margin: '0 16px' }}><Link href="/for-vet-professionals" className="no-underline text-[#555] transition-colors duration-200 hover:text-[#4caf50]" style={{ fontSize: '1.125rem' }}>For Vet Professionals</Link></li>
          <li style={{ margin: '0 16px' }}><a href="#" className="no-underline text-[#555] transition-colors duration-200 hover:text-[#4caf50]" style={{ fontSize: '1.125rem' }}>Privacy</a></li>
          <li style={{ margin: '0 16px' }}><a href="#" className="no-underline text-[#555] transition-colors duration-200 hover:text-[#4caf50]" style={{ fontSize: '1.125rem' }}>Terms</a></li>
          <li style={{ margin: '0 16px' }}><a href="#" className="no-underline text-[#555] transition-colors duration-200 hover:text-[#4caf50]" style={{ fontSize: '1.125rem' }}>Accessibility</a></li>
          <li style={{ margin: '0 16px' }}><a href="#" className="no-underline text-[#555] transition-colors duration-200 hover:text-[#4caf50]" style={{ fontSize: '1.125rem' }}>Do Not Sell My Personal Information</a></li>
        </ul>
        <div className="text-center" style={{ fontSize: '1rem' }}>
          © {new Date().getFullYear()} Gravity Farms Petfood. All rights reserved.
        </div>
        {!isLoading && (
          <div className="text-center font-medium mt-3" style={{ fontSize: '1rem', color: '#35524A' }}>
            {tagline}
          </div>
        )}
      </div>
    </footer>
  );
}; 