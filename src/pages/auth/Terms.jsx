import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="min-h-screen w-full bg-[#F8F6F3] px-5 py-10">
      <div className="mx-auto max-w-[800px] rounded-[24px] border border-[#E7E2DC] bg-[#FEFCFA] p-6 shadow-[0_10px_35px_rgba(31,43,58,0.05)] sm:p-10">
        <h1 className="font-serif text-[32px] font-bold text-[#1E2A3A]">
          Terms of Academic Integrity
        </h1>

        <p className="mt-4 leading-7 text-[#536275]">
          Campus Companion is designed to help students organize their academic
          activities and manage their study responsibilities.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-[#1E2A3A]">
          Academic Integrity
        </h2>

        <p className="mt-2 leading-7 text-[#536275]">
          Students are responsible for using the platform in accordance with
          their university's academic policies and integrity guidelines.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-[#1E2A3A]">Privacy</h2>

        <p className="mt-2 leading-7 text-[#536275]">
          Student information should be handled responsibly and used only for
          the purposes supported by the Campus Companion platform.
        </p>

        <Link
          to="/register"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-[10px] bg-[#1F2C3D] px-6 text-[15px] font-semibold text-white transition hover:bg-[#29394D]"
        >
          Back to Registration
        </Link>
      </div>
    </div>
  );
}
