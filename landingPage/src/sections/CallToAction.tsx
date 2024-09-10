import { Button } from "@/components/button";
import starsBg from '@/assets/stars.png';
import gridLines from '@/assets/grid-lines.png';
import Link from 'next/link'

export const CallToAction = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div className="border border-white/15 py-24 rounded-xl overflow-hidden relative" style={{
          backgroundImage: `url(${starsBg.src})`,
        }}>
          <div className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)]" style={{
            backgroundImage: `url(${gridLines.src})`,
          }}></div>
          <div className="relative">
            <h2 className="text-5xl md:text-6xl max-w-xl mx-auto tracking-tighter text-center font-medium">
              Maximize Crypto Portfolio Performance Today!
            </h2>
            <p className="text-center text-lg md:text-xl max-w-md mx-auto text-white/70 px-4 mt-5 tracking-tight">
              Our intelligent vault automates fund allocation and yield optimization, maximizing your returns while you relax.
            </p>
            <div className="flex justify-center mt-8">
            <Link href="https://aether-ai-home.vercel.app/" passHref={true}>
              <Button>
                Join Waitlist
              </Button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
