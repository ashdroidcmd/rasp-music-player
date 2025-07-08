const Hero = () => {
  return (
    <section
      className="relative border-b border-b-gray-400 bg-cover bg-center bg-no-repeat py-10"
      style={{
        backgroundImage: "url('/hero.png')",
        backgroundPosition: "center 80%",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-neutral-900 opacity-80" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between px-4 md:flex-row">
        {/* Text Content */}
        <div className="flex-1 text-white">
          <h1 className="text-success mb-4 text-4xl font-bold md:text-5xl">
            ACE-Potify
          </h1>
          <p className="mb-4 text-lg font-semibold text-gray-200">
            Made by MIS DEPARTMENT
          </p>
        </div>

        {/* Image or Illustration */}
        <div className="flex flex-1 justify-center">
          <img src="/logo.png" alt="ACE Logo" className="w-80 md:w-55" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
