import { motion, AnimatePresence } from "framer-motion";
import { HiStar } from "react-icons/hi";

export default function ProductImage({ imageUrl, featured }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-t-2xl bg-gray-100 dark:bg-slate-800">
      <AnimatePresence mode="wait">
        <motion.img
          key={imageUrl}
          src={imageUrl}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />
      </AnimatePresence>

      {featured && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-900 shadow">
          <HiStar size={11} />
          Featured
        </div>
      )}
    </div>
  );
}