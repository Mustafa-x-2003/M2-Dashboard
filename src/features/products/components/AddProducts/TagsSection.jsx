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
        <span className="my-2 block text-sm font-semibold text-[var(--text-secondary)]  transition-colors duration-300">
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
            className="h-14 w-full text-[var(--text)] rounded-2xl border border-[var(--input-border)] focus:border-[var(--input-focus)]  bg-[var(--input-bg)] px-5 outline-none transition duration-300 focus:border-[var(--input-focus)]"
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
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] -200 bg-[var(--card)] text-[var(--text)]  px-3 py-2 text-xs"
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
