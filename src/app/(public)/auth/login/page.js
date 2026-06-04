'use client';
import Link from "next/link";
import LogoLight from "@/components/shared/LogoLight";
import { useState } from "react";
import { login } from "@/lib/api/auth";
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    
    const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
        const result = await login(new FormData(e.currentTarget));
        if (result.success) {
          window.location.href = "/admin";
        } else {
          setError(result.message || "something went wrong");
        }

    } catch (err) {
      setError("Can not connect to the server");
    }
  };
    return (
        <form onSubmit={handleLogin} className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm flex flex-col items-center gap-8">
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="flex items-center gap-3">
                    <LogoLight />
                    <span className="text-2xl font-bold">
                        <span className="text-[var(--black)]">Event</span>
                        <span className="text-[var(--color-accent)]">Sync</span>
                    </span>
                </div>

                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold text-[var(--black)]">
                        Espace Organisateur
                    </h1>
                    <p className="text-[var(--color-gray)] text-sm">
                        Connectez-vous pour gérer vos événements
                    </p>
                </div>

                <div className="w-full flex flex-col gap-5">

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[var(--black)]">
                            Email
                        </label>
                        <input
                            name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                            placeholder="admin@eventsync.com"
                            className="border border-[var(--color-gray)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[var(--black)]">
                            Mot de passe
                        </label>
                        <input
                            name="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required 
                            placeholder="••••••••"
                            className="border border-[var(--color-gray)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "Hide" : "Show"} Password
                        </button>
                    </div>

                    <button type="submit" className="w-full bg-[var(--black)] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity cursor-pointer">
                        Se connecter
                    </button>
                </div>

                <Link href="/" className="flex items-center gap-2 text-sm text-[var(--color-gray)] hover:text-[var(--black)] transition-colors group">
                    <i className="fa-solid fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform duration-200"></i>
                    Retour à l'accueil
                </Link>

            </div>
        </form>
    );
}