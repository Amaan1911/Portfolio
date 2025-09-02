import Amaan from "../../public/Amaan.jpg";

function About() {
  return (
    <section className="py-20 px-6 flex flex-col items-center text-center space-y-8">
      {/* Profile Image */}
      <img
        src={Amaan}
        alt="Amaan Sheikh"
        className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-gray-700 hover:scale-105 transition-transform"
      />

      {/* Heading */}
      <h3 className="text-3xl font-bold">About Me</h3>

      {/* Description */}
      <p className="max-w-2xl text-gray-300 text-lg leading-relaxed">
        I'm a MERN stack web developer passionate about crafting modern, user-friendly applications. I love building
        interactive solutions that solve real-world problems while continuously learning and adapting to new
        technologies.
      </p>
    </section>
  );
}

export default About;
