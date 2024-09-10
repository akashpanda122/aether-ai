import Logo from '@/assets/48.png';
import XSocial from '@/assets/social-x.svg';
import InstaSocial from '@/assets/social-instagram.svg';
import YTScoial from '@/assets/social-youtube.svg';
import Image from 'next/image';

export const Footer = () => {
  return <footer className="py-5 border-t border-white/15">
    <div className="container">
      <div className="flex flex-col lg:flex-row lg:items-center gap-8">
        <div className='flex gap-2 items-center lg:flex-1'>
          <Image src={Logo} alt="" />
          {/*<Logo className="h-6 w-6" /> */}
          <div className="font-medium">Aether AI</div>
        </div>
        <nav className="flex flex-col lg:flex-row gap-5 lg:gap-7 lg:flex-1 lg:justify-center">
          <a href="#" className='text-white/70 hover:text-white text-xs md:text-sm transition'>Home</a>
          <a href="#" className='text-white/70 hover:text-white text-xs md:text-sm transition'>Features</a>
          <a href="#" className='text-white/70 hover:text-white text-xs md:text-sm transition'>About</a>
          <a href="#" className='text-white/70 hover:text-white text-xs md:text-sm transition'>Blog</a>
          <a href="#" className='text-white/70 hover:text-white text-xs md:text-sm transition'>Company</a>
        </nav>
        <div className='flex gap-5 lg:flex-1 lg:justify-end'>
          <XSocial className="text-white/40 hover:text-white transition" />
          <InstaSocial className="text-white/40 hover:text-white transition" />
          <YTScoial className="text-white/40 hover:text-white transition" />
        </div>
      </div>
    </div>
  </footer>;
};
