import React from "react";
import { FiTrash2, FiX } from "react-icons/fi";

const DeleteUserModal = ({
  isOpen,
  onClose,
  onConfirm,
  user,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div
  className="
    fixed
    inset-0
    z-[100]
    flex
    items-center
    justify-center
    px-4
    lg:left-64
  "
>
      {/* Overlay */}
      <div
        className="
          absolute inset-0
          bg-black/60
          backdrop-blur-md
        "
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative
          w-full max-w-[420px]
          overflow-hidden
          rounded-2xl
          border
          bg-[var(--card)]
          shadow-2xl
          animate-[zoomIn_.25s_ease]
        "
        style={{
          borderColor: "var(--border)",
        }}
      >
        {/* Top Accent */}
        <div
          className="h-1 w-full"
          style={{
            background: "var(--danger)",
          }}
        />

        <div className="p-6">
          {/* Close */}
          <button
            onClick={onClose}
            className="
              absolute right-5 top-5
              flex h-8 w-8
              items-center justify-center
              rounded-full
              transition
              hover:bg-[var(--surface-secondary)]
            "
            style={{
              color: "var(--text-muted)",
            }}
          >
            <FiX size={18} />
          </button>

          {/* Icon */}
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
            "
            style={{
              background: "var(--danger-light)",
              color: "var(--danger)",
            }}
          >
            <FiTrash2 size={28} />
          </div>

          {/* Text */}
          <div className="mt-5 text-center">
            <h2
              className="
                text-xl
                font-semibold
                tracking-tight
              "
              style={{
                color: "var(--text)",
              }}
            >
              Delete user permanently?
            </h2>

            <p
              className="
                mt-3
                text-sm
                leading-6
              "
              style={{
                color: "var(--text-secondary)",
              }}
            >
              You are about to remove this account. This action cannot be
              reversed.
            </p>

            {/* User Card */}
            <div
              className="
                mt-5
                flex
                items-center
                gap-3
                rounded-xl
                border
                p-3
                text-left
              "
              style={{
                borderColor: "var(--border)",
                background: "var(--surface-secondary)",
              }}
            >
              <img
                src={user?.avatar || "https://i.pravatar.cc/100"}
                className="
                  h-11
                  w-11
                  rounded-full
                  object-cover
                "
              />

              <div>
                <p
                  className="font-medium"
                  style={{
                    color: "var(--text)",
                  }}
                >
                  {user?.username}
                </p>

                <p
                  className="text-sm"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="
                flex-1
                rounded-xl
                border
                py-2.5
                text-sm
                font-medium
                transition
                hover:bg-[var(--surface-secondary)]
              "
              style={{
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              Cancel
            </button>

            <button
              disabled={loading}
              onClick={onConfirm}
              className="
                flex-1
                rounded-xl
                py-2.5
                text-sm
                font-medium
                text-white
                transition
                hover:opacity-90
                disabled:opacity-50
              "
              style={{
                background: "var(--danger)",
              }}
            >
              {loading ? "Deleting..." : "Delete User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
