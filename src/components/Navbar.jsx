// Navbar.jsx
import { useState, useRef, useEffect, use } from "react";
import { TextAlignEnd, X } from "lucide-react";
import gsap from "gsap";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);
  const linkRefs = useRef([]);
  const tl = useRef(null);

  useEffect(() => {
    // Setup GSAP timeline
    tl.current = gsap.timeline({ paused: true });

    // Sidebar slide-in
    tl.current.fromTo(
      sidebarRef.current,
      {
        x: "100%",
        opacity: 0,
        
      },
      {
        x: "0%",
        opacity: 1,
        duration: 0.4,
        ease: "power3.inOut",
      }
    );

    // Animate links
    tl.current.fromTo(
      linkRefs.current,
      {
        x: "100%",
        opacity: 0,
        duration: 0.2,
      },
      {
        x: "0%",
        opacity: 1,
        stagger: 0.2,
        duration: 0.4,
        ease: "power3.out",
        clearProps: "opacity, transform",
      },
      "+=0.2"
    );
  }, []);

  const toggleMenu = () => {
    if (open) {
      tl.current.reverse();
    } else {
      tl.current.play();
    }
    setOpen(!open);
  };

  return (
    <nav className="fixed top-0 left-0 w-screen z-50">
      <div className="flex justify-between items-center px-6 py-4 font-[solare]">
        <h1 className="text-lg leading-4.5 text-gray-100 font-bold">
          Lakeside <br />
          Retreat
        </h1>

        {/* Desktop Links */}
        <ul className="hidden lg:text-lg">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>

        {/* Hamburger Menu */}
        <button
          className="z-50 text-2xl cursor-pointer text-black"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {open ? <X size={28} color="black" /> : <TextAlignEnd size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className="font-[solare] fixed top-0 right-0 h-full w-2/3 bg-white/80 backdrop-blur-md flex flex-col items-start justify-center gap-8 font-medium text-2xl  opacity-0"
      >
        {["Home", "About", "Testimonials", "Contact"].map((link, i) => (
          <div
            key={i}
            ref={(el) => (linkRefs.current[i] = el)}
            className=" cursor-pointer hover:text-sky-900 pl-5"
          >
            {link}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
