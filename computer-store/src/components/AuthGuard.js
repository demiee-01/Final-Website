"use client";

import { useEffect, useRef } from "react";
import { SignInButton } from "@clerk/nextjs";

/* AuthGuard — auto-clicks the hidden Clerk SignInButton
   so the Clerk modal opens immediately when triggered */
export default function AuthGuard({ onClose }) {
  const btnRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      btnRef.current?.click();
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SignInButton mode="modal">
      <button ref={btnRef} onClick={onClose} className="hidden" />
    </SignInButton>
  );
}
