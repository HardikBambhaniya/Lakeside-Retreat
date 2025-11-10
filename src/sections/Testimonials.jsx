// Testimonials.jsx
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const reviews = [
  {
    name: "The Wilson Family",
    quote:
      "Our stay at Lakeside Retreat was unforgettable! The kids loved the lake, and we all enjoyed the peaceful surroundings.",
  },
  {
    name: "The Sharma Family",
    quote:
      "A perfect weekend getaway. The environment was serene and the cottages were very cozy. Highly recommended!",
  },
  {
    name: "The Martinez Family",
    quote:
      "We felt right at home. Amazing views, relaxing atmosphere, and plenty of activities for everyone.",
  },
  {
    name: "The Johnson Family",
    quote:
      "Every moment here was magical. From morning walks by the lake to evening bonfires, we will cherish these memories forever.",
  },
];

const Testimonials = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const cards = cardsRef.current;

    // Set initial positions
    gsap.set(cards, { yPercent: 100 });
    gsap.set(cards[0], { yPercent: 0 });

    const interval = setInterval(() => {
      const next = (current + 1) % cards.length;

      gsap.to(cards[current], { yPercent: -100, duration: 0.8, ease: "power2.inOut" });
      gsap.fromTo(cards[next], { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: "power3.inOut" });

      setCurrent(next);
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div ref={containerRef} className="relative w-full h-72 md:h-80 lg:h-96 overflow-hidden max-w-3xl">
        {reviews.map((r, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center p-6 backdrop-blur-lg rounded-2xl shadow-lg text-white"
          >
            <p className="font-gilda text-gray-400 text-lg sm:text-xl md:text-2xl mb-4 italic">"{r.quote}"</p>
            <h4 className="font-[solare] font-semibold text-lg sm:text-xl">{r.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
