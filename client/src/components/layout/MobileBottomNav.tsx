"use client";

import Image from "next/image";
import Link from "next/link";

export default function MobileBottomNav() {
  return (
    <div
      className="
        fixed
        bottom-0
        left-1/2
        -translate-x-1/2
        z-50

        flex
        flex-col
        items-end

        w-[373px]
        pb-[13px]
      "
    >
      {/* PLUS BUTTON */}
      <Link
        href="/create"
        className="
          relative
          w-[48px]
          h-[48px]
          mb-[13px]

          transition-all
          duration-300

          hover:scale-[1.1]
          active:scale-[0.96]
        "
      >
        <Image
          src="/mobile-plus-button.png"
          alt="Create Assignment"
          fill
          className="object-contain"
        />
      </Link>

      {/* NAVBAR */}
      <div
        className="
          relative
          w-[373px]
          h-[72px]
        "
      >
        <Image
          src="/mobile-bottom-navbar.png"
          alt="Bottom Navigation"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}