import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar"

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      <Navbar></Navbar>
      <main className="px-5 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
