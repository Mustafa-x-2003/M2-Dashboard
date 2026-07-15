import axiosInstance from "../../../services/api/interceptors";
import { ENDPOINTS } from "../../../services/endpoints";

const { AUTH } = ENDPOINTS;

// ─── Standard Login / Logout ─────────────────────────────────────────────────

export const login = async (email, password) => {
  const { data } = await axiosInstance.post(AUTH.LOGIN, { email, password });
  return data;
};

export const logout = async () => {
  const { data } = await axiosInstance.post(AUTH.LOGOUT);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get(AUTH.ME);
  return data;
};

// ─── Registration (OTP flow) ──────────────────────────────────────────────────

export const sendRegisterOtp = async (email) => {
  const { data } = await axiosInstance.post(AUTH.SEND_REGISTER_OTP, { email });
  return data;
};

export const verifyRegisterOtp = async (email, otp, userData) => {
  const { data } = await axiosInstance.post(AUTH.VERIFY_REGISTER_OTP, {
    email,
    otp,
    ...userData, // e.g. { name, password }
  });
  return data;
};

// ─── Forgot Password (OTP flow) ───────────────────────────────────────────────

export const sendResetOtp = async (email) => {
  const { data } = await axiosInstance.post(AUTH.SEND_RESET_OTP, { email });
  return data;
};

export const verifyResetOtp = async (email, otp, newPassword) => {
  const { data } = await axiosInstance.post(AUTH.VERIFY_RESET_OTP, {
    email,
    otp,
    newPassword,
  });
  return data;
};

// ─── Admin ────────────────────────────────────────────────────────────────────

export const changeRole = async (userId, role) => {
  const { data } = await axiosInstance.patch(AUTH.CHANGE_ROLE, { userId, role });
  return data;
};
