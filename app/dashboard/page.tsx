"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="mt-8 space-y-3">
        <p>Email: {user?.email}</p>

        <p>Username: {user?.username}</p>

        <p>First Name: {user?.first_name}</p>

        <p>Last Name: {user?.last_name}</p>
      </div>
      <button
        onClick={handleLogout}
        className="mt-8 bg-red-600 text-white px-6 py-2 rounded cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
