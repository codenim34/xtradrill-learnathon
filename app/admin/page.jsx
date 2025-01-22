"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ADMIN_EMAILS from "@/lib/config/admins";

export default function AdminPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    if (isSignedIn === false) {
      router.push("/sign-in");
      return;
    }

    const userEmail = user?.primaryEmailAddress?.emailAddress;
    console.log("User Email:", userEmail);
    
    
    // Check if user is admin
    const isAdmin = Array.isArray(ADMIN_EMAILS) && userEmail && ADMIN_EMAILS.includes(userEmail);
    console.log("Is Admin:", isAdmin);

    if (!isAdmin) {
      setHasPermission(false);
      return;
    }

    setHasPermission(true);
  }, [isSignedIn, user, router]);

  if (hasPermission === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">
            Sorry, you don't have permission to access the admin dashboard. This area is restricted to authorized administrators only.
          </p>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (hasPermission === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome {user?.firstName || "Admin"}!
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800">Total Users</h3>
              <p className="mt-2 text-3xl font-semibold text-blue-600">150</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-green-800">Active Jobs</h3>
              <p className="mt-2 text-3xl font-semibold text-green-600">45</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-purple-800">Applications</h3>
              <p className="mt-2 text-3xl font-semibold text-purple-600">328</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                View All Users
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Manage Jobs
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Review Applications
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="text-sm font-medium text-gray-900">New user registered</p>
                  <p className="text-sm text-gray-500">John Doe</p>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="text-sm font-medium text-gray-900">New job posted</p>
                  <p className="text-sm text-gray-500">Senior Developer Position</p>
                </div>
                <span className="text-sm text-gray-500">5 hours ago</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">Application submitted</p>
                  <p className="text-sm text-gray-500">For: Frontend Developer</p>
                </div>
                <span className="text-sm text-gray-500">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
