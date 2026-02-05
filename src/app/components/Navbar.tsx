"use client";

import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white border-b border-gray-50">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900">
          Lister
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="px-4 py-2 text-sm font-medium bg-zinc-900 text-white rounded-full hover:bg-zinc-800 transition-all shadow-sm">
              Get Started
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Link href="/create-listing" className="hidden sm:block text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
            Create
          </Link>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-9 h-9 border border-zinc-200"
              }
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
}
