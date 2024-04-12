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
        "h-[500px] w-[400px] m-6 space-y-2 overflow-hidden border-[1px] rounded-lg border-gray-800 flex flex-col",
        className
      )}
    >
      <div className="relative w-full h-[80%] overflow-hidden flex items-center mb-1">
        <Image
          src={member.picture}
          placeholder="blur"
          className="object-center object-cover"
          alt={member.name}
        />
      </div>

      <p className="font-bold text-2xl text-center">{member.name}</p>
      <p className="text-xl text-center">{member.role}</p>
    </div>
  );
}
