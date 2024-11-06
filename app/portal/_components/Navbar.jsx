'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from '@clerk/nextjs';

function Navbar() {
    const { isSignedIn } = useUser();

    return (
        <nav className="bg-gray-900 text-white px-4 py-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <h2 className="text-xl font-bold bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    AI Mock Interview
                </h2>

                {/* Links */}
                <div className="flex items-center gap-6">
                    <Link href="/dashboard" className="text-white hover:text-blue-400">
                        Portal
                    </Link>
                    <Link href="/questions" className="text-white hover:text-blue-400">
                        Questions
                    </Link>
                    <Link href="/how-it-works" className="text-white hover:text-blue-400">
                        How It Works
                    </Link>

                    {/* Conditional Authentication Buttons */}
                    {isSignedIn ? (
                        <UserButton />
                    ) : (
                        <Link href="/dashboard">
                            <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-transparent hover:border-blue-600 hover:text-white">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
