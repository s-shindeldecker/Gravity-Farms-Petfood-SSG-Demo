'use client';

import { Header } from './Header';
import { Footer } from './Footer';
import { SeasonalBanner } from './SeasonalBanner';
import { HeroSection } from './HeroSection';

interface AppContentProps {
  seasonalBannerText: string;
}

export const AppContent = ({ seasonalBannerText }: AppContentProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <SeasonalBanner />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <div className="centered-container py-20">
          <div className="card">
            <h2 
              className="font-bold text-[#35524A] mb-8 text-center"
              style={{ fontSize: '3.75rem', lineHeight: '1.2' }}
            >
              Welcome to Gravity Farms
            </h2>
            <p 
              className="text-[#555] mb-12 text-center max-w-4xl mx-auto leading-relaxed"
              style={{ fontSize: '1.5rem', lineHeight: '1.6' }}
            >
              We deliver fresh, healthy pet food crafted in Gravity Falls, directly to your door. 
              Our recipes are designed by veterinarians and made with locally-sourced ingredients.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
              <div className="text-center group">
                <div className="w-24 h-24 bg-[#6A994E] rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white" style={{ fontSize: '2.5rem' }}>🌾</span>
                </div>
                <h3 
                  className="font-bold text-[#35524A] mb-4"
                  style={{ fontSize: '1.5rem' }}
                >
                  Fresh Ingredients
                </h3>
                <p 
                  className="text-[#555] leading-relaxed"
                  style={{ fontSize: '1.125rem', lineHeight: '1.6' }}
                >
                  Locally sourced, farm-fresh ingredients from trusted suppliers
                </p>
              </div>
              <div className="text-center group">
                <div className="w-24 h-24 bg-[#6A994E] rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white" style={{ fontSize: '2.5rem' }}>👨‍⚕️</span>
                </div>
                <h3 
                  className="font-bold text-[#35524A] mb-4"
                  style={{ fontSize: '1.5rem' }}
                >
                  Vet Approved
                </h3>
                <p 
                  className="text-[#555] leading-relaxed"
                  style={{ fontSize: '1.125rem', lineHeight: '1.6' }}
                >
                  Recipes designed by veterinary nutritionists for optimal health
                </p>
              </div>
              <div className="text-center group">
                <div className="w-24 h-24 bg-[#6A994E] rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white" style={{ fontSize: '2.5rem' }}>🚚</span>
                </div>
                <h3 
                  className="font-bold text-[#35524A] mb-4"
                  style={{ fontSize: '1.5rem' }}
                >
                  Free Delivery
                </h3>
                <p 
                  className="text-[#555] leading-relaxed"
                  style={{ fontSize: '1.125rem', lineHeight: '1.6' }}
                >
                  Convenient delivery to your doorstep on your schedule
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}; 