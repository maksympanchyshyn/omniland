export default function Header() {
  const menuItems = [
    {
      text: 'Quests',
      link: '#',
    },
    {
      text: 'Achievements',
      link: '#',
    },
  ];

  return (
    <div className="w-full fixed border-b border-b-slate-500">
      <header className="flex justify-between w-full px-12 py-5 font-mono">
        <div className="flex">WEB3QUESTS</div>
        <div className="flex items-center gap-10">
          {menuItems.map((item) => (
            <div key={item.text} className="flex hover:text-sky-500">
              <a href={item.link}>{item.text}</a>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}