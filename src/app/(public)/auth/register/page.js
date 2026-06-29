"use client";
import { useState } from "react";
import { register } from "@/lib/api/auth";
import Link from "next/link";
import LogoLight from "@/components/shared/LogoLight";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [bio, setBio] = useState("");
    const [externalLinks, setExternalLinks] = useState([{ host: "", link: "" }]);
    const [role, setRole] = useState("participant");
    const [photoUrl, setphotoUrl] = useState(null);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const addExternalLink = () => {
        setExternalLinks([...externalLinks, { host: "", link: "" }]);
    };

    const updateExternalLink = (index, field, value) => {
        const updated = [...externalLinks];
        updated[index][field] = value;
        setExternalLinks(updated);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.currentTarget);
        try {
            const linksObject = {};
            externalLinks.forEach((item) => {
                if (item.host && item.link) {
                    linksObject[item.host] = item.link;
                }
            });
            formData.set("external_links", JSON.stringify(linksObject));
            const result = await register(formData);
            if (result.success) {
                window.location.href = "/";
            } else {
                setError(result.message || "something went wrong");
            }
        } catch (err) {
            setError("Can not connect to the server");
        }
    };

    const inputClass = "border border-[var(--color-gray)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors w-full";
    const labelClass = "text-sm font-medium text-[var(--black)]";

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md flex flex-col items-center gap-8">

                <div className="flex items-center gap-3">
                    <LogoLight />
                    <span className="text-2xl font-bold">
                        <span className="text-[var(--black)]">Event</span>
                        <span className="text-[var(--color-accent)]">Sync</span>
                    </span>
                </div>

                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold text-[var(--black)]">Créer un compte</h1>
                    <p className="text-[var(--color-gray)] text-sm">Rejoignez EventSync et participez aux événements</p>
                </div>

                {error && (
                    <div className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
                        <i className="fa-solid fa-circle-exclamation text-red-500 text-sm"></i>
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleRegister} className="w-full flex flex-col gap-5">

                    <div className="flex flex-col gap-2">
                        <label className={labelClass}>Rôle</label>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setRole("participant")}
                                className={role === "participant" ? "flex-1 py-3 rounded-xl text-sm font-semibold border-2 border-[var(--color-accent)] text-[var(--color-accent)] transition-colors" : "flex-1 py-3 rounded-xl text-sm font-semibold border border-[var(--color-gray)] text-[var(--color-gray)] transition-colors"}
                            >
                                <i className="fa-solid fa-user mr-2"></i>
                                Participant
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole("speaker")}
                                className={role === "speaker" ? "flex-1 py-3 rounded-xl text-sm font-semibold border-2 border-[var(--color-accent)] text-[var(--color-accent)] transition-colors" : "flex-1 py-3 rounded-xl text-sm font-semibold border border-[var(--color-gray)] text-[var(--color-gray)] transition-colors"}
                            >
                                <i className="fa-solid fa-microphone mr-2"></i>
                                Intervenant
                            </button>
                        </div>
                        <input type="hidden" name="role" value={role} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className={labelClass}>Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="votre@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={inputClass}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className={labelClass}>Mot de passe</label>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className={inputClass + " pr-12"}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-gray)] hover:text-[var(--black)] transition-colors"
                            >
                                <i className={showPassword ? "fa-solid fa-eye-slash text-sm" : "fa-solid fa-eye text-sm"}></i>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className={labelClass}>Nom complet</label>
                        <input
                            name="full_name"
                            type="text"
                            placeholder="Jean Dupont"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            {...(role === "speaker" ? { required: true } : {})}
                            className={inputClass}
                        />
                    </div>

                    {role === "speaker" && (
                        <>
                            <div className="flex flex-col gap-2">
                                <label className={labelClass}>Biographie</label>
                                <textarea
                                    name="bio"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Parlez-nous de vous..."
                                    rows={4}
                                    className={inputClass + " resize-none"}
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className={labelClass}>Liens externes</label>
                                {externalLinks.map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="github, linkedin..."
                                            value={item.host}
                                            onChange={(e) => updateExternalLink(index, "host", e.target.value)}
                                            className="border border-[var(--color-gray)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors w-2/5"
                                        />
                                        <input
                                            type="url"
                                            placeholder="https://..."
                                            value={item.link}
                                            onChange={(e) => updateExternalLink(index, "link", e.target.value)}
                                            className="border border-[var(--color-gray)] rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors flex-1"
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addExternalLink}
                                    className="flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors w-fit"
                                >
                                    <i className="fa-solid fa-plus text-xs"></i>
                                    Ajouter un lien
                                </button>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className={labelClass}>Photo de profil</label>
                                <label className="flex items-center gap-3 border border-[var(--color-gray)] rounded-xl px-4 py-3 cursor-pointer hover:border-[var(--color-accent)] transition-colors">
                                    <i className="fa-solid fa-image text-[var(--color-gray)] text-sm"></i>
                                    <span className="text-sm text-[var(--color-gray)]">
                                        {photoUrl ? photoUrl.name : "Choisir une image..."}
                                    </span>
                                    <input
                                        name="photo_url"
                                        type="file"
                                        accept=".png, .jpg, .jpeg, .jfif"
                                        onChange={(e) => setphotoUrl(e.target.files[0])}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[var(--black)] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Créer mon compte
                    </button>

                </form>

                <div className="flex flex-col items-center gap-3">
                    <Link href="/auth/login" className="text-sm text-[var(--color-gray)] hover:text-[var(--black)] transition-colors">
                        Déjà un compte ? <span className="font-semibold text-[var(--color-accent)]">Se connecter</span>
                    </Link>
                    <Link href="/" className="flex items-center gap-2 text-sm text-[var(--color-gray)] hover:text-[var(--black)] transition-colors group">
                        <i className="fa-solid fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform duration-200"></i>
                        Retour à l'accueil
                    </Link>
                </div>

            </div>
        </div>
    );
}