import Image from 'next/image';
import Link from 'next/link';
import Spline from '@splinetool/react-spline/next';

export default function Home() {
  return (
    <main>
      <Spline
        scene="https://prod.spline.design/KJSSjo0l7-jEGoW0/scene.splinecode" 
      />
    </main>
  );
}

const AboutSection = () => {
  return (
    <section className="bg-black text-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative h-[480px] lg:h-auto min-h-[480px]">
          <Image
            src="https://res.cloudinary.com/dwh2xecbx/image/upload/v1761011230/khabeb_ir3e0a.png"
            alt="Creator Alexander standing in front of a red car"
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:p-20 xl:px-24">
          <h2 className="font-display text-[48px] font-semibold leading-[1.2] tracking-[-0.01em] mb-8">
            Who I am?
          </h2>
          <p className="font-body text-xl text-white mb-6 leading-relaxed">
            I've been in the editing game PROFESSIONALLY for 5 years. But have created content for 7 years! I started exactly where everybody else does. For fun. I used to edit LOL montages as I hoped to be an streamer.
          </p>
          <p className="font-body text-xl text-text-secondary mb-12 leading-relaxed">
            Mastering video editing helped me work with the best creators and helped me achieve financial freedom. And I'm here to help you in your video editing journey.
          </p>
          <Link
            href="/products/ultimate-creator-toolkit"
            className="self-start rounded-full border border-white bg-transparent px-8 py-4 font-body text-base font-medium leading-none tracking-[0.02em] text-white transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Create faster
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
