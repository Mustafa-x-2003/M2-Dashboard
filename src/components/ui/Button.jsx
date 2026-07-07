import React from "react";

export default function Button({ icon, lable, style ,callback }) {
  return (
    <button onClick={callback} className={`${style} transition-all duration-300`}>
      <span>{icon}</span> {lable}
    </button>
  );
}
