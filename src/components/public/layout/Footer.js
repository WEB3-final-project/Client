import LogoDark from "../../shared/LogoDark";

function Footer() {
    return (
        <footer className="bg-[var(--black)] text-white px-6 md:px-[50px] py-16">
            <div className="flex flex-col lg:flex-row justify-between gap-12">
                <div className="max-w-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <LogoDark />
                        <h1 className="text-3xl font-bold">
                            <span>Event</span>
                            <span className="text-[var(--color-accent)]">
                                Sync
                            </span>
                        </h1>
                    </div>
                    <p className="text-gray-400 leading-8">
                        Plateforme de gestion d'événements et
                        d'engagement des participants en temps réel.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                    
                    <div>
                        <h2 className="text-gray-500 uppercase font-semibold mb-6">
                            Plateforme
                        </h2>

                        <ul className="flex flex-col gap-4 text-gray-300">
                            <li>Événements</li>
                            <li>Planning</li>
                            <li>Sessions Live</li>
                            <li>Q&A</li>
                            <li>Favoris</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-gray-500 uppercase font-semibold mb-6">
                            Rôles
                        </h2>

                        <ul className="flex flex-col gap-4 text-gray-300">
                            <li>Organisateurs</li>
                            <li>Participants</li>
                            <li>Intervenants</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-gray-500 uppercase font-semibold mb-6">
                            Technologies
                        </h2>

                        <ul className="flex flex-col gap-4 text-gray-300">
                            <li>Next.js</li>
                            <li>Tailwind CSS</li>
                            <li>Express.js</li>
                            <li>PostgreSQL</li>
                            <li>Prisma</li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className="flex justify-center border-t border-gray-800 mt-16 pt-8">
                <p className="text-gray-500 text-sm text-center md:text-left">
                    © 2026 EventSync. Projet de groupe — Tous droits réservés.
                </p>
            </div>
        </footer>
    )
}

export default Footer;