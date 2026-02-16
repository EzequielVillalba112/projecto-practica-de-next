"use client";
import { SessionProvider } from "next-auth/react";

const GlobalContext = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default GlobalContext;
