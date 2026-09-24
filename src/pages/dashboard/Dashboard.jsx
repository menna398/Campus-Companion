import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-[20px] border border-[#E7E2DC] bg-[#FEFCFA] p-8 shadow-[0_10px_35px_rgba(31,43,58,0.05)]">
          <p className="text-sm text-[#7B8795]">Welcome back,</p>

          <h2 className="mt-1 font-serif text-3xl font-bold text-[#1E2A3A]">
            {user?.fullName}
          </h2>

          <p className="mt-3 text-[#536275]">
            You are successfully logged in to Campus Companion.
          </p>
        </div>
      </main>
    </div>
  );
}
