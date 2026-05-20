"use client";
import LogoLight from "../shared/LogoLight";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout,getToken } from "@/lib/api/auth";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
function Header() {
    const router = useRouter();
      const [token, setToken] = useState(null);
      const pathname = usePathname();
      const handleLogout = async () => {
        try {
          const response = await logout();
          if (response.success) {
            setToken(null);
            router.push("/auth/login");
            router.refresh();
          }
        } catch (error) {
          console.error("Logout failed", error);
        }
      };
      const handleLogin = () => {
        router.push("/auth/login");
      }
      
      useEffect(() => {
        const storedToken = getToken();
        setToken(storedToken);
      }, [pathname]);
    return (
        <header className="header z-1000 bg-[var(--white-background)] sticky top-0 px-[50px] py-4 flex flex-row justify-between items-center">
            <div className="header_brand flex justify-center items-center gap-3">
                <LogoLight />
                <h1 className="text-2xl font-bold">
                    <span>Event</span>
                    <span className="text-[var(--color-accent)]">Sync</span> 
                </h1>
            </div>
            <nav className="header_nav hidden lg:block">
                <ul className="flex flex-row justify-center items-center gap-10">
                    <li><a href="#feature-section">Fonctionnalité</a></li>
                    <li><a href="#how-it-works-section">Comment ça marche</a></li>
                    <li><a href="#roles-section">rôles</a></li>
                </ul>
            </nav>
            <div className="header_actions hidden lg:flex flex flex-row justify-center items-center gap-6">
                {
                    token ? (
                        <button onClick={handleLogout} className="text-[var(--black)] font-medium">Se déconnecter</button>
                    ) : (
                        <button onClick={handleLogin} className="text-[var(--black)] font-medium">Se connecter</button>
                    )
                }
                <button className="text-white font-semibold bg-[var(--black)] px-6 py-2 rounded-4xl">Commencer</button>
            </div>
            <button className="lg:hidden text-2xl text-[var(--black)]">
                <i className="fa-solid fa-bars"></i>
            </button>
        </header>
    )
}

export default Header;