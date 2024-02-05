import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <h2 className="text-4xl">Welcome to</h2>
      <h2 className="text-7xl">Omniland</h2>
      <p className="text-xl">Collect and bridge ONFTs using LayerZero messaging protocol.</p>
      <Link href="/collect" className="mt-6">
        <button className="btn-yellow px-8 py-4 text-xl">Get started</button>
      </Link>
    </div>
  );
}
