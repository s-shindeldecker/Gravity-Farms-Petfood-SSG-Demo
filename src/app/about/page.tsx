import { PageWrapper } from '@/components/PageWrapper';

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="centered-container py-8">
        <div className="card">
          <h1 className="text-4xl font-bold text-[#35524A] mb-6 text-center" style={{ fontSize: '2.2rem' }}>
            🐾 About Us – Gravity Farms Petfood
          </h1>
          <div className="space-y-4 text-[#35524A]" style={{ fontSize: '1.15rem' }}>
            <p>Welcome to Gravity Farms Petfood — where freshness meets fur.</p>
            <p>We started Gravity Farms in the little mountain town of Gravity Falls, a quiet place with towering pines, mysterious caves, and one very opinionated raccoon that lives near the compost pile.</p>
            <p>Our founders, lifelong animal lovers and amateur cryptid hunters, were inspired by their two dogs, Wendy and Mabel, who demanded more from their kibble. Literally — they refused to eat anything that wasn't fresh, nutritious, and served with love (and maybe a little goat cheese).</p>
            <p>Tired of the same old shelf-stable pellets, we built Gravity Farms around one simple belief:</p>
            <blockquote className="italic text-[#6A994E] my-6 border-l-4 border-[#FFD166] pl-4" style={{ fontSize: '1.15rem' }}>
              "Your pet deserves food that tastes like it came from a farm… not a factory."
            </blockquote>
            <p>Every meal we make is crafted with:</p>
            <ul className="ml-6 mb-4 space-y-1" style={{ fontSize: '1.15rem' }}>
              <li>Human-grade ingredients (but please don't eat it, Carl — it's for pets).</li>
              <li>Locally sourced vegetables and proteins (shoutout to Larry, our carrot guy).</li>
              <li>Recipes developed in consultation with real vets and very picky dogs.</li>
            </ul>
            <p>We believe in:</p>
            <ul className="ml-6 mb-4 space-y-1" style={{ fontSize: '1.15rem' }}>
              <li>Transparency (except when it comes to what's in the Secret Barn — don't ask).</li>
              <li>Sustainability (our delivery boxes are compostable AND make great cat forts).</li>
              <li>Joyful eating experiences for pets (tail wags are our currency).</li>
            </ul>
            <p>Thanks for stopping by. Whether your pet is a Wendy, a Mabel, or more of a Soos, we're glad you're here.</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
} 