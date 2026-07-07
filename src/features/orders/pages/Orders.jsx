import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { getAdminOrders, updateOrderStatus } from "../orders.service";
import defaultAvatar from "../../../assets/default-avatar.jpg";

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

const paymentOptions = ["All payments", "Pending", "Paid", "Failed"];

const methodOptions = ["All methods", "Cash", "Stripe"];

const statusStyles = {
  pending:
    "bg-[var(--warning-light)] text-[var(--warning)] border border-[var(--warning)]/30",

  confirmed:
    "bg-[var(--info-light)] text-[var(--info)] border border-[var(--info)]/30",

  processing:
    "bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/30",

  shipped:
    "bg-[var(--info-light)] text-[var(--info)] border border-[var(--info)]/30",

  delivered:
    "bg-[var(--success-light)] text-[var(--success)] border border-[var(--success)]/30",

  cancelled:
    "bg-[var(--danger-light)] text-[var(--danger)] border border-[var(--danger)]/30",

  returned:
    "bg-[var(--warning-light)] text-[var(--warning)] border border-[var(--warning)]/30",
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
      } catch (error) {
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
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

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
    currentPage * ordersPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, paymentFilter, methodFilter]);

  const handleOpenOrder = (order) => {
    setSelectedOrder(order);
    setIsDetailsLoading(true);

    setTimeout(() => {
      setNewStatus(order.status);
      setAdminNote(order.adminNote || "");
      setIsDetailsLoading(false);
    }, 500);
  };

  const handleUpdateStatus = async () => {
    try {
      await updateOrderStatus(selectedOrder._id, newStatus, adminNote);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder._id
            ? { ...order, status: newStatus, adminNote }
            : order,
        ),
      );

      setSelectedOrder(null);
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  return (
  <div className="w-full p-4 sm:p-6 md:p-8 lg:p-8 lg:pt-10">
    <div className="mb-8 flex w-full flex-col gap-4 min-[372px]:flex-row min-[372px]:items-start min-[372px]:justify-between">
      <div>
        <p className="text-xs font-semibold tracking-[0.12em] text-[var(--text-muted)]">
          ADMIN · MANAGEMENT
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[var(--text)]">
          Orders
        </h1>
      </div>

      <div className="w-fit shrink-0 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-sm">
        <span className="text-2xl font-bold text-[var(--text)]">
          {totalOrders}
        </span>

        <span className="ml-2 text-[var(--text-muted)]">
          total orders
        </span>
      </div>
    </div>

    <div className="mb-6 flex w-full flex-wrap gap-3">
      <div className="relative w-[260px] max-w-full flex-grow lg:flex-1">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[var(--text-muted)]" />

        <input
          type="text"
          placeholder="Search ID, customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-12 w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] pl-11 pr-4 text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none"
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="h-11 w-[150px] max-w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 text-sm text-[var(--text)]"
      >
        {statusOptions.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      <select
        value={paymentFilter}
        onChange={(e) => setPaymentFilter(e.target.value)}
        className="h-11 w-[150px] max-w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 text-sm text-[var(--text)]"
      >
        {paymentOptions.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      <select
        value={methodFilter}
        onChange={(e) => setMethodFilter(e.target.value)}
        className="h-11 w-[150px] max-w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 text-sm text-[var(--text)]"
      >
        {methodOptions.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>

    <div className="w-full overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
      <table className="w-full min-w-[850px] text-sm">
        <thead className="bg-[var(--table-header)]">
          <tr className="text-left text-[var(--text-muted)] uppercase text-sm">
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
      <tr key={index} className="border-t border-[var(--border)]">
        <td className="px-6 py-5">
          <div className="h-4 w-24 rounded bg-[var(--surface-secondary)] animate-pulse"></div>
        </td>
        <td className="px-6 py-5">
          <div className="h-4 w-32 rounded bg-[var(--surface-secondary)] animate-pulse"></div>
        </td>
        <td className="px-6 py-5">
          <div className="h-4 w-24 rounded bg-[var(--surface-secondary)] animate-pulse"></div>
        </td>
        <td className="px-6 py-5">
          <div className="h-4 w-24 rounded bg-[var(--surface-secondary)] animate-pulse"></div>
        </td>
        <td className="px-6 py-5">
          <div className="h-4 w-24 rounded bg-[var(--surface-secondary)] animate-pulse"></div>
        </td>
        <td className="px-6 py-5">
          <div className="h-4 w-24 rounded bg-[var(--surface-secondary)] animate-pulse"></div>
        </td>
      </tr>
    ))
  ) : paginatedOrders.length > 0 ? (
    paginatedOrders.map((order) => (
      <tr
        key={order._id}
        onClick={() => handleOpenOrder(order)}
        className="cursor-pointer border-t border-[var(--border)] hover:bg-[var(--table-hover)]"
      >
        <td className="px-6 py-5 font-semibold text-[var(--text-secondary)]">
          #{order._id.slice(-8).toUpperCase()}
        </td>

        <td className="px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[var(--surface-secondary)]">
  {order.user?.username ? (
    <span className="font-semibold text-[var(--text-secondary)]">
      {order.user.username.charAt(0).toUpperCase()}
    </span>
  ) : (
    <img
      src={defaultAvatar}
      alt="Default Avatar"
      className="h-full w-full object-cover"
    />
  )}
</div>

            <div>
              <p className="font-medium text-[var(--text)]">
                {order.user?.username || "—"}
              </p>

              <p className="text-sm text-[var(--text-muted)]">
                {order.user?.email || "—"}
              </p>
            </div>
          </div>
        </td>

        <td className="px-6 py-5 text-[var(--text-secondary)]">
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
            {order.status.charAt(0).toUpperCase() +
              order.status.slice(1)}
          </span>
        </td>

        <td className="px-6 py-5">
          <div
            className={`inline-flex rounded-md px-15 py-1 pl-2 text-[12px] uppercase ${
              order.paymentStatus === "pending"
  ? "bg-[var(--warning-light)] text-[var(--warning)]"
  : order.paymentStatus === "paid"
    ? "bg-[var(--success-light)] text-[var(--success)]"
    : "bg-[var(--danger-light)] text-[var(--danger)]"
            }`}
          >
            {order.paymentStatus}
          </div>

          <p className="mt-2 text-sm capitalize text-[var(--text-secondary)]">
            {order.paymentMethod}
          </p>
        </td>

        <td className="px-4 py-5 text-base font-semibold tabular-nums text-[var(--text)]">
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
      <td
        colSpan="6"
        className="py-20 text-center text-[var(--text-muted)]"
      >
        No orders found.
      </td>
    </tr>
  )}
</tbody>
</table>

{!isLoading && filteredOrders.length > 0 && totalPages > 1 && (
  <div className="flex items-center justify-between border-t border-[var(--border)] px-6 py-4">
    <div className="text-sm text-[var(--text-secondary)]">
      Page {currentPage} of {totalPages}
    </div>

    <div className="flex items-center gap-2">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] transition hover:bg-[var(--table-hover)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        ‹
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
            currentPage === index + 1
  ? "bg-[var(--text)] text-[var(--text-inverse)]"
  : "border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--table-hover)]"
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
        className="flex h-7 w-7  items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] transition hover:bg-[var(--table-hover)] disabled:cursor-not-allowed disabled:opacity-40"
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
    className="fixed inset-0 z-50 flex justify-end bg-black/40 text-sm"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="h-full w-full overflow-y-auto bg-[var(--card)] p-4 sm:w-[500px] sm:p-6"
    >
      <div className="mb-5 flex items-start justify-between text-sm">
        <div>
          <p className="text-xs font-semibold tracking-[0.13em] text-[var(--text-muted)]">
            ORDER DETAIL
          </p>

          <h2 className="font-bold text-[var(--text)]">
            #{selectedOrder._id.slice(-8).toUpperCase()}
          </h2>
        </div>

        <button
          onClick={() => setSelectedOrder(null)}
          className="text-[var(--text-muted)] transition hover:text-[var(--text-secondary)]"
        >
          <FiX size={24} />
        </button>
      </div>

      <hr className="my-6 border-[var(--border)]" />

      {isDetailsLoading ? (
        <div className="flex h-[70vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--primary)]"></div>
        </div>
      ) : (
        <>
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
                    ? "bg-amber-100 text-amber-700"
                    : selectedOrder.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {selectedOrder.paymentStatus}
              </span>
            </div>

            <span className="capitalize text-[var(--text-secondary)]">
              {selectedOrder.paymentMethod}
            </span>
          </div>

          <div className="mb-6">
            <p className="mb-3 text-xs font-semibold tracking-[0.12em] text-[var(--text-muted)]">
              INFO
            </p>

            <div className="space-y-4 rounded-xl border border-[var(--border)] p-4">
              <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-3">
                <span className="text-[var(--text-secondary)]">Placed</span>

                <span className="text-[var(--text)]">
                  {new Date(selectedOrder.createdAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    },
                  )}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-3">
                <span className="text-[var(--text-secondary)]">
                  Customer
                </span>

                <span className="text-[var(--text)]">
                  {selectedOrder.user?.username || "—"}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-3">
                <span className="text-[var(--text-secondary)]">Email</span>

                <span className="break-all text-right text-[var(--text)]">
                  {selectedOrder.user?.email || "—"}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <span className="text-[var(--text-secondary)]">
                  Ship to
                </span>

                <span className="text-[var(--text)]">
                  {selectedOrder.shippingAddress?.city || "—"},{" "}
                  {selectedOrder.shippingAddress?.country || "—"}
                </span>
              </div>
            </div>
          </div>

 <div>
  <p className="mb-3 text-xs font-semibold tracking-[0.12em] text-[var(--text-muted)]">
    UPDATE STATUS
  </p>

  <div className="rounded-xl border border-[var(--border)] p-4">
    <select
      value={newStatus}
      onChange={(e) => setNewStatus(e.target.value)}
      className="mb-4 h-12 w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 text-[var(--text)]"
    >
      <option value="pending">Pending</option>
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
      className="mb-4 h-28 w-full resize-none rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] p-4 text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none"
    />

    <button
      onClick={handleUpdateStatus}
      className="h-12 w-full rounded-lg bg-[var(--text)] text-[var(--text-inverse)] font-semibold transition hover:opacity-90"
    >
      Save changes
    </button>
  </div>
</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
