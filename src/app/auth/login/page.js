import Link from "next/link";
import LogoLight from "@/components/shared/LogoLight";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm flex flex-col items-center gap-8">

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
                            type="email"
                            placeholder="admin@eventsync.com"
                            className="border border-[var(--color-gray)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[var(--black)]">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="border border-[var(--color-gray)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors"
                        />
                    </div>

                    <button className="w-full bg-[var(--black)] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity cursor-pointer">
                        Se connecter
                    </button>

                </div>

                <Link href="/" className="flex items-center gap-2 text-sm text-[var(--color-gray)] hover:text-[var(--black)] transition-colors group">
                    <i className="fa-solid fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform duration-200"></i>
                    Retour à l'accueil
                </Link>

            </div>
        </div>
    );
}