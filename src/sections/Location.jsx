// CardsAnimation.jsx
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cardOne from "../assets/imgCard.jpg";
import cardTwo from "../assets/imgCard2.jpg";
import cardThree from "../assets/imgCard3.png";
import bgVideo from "../assets/bg-vid/location.mp4";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    id: 1,
    img: cardOne,
    title: "Create Lasting Memories",
    description:
      "Whether it's a family getaway, a romantic escape, or a solo retreat, Lakeside Retreat is where stories are made and cherished forever.",
    marquee: [
      "Relax by the Lake",
      "Breathtaking Views",
      "Unforgettable Moments",
      "Peaceful Escape",
      "Relax by the Lake",
      "Breathtaking Views",
    ],
  },
  {
    id: 2,
    img: cardTwo,
    title: "Adventure Awaits",
    description:
      "From boating and hiking to bonfires under the stars, there's something for every adventurer and dreamer.",
  },
  {
    id: 3,
    img: cardThree,
    video: bgVideo,
    title: "A Home by the Water",
    description:
      "Wake up to shimmering lake views and the calming sounds of nature. Every moment at Lakeside Retreat feels like a step closer to tranquility.",
  },
];

const CardsAnimation = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const titleRefs = useRef([]);
  const descRefs = useRef([]);
  const marqueeRef = useRef(null);
  const introTextRefs = useRef([]);
  const statsRefs = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Section - character by character scroll tracing
      if (introTextRefs.current.length > 0) {
        gsap.to(introTextRefs.current, {
          color: "#ffffff", 
          stagger: 0.09, 
          scrollTrigger: {
            trigger: introTextRefs.current[0].parentNode,
            start: "top 50%",
            end: "top 20%",
            scrub: true,
          },
        });
      }


      //stats animation intro
       // Stats animation intro (with scroll trigger)
if (statsRefs.current) {
  const elements = gsap.utils.toArray(
    statsRefs.current.querySelectorAll(".animate-state")
  );

  gsap.fromTo(
    elements,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.3,
      duration: 1,
      ease: "power3.out",
      clearProps: "opacity, transform",
      scrollTrigger: {
        trigger: statsRefs.current,
        start: "top 80%",  
        end: "top 40%",     
        
        toggleActions: "play none none reverse", 
        
      },
    }
  );
}


      //  Marquee animation (first card)
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 20,
          ease: "none",
        });
      }

      //  Cards Animation
      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        const cardWrapper = card.querySelector(".card-wrapper");
        const title = titleRefs.current[i];
        const desc = descRefs.current[i];

        if (!cardWrapper || !title || !desc) return;

        gsap.set(title, { opacity: 0, y: 60, scale: 0.9 });
        gsap.set(desc, { opacity: 0, y: 40, scale: 0.95 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "center center",
            end: "+=150%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Zoom card
        tl.fromTo(
          cardWrapper,
          { scale: 0.5, borderRadius: "1rem" },
          {
            scale: 1,
            borderRadius: "0rem",
            duration: 0.6,
            ease: "power2.inOut",
          },
          0
        );

        // Title
        tl.to(
          title,
          { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" },
          0.65
        );

        // Description
        tl.to(
          desc,
          { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" },
          0.75
        );

        // Last card image to video
        if (i === cardsData.length - 1) {
          const imgEl = card.querySelector(".last-card-img");
          const videoEl = card.querySelector(".last-card-video");

          if (videoEl) {
            gsap.set(videoEl, { opacity: 0 });

            tl.to(
              imgEl,
              {
                opacity: 0,
                duration: 1,
                ease: "none",
                onComplete: () => videoEl.play(),
              },
              0.2
            );

            tl.to(
              videoEl,
              { opacity: 1, scale: 1.05, duration: 1, ease: "none" },
              0.4
            );
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper to split text into spans (per char)
  const renderSplitText = (text) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        ref={(el) => (introTextRefs.current[i] = el)}
        className="inline-block text-gray-500"
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="w-screen bg-black">
      {/*  Intro Section */}
      <section className="relative w-full h-screen flex justify-center items-center px-6">
        <h1 className="max-w-5xl text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] font-[solare]">
          {renderSplitText("Discover the Serenity of Lakeside Retreat")}
        </h1>

        {/* Stats */}
        <div ref={statsRefs} className="absolute bottom-15 w-screen flex justify-evenly items-center text-center h-20 text-white m-0.5 p-0.5 overflow-hidden ">
          <p className="animate-state text-2xl sm:text-3xl sm:font-semibold lg:text-4xl w-full leading-5 font-[solare]">
            5+ <br />
            <span className="text-[14px] sm:text-[16px] lg:text-2xl text-gray-400">
              years exp.
            </span>
          </p>
          <p className="animate-state text-2xl sm:text-3xl sm:font-semibold lg:text-4xl w-full leading-5 font-[solare]">
            150+ <br />
            <span className="text-[14px] sm:text-[16px] lg:text-2xl text-gray-400">
              Happy Families
            </span>
          </p>
          <p className="animate-state text-2xl sm:text-3xl sm:font-semibold lg:text-4xl w-full leading-5 font-[solare]">
            35+ <br />
            <span className="text-[14px] sm:text-[16px] lg:text-2xl text-gray-400">
              Locations
            </span>
          </p>
        </div>
      </section>

      {/*  Cards Section */}
      <section className="relative w-full bg-black">
        {cardsData.map((card, i) => (
          <div
            className="relative w-full h-screen flex justify-center items-center overflow-hidden"
            key={card.id}
            ref={(el) => (cardRefs.current[i] = el)}
          >
            {/* Marquee */}
            {card.marquee && (
              <div className="absolute top-1/2 left-0 w-full overflow-hidden -translate-y-1/2 pointer-events-none -z-20">
                <div
                  ref={marqueeRef}
                  className="flex gap-8 sm:gap-12 md:gap-16 whitespace-nowrap text-[8vw] sm:text-[10vw] font-bold tracking-tight opacity-20 text-white"
                >
                  {card.marquee.map((text, idx) => (
                    <span key={idx} className="inline-block font-[solare]">
                      {text}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Card Wrapper */}
            <div className="card-wrapper relative w-full h-full will-change-transform">
              {/* Image/Video */}
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                {card.img && (
                  <img
                    src={card.img}
                    alt={card.title}
                    loading="lazy"
                    className={`w-full h-full object-cover ${
                      card.video ? "last-card-img" : ""
                    }`}
                  />
                )}
                {card.video && (
                  <video
                    src={card.video}
                    className="w-screen h-dvh object-cover absolute inset-0 last-card-video"
                    playsInline
                    muted
                    loop
                  />
                )}
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-center items-center text-center z-10 px-4 sm:px-6 md:px-8 lg:px-12">
                <h2
                  ref={(el) => (titleRefs.current[i] = el)}
                  className="font-[solare] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6 md:mb-8 text-white drop-shadow-2xl max-w-6xl"
                >
                  {card.title}
                </h2>
                <p
                  ref={(el) => (descRefs.current[i] = el)}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl text-gray-200 drop-shadow-xl leading-relaxed"
                >
                  {card.description}
                </p>
                
              </div>
            </div>
          </div>
        ))}


         

      </section>

      
    </div>
  );
};

export default CardsAnimation;
