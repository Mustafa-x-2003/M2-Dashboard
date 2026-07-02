import { useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../../../context/AuthContext";
import { login as loginService } from "../service/authService";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginService(email, password);

      login(data.token, data.user);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 justify-center items-center h-screen"
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-gray-600 w-100 border-0 outline-0 p-5 rounded-2xl"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-gray-600 w-100 border-0 outline-0 p-5 rounded-2xl"
      />

      <button
        className="bg-blue-600 text-white w-100 border-0 outline-0 p-5 rounded-2xl"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
