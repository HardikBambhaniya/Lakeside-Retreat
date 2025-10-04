import herobg from "../assets/Hero-bg.jpg";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const Hero = () => {
  const textContainerRef = useRef(null);

  useEffect(() => {
    if (!textContainerRef.current) return;

    // grab all children (h1, p, button, bottom text)
    const elements = gsap.utils.toArray(textContainerRef.current.querySelectorAll(".animate-item"));

    gsap.fromTo(
      elements,
      { x: -150, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.4,
        duration: 1,
        ease: "power3.out",
        clearProps: "opacity, transform",
      }
    );
  }, []);

  return (
    <section className="w-screen h-screen relative flex justify-center items-center text-center">
      {/* Background Image */}
      <div className="w-screen h-full">
        <img
          src={herobg}
          alt="Hero-bg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/40 to-transparent z-10"></div>

      {/* Hero Content */}
      <div
        ref={textContainerRef}
        className="absolute z-20 flex flex-col justify-center items-center w-[90%] h-[90%] 
                   md:items-start md:w-full md:pl-6"
      >
        {/* Top Content */}
        <div className="mt-40 flex flex-col gap-3 items-center md:items-start ">
          <h1 className="animate-item font-[solare] text-3xl font-bold text-white xs:text-4xl sm:text-5xl md:font-extrabold lg:text-6xl xl:text-7xl">
            Escape to Serenity
          </h1>
          <p className="animate-item text-md xs:text-lg sm:text-xl lg:text-2xl font-gilda text-gray-300 md:text-start">
            Find peace, recharge your mind, and <br /> reconnect with nature at our lakeside retreat
          </p>
          <button className="animate-item font-gilda px-5 py-2 h-10 font-[10px] text-black border-white border-2 bg-white/45 rounded-xl shadow-lg">
            Book Your Stay
          </button>
        </div>

        {/* Bottom Content */}
        <div className= "animate-item mt-40 text-center md:text-start">
          <p className="text-md xs:text-lg sm:text-xl lg:text-2xl font-gilda text-gray-400 ">
            Discover serenity at every lakeside retreat, <br />
            where every visit becomes a cherished memory
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
