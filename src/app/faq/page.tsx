import { PageWrapper } from '@/components/PageWrapper';

export default function FAQPage() {
  return (
    <PageWrapper>
      <div className="centered-container py-8">
        <div className="card">
          <h1 className="text-4xl font-bold text-[#35524A] mb-6 text-center" style={{ fontSize: '2.2rem' }}>
            ❓ Frequently Asked Questions (FAQ)
          </h1>
          <div className="space-y-4 text-[#35524A]" style={{ fontSize: '1.15rem' }}>
            <h2 className="text-[#6A994E] mt-6" style={{ fontSize: '1.15em' }}>What makes Gravity Farms different from other pet food brands?</h2>
            <p>Great question. For starters, we don't use ingredients you can't pronounce. Our food is made fresh, using real, recognizable stuff — like chicken, carrots, and sweet potatoes. No "meat slurry," no "natural flavoring," and absolutely no powdered unicorn horn (we checked, it's not FDA approved).</p>
            <h2 className="text-[#6A994E] mt-6" style={{ fontSize: '1.15em' }}>Is your food really human-grade?</h2>
            <p>Yep! Everything we use is safe enough for you to eat — though legally we're supposed to say "please don't." Unless you're into that kind of thing. No judgment.</p>
            <h2 className="text-[#6A994E] mt-6" style={{ fontSize: '1.15em' }}>How is the food delivered?</h2>
            <p>Your meals arrive chilled in eco-friendly packaging, with enough insulation to survive the wilds of Gravity Falls and the occasional porch possum. Just store in the fridge or freezer and serve as needed.</p>
            <h2 className="text-[#6A994E] mt-6" style={{ fontSize: '1.15em' }}>Do you offer food for cats?</h2>
            <p>Not yet! Wendy and Mabel voted against it (they're very dog-centric), but our R&D team is definitely considering feline friends in the future. If your cat wants to file a formal request, we accept paw-written letters.</p>
            <h2 className="text-[#6A994E] mt-6" style={{ fontSize: '1.15em' }}>How do I transition my pet to Gravity Farms food?</h2>
            <p>Slow and steady wins the race! Start by mixing a little Gravity Farms food with your pet's current food, then gradually increase over 5–7 days. Trust us — their tummies (and your rugs) will thank you.</p>
            <h2 className="text-[#6A994E] mt-6" style={{ fontSize: '1.15em' }}>Can I customize meals based on my pet's diet or allergies?</h2>
            <p>We're working on more customization options! Right now, our recipes are designed to be wholesome and allergy-friendly for most pets, but if your dog is allergic to... say, air, shoot us a message and we'll try to help.</p>
            <h2 className="text-[#6A994E] mt-6" style={{ fontSize: '1.15em' }}>Where is Gravity Farms located?</h2>
            <p>We're based just outside the highly mysterious town of Gravity Falls. If you've seen a goat on a skateboard or a guy named Soos doing donuts in a golf cart, you're close.</p>
            <h2 className="text-[#6A994E] mt-6" style={{ fontSize: '1.15em' }}>Is this all real?</h2>
            <p>The food? Absolutely. The company? For demo purposes only. But honestly, if you're still reading this — you probably wish it were real too.</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
} 