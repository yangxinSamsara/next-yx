"use client";
import RankStaff from "@/app/assets/icons/rank-staff-picks.svg";
import RankType from "@/app/assets/icons/rank-type-icon.svg";
import Tv from "@/app/assets/icons/tv.svg";
import XpcPicks from "@/app/assets/icons/xpc-picks.svg";
export default function Svgs() {
  return (
    <div className="flex items-center space-x-10">
      <RankStaff className="w-[100px] h-[100px]" />
      <RankType className="w-[100px] h-[100px]" />
      <Tv className="w-[100px] h-[100px]" />
      <XpcPicks className="w-[100px] h-[100px]" />
    </div>
  );
}
