import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8F6F3] px-5 py-10">
      <div className="w-full max-w-[500px] rounded-[24px] border border-[#E7E2DC] bg-[#FEFCFA] px-6 py-10 text-center shadow-[0_10px_35px_rgba(31,43,58,0.05)] sm:px-12">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-[13px] bg-[#7095BA]">
          <span className="text-2xl text-white">?</span>
        </div>

        <h1 className="font-serif text-[30px] font-bold text-[#1E2A3A]">
          Forgot Password?
        </h1>

        <p className="mx-auto mt-3 max-w-[380px] text-[15px] leading-6 text-[#536275]">
          Password recovery will be available once the authentication backend
          is connected.
        </p>

        <Link
          to="/login"
          className="mt-8 flex h-12 w-full items-center justify-center rounded-[10px] bg-[#1F2C3D] text-[15px] font-semibold text-white transition hover:bg-[#29394D]"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}