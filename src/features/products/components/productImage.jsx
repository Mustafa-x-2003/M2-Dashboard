import { motion, AnimatePresence } from "framer-motion";

export default function ProductImage({ imageUrl }) {
  return (
    <div className="w-full h-48 relative rounded-xl">
      <AnimatePresence mode="wait">
        <motion.img
            key={imageUrl}
            src={imageUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            
            className="absolute w-full h-full object-cover"
                    />
      </AnimatePresence>
    </div>
  );
}