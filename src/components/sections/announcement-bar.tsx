import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const AnnouncementBar = () => {
  return (
    <div className="bg-background text-foreground">
      <div className="mx-auto flex h-10 items-center justify-center">
        <Link
          href="/products/pxl-motion-pack"
          className="group flex items-center gap-2 px-4 text-xs font-medium uppercase tracking-wider text-foreground transition-opacity hover:opacity-70 sm:px-6 lg:px-8"
        >
          <span>NEW RELEASE!</span>
          <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default AnnouncementBar;