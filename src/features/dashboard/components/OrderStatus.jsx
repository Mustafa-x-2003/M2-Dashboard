import React from "react";
const OrderStatus = ({ title, data, color }) => {
  const colors = {
    amber: {
      bg: "bg-amber-400/10",
      text: "text-amber-600/40",
      border: "border-amber-600/20",
    },
    purple: {
      bg: "bg-purple-400/10",
      text: "text-purple-600/40",
      border: "border-purple-600/20",
    },
    green: {
      bg: "bg-green-500/10",
      text: "text-green-600/40",
      border: "border-green-600/20",
    },
    rose: {
      bg: "bg-rose-500/10",
      text: "text-rose-600/40",
      border: "border-rose-600/20",
    },
    sky: {
      bg: "bg-sky-400/10",
      text: "text-sky-600/40",
      border: "border-sky-600/20",
    },
  };
  return (
    <div
      className={`border-1 rounded-2xl p-4 ${colors[color].bg} ${colors[color].border}`}
    >
      <h2 className={`text-sm uppercase ${colors[color].text} tracking-[4px]`}>
        {title}
      </h2>
      <h2 className={`text-2xl mt-2 font-bold ${colors[color].text}`}>
        {data}
      </h2>
    </div>
  );
};
export default OrderStatus;
