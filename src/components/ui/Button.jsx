import React from "react";

export default function Button({ icon, lable, style ,callback }) {
  return (
    <button onClick={callback} className={`${style} cursor-pointer  transition-all duration-300`}>
      <span>{icon}</span> <span className={`${lable == 'Logout'?'hidden lg:block':''}`}>{lable}</span>
    </button>
  );
}
