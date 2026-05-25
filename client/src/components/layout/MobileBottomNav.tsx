"use client";

<<<<<<< HEAD
import type { ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, FileText, Sparkles, Plus } from "lucide-react";

type IconProps = {
  size?: string | number;
  strokeWidth?: string | number;
  className?: string;
};

/* Filled calendar — node 1:10078 (icon_filled/Calendar).
   Uses currentColor so it follows the active/inactive text color. */
function CalendarFilledIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* binding posts */}
      <rect x="7" y="2.5" width="2" height="5" rx="1" />
      <rect x="15" y="2.5" width="2" height="5" rx="1" />
      {/* header band (rounded top) */}
      <path d="M3 9V8a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v1Z" />
      {/* body (rounded bottom) */}
      <path d="M3 10.5h18V17a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
    </svg>
  );
}

/* Bottom navbar — node 1:10065 */
const ITEMS: { label: string; href: string; Icon: ComponentType<IconProps> }[] =
  [
    { label: "Home", href: "/", Icon: LayoutGrid },
    { label: "My Groups", href: "/groups", Icon: CalendarFilledIcon },
    { label: "Library", href: "/library", Icon: FileText },
    { label: "AI Toolkit", href: "/toolkit", Icon: Sparkles },
  ];

export default function MobileBottomNav() {
  const pathname = usePathname();
  // The create form has its own Previous/Next nav in this corner, so the
  // "create" FAB is redundant (and would collide) there.
  const showFab = pathname !== "/create";

  return (
    <div className="fixed bottom-[13px] left-1/2 z-50 flex w-[373px] max-w-[calc(100%-20px)] -translate-x-1/2 flex-col gap-[12px] lg:hidden">
      {/* FLOATING "+" FAB — node 1:9906 */}
      {showFab && (
        <div className="flex justify-end">
          <Link
            href="/create"
            aria-label="Create assignment"
            className="flex size-[48px] items-center justify-center rounded-full bg-white shadow-[0px_16px_24px_rgba(0,0,0,0.12),0px_32px_24px_rgba(0,0,0,0.2)] transition-transform active:scale-95"
          >
            <Plus size={20} className="text-[#ff5623]" strokeWidth={2} />
          </Link>
        </div>
      )}

      {/* BOTTOM NAVBAR — node 1:10065 */}
      <nav className="flex items-center justify-between rounded-[24px] bg-[#181818] px-[24px] py-[8px] shadow-[0px_16px_24px_rgba(0,0,0,0.12),0px_32px_24px_rgba(0,0,0,0.2)]">
        {ITEMS.map(({ label, href, Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex size-[52px] flex-col items-center justify-center gap-[4px] ${
                active ? "text-white" : "text-white/25"
              }`}
            >
              <Icon size={20} strokeWidth={2} />
              <span className="whitespace-nowrap text-center text-[12px] font-semibold leading-[1.4] tracking-[-0.48px]">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
=======
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
>>>>>>> cb2ecc69bf17e798e640729b974b3c787b11865f
