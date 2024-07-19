import Image from "next/image";
import RankStaffPicks from "@/app/assets/icons/rank-staff-picks.svg?url";
import RankType from "@/app/assets/icons/rank-type-icon.svg?url";
import Tv from "@/app/assets/icons/tv.svg?url";
import XpcPicks from "@/app/assets/icons/xpc-picks.svg?url";
import Svgs from "@/components/svg/svgs";

export default function SvgPage() {
  return (
    <main className="flex flex-col items-center space-x-5 p-10">
      <Image src={"/next.svg"} width={200} height={41} alt="logo" />
      <div className="flex items-center space-x-10 my-5">
        <Image src={RankStaffPicks} width={100} height={100} alt="logo" />
        <Image src={RankType} width={100} height={100} alt="logo" />
        <Image src={Tv} className="bg-white" width={100} height={100} alt="logo" />
        <Image src={XpcPicks} width={100} height={100} alt="logo" />
      </div>
      <div className="flex items-center space-x-10">
        <Svgs />
      </div>
    </main>
  );
}
