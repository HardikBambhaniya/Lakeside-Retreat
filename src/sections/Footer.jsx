import footerBg from "../assets/Footerimg6.jpg"

const Footer = () => {
  return (
    <section className="relative w-screen h-screen flex flex-col justify-evenly items-center">

      <div className="absolute z-10 w-screen h-screen bg-gradient-to-r from-black via-black/80 "></div>

    <img src={footerBg} alt="footer-bg" className="absolute w-screen h-screen object-cover brightness-50" />

    {/* footer-top */}
    <div className="w-full h-full flex justify-center items-end z-20">
      <h1 className="text-white font-[solare] text-9xl leading-20">Lakeside <br /> retreat</h1>
    </div>

    {/* footer-bottom */}
    <div className="w-full h-full"></div>

    </section>
  )
}

export default Footer