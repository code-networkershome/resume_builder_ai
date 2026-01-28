"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { createClient } from "@/lib/supabase/client";

export const Navbar = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        checkUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        window.location.reload();
    };

    return (
        <nav className="w-full px-6 py-4 flex items-center justify-between sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <Link href="/">
                <Logo />
            </Link>
            <div className="flex items-center gap-6">
                <Link href="/convert" className="text-slate-500 hover:text-primary font-bold text-sm transition-colors px-1">
                    JSON Editor
                </Link>
                {!loading && (
                    user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard">
                                <Button size="sm">Dashboard</Button>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-slate-500 hover:text-rose-500 font-bold text-sm transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/auth/login" className="text-slate-600 hover:text-primary transition-colors text-sm font-semibold">
                                Login
                            </Link>
                            <Link href="/templates">
                                <Button variant="outline" size="sm" className="rounded-full px-6">
                                    + Build Resume
                                </Button>
                            </Link>
                        </div>
                    )
                )}
            </div>
        </nav>
    );
};
