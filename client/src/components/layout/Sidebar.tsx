import Image from "next/image";
import Link from "next/link";

const navItems = [
  {
    name: "Home",
    icon: "/home-icon.png",
    active: false,
  },
  {
    name: "My Groups",
    icon: "/groups-icon.png",
    active: false,
  },
  {
    name: "Assignments",
    icon: "/assignment-icon.png",
    active: true,
  },
  {
    name: "AI Teacher’s Toolkit",
    icon: "/toolkit-icon.png",
    active: false,
  },
  {
    name: "My Library",
    icon: "/library-icon.png",
    active: false,
  },
];

export default function Sidebar() {
  return (
    <aside
      className="
        hidden
        lg:flex
        sticky
        top-3
        self-start
        w-[304px]
        min-w-[304px]
        h-[710px]
        p-6
        rounded-2xl
        bg-white
        shrink-0
        flex-col
      "
      style={{
        boxShadow:
          "0 16px 48px 0 rgba(0,0,0,0.12), 0 32px 48px 0 rgba(0,0,0,0.20)",
      }}
    >
      {/* INNER WRAPPER */}
      <div
        className="
          w-full
          h-[662px]
          flex
          flex-col
        "
      >
        {/* ───────────────── TOP DIV ───────────────── */}
        <div
          className="
            w-full
            h-[426px]
            flex
            flex-col
          "
        >
          {/* BRANDING FRAME */}
          <div
            className="
              w-[251px]
              h-[40px]
              flex
              items-center
            "
          >
            {/* BRANDING CONTENT */}
            <div
              className="
                w-[136px]
                h-[40px]
                flex
                items-center
              "
            >
              {/* LOGO */}
              <div
                className="
                  w-[40px]
                  h-[40px]
                  relative
                  shrink-0
                "
              >
                <Image
                  src="/veda-logo-icon.png"
                  alt="VedaAI Logo"
                  fill
                  className="object-contain"
                />
              </div>

              {/* GAP */}
              <div className="w-2 shrink-0" />

              {/* TEXT */}
              <div
                className="
                  w-[88px]
                  h-[20px]
                  flex
                  items-center
                  text-[#303030]
                  text-[28px]
                  font-bold
                  leading-[20px]
                  tracking-[-1.68px]
                "
                
              >
                VedaAI
              </div>
            </div>
          </div>

          {/* GAP = 56px */}
          <div className="h-[56px] shrink-0" />

          {/* CREATE ASSIGNMENT BUTTON */}
          <Link
            href="/create"
            className="
              block
              w-[251px]
              h-[42px]
              relative
              transition-transform
              hover:scale-[1.1]
              active:scale-[0.98]
            "
          >
            <Image
              src="/create-assignment-button.png"
              alt="Create Assignment"
              fill
              className="object-contain"
            />
          </Link>

          {/* GAP = 56px */}
          <div className="h-[56px] shrink-0" />

          {/* NAVIGATION SECTION */}
          <div
            className="
              w-[254px]
              flex
              flex-col
              gap-2
            "
          >
            {navItems.map((item) => (
              <div
                key={item.name}
                className={`
                  w-[254px]
                  h-[40px]
                  px-3
                  py-[9px]
                  flex
                  items-center
                  rounded-xl
                  ${
                    item.active
                      ? "bg-[#F3F3F3]"
                      : "bg-transparent"
                  }
                `}
              >
                {/* ICON */}
                <div
                  className="
                    w-[20px]
                    h-[20px]
                    relative
                    shrink-0
                  "
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* GAP */}
                <div className="w-2 shrink-0" />

                {/* CONTENT */}
                <div
                  className={`
                    w-[202px]
                    h-[22px]
                    flex
                    flex-col
                    justify-center
                    flex-1
                    overflow-hidden
                    whitespace-nowrap
                    text-ellipsis
                    text-[16px]
                    leading-[140%]
                    tracking-[-0.64px]
                    ${
                      item.active
                        ? "text-[#303030] font-bold"
                        : "text-[rgba(94,94,94,0.80)] font-normal"
                    }
                  `}
                  
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GAP = 100px */}
        <div className="h-[110px] shrink-0" />

        {/* ───────────────── BOTTOM DIV ───────────────── */}
        <div
          className="
            w-full
            h-[126px]
            flex
            flex-col
          "
        >
          {/* SETTINGS FRAME */}
          <div
            className="
              w-full
              h-[38px]
              px-3
              py-2
              flex
              items-center
            "
          >
            <div
              className="
                w-[204px]
                h-[22px]
                flex
                items-center
              "
            >
              {/* ICON */}
              <div
                className="
                  w-[20px]
                  h-[22px]
                  relative
                  shrink-0
                "
              >
                <Image
                  src="/setting-icon.png"
                  alt="Settings"
                  fill
                  className="object-contain"
                />
              </div>

              {/* GAP */}
              <div className="w-2 shrink-0" />

              {/* TEXT */}
              <div
                className="
                  w-[204px]
                  h-[22px]
                  overflow-hidden
                  whitespace-nowrap
                  text-ellipsis
                  text-[rgba(94,94,94,0.80)]
                  text-[16px]
                  font-normal
                  leading-[140%]
                  tracking-[-0.64px]
                "
                
              >
                Settings
              </div>
            </div>
          </div>

          {/* GAP */}
          <div className="h-2 shrink-0" />

          {/* SCHOOL CARD */}
          <div
            className="
              w-[256px]
              h-[80px]
              rounded-2xl
              bg-[#F0F0F0]
              p-3
              flex
              items-center
            "
          >
            <div
              className="
                w-[232px]
                h-[56px]
                flex
                items-center
              "
            >
              {/* AVATAR */}
              <div
                className="
                  w-[59px]
                  h-[56px]
                  rounded-[59px]
                  overflow-hidden
                  relative
                  shrink-0
                "
              >
                <Image
                  src="/school-avatar.jpg"
                  alt="School Avatar"
                  fill
                  className="object-cover"
                />
              </div>

              {/* GAP */}
              <div className="w-2 shrink-0" />

              {/* CONTENT */}
              <div
                className="
                  w-[165px]
                  h-[44px]
                  flex
                  flex-col
                  items-start
                  flex-1
                "
              >
                {/* SCHOOL NAME */}
                <div
                  className="
                    w-[165px]
                    h-[22px]
                    flex
                    flex-col
                    justify-center
                    self-stretch
                    overflow-hidden
                    whitespace-nowrap
                    text-ellipsis
                    text-[#303030]
                    text-[16px]
                    font-bold
                    leading-[140%]
                    tracking-[-0.64px]
                  "
                  
                >
                  Delhi Public School
                </div>

                {/* PLACE */}
                <div
                  className="
                    w-[165px]
                    h-[22px]
                    flex
                    flex-col
                    justify-center
                    self-stretch
                    overflow-hidden
                    whitespace-nowrap
                    text-ellipsis
                    text-[#5E5E5E]
                    text-[14px]
                    font-normal
                    leading-[140%]
                    tracking-[-0.56px]
                  "
                  
                >
                  Bokaro Steel City
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}