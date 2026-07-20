import { FiImage, FiX } from "react-icons/fi";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { BsStars } from "react-icons/bs";

export default function GallerySection({
    images,
    handleRemoveImage,
    handleImageChange,
    handleDragOver,
    handleDrop,
    fileInputRef,
}) {
    return (
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl transition-colors duration-300">
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                    <MdOutlineAddPhotoAlternate size={24} />
                </div>

                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                        Gallery
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-300">
                        Upload multiple images and preview instantly.
                    </p>
                </div>
            </div>

            {images.length > 0 && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {images.map((img, index) => (
                        <article
                            key={index}
                            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-950/80"
                        >
                            <div className="flex h-48 items-center justify-center bg-white dark:bg-slate-950/70">
                                <img
                                    src={img.url ? img.url : URL.createObjectURL(img)}
                                    alt={`Preview ${index}`}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveImage(index);
                                }}
                                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100"
                            >
                                <FiX />
                            </button>

                            <div className="px-4 py-3 text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-300">
                                Image {index + 1}
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {images.length < 5 && (
                <label
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-cyan-400/30 bg-cyan-500/5 p-8 text-center transition hover:bg-cyan-500/10"
                >
                    <FiImage className="mb-3 h-6 w-6 text-cyan-400" />

                    <p className="font-semibold text-slate-800 dark:text-white">
                        Upload images
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
                        PNG, JPG, WEBP • multiple files supported
                    </p>

                    <input
                        hidden
                        type="file"
                        accept="image/*"
                        multiple
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                </label>
            )}

            <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-500/5 dark:text-emerald-100">
                <div className="flex items-center gap-2 font-semibold">
                    <BsStars className="h-4 w-4" />
                    Senior UX
                </div>

                <p className="mt-1">
                    Optimized product creation experience with responsive design and
                    smooth interactions.
                </p>
            </div>
        </section>
    );
}