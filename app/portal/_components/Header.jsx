'use client'
import { UserButton } from '@clerk/nextjs'

import { usePathname } from 'next/navigation'



function Header() {
    const path =usePathname();

   
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
         <h2 className="text-xl font-bold bg-gradient-to-r from-blue-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    AI Mock Interview
                </h2>
        <ul  className="hidden  md:flex gap-6">
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/portal'&&'text-primary font-bold'} `}>Portal</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/portal/questions'&&'text-primary font-bold'} `}>Questions</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/portal/upgrade'&&'text-primary font-bold'} `}>Upgrade</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/portal/how'&&'text-primary font-bold'} `}>How it Works?</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header