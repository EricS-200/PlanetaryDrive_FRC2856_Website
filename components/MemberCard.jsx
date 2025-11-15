import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";

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
      <div className="flex flex-row items-center justify-center">
        <p className="font-bold text-2xl text-center pt-1">{member.name}</p>
        {member.email && (
          // <a className="" href={`mailto:${member.email}`}>
          <HoverCard openDelay={50} closeDelay={50} className="dark">
            <HoverCardTrigger href={`mailto:${member.email}`} asChild>
              <svg
                className="fill-white stroke-white mx-2 my-0 pt-[2px] "
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
                />
              </svg>
            </HoverCardTrigger>
            <HoverCardContent
              className={`dark w-auto ${member.primary ? "pb-2" : ""}`}
            >
              {member.email}
              {member.primary && (
                <p className="w-full text-center">Primary Correspondent</p>
              )}
            </HoverCardContent>
          </HoverCard>
          // </a>
        )}
      </div>
      <p className="text-xl text-center pb-1">{member.role}</p>
    </div>
  );
}
