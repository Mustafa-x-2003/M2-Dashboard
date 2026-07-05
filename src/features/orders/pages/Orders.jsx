import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { getAdminOrders, updateOrderStatus } from "../orders.service";

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

const statusStyles = {
  pending:
    "bg-yellow-50 text-yellow-700 border border-yellow-200",
  confirmed:
    "bg-sky-50 text-sky-600 border border-sky-200",
  processing:
    "bg-violet-50 text-violet-600 border border-violet-200",
  shipped:
    "bg-cyan-50 text-cyan-600 border border-cyan-200",
  delivered:
    "bg-emerald-50 text-emerald-600 border border-emerald-200",
  cancelled:
    "bg-red-50 text-red-600 border border-red-200",
  returned:
    "bg-orange-50 text-orange-600 border border-orange-200",
};

function Orders() {
const [orders, setOrders] = useState([]);
const [totalOrders, setTotalOrders] = useState(0);
const [selectedOrder, setSelectedOrder] = useState(null);
const [newStatus, setNewStatus] = useState("");
const [adminNote, setAdminNote] = useState("");

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      setIsLoading(true);

const data = await getAdminOrders();

console.log(data);
console.log(data.orders[0]);
setOrders(data.orders);
setTotalOrders(data.total);
    }catch (error) {
  console.error(error);
} finally {
  setIsLoading(false);
}
  };

  fetchOrders();
}, []);

const [searchTerm, setSearchTerm] = useState("");
const [statusFilter, setStatusFilter] = useState("All statuses");
const [paymentFilter, setPaymentFilter] = useState("All payments");
const [methodFilter, setMethodFilter] = useState("All methods");
const [currentPage, setCurrentPage] = useState(1);
const ordersPerPage = 14;

const [isLoading, setIsLoading] = useState(true);

const filteredOrders = orders.filter((order) => {
  const searchValue = searchTerm.toLowerCase();

  const matchesSearch =
    order._id.toLowerCase().includes(searchValue) ||
    order.user?.username?.toLowerCase().includes(searchValue) ||
    order.user?.email?.toLowerCase().includes(searchValue);

  const matchesStatus =
    statusFilter === "All statuses" ||
    order.status === statusFilter.toLowerCase();

  const matchesPayment =
    paymentFilter === "All payments" ||
    order.paymentStatus === paymentFilter.toLowerCase();

  const matchesMethod =
    methodFilter === "All methods" ||
    order.paymentMethod === methodFilter.toLowerCase();

  return matchesSearch && matchesStatus && matchesPayment && matchesMethod;
});

const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

const paginatedOrders = filteredOrders.slice(
  (currentPage - 1) * ordersPerPage,
  currentPage * ordersPerPage
);

useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, statusFilter, paymentFilter, methodFilter]);

const handleUpdateStatus = async () => {
  try {
    await updateOrderStatus(selectedOrder._id, newStatus, adminNote);

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === selectedOrder._id
          ? { ...order, status: newStatus, adminNote }
          : order
      )
    );

    setSelectedOrder(null);
  } catch (error) {
    console.error("Failed to update order status:", error);
  }
};

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 lg:p-8 lg:pt-10">
    <div className="mb-8 flex w-full max-w-[1200px] flex-col gap-4 min-[372px]:flex-row min-[372px]:items-start min-[372px]:justify-between">
  <div>
    <p className="text-xs tracking-[0.12em] text-slate-400 font-semibold">
      ADMIN · MANAGEMENT
    </p>

    <h1 className="text-3xl font-bold text-slate-900 mt-2">
      Orders
    </h1>
  </div>

  <div className="w-fit shrink-0 rounded-xl bg-white px-4 py-3 shadow-sm">
    <span className="text-2xl font-bold">{totalOrders}</span>
    <span className="ml-2 text-slate-400">total orders</span>
  </div>
</div>

  <div className="mb-6 flex w-full max-w-[1200px] flex-wrap gap-3">
  <div className="relative w-[260px] max-w-full flex-grow lg:flex-1">
    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400" />

    <input
      type="text"
      placeholder="Search ID, customer..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 outline-none"
    />
  </div>

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="h-11 w-[150px] max-w-full rounded-lg border border-slate-200 bg-white px-4 text-sm"
  >
    {statusOptions.map((item) => (
      <option key={item}>{item}</option>
    ))}
  </select>

  <select
    value={paymentFilter}
    onChange={(e) => setPaymentFilter(e.target.value)}
    className="h-11 w-[150px] max-w-full rounded-lg border border-slate-200 bg-white px-4 text-sm"
  >
    {paymentOptions.map((item) => (
      <option key={item}>{item}</option>
    ))}
  </select>

  <select
    value={methodFilter}
    onChange={(e) => setMethodFilter(e.target.value)}
    className="h-11 w-[150px] max-w-full rounded-lg border border-slate-200 bg-white px-4 text-sm"
  >
    {methodOptions.map((item) => (
      <option key={item}>{item}</option>
    ))}
  </select>
