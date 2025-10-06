import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import React from 'react'

const page = () => {
  return (
    <main className="flex min-h-screen items-center justify-center gap-4 p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">{`You're not signed in`}</h1>
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <button className="h-10 cursor-pointer rounded-full bg-[#6c47ff] px-4 text-sm font-medium text-white sm:h-12 sm:px-5 sm:text-base">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
      </div>
    </main>
  );
}

export default page