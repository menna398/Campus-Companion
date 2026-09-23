import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginSchema } from "../../schemas/loginSchema";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    try {
      login(data.email, data.password);

      toast.success("Login successful! Welcome back.");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8F6F3] px-5 py-10">
      {/* Login Card */}
      <div className="w-full max-w-[560px] rounded-[24px] border border-[#E7E2DC] bg-[#FEFCFA] px-6 py-10 shadow-[0_10px_35px_rgba(31,43,58,0.05)] sm:px-14 sm:py-[54px]">
        {/* Logo */}
        <div className="mx-auto mb-[18px] flex h-14 w-14 items-center justify-center rounded-[13px] bg-[#7095BA]">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 5.5C4 4.67 4.67 4 5.5 4H11v15H5.5A1.5 1.5 0 0 1 4 17.5v-12Z" />
            <path d="M20 5.5C20 4.67 19.33 4 18.5 4H13v15h5.5a1.5 1.5 0 0 1-1.5-1.5v-12Z" />
            <path d="M11 6h2" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-center font-serif text-[32px] font-bold leading-tight tracking-[-1px] text-[#1E2A3A] sm:text-[36px]">
          Campus Companion
        </h1>

        {/* Subtitle */}
        <p className="mb-[42px] mt-2 text-center text-[15px] leading-6 text-[#536275] sm:text-base">
          Your academic journey, beautifully organized.
        </p>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ================= EMAIL ================= */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="mb-[9px] block text-[15px] font-semibold text-[#4D5C70]"
            >
              University Email
            </label>

            <div
              className={`flex h-[54px] w-full items-center gap-3 rounded-[10px] border bg-[#FCFAF8] px-4 transition focus-within:ring-2 ${
                errors.email
                  ? "border-red-400 focus-within:border-red-400 focus-within:ring-red-400/10"
                  : "border-[#E1DDD8] focus-within:border-[#7095BA] focus-within:ring-[#7095BA]/10"
              }`}
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#91A4B3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>

              <input
                id="email"
                type="email"
                placeholder="sarah.jenkins@university.edu"
                {...register("email")}
                className="h-full w-full bg-transparent text-[15px] text-[#344356] outline-none placeholder:text-[#91A4B3]"
              />
            </div>

            {errors.email && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* ================= PASSWORD ================= */}
          <div className="mb-6">
            <div className="mb-[9px] flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-[15px] font-semibold text-[#4D5C70]"
              >
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-[15px] font-medium text-[#6E91B8] transition hover:text-[#52779E]"
              >
                Forgot Password?
              </Link>
            </div>

            <div
              className={`flex h-[54px] w-full items-center gap-3 rounded-[10px] border bg-[#FCFAF8] px-4 transition focus-within:ring-2 ${
                errors.password
                  ? "border-red-400 focus-within:border-red-400 focus-within:ring-red-400/10"
                  : "border-[#E1DDD8] focus-within:border-[#7095BA] focus-within:ring-[#7095BA]/10"
              }`}
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#91A4B3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <rect x="4" y="10" width="16" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                {...register("password")}
                className="h-full w-full bg-transparent text-[15px] text-[#344356] outline-none placeholder:text-[#91A4B3]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="shrink-0 text-xs font-medium text-[#6E91B8] hover:text-[#52779E]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* ================= SIGN IN ================= */}
          <button
            type="submit"
            className="mt-3 h-[58px] w-full rounded-[10px] bg-[#1F2C3D] text-[17px] font-semibold text-white transition duration-200 hover:bg-[#29394D] active:scale-[0.99]"
          >
            Sign In
          </button>
        </form>

        {/* ================= DIVIDER ================= */}
        <div className="my-[38px] flex items-center gap-[14px]">
          <div className="h-px flex-1 bg-[#E5E0DB]" />

          <span className="whitespace-nowrap text-[14px] text-[#94A2AF]">
            New student?
          </span>

          <div className="h-px flex-1 bg-[#E5E0DB]" />
        </div>

        {/* ================= CREATE ACCOUNT ================= */}
        <Link
          to="/register"
          className="flex h-14 w-full items-center justify-center rounded-[10px] border border-[#E1DDD8] bg-[#FEFCFA] text-[17px] font-semibold text-[#263448] transition duration-200 hover:bg-[#F8F6F3] active:scale-[0.99]"
        >
          Create an Account
        </Link>
      </div>
    </div>
  );
}
