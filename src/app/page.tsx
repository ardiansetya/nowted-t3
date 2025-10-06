"use client"

import { RedirectToSignIn, useUser } from "@clerk/nextjs";

export default  function Home() {
  const {isSignedIn} = useUser()
  if (!isSignedIn) {
    return RedirectToSignIn({})
  }
  return (
    <main className="flex min-h-screen items-center justify-center gap-4 p-4">
    test
    </main>
  );
}
