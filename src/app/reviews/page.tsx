import { PageWrapper } from '@/components/PageWrapper';

export default function ReviewsPage() {
  return (
    <PageWrapper>
      <div className="centered-container py-8">
        <div className="card">
          <h1 className="text-4xl font-bold text-[#35524A] mb-6 text-center" style={{ fontSize: '2.2rem' }}>
            🌟 Customer Reviews
          </h1>
          <div className="space-y-6 text-[#35524A]" style={{ fontSize: '1.15rem' }}>
            <div className="border-b border-[#F6E7CB] pb-6">
              <div className="text-[#FFD166] mb-2" style={{ fontSize: '1.3em' }}>⭐⭐⭐⭐⭐</div>
              <blockquote className="italic my-2 border-l-4 border-[#FFD166] pl-4" style={{ fontSize: '1.15rem' }}>
                "My dog licked the bowl clean... and then tried to eat the bowl."
              </blockquote>
              <div className="text-[#6A994E] mb-2" style={{ fontSize: '0.98em' }}>— Sarah T., Oregon</div>
              <p>Gravity Farms has completely ruined other pet food for us. Luna used to be a picky eater — now she sits by the fridge like she's waiting for her DoorDash order.</p>
            </div>
            <div className="border-b border-[#F6E7CB] pb-6">
              <div className="text-[#FFD166] mb-2" style={{ fontSize: '1.3em' }}>⭐⭐⭐⭐⭐</div>
              <blockquote className="italic my-2 border-l-4 border-[#FFD166] pl-4" style={{ fontSize: '1.15rem' }}>
                "You'd think we were serving steak."
              </blockquote>
              <div className="text-[#6A994E] mb-2" style={{ fontSize: '0.98em' }}>— Marcus D., Illinois</div>
              <p>Our lab, Moose, went full Gordon Ramsay on his old kibble after trying Gravity Farms. He flipped the bowl and everything. Now it's fresh or nothing.</p>
            </div>
            <div className="border-b border-[#F6E7CB] pb-6">
              <div className="text-[#FFD166] mb-2" style={{ fontSize: '1.3em' }}>⭐⭐⭐⭐☆</div>
              <blockquote className="italic my-2 border-l-4 border-[#FFD166] pl-4" style={{ fontSize: '1.15rem' }}>
                "Love the food. The box became my cat's new apartment."
              </blockquote>
              <div className="text-[#6A994E] mb-2" style={{ fontSize: '0.98em' }}>— Emily R., California</div>
              <p>Okay, I know this is for dogs, but I accidentally left the delivery box open and my cat moved in. The food smells amazing — if I didn't know better, I'd say it was Sunday dinner.</p>
            </div>
            <div className="border-b border-[#F6E7CB] pb-6">
              <div className="text-[#FFD166] mb-2" style={{ fontSize: '1.3em' }}>⭐⭐⭐⭐⭐</div>
              <blockquote className="italic my-2 border-l-4 border-[#FFD166] pl-4" style={{ fontSize: '1.15rem' }}>
                "Our vet asked what we were feeding him. I panicked and said 'love.'"
              </blockquote>
              <div className="text-[#6A994E] mb-2" style={{ fontSize: '0.98em' }}>— James P., New York</div>
              <p>But seriously, our golden retriever, Bowie, has more energy, shinier fur, and fewer tummy issues since switching. 10/10 would recommend (and have, to everyone at the dog park).</p>
            </div>
            <div className="border-b border-[#F6E7CB] pb-6">
              <div className="text-[#FFD166] mb-2" style={{ fontSize: '1.3em' }}>⭐⭐⭐⭐⭐</div>
              <blockquote className="italic my-2 border-l-4 border-[#FFD166] pl-4" style={{ fontSize: '1.15rem' }}>
                "Finally, a food worthy of a dog named Mabel."
              </blockquote>
              <div className="text-[#6A994E] mb-2" style={{ fontSize: '0.98em' }}>— Anonymous, Gravity Falls</div>
              <p>Mabel knows quality, and this is it. She hasn't tried to bury a single meal since we made the switch. Even Wendy seems impressed — and Wendy is hard to impress.</p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
} 