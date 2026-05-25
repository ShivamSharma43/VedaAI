import Image from "next/image";
import Link from "next/link";

export default function EmptyAssignmentsState() {
  return (
    <div
      className="
        flex
        flex-1
        items-center
        justify-center
      "
    >
      {/* CONTENT WRAPPER */}
      <div
        className="
          flex
          flex-col
          items-center
        "
      >
        {/* ILLUSTRATION CONTAINER */}
        <div
          className="
            w-[300px]
            h-[300px]
            relative
          "
        >
          <Image
            src="/empty-assignment-illustration.png"
            alt="No Assignments"
            fill
            className="
              object-contain
              pt-[29px]
              pl-[7px]
              pb-[31px]
            "
          />
        </div>

        {/* GAP = 12px */}
        <div className="h-[12px]" />

        {/* TITLE */}
        <div
          className="
            w-[181px]
            h-[28px]
            text-center
            text-[#303030]
            text-[20px]
            font-bold
            leading-[140%]
            tracking-[-0.8px]
          "
          
        >
          No assignments yet
        </div>

        {/* DESCRIPTION */}
        <div
          className="
            w-[486px]
            h-[66px]
            text-center
            text-[rgba(94,94,94,0.80)]
            text-[16px]
            font-normal
            leading-[140%]
            tracking-[-0.64px]
          "
          
        >
          Create your first assignment to start collecting and grading
          student submissions. You can set up rubrics, define marking
          criteria, and let AI assist with grading.
        </div>

        {/* GAP = 32px */}
        <div className="h-[32px]" />

        {/* BUTTON */}
        <Link
          href="/create"
          className="
            w-[277px]
            h-[46px]
            relative
            transition-all
            duration-300
            hover:scale-[1.03]
            active:scale-[0.98]
          "
        >
          <Image
            src="/create-first-assignment-button.png"
            alt="Create First Assignment"
            fill
            className="object-contain"
          />
        </Link>
      </div>
    </div>
  );
}