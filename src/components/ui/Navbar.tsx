"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { ImportResumeModal } from "@/components/dashboard/ImportResumeModal";
import { useResume } from "@/lib/context/ResumeContext";

export const Navbar = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();
    const { resetData } = useResume();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        checkUser();
    }, [supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        window.location.reload();
    };

    return (

        <nav className="fixed w-full z-50 top-0 left-0 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl transition-all">
            <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
                <div
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                    onClick={() => {
                        router.push("/");
                    }}
                >
                    <Logo />
                </div>
                <div className="flex items-center gap-8">
                    {!loading && (
                        user ? (
                            <div className="flex items-center gap-6">
                                <div
                                    className="cursor-pointer"
                                    onClick={() => {
                                        router.push("/dashboard");
                                    }}
                                >
                                    <Button size="sm">Dashboard</Button>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="text-slate-500 hover:text-rose-500 font-bold text-sm transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-6">
                                <div
                                    className="text-slate-600 hover:text-primary transition-colors text-sm font-bold cursor-pointer"
                                    onClick={() => {
                                        router.push("/auth/login");
                                    }}
                                >
                                    Login
                                </div>
                                <div
                                    className="cursor-pointer"
                                    onClick={() => {
                                        resetData();
                                        setTimeout(() => {
                                            router.push("/templates");
                                        }, 100);
                                    }}
                                >
                                    <Button variant="outline" size="sm" className="rounded-full px-6 h-9 font-bold border-primary text-primary hover:bg-primary/5 shadow-sm hover:shadow-md transition-all">
                                        + Build Resume
                                    </Button>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </nav>
    );
};
