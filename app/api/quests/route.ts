const QUESTS_COLLECTIONS_DATA_MOCK = [
  {
    name: 'Get Started',
    quests: [
      {
        name: 'Get Started',
        img: 'https://l3img.b-cdn.net/ipfs/QmUyYwj2dBTKoqTNzHdjYQVuhzJvBXb6z1JsY9fGx9KekC?optimizer=image',
        steps: [{ passed: true }, { passed: false }],
        xp: 10,
      },
      {
        name: 'How to Bridge to Layer2s',
        img: 'https://l3img.b-cdn.net/ipfs/QmVudM5Rnei88aGYMB3DAmoG5h7LNokrtRxf2hvbGYdP4W?optimizer=image',
        steps: [{ passed: true }, { passed: true }, { passed: false }],
        xp: 25,
      },
      {
        name: 'Beyond Ethereum',
        img: 'https://l3img.b-cdn.net/ipfs/QmWZPxg5So1Bub4zy8BNn1gdmHDvZMh1bmcvweMGEeB12L?optimizer=image',
        steps: [{ passed: false }, { passed: false }, { passed: false }, { passed: false }],
        xp: 50,
      },
      {
        name: 'NFTs for Beginners',
        img: 'https://l3img.b-cdn.net/ipfs/QmSVV4aNZ4WG8XM8uGKJRdwGk6d8XZweeubmhEsgqJJrbe?optimizer=image',
        steps: [
          { name: '1', passed: true },
          { name: '2', passed: false },
          { name: '3', passed: false },
        ],
        xp: 75,
      },
      {
        name: 'Understanding DeFi Liquidity',
        img: 'https://l3img.b-cdn.net/ipfs/QmNWXG7AZXagwTykdJYz7BjkuDFSTC82P2X8mXj3DC3dJY?optimizer=image',
        steps: [{ passed: false }, { passed: false }],
        xp: 10,
      },
      {
        name: 'Intro to On-Chain Swaps',
        img: 'https://l3img.b-cdn.net/ipfs/QmeNBYHQsMkn6GKj7LX5AC9ybYKu2fgxqMo6gkvvFPJbXY?optimizer=image',
        steps: [{ passed: true }, { passed: false }, { passed: false }],
        xp: 50,
      },
    ],
  },
];

export async function GET(request: Request) {
  return Response.json({ data: QUESTS_COLLECTIONS_DATA_MOCK });
}
