import Image from "next/image";
import { cn } from "@/lib/utils";

export default function MemberCard({
  className,
  member,
  picture = true,
  ...props
}) {
  return (
    <div
      className={cn(
        "w-[80vw]  sm:w-[400px] m-6 pb-2 space-y-2 overflow-hidden border-[1px] rounded-lg border-gray-800",
        className
      )}
    >
      <div className="relative w-full  h-[400px] overflow-hidden flex items-center lg:mb-1">
        <Image
          src={member.picture}
          placeholder="blur"
          className="object-center object-cover"
          alt={member.name}
        />
      </div>

      <p className="font-bold text-2xl text-center pt-1">{member.name}</p>
      <p className="text-xl text-center pb-1">{member.role}</p>
    </div>
  );
}
