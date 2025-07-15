'use client';

import { useState } from 'react';
import type { UserProfile } from '@/context/UserContext';

interface PersonaModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (profile: UserProfile) => void;
}

const PERSONAS = [
  {
    label: 'Kat Purrstein (Cat, UK, Basic, PayPal)',
    getProfile: () => ({
      key: 'cat-uk-basic-katpurr',
      anonymous: false,
      name: 'Kat Purrstein',
      country: 'UK',
      state: 'Greater London',
      petType: 'cat',
      planType: 'basic',
      paymentType: 'paypal',
    }),
  },
  {
    label: 'Bark Twain (Dog, US, Premium, Credit Card)',
    getProfile: () => ({
      key: 'dog-us-premium-barktwain',
      anonymous: false,
      name: 'Bark Twain',
      country: 'US',
      state: 'California',
      petType: 'dog',
      planType: 'premium',
      paymentType: 'credit_card',
    }),
  },
  {
    label: 'Fur-gus McFluff (Dog, CA, Basic, Apple Pay)',
    getProfile: () => ({
      key: 'dog-ca-basic-furgus',
      anonymous: false,
      name: 'Fur-gus McFluff',
      country: 'CA',
      state: 'Ontario',
      petType: 'dog',
      planType: 'basic',
      paymentType: 'apple_pay',
    }),
  },
  {
    label: 'Whiskers LeChat (Cat, FR, Premium, Bank)',
    getProfile: () => ({
      key: 'cat-fr-premium-lechat',
      anonymous: false,
      name: 'Whiskers LeChat',
      country: 'FR',
      state: 'Paris',
      petType: 'cat',
      planType: 'premium',
      paymentType: 'bank',
    }),
  },
  {
    label: 'Sam Bothington (Both, DE, Both, Google Pay)',
    getProfile: () => ({
      key: 'both-de-both-samboth',
      anonymous: false,
      name: 'Sam Bothington',
      country: 'DE',
      state: 'Berlin',
      petType: 'both',
      planType: 'both',
      paymentType: 'google_pay',
    }),
  },
  {
    label: 'Pawsley Barkley (Dog, US, Trial, Credit Card)',
    getProfile: () => ({
      key: 'dog-us-trial-pawsley',
      anonymous: false,
      name: 'Pawsley Barkley',
      country: 'US',
      state: 'Texas',
      petType: 'dog',
      planType: 'trial',
      paymentType: 'credit_card',
    }),
  },
];

export const PersonaModal = ({ open, onClose, onSelect }: PersonaModalProps) => {
  const [selected, setSelected] = useState(0);
  const persona = PERSONAS[selected];
  const profile = persona.getProfile();

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-[1000]" 
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div 
        className="p-8 rounded-xl max-w-[500px] w-full mx-4 text-center"
        style={{ 
          backgroundColor: 'white',
          boxShadow: '0 2px 12px rgba(0,0,0,0.10)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-[#35524A] mb-6">Select a Demo Persona</h2>
        
        <select
          value={selected}
          onChange={e => setSelected(Number(e.target.value))}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
          style={{ fontSize: '1rem' }}
        >
          {PERSONAS.map((p, i) => (
            <option value={i} key={p.label}>{p.label}</option>
          ))}
        </select>
        
        <div 
          className="text-left mb-6 p-4 rounded-lg"
          style={{ 
            fontSize: '0.95rem', 
            backgroundColor: '#f8f8f8'
          }}
        >
          {Object.entries(profile).map(([k, v]) => (
            <div key={k} className="mb-1">
              <strong>{k}:</strong> {String(v)}
            </div>
          ))}
        </div>
        
        <button 
          className="w-full py-3 bg-[#35524A] text-white rounded-lg font-medium hover:bg-[#2a423a] transition-colors duration-200"
          onClick={() => onSelect(profile)}
        >
          Continue as {persona.label}
        </button>
      </div>
    </div>
  );
}; 