import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import Image from 'next/image';

const testimonials = [
  {
    text: "“Aether AI has completely transformed the way I manage my digital assets”",
    name: "Sophia Perez",
    title: "Director @ ABC",
    avatarImg: avatar1,
  },
  {
    text: "“The automation and personalization features have simplified my investment process, and the results speak for themselve”",
    name: "Jamie Lee",
    title: "Founder @ XYZ",
    avatarImg: avatar2,
  },
  {
    text: "“I've seen a noticeable improvement in my returns, and the platform's user-friendly interface makes it easy to stay on top of my investments”",
    name: "Alisa Hester",
    title: "Product @ PQR",
    avatarImg: avatar3,
  },
  {
    text: "“It's a must-have for anyone serious about blockchain investments”",
    name: "Alec Whitten",
    title: "CTO @ MNQ",
    avatarImg: avatar4,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <h2 className="text-5xl md:text-6xl text-center tracking-tighter font-medium">
          Beyond Expectations.
        </h2>
        <p className="text-white/70 text-lg md:text-xl text-center mt-5 tracking-tight max-w-sm mx-auto">
          AI chatbots for real-time investment advice across chains.
        </p>
        <div className="overflow-hidden mt-10 [mask-image: linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <div className="flex gap-5">
            {testimonials.map(testimonial => (
              <div key={testimonial.name} className="border border-white/15 p-6 md:p-10 rounded-xl bg-[linear-gradient(to_bottom_left,rgb(140,69,255,.3),black)] max-w-xs md:max-w-md flex-none">
                <div className="text-lg tracking-tight md:text-2xl">
                  {testimonial.text}
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <div className="relative after:conetent-[''] after:absolute after:inset-0 after:bg-[rgb(140,69,244)] after:mix-blend-soft-light before:content-[''] before:absolute before:inset-0 before:border before:border-white/30 before:z-10 before:rounded-lg">
                    <Image 
                      src={testimonial.avatarImg} 
                      alt={`Avatar for ${testimonial.name}`}
                      className="h-11 w-11 rounded-lg grayscale"
                    />
                  </div>
                  <div className="">
                    <div>{testimonial.name}</div>
                    <div className="text-white/50 text-sm">{testimonial.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
