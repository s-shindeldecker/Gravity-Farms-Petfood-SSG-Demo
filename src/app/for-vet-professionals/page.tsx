import { PageWrapper } from '@/components/PageWrapper';

export default function ForVetProfessionalsPage() {
  return (
    <PageWrapper>
      <div className="centered-container py-8">
        <div className="card">
          <h1 className="text-4xl font-bold text-[#35524A] mb-6 text-center" style={{ fontSize: '2.2rem' }}>
            🩺 For Veterinary Professionals
          </h1>
          <div className="space-y-4 text-[#35524A]" style={{ fontSize: '1.15rem' }}>
            <p>
              At Gravity Farms, we believe in science, transparency, and collaboration with the veterinary community.
            </p>
            <p>
              Our recipes are developed in consultation with veterinary nutritionists and are designed to meet the highest standards for pet health and wellness.
            </p>
            <ul className="ml-6 mb-4 space-y-1" style={{ fontSize: '1.15rem' }}>
              <li>Ingredient transparency and full nutritional profiles available upon request.</li>
              <li>We welcome feedback and partnership opportunities with clinics and professionals.</li>
              <li>Contact us for samples, research data, or to schedule a conversation with our team.</li>
            </ul>
            <p>
              Thank you for your dedication to animal health. We're proud to support your work!
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
} 