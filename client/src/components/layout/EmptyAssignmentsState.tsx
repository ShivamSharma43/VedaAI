import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

/* Empty state for the assignments list — node 1:9708 */
export default function EmptyAssignmentsState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-[32px]">
        {/* ILLUSTRATION + TEXT */}
        <div className="flex flex-col items-center gap-[12px]">
          {/* ILLUSTRATION */}
          <div className="relative size-[300px]">
            <Image
              src="/empty-assignment-illustration.png"
              alt="No assignments"
              fill
              className="object-contain pb-[31px] pl-[7px] pt-[29px]"
            />
          </div>

          {/* TITLE + DESCRIPTION */}
          <div className="flex w-full max-w-[486px] flex-col items-center gap-[2px] text-center">
            <h2 className="text-[20px] font-bold leading-[1.4] tracking-[-0.8px] text-[#303030]">
              No assignments yet
            </h2>
            <p className="text-[16px] font-normal leading-[1.4] tracking-[-0.64px] text-[#5e5e5e]/80">
              Create your first assignment to start collecting and grading
              student submissions. You can set up rubrics, define marking
              criteria, and let AI assist with grading.
            </p>
          </div>
        </div>

        {/* CREATE BUTTON — node 1:9715 */}
        <Link
          href="/create"
          className="flex items-center gap-[4px] rounded-[48px] border-[1.5px] border-solid border-white/50 bg-[#181818] px-[24px] py-[12px] transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          <Plus size={20} className="text-white" strokeWidth={2} />
          <span className="whitespace-nowrap text-[16px] font-medium leading-[1.4] tracking-[-0.64px] text-white">
            Create Your First Assignment
          </span>
        </Link>
      </div>
    </div>
  );
}
