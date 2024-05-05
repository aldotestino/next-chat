import { BackgroundBeams } from '@/components/ui/background-beams';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="w-full h-full max-w-screen-md flex items-center justify-center mx-auto px-4 md:px-0">
      <div className="z-10 text-center space-y-6">
        <h1 className="text-6xl font-bold text-transparent bg-gradient-to-b from-slate-50 to-slate-600 bg-clip-text">Next Chat</h1>
        <div className="space-y-4">
          <p className='max-w-prose text-lg'>Experience the future of communication with Next Chat. Effortless conversations, innovative features, and seamless connections await. Join us and embrace the next evolution of chatting.</p>
          <div className="flex gap-2 items-center justify-center">
            <Link href="/auth/signin" className={buttonVariants({ size: 'lg' })}>Sign In</Link>
            <Link href="/auth/signup" className={buttonVariants({ variant: 'secondary', size: 'lg' })}>Sign Up</Link>
          </div>
        </div>
      </div>
      <BackgroundBeams className='hidden md:block' />
    </main>
  );
}
