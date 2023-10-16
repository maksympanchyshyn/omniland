import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <h2 className="text-4xl">You have a wallet</h2>
      <h2 className="text-7xl">Now what?</h2>
      <p className="text-xl">Join 500,000+ people exploring crypto every day with us.</p>
      <Link href="/quests" className="mt-6">
        <button className="btn-yellow px-8 py-4 text-xl">Get started</button>
      </Link>
    </div>
  );
}
