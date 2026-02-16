"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const NavDropdown = ({nameUser, action }: {nameUser: string, action: () => void}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Cerrar al hacer click afuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-gray-50 transition hover:bg-gray-100 hover:text-gray-900"
      >
        {nameUser}
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-md bg-slate-950 shadow-lg">
          <Link
            href="/profile"
            className="block rounded-md px-4 py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-800"
            onClick={() => setOpen(false)}
          >
            Mi Perfil
          </Link>

          <Link
            href="/settings"
            className="block rounded-md px-4 py-2 text-sm text-gray-50 hover:bg-gray-100 hover:text-gray-800"
            onClick={() => setOpen(false)}
          >
            Configuración
          </Link>

          <button
            onClick={() => {
              setOpen(false);
              action();
            }}
            className="block w-full rounded-md px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
