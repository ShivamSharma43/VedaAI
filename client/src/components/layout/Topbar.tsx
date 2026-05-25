"use client";

import Image from "next/image";
<<<<<<< HEAD
import { usePathname, useRouter } from "next/navigation";
import { Bell, Menu } from "lucide-react";

export function Topbar() {
  const router = useRouter();
  const pathname = usePathname();
  // Home ("/") is the root — no back button there (avoids the home⇄create loop).
  const showBack = pathname !== "/";

=======

export function Topbar() {
>>>>>>> cb2ecc69bf17e798e640729b974b3c787b11865f
  return (
    <>
      <header
        className="
        hidden 
        lg:flex
        sticky
        top-3
        z-50
        w-full
        h-[56px]
        rounded-2xl
        bg-[rgba(255,255,255,0.75)]
        backdrop-blur-md
        items-center
        justify-between
        px-3
        pl-6
        mb-1
        mr-1
      "
      >
        {/* ───────────────── LEFT SECTION ───────────────── */}
        <div className="flex items-center">
<<<<<<< HEAD
          {/* BACK BUTTON — hidden on home; elsewhere returns to the list */}
          {showBack && (
            <>
              <button
                type="button"
                aria-label="Back"
                onClick={() => router.push("/")}
                className="
                w-[40px]
                h-[40px]
                rounded-[100px]
                bg-white
                flex
                items-center
                justify-center
                shrink-0
              "
              >
                <div className="w-[24px] h-[24px] relative">
                  <Image
                    src="/back-icon.png"
                    alt="Back"
                    fill
                    className="object-contain"
                  />
                </div>
              </button>

              {/* GAP */}
              <div className="w-[10px] shrink-0" />
            </>
          )}
=======
          {/* BACK BUTTON */}
          <button
            className="
            w-[40px]
            h-[40px]
            rounded-[100px]
            bg-white
            flex
            items-center
            justify-center
            shrink-0
          "
          >
            <div className="w-[24px] h-[24px] relative">
              <Image
                src="/back-icon.png"
                alt="Back"
                fill
                className="object-contain"
              />
            </div>
          </button>

          {/* GAP */}
          <div className="w-[10px] shrink-0" />
>>>>>>> cb2ecc69bf17e798e640729b974b3c787b11865f

          {/* PAGE INFO */}
          <div className="h-[20px] flex items-center">
            {/* HOME ICON */}
            <div className="w-[20px] h-[20px] relative shrink-0">
              <Image
                src="/home-icon.png"
                alt="Home"
                fill
                className="object-contain"
              />
            </div>

            {/* GAP */}
            <div className="w-2 shrink-0" />

            {/* TITLE */}
            <div
              className="
              w-[87px]
              h-[21px]
              overflow-hidden
              text-ellipsis
              whitespace-nowrap
              text-[#A9A9A9]
              text-[16px]
              font-semibold
              tracking-[-0.64px]
            "
            >
              Assignment
            </div>
          </div>
        </div>

        {/* ───────────────── RIGHT SECTION ───────────────── */}
        <div className="flex items-center">
          {/* NOTIFICATION BUTTON */}
          <div className="w-[36px] h-[36px] relative shrink-0">
            <Image
              src="/notification-frame.png"
              alt="Notifications"
              fill
              className="object-contain"
            />
          </div>

          {/* GAP */}
          <div className="w-[10px] shrink-0" />

          {/* PROFILE SECTION */}
          <div
            className="
            h-[32px]
            px-3
            py-[6px]
            flex
            items-center
          "
          >
            {/* AVATAR */}
            <div
              className="
              w-[32px]
              h-[32px]
              rounded-full
              overflow-hidden
              relative
              shrink-0
              bg-[#F6F6F6]
            "
            >
              <Image
                src="/school-avatar.jpg"
                alt="John Doe"
                fill
                className="object-cover"
              />
            </div>

            {/* GAP */}
            <div className="w-2 shrink-0" />

            {/* NAME + CHEVRON */}
            <div className="h-[24px] flex items-center">
              {/* NAME */}
              <div
                className="
                h-[19px]
                overflow-hidden
                text-ellipsis
                whitespace-nowrap
                text-[#303030]
                text-[16px]
                font-semibold
                tracking-[-0.64px]
              "

              >
                John Doe
              </div>

              {/* GAP */}
              <div className="w-1 shrink-0" />

              {/* CHEVRON */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#303030"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

<<<<<<< HEAD
      {/* ───────────────── MOBILE TOPBAR (node 1:10088) ───────────────── */}
      <header className="sticky top-3 z-50 flex w-full px-1 lg:hidden">
        <div className="flex h-[56px] w-full items-center justify-between rounded-2xl bg-white pl-[12px] pr-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          {/* LEFT — logo + name */}
          <div className="flex items-center gap-[8px]">
            <div className="relative size-[28px] shrink-0">
              <Image
                src="/veda-logo-icon.png"
                alt="VedaAI Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="whitespace-nowrap text-[20px] font-bold leading-[1.4] tracking-[-1.2px] text-[#303030]">
              VedaAI
            </span>
          </div>

          {/* RIGHT — bell, avatar, menu */}
          <div className="flex items-center gap-[12px]">
            {/* NOTIFICATION BELL */}
            <button
              type="button"
              aria-label="Notifications"
              className="relative flex size-[36px] items-center justify-center rounded-full bg-[#f6f6f6]"
            >
              <Bell size={20} className="text-[#303030]" strokeWidth={2} />
              <span className="absolute right-[1px] top-[1px] size-[8px] rounded-full bg-[#ff5623]" />
            </button>

            {/* AVATAR */}
            <div className="relative size-[32px] shrink-0 overflow-hidden rounded-full bg-[#f6f6f6]">
              <Image
                src="/school-avatar.jpg"
                alt="Avatar"
                fill
                className="object-cover"
              />
            </div>

            {/* MENU */}
            <button
              type="button"
              aria-label="Menu"
              className="flex size-[24px] items-center justify-center"
            >
              <Menu size={24} className="text-[#1d1b20]" strokeWidth={2} />
            </button>
          </div>
        </div>
=======
      {/* ───────────────── MOBILE TOPBAR ───────────────── */}
      <header
        className="
          flex
          lg:hidden
          sticky
          top-3
          z-50
          w-[calc(100%-3px)]
          h-[56px]
          rounded-2xl
          bg-[rgba(255,255,255,0.75)]
          backdrop-blur-md
          items-center
          justify-between
          px-7
          mt-3
          mr-6
        "
      >
        {/* LEFT */}
        <div className="flex items-center">
          <div className="w-[32px] h-[32px] relative shrink-0">
            <Image
              src="/veda-logo-icon.png"
              alt="VedaAI Logo"
              fill
              className="object-contain"
            />
          </div>

          <div className="w-2 shrink-0" />

          <div
            className="
              text-[#303030]
              text-[24px]
              font-bold
              leading-[20px]
              tracking-[-1.68px]
            "
          >
            VedaAI
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* NOTIFICATION */}
          <div className="w-[36px] h-[36px] relative shrink-0">
            <Image
              src="/notification-frame.png"
              alt="Notifications"
              fill
              className="object-contain"
            />
          </div>

          {/* AVATAR */}
          <div
            className="
              w-[32px]
              h-[32px]
              rounded-full
              overflow-hidden
              relative
              shrink-0
            "
          >
            <Image
              src="/school-avatar.jpg"
              alt="Avatar"
              fill
              className="object-cover"
            />
          </div>

          {/* MENU */}
          <button
            className="
              w-[36px]
              h-[36px]
              flex
              items-center
              justify-center
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 7H20"
                stroke="#303030"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M4 12H20"
                stroke="#303030"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M4 17H20"
                stroke="#303030"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
>>>>>>> cb2ecc69bf17e798e640729b974b3c787b11865f
      </header>
    </>
  );
}