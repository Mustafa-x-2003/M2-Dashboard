function Drawer({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-end bg-black/40 text-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full overflow-y-auto bg-[var(--card)] p-4 pt-20 transition-all duration-300 sm:w-[500px] sm:p-6 sm:pt-20"
      >
        {children}
      </div>
    </div>
  );
}

export default Drawer;