"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const createUser = useMutation(api.users.createUser);

  const [role, setRole] = useState<"landlord" | "viewer" | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  const handleComplete = async () => {
    if (!role || !user) return;

    try {
      await createUser({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
        firstName,
        lastName,
        role,
      });

      // Redirect to home after onboarding
      router.push("/");
    } catch (error) {
      console.error("Failed to create user:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!isLoaded) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black p-4">
      <div className="w-full max-w-2xl text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">
            Welcome!
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Let's get to know you better.
          </p>
        </div>

        <div className="space-y-4 max-w-md mx-auto text-left">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white"
                  placeholder="Doe"
                />
              </div>
            </div>
        </div>

        <div className="space-y-2">
           <p className="text-gray-500 dark:text-gray-400">
             How do you plan to use Aura Estates?
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => setRole("viewer")}
            className={`cursor-pointer group relative overflow-hidden rounded-2xl border-2 p-8 transition-all hover:border-black dark:hover:border-white ${
              role === "viewer"
                ? "border-black bg-white shadow-xl dark:border-white dark:bg-zinc-900"
                : "border-gray-200 bg-white dark:border-zinc-800 dark:bg-black"
            }`}
          >
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold dark:text-white">
                  I want to browse homes
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Find your dream home from our exclusive listings.
                </p>
              </div>
            </div>
            {role === "viewer" && (
              <div className="absolute top-4 right-4 text-black dark:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
            )}
          </div>

          <div
            onClick={() => setRole("landlord")}
            className={`cursor-pointer group relative overflow-hidden rounded-2xl border-2 p-8 transition-all hover:border-black dark:hover:border-white ${
              role === "landlord"
                ? "border-black bg-white shadow-xl dark:border-white dark:bg-zinc-900"
                : "border-gray-200 bg-white dark:border-zinc-800 dark:bg-black"
            }`}
          >
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold dark:text-white">
                  I want to list properties
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Showcase your real estate to potential buyers.
                </p>
              </div>
            </div>
            {role === "landlord" && (
              <div className="absolute top-4 right-4 text-black dark:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleComplete}
          disabled={!role}
          className={`w-full max-w-sm rounded-full py-4 text-lg font-semibold transition-all ${
            role
              ? "bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              : "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-zinc-800 dark:text-zinc-600"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
