"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import classnames from "classnames";


export default function NavBar () {
  const links = [
    {
      label: "Dashboard", 
      href:"/"
    },
    { 
      label: "Issues",
      href: "/issues"
    },
  ]

  const currentPath = usePathname();
  // console.log(currentPath)

  return (
    <nav className="flex space-x-6 border-b-2 mb-5 px-5 h-14 items-center">
      <Link href="/"><FaBug /></Link>
      <ul className="flex space-x-6">
        {links.map((ele) => {
          return (
            // <Link key={ele.href} className={`${ele.href === currentPath ? 'text-zinic-900' : 'text-zinc-500'}  hover:text-zinc-800 transition-colors`} href={ele.href} >{ele.label}</Link>
            <Link key={ele.href} className={classnames({
              'text-zinc-900': ele.href === currentPath,
              'text-zinc-500': ele.href !== currentPath,
              'hover:text-zinc-800 transition-colors': true,
            })
            } href={ele.href} >{ele.label}</Link>
            
          );
        })}
        
      </ul>
    </nav>
  );
}