"use client";

import { ReactNode, useState } from "react";

export default function VersionSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="rounded-lg border border-zinc-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <span className="text-xl text-zinc-500">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="border-t border-zinc-200 p-6">
          {children}
        </div>
      )}
    </section>
  );
}