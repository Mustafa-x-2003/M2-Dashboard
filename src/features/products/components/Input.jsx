import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Input({
  type,
  name,
  value,
  title,
  isLoading,
  styling,
  register,
  placeholder,
  validation = {},
  error,
}) {
  return (
    <label htmlFor={name}>
      {isLoading ? (
        <Skeleton width={300} />
      ) : (
        <span className="mb-2 block text-sm font-semibold text-slate-700 transition-colors duration-300">
          {title}
        </span>
      )}

      {isLoading ? (
        <Skeleton className="skeltonDesign" />
      ) : (
        <>
          <input
            type={type}
            id={name}
            defaultValue={value ?? ""}
            placeholder={placeholder}
            {...(register ? register(name, validation) : {})}
            className={`h-14 w-full rounded-2xl border border-[var(--input-border)] bg-[var(--background)] px-3 text-[var(--text)] outline-none transition-colors duration-300 focus:border-[var(--input-focus)]
              ${error ? "border-red-500" : ""} ${styling || ""}`}
          />

          {error && (
            <span className="mt-1 text-xs text-red-500">
              {error.message}
            </span>
          )}
        </>
      )}
    </label>
  );
}