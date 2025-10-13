const SidebarRight = () => {
  return (
    <div className="w-72 bg-white border-l px-4 py-3 overflow-y-auto">
      <h2 className="font-bold text-lg mb-2">Recent Students</h2>
      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <span className="w-8 h-8 bg-indigo-500 rounded-full"></span>
          <div>
            <p className="font-medium">Samantha William</p>
            <p className="text-xs text-gray-500">Class VII A</p>
          </div>
        </li>
        <li className="flex items-center gap-2">
          <span className="w-8 h-8 bg-indigo-400 rounded-full"></span>
          <div>
            <p className="font-medium">Tony Soap</p>
            <p className="text-xs text-gray-500">Class VII A</p>
          </div>
        </li>
      </ul>

      <h2 className="font-bold text-lg mt-6 mb-2">Messages</h2>
      <div className="space-y-3 text-sm">
        <p><b>Samantha:</b> Lorem ipsum...</p>
        <p><b>Tony:</b> Lorem ipsum...</p>
      </div>

      <h2 className="font-bold text-lg mt-6 mb-2">Foods Menu</h2>
      <div className="space-y-3">
        <div className="p-2 border rounded">🍖 Beef Steak</div>
        <div className="p-2 border rounded">🥞 Pancake with Honey</div>
        <div className="p-2 border rounded">🍜 Japanese Ramen</div>
      </div>
    </div>
  );
};

export default SidebarRight;
