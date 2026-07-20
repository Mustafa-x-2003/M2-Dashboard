import { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../../../assets/images/Logo.png";

import { useAuth } from "../../../context/AuthContext";
import { login as loginService } from "../service/authService";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!email.trim()) validationErrors.email = "Email is required";
    if (!password.trim()) validationErrors.password = "Password is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const data = await loginService(email, password);
      login(data.token, data.user);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-3xl" />

      <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT SIDE */}
          <div className="hidden lg:flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#2563eb] via-[#1d4ed8] to-[#06b6d4] p-14 min-h-[650px]">
            {/* Soft overlay */}
            <div className="absolute inset-0 bg-black/5" />

            {/* Subtle pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Brand */}
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <img
                    src={Logo}
                    alt="M2 Logo"
                    className="h-8 w-auto object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    M2 Dashboard
                  </h3>
                  <p className="text-sm text-blue-100/80">
                    Commerce Admin Platform
                  </p>
                </div>
              </div>

              {/* Hero text */}
              <div className="mt-14 max-w-xl">
                <h1 className="text-5xl font-black leading-[1.1] text-white">
                  Manage Your Store
                  <br />
                  Like a Pro
                </h1>

                <p className="mt-6 text-lg leading-8 text-blue-50/90">
                  Control products, orders, users, carts and analytics from one
                  modern dashboard experience.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="relative z-10 space-y-4">
              {[
                "Product Management",
                "Order Tracking",
                "Customer Insights",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                    ✓
                  </div>

                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-center bg-[#071026]/95 p-6 sm:p-8 lg:p-12">
            <div className="w-full max-w-md">
              {/* Mobile logo */}
              <div className="mb-6 flex justify-center lg:hidden">
                <img
                  src={Logo}
                  alt="M2 Logo"
                  className="h-14 w-auto object-contain"
                />
              </div>

              <div className="text-center">
                <h2 className="text-3xl font-bold text-white">Sign In</h2>
                <p className="mt-2 text-slate-400 text-sm">
                  Welcome back! Please sign in to your account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3.5 text-white placeholder:text-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  {errors.email && (
                    <p className="text-red-400 text-sm mt-2">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">
                      Password
                    </label>

                    <a
                      href="#"
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3.5 text-white placeholder:text-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  {errors.password && (
                    <p className="text-red-400 text-sm mt-2">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember me */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-400">
                    <input
                      type="checkbox"
                      className="rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500"
                    />
                    Remember me
                  </label>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-2xl py-3.5 font-semibold text-white transition-all duration-300 ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.99]"
                  }`}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <p className="text-center text-xs text-slate-500 mt-8">
                Protected by enterprise-grade security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
