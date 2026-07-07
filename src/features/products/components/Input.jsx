import React from "react"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

export default function Input({ type, name, value, title, isLoading, styling, register }) {
  return (
    <label htmlFor={name} className="labelDesign">
      {isLoading ? <Skeleton width={300} /> : <p>{title}</p>}
      {isLoading ? (
        <Skeleton className="skeltonDesign" />
      ) : (
        <input
          type={type}
          id={name}
          className={`inputDesign ${styling}`}
          defaultValue={value ?? ""}
          {...(register ? register(name) : {})}
        />
      )}
    </label>
  )
}
