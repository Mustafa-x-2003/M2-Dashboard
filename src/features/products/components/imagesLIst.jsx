import { useState, useEffect } from "react";
import ProductImage from "./productImage";

export default function ImagesList({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full h-48 overflow-hidden">
      <ProductImage  imageUrl={images[currentIndex]?.url} />
    </div>
  );
}
    