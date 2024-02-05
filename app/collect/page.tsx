import Image from 'next/image';

export default async function Collect() {
  return (
    <div className="flex w-full py-6 self-stretch">
      <div className="flex flex-col justify-center items-center w-full md:w-4/6">
        <div className="nft-img-wrapper">
          <Image
            className="rounded-lg border border-sky-900 p-1"
            src="/make-money-nft.gif"
            width={1200}
            height={1200}
            style={{ objectFit: 'contain' }}
            alt="nft-img"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 bg-slate-700 rounded-lg md:ml-24 md:w-2/6">
        <div className="flex w-full justify-center">Make Money Collection</div>
        <div className="flex w-full justify-center">MMOG</div>
        <div className="flex w-full justify-center">
          <button className="btn-yellow px-8 py-4 text-xl">Collect</button>
        </div>
      </div>
    </div>
  );
}