</div>

      
      <div className="w-full max-w-[1200px] overflow-x-auto rounded-2xl bg-white shadow-sm">
       <table className="w-full min-w-[850px] text-sm">
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
  {isLoading ? (
  Array.from({ length: 8 }).map((_, index) => (
    <tr key={index} className="border-t border-slate-100">
      <td className="px-6 py-5">
        <div className="h-4 w-24 rounded bg-slate-100 animate-pulse"></div>
      </td>
      <td className="px-6 py-5">
        <div className="h-4 w-32 rounded bg-slate-100 animate-pulse"></div>
      </td>
      <td className="px-6 py-5">
        <div className="h-4 w-24 rounded bg-slate-100 animate-pulse"></div>
      </td>
      <td className="px-6 py-5">
        <div className="h-4 w-24 rounded bg-slate-100 animate-pulse"></div>
      </td>
      <td className="px-6 py-5">
        <div className="h-4 w-24 rounded bg-slate-100 animate-pulse"></div>
      </td>
      <td className="px-6 py-5">
        <div className="h-4 w-24 rounded bg-slate-100 animate-pulse"></div>
      </td>
    </tr>
  ))
) : paginatedOrders.length > 0 ? (
    paginatedOrders.map((order) => (
      <tr
        key={order._id}
        onClick={() => {
          setSelectedOrder(order);
          setNewStatus(order.status);
          setAdminNote(order.adminNote || "");
        }}
        className="border-t border-slate-100 cursor-pointer hover:bg-slate-50"
      >
        <td className="px-6 py-5 font-semibold text-slate-500 dark:text-slate-400">
          #{order._id.slice(-8).toUpperCase()}
        </td>

        <td className="px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 font-semibold">
              {order.user?.username?.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="font-medium text-slate-900">
                {order.user?.username || "—"}
              </p>

              <p className="text-sm text-slate-400">
                {order.user?.email || "—"}
              </p>
            </div>
          </div>
        </td>

        <td className="px-6 py-5 text-slate-500">
          {new Date(order.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </td>

        <td className="px-6 py-5">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
              statusStyles[order.status]
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-current"></span>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </td>

        <td className="px-6 py-5">
          <div
            className={`inline-flex pl-2 rounded-md px-15 py-1 text-xs text-[12px] uppercase ${
              order.paymentStatus === "pending"
                ? "bg-amber-100 text-amber-700 font-semibold"
                : order.paymentStatus === "paid"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {order.paymentStatus}
          </div>

          <p className="mt-2 text-sm text-slate-500 capitalize">
            {order.paymentMethod}
          </p>
        </td>

        <td className="px-4 py-5 font-semibold text-base tabular-nums ">
          {order.totalPrice.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          EGP
        </td>
      </tr>
    ))
  ) : (
    <tr>
  <td colSpan="6" className="py-20 text-center text-slate-400">
    No orders found.
  </td>
</tr>
  )}
</tbody>
        </table>
{!isLoading && filteredOrders.length > 0 && totalPages > 1 && (
  <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
    <div className="text-sm text-slate-500">
      Page {currentPage} of {totalPages}
    </div>

    <div className="flex items-center gap-2">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ‹
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
            currentPage === index + 1
              ? "bg-slate-900 text-white"
              : "border border-slate-200 text-slate-500 hover:bg-slate-50"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() =>
          setCurrentPage((prev) => Math.min(prev + 1, totalPages))
        }
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ›
      </button>
    </div>
  </div>
)}
        
      </div>
{selectedOrder && (
  <div
    onClick={() => setSelectedOrder(null)}
    className="fixed inset-0 bg-black/40 flex justify-end z-50"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="h-full w-full overflow-y-auto bg-white p-4 sm:w-[520px] sm:p-6"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-xs tracking-[0.25em] text-slate-400 font-semibold">
            ORDER DETAIL
          </p>
          <h2 className="font-bold text-slate-900">
            #{selectedOrder._id.slice(-8).toUpperCase()}
          </h2>
        </div>

        <button
          onClick={() => setSelectedOrder(null)}
          className="text-2xl text-slate-400"
        >
          ×
        </button>
      </div>

      <hr className="border-slate-200 my-6" />

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

  <div className="flex gap-3">

    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
        statusStyles[selectedOrder.status]
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-current"></span>
      {selectedOrder.status.charAt(0).toUpperCase() +
        selectedOrder.status.slice(1)}
    </span>

    <span
      className={`inline-flex items-center rounded-md px-4 py-1.5 text-xs font-bold uppercase ${
        selectedOrder.paymentStatus === "pending"
          ? "bg-yellow-100 text-yellow-700"
          : selectedOrder.paymentStatus === "paid"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {selectedOrder.paymentStatus}
    </span>

  </div>

  <span className="text-slate-500 capitalize">
    {selectedOrder.paymentMethod}
  </span>

</div>

      <div className="mb-6">
        <p className="text-xs tracking-[0.12em] text-slate-400 font-semibold mb-3">
          INFO
        </p>

        <div className="border border-slate-100 rounded-xl p-4 space-y-4 ">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
            <span className="text-slate-500">Placed</span>
            <span>
              {new Date(selectedOrder.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
            <span className="text-slate-500">Customer</span>
            <span>{selectedOrder.user?.username || "—"}</span>
          </div>

         <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
            <span className="text-slate-500">Email</span>
            <span className="text-right break-all">
  {selectedOrder.user?.email || "—"}
</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <span className="text-slate-500">Ship to</span>
            <span>
              {selectedOrder.shippingAddress?.city || "—"},{" "}
              {selectedOrder.shippingAddress?.country || "—"}
            </span>
          </div>
        </div>
      </div>

{/* This is the Items section in order details */}

      {/* <div className="mb-8">
  <p className="mb-4 text-xs font-semibold tracking-[0.12em] text-slate-400">
    ITEMS
  </p>

  <div className="space-y-4">
    {selectedOrder.items.map((item, index) => (
      <div
        key={item._id || index}
       className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
      >
       <div className="flex min-w-0 items-center gap-4">
          <img
            src={item.image}
            alt={item.name}
            className="h-16 w-16 rounded-lg object-cover"
          />

          <div>
            <p className="break-words font-medium text-slate-900">{item.name}</p>

            <p className="text-sm text-slate-400">
              × {item.quantity} ·{" "}
              {item.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              EGP
            </p>
          </div>
        </div>

        <p className="text-lg font-semibold text-slate-900">
          {(item.quantity * item.price).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          EGP
        </p>
      </div>
    ))}
  </div>
</div>

<div className="mb-8 rounded-2xl border border-slate-200 p-5">
  <div className="flex justify-between border-b border-slate-100 py-3">
    <span className="text-slate-500">Subtotal</span>
    <span>
      {selectedOrder.subtotal?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}{" "}
      EGP
    </span>
  </div>

  <div className="flex justify-between border-b border-slate-100 py-3">
    <span className="text-slate-500">Shipping</span>
    <span>
      {selectedOrder.shippingFee?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}{" "}
      EGP
    </span>
  </div>

  <div className="flex justify-between border-b border-slate-100 py-3">
    <span className="text-slate-500">Tax (14%)</span>
    <span>
      {selectedOrder.tax?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}{" "}
      EGP
    </span>
  </div>

{selectedOrder.discount > 0 && (
  <div className="flex justify-between py-2 border-b border-slate-200">
    <span className="text-slate-500">Discount</span>
    <span className="text-emerald-600">
      -{selectedOrder.discount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
      })}{" "}
      EGP
    </span>
  </div>
)}

  <div className="flex justify-between pt-4 text-lg font-bold">
    <span>Total</span>
    <span>
      {selectedOrder.totalPrice?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}{" "}
      EGP
    </span>
  </div>
</div> */}


      <div>
        <p className="text-xs tracking-[0.12em] text-slate-400 font-semibold mb-3">
          UPDATE STATUS
        </p>

        <div className="border border-slate-200 rounded-xl p-4">
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full h-12 border border-slate-200 rounded-lg px-4 mb-4 bg-slate-50"
          >
            <option value="pending ">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="returned">Returned</option>
          </select>

          <textarea
  value={adminNote}
  onChange={(e) => setAdminNote(e.target.value)}
  placeholder="Admin note (optional)..."
  className="w-full resize-none outline-none h-28 border border-slate-200 rounded-lg p-4 mb-4 bg-slate-50"
/>

        <button
  onClick={handleUpdateStatus}
  className="w-full hover:bg-slate-700 h-12 bg-slate-900 text-white rounded-lg font-semibold"
>
  Save changes
</button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default Orders;