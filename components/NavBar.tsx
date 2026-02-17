"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flex } from "@radix-ui/themes";
import clsx from "clsx";
import { useSession, signOut } from "next-auth/react";
import NavDropdown from "./NavDropDown";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-950 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <Flex align="center" justify="between" className="h-14">
          {/* Logo */}
          <Link href="/" className="cursor-pointer">
            <h1 className="text-3xl font-bold">My App</h1>
          </Link>
          {/* Links */}
          <Flex className="gap-2">
            <ul className="flex gap-3.5 px-3 py-1">
              {session ? (
                <li>
                  <Link
                    href="/dashboard"
                    className={clsx(
                      "rounded-md px-3 py-1.5 text-sm font-medium text-gray-50 transition hover:bg-gray-100 hover:text-gray-900",
                      pathname === "/dashboard"
                        ? "bg-gray-900 text-white"
                        : "text-gray-50 hover:bg-gray-100 hover:text-gray-900",
                    )}
                  >
                    Dashboard
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      href="/auth/register"
                      className={clsx(
                        "rounded-md px-3 py-1.5 text-sm font-medium text-gray-50 transition hover:bg-gray-100 hover:text-gray-900",
                        pathname === "/auth/register"
                          ? "bg-gray-900 text-white"
                          : "text-gray-50 hover:bg-gray-100 hover:text-gray-900",
                      )}
                    >
                      Registrarme
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/auth/login"
                      className={clsx(
                        "rounded-md px-3 py-1.5 text-sm font-medium text-gray-50 transition hover:bg-gray-100 hover:text-gray-900",
                        pathname === "/auth/login"
                          ? "bg-gray-900 text-white"
                          : "text-gray-50 hover:bg-gray-100 hover:text-gray-900",
                      )}
                    >
                      Iniciar Sesión
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {session?.user?.name && (
              <NavDropdown
                nameUser={session?.user?.name || "Cuenta"}
                action={signOut}
              />
            )}
          </Flex>
        </Flex>
      </div>
    </nav>
  );
};

export default Navbar;
