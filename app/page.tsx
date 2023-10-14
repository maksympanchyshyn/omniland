import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <h2 className="text-4xl">You have a wallet</h2>
      <h2 className="text-7xl">Now what?</h2>
      <p className="text-xl">Join 500,000+ people exploring crypto every day with us.</p>
      <button className="border px-8 py-4 rounded-xl text-xl mt-6">Get started</button>
    </div>
  );
}
