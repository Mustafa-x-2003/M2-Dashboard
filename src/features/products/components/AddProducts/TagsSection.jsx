import React from "react";
import { FiPlus, FiX } from "react-icons/fi";

const TagsSection = ({
    register,
    tagInput,
    setTagInput,
    addTag,
    tags,
    removeTag,
}) => {
    return (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/80">
            <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Tags
                </span>

                <div className="flex gap-3">
                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addTag();
                            }
                        }}
                        placeholder="Type a tag and press +"
                        className="h-14 flex-1 rounded-2xl border border-slate-200 bg-white px-5 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    />

                    <button
                        type="button"
                        onClick={addTag}
                        className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-500 text-white"
                    >
                        <FiPlus />
                    </button>
                </div>

                <input type="hidden" {...register("tags")} />
            </label>

            <div className="mt-4 flex flex-wrap gap-2">
                {tags.length === 0 ? (
                    <p className="text-sm text-slate-500">
                        Add one or more tags to organize the product.
                    </p>
                ) : (
                    tags.map((tag, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => removeTag(index)}
                            className="inline-flex items-center gap-2 rounded-full bg-gray-500 px-3 py-2 text-xs text-white"
                        >
                            #{tag}
                            <FiX />
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export default TagsSection;