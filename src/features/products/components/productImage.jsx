import { motion, AnimatePresence } from "framer-motion";

export default function ProductImage({ imageUrl , featured }) {
  return (
    <div className="w-full h-48 relative rounded-xl">
      <div>
        <AnimatePresence mode="wait">
        <motion.img
            key={imageUrl}
            src={imageUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className=" absolute w-full h-full object-cover"
                    />
      </AnimatePresence>
      </div>
      {featured && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-lg text-sm">
          Featured
        </div>
      )}
    </div>
  );
}