function Navbar({ toggleDark }) {
  return (
    <div className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-4">

      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        Dashboard
      </h1>

      <button
        onClick={toggleDark}
        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
      >
        🌙
      </button>

    </div>
  );
}

export default Navbar;