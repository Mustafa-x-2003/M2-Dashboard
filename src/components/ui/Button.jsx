import React from "react";

export default function Button({ icon, lable, style ,callback }) {
  return (
    <button onClick={callback} className={style}>
      <span>{icon}</span> {lable}
    </button>
  );
}
