import { PlayCircle } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-10"
      style={{ backgroundImage: "url('/hero.png')" }}
    >
      {/* Dark Overlay */}
      <div className="bg-opacity-10 absolute inset-0 bg-neutral-900" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between px-4 md:flex-row">
        {/* Text Content */}
        <div className="flex-1 text-white">
          <h1 className="text-success mb-4 text-4xl font-bold md:text-5xl">
            ACE-MC Bohol
          </h1>
          <p className="mb-4 text-lg text-gray-200">Made by MIS DEPARTMENT</p>

          <button className="btn btn-success gap-2 text-black">
            <PlayCircle size={20} />
            Start Listening
          </button>
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
