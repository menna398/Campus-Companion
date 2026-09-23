import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerSchema } from "../../schemas/registerSchema";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { register: registerAccount } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      agree: false,
    },
  });

  const onSubmit = (data) => {
    try {
      registerAccount(data);

      toast.success(
        "Account created successfully! Welcome to Campus Companion.",
      );

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8F6F3] px-5 py-10">
      {/* Register Card */}
      <div className="w-full max-w-[510px] rounded-[24px] border border-[#E7E2DC] bg-[#FEFCFA] px-6 py-10 shadow-[0_10px_35px_rgba(31,43,58,0.05)] sm:px-12 sm:py-[44px]">
        {/* Logo */}
        <div className="mx-auto mb-[10px] flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#7095BA]">
          <svg
            width="23"
            height="23"
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

        {/* Heading */}
        <h1 className="text-center font-serif text-[28px] font-bold leading-tight tracking-[-0.7px] text-[#1E2A3A] sm:text-[30px]">
          Begin Your Companion
        </h1>

        <p className="mb-[26px] mt-1 text-center text-[13px] leading-5 text-[#536275] sm:text-[14px]">
          Join thousands of students organizing their academic excellence.
        </p>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ================= FULL NAME ================= */}
          <div className="mb-[14px]">
            <label
              htmlFor="fullName"
              className="mb-[6px] block text-[13px] font-semibold text-[#4D5C70]"
            >
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              placeholder="Sarah Jenkins"
              {...register("fullName")}
              className={`h-[42px] w-full rounded-[8px] border bg-[#FCFAF8] px-3 text-[14px] text-[#344356] outline-none placeholder:text-[#91A4B3] transition focus:ring-2 ${
                errors.fullName
                  ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
                  : "border-[#E1DDD8] focus:border-[#7095BA] focus:ring-[#7095BA]/10"
              }`}
            />

            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* ================= EMAIL ================= */}
          <div className="mb-[14px]">
            <label
              htmlFor="email"
              className="mb-[6px] block text-[13px] font-semibold text-[#4D5C70]"
            >
              University Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="sarah.jenkins@university.edu"
              {...register("email")}
              className={`h-[42px] w-full rounded-[8px] border bg-[#FCFAF8] px-3 text-[14px] text-[#344356] outline-none placeholder:text-[#91A4B3] transition focus:ring-2 ${
                errors.email
                  ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
                  : "border-[#E1DDD8] focus:border-[#7095BA] focus:ring-[#7095BA]/10"
              }`}
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* ================= STUDENT ID ================= */}
          <div className="mb-[14px]">
            <label
              htmlFor="studentId"
              className="mb-[6px] block text-[13px] font-semibold text-[#4D5C70]"
            >
              Student ID
            </label>

            <input
              id="studentId"
              type="text"
              placeholder="U2026-88401"
              {...register("studentId")}
              className={`h-[42px] w-full rounded-[8px] border bg-[#FCFAF8] px-3 text-[14px] text-[#344356] outline-none placeholder:text-[#91A4B3] transition focus:ring-2 ${
                errors.studentId
                  ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
                  : "border-[#E1DDD8] focus:border-[#7095BA] focus:ring-[#7095BA]/10"
              }`}
            />

            {errors.studentId && (
              <p className="mt-1 text-xs text-red-500">
                {errors.studentId.message}
              </p>
            )}
          </div>

          {/* ================= UNIVERSITY ================= */}
          <div className="mb-[14px]">
            <label
              htmlFor="university"
              className="mb-[6px] block text-[13px] font-semibold text-[#4D5C70]"
            >
              University
            </label>

            <div className="relative">
              <select
                id="university"
                defaultValue=""
                {...register("university")}
                className={`h-[42px] w-full appearance-none rounded-[8px] border bg-[#FCFAF8] px-3 pr-10 text-[14px] text-[#344356] outline-none transition focus:ring-2 ${
                  errors.university
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
                    : "border-[#E1DDD8] focus:border-[#7095BA] focus:ring-[#7095BA]/10"
                }`}
              >
                <option value="" disabled>
                  Select your university
                </option>

                <option value="ivy">
                  Ivy League University of Science & Arts
                </option>

                <option value="harvard">Harvard University</option>

                <option value="stanford">Stanford University</option>

                <option value="mit">
                  Massachusetts Institute of Technology
                </option>
              </select>

              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#526274"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>

            {errors.university && (
              <p className="mt-1 text-xs text-red-500">
                {errors.university.message}
              </p>
            )}
          </div>

          {/* ================= PASSWORD ================= */}
          <div className="mb-[20px]">
            <label
              htmlFor="password"
              className="mb-[6px] block text-[13px] font-semibold text-[#4D5C70]"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                {...register("password")}
                className={`h-[42px] w-full rounded-[8px] border bg-[#FCFAF8] px-3 pr-16 text-[14px] text-[#344356] outline-none placeholder:text-[#91A4B3] transition focus:ring-2 ${
                  errors.password
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
                    : "border-[#E1DDD8] focus:border-[#7095BA] focus:ring-[#7095BA]/10"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-[#6E91B8] hover:text-[#52779E]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* ================= TERMS ================= */}
          <label className="mb-[14px] flex cursor-pointer items-start gap-2">
            <input
              type="checkbox"
              {...register("agree")}
              className="mt-[2px] h-[15px] w-[15px] shrink-0 cursor-pointer accent-[#7095BA]"
            />

            <span className="text-[12px] leading-5 text-[#647286]">
              I agree to the{" "}
              <Link to="/terms" className="text-[#6E91B8] hover:underline">
                Terms of Academic Integrity
              </Link>{" "}
              & privacy policies.
            </span>
          </label>

          {errors.agree && (
            <p className="mb-3 text-xs text-red-500">{errors.agree.message}</p>
          )}

          {/* ================= CREATE ACCOUNT ================= */}
          <button
            type="submit"
            className="h-[48px] w-full rounded-[9px] bg-[#1F2C3D] text-[15px] font-semibold text-white transition duration-200 hover:bg-[#29394D] active:scale-[0.99]"
          >
            Create Account
          </button>
        </form>

        {/* ================= SIGN IN ================= */}
        <p className="mt-[16px] text-center text-[13px] text-[#667487]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-[#6E91B8] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
