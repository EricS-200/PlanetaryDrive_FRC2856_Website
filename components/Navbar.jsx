"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
    const pathname = usePathname();

    const pages = [
        {
            name: 'Home',
            page: '/'
        },
        {
            name: 'FRC Info',
            page: '/frc'
        },
        {
            name: 'Photo Gallery',
            page: '/gallery'
        },
        {
            name: 'About Us',
            page: '/about'
        },
        {
            name: 'Contact',
            page: '/contact'
        },
        {
            name: 'Members',
            page: '/members'
        },
        {
            name: 'Sponsors',
            page: '/sponsors'
        },
    ];

    return (
        <div className="w-full bg-orange-400 h-12 flex justify-center items-center">
            {pages.map(({ name, page }) => (
                <Link className={`${pathname === page ? 'opacity-100' : 'opacity-80'} pl-8`} key={name} href={page}>
                    {name}
                </Link>
            ))}
        </div>
    );
}

