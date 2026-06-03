'use client';

import Link from "next/link";
import LogoLight from "../../shared/LogoLight";
import { useRouter, usePathname } from "next/navigation";
import { logout, getToken } from "@/lib/api/auth";
import { useEffect, useState } from "react";

function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [token, setToken] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
  };

  useEffect(() => {
    setToken(getToken());
  }, [pathname]);

  return (<header className="sticky top-0 z-50 bg-[var(--white-background)] shadow-md px-6 lg:px-[50px] py-4 flex items-center justify-between">

    <Link href="/" className="flex items-center gap-3">
      <LogoLight />
      <h1 className="text-2xl font-bold">
        <span>Event</span>
        <span className="text-[var(--color-accent)]">Sync</span>
      </h1>
    </Link>

    <nav className="hidden lg:block">
      <ul className="flex items-center gap-10">
        <li><Link href="/#feature-section">Fonctionnalité</Link></li>
        <li><Link href="/#how-it-works-section">Comment ça marche</Link></li>
        <li><Link href="/#roles-section">Rôles</Link></li>
        <li><Link href="/favorites">Favorites</Link></li>
      </ul>
    </nav>

    <div className="hidden lg:flex items-center gap-6">
      {token ? (
        <button
          onClick={handleLogout}
          className="text-white font-semibold bg-[var(--black)] px-6 py-2 rounded-full"
        >
          Se déconnecter
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="text-[var(--black)] font-medium"
        >
          Se connecter
        </button>
      )}

      <button className="text-white font-semibold bg-[var(--black)] px-6 py-2 rounded-full">
        Commencer
      </button>
    </div>

    <button
      className="lg:hidden text-2xl text-[var(--black)]"
      onClick={() => setMobileOpen(!mobileOpen)}
    >
      <i className="fa-solid fa-bars"></i>
    </button>

    {mobileOpen && (
      <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col gap-4 p-6 lg:hidden">
        <Link href="/#feature-section">Fonctionnalité</Link>
        <Link href="/#how-it-works-section">Comment ça marche</Link>
        <Link href="/#roles-section">Rôles</Link>
        <Link href="/favorites">Favorites</Link>

        {token ? (
          <button onClick={handleLogout} className="text-left">
            Se déconnecter
          </button>
        ) : (
          <button onClick={handleLogin} className="text-left">
            Se connecter
          </button>
        )}
      </div>
    )}
  </header>
  );
}

export default Header;
