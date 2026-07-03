import React from "react";

const statusOptions = [
  "All statuses",
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Returned",
];

const paymentOptions = [
  "All payments",
  "Pending",
  "Paid",
  "Failed",
];

const methodOptions = [
  "All methods",
  "Cash",
  "Stripe",
];

function Orders() {
  return (
    <div className="p-8">

      <div className="flex justify-between items-start mb-8">

        <div>
          <p className="text-xs tracking-[0.35em] text-slate-400 font-semibold">
            ADMIN · MANAGEMENT
          </p>

          <h1 className="text-4xl font-bold text-slate-900 mt-2">
            Orders
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm px-4 py-2">
          <span className="text-4xl font-bold">0</span>
          <span className="ml-2 text-slate-400">
            total orders
          </span>
        </div>

      </div>

      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Search ID, customer..."
          className="flex-1 h-12 rounded-lg border border-slate-200 bg-white px-4 outline-none"
        />

        <select className="h-12 rounded-lg border border-slate-200 bg-white px-4">
          {statusOptions.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select className="h-12 rounded-lg border border-slate-200 bg-white px-4">
          {paymentOptions.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select className="h-12 rounded-lg border border-slate-200 bg-white px-4">
          {methodOptions.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr className="text-left text-slate-400 uppercase text-sm">

              <th className="px-6 py-5">Order</th>

              <th className="px-6 py-5">Customer</th>

              <th className="px-6 py-5">Date</th>

              <th className="px-6 py-5">Status</th>

              <th className="px-6 py-5">Payment</th>

              <th className="px-6 py-5">Total</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td
                colSpan="6"
                className="text-center text-slate-400 py-20"
              >
                No orders found.
              </td>

            </tr>

          </tbody>

        </table>

        

      </div>

    </div>
  );
}

export default Orders;