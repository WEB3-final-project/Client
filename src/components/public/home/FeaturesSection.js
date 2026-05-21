const features = [
    {
        icon: "fa-regular fa-calendar-days",
        title: "Gestion complète d'événements",
        description: "Créez et gérez vos événements avec tous les détails : sessions, salles, horaires et intervenants.",
        highlighted: false,
    },
    {
        icon: "fa-solid fa-border-all",
        title: "Planification multi-pistes",
        description: "Visualisez les sessions sous forme de grille temporelle avec affichage simultané par salles.",
        highlighted: false,
    },
    {
        icon: "fa-solid fa-tower-broadcast",
        title: "Sessions en direct",
        description: "Détection automatique des sessions en cours avec badge \"Live\" en temps réel.",
        highlighted: true,
    },
    {
        icon: "fa-regular fa-message",
        title: "Questions et réponses en direct",
        description: "Les participants posent des questions pendant les sessions en direct et votent pour les plus pertinentes.",
        highlighted: false,
    },
    {
        icon: "fa-solid fa-user-group",
        title: "Pages Intervenants",
        description: "Chaque intervenant dispose d'une page publique avec biographie, photo et séances associées.",
        highlighted: false,
    },
    {
        icon: "fa-regular fa-star",
        title: "Personnels favoris",
        description: "Les participants construisent leur itinéraire personnel en ajoutant des sessions en favoris.",
        highlighted: false,
    },
];

const cardBase = "flex flex-col gap-6 p-8 rounded-3xl border border-[var(--color-gray)] transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] cursor-pointer";
const cardNormal = cardBase + " bg-[var(--white-background)]";
const cardHighlighted = cardBase + " bg-[#eef0fd]";

const iconBase = "w-12 h-12 flex items-center justify-center rounded-xl text-lg";
const iconNormal = iconBase + " bg-[#f0f0f0] text-[var(--black)]";
const iconHighlighted = iconBase + " bg-[#d4d8f8] text-[var(--color-accent-dark)]";

function FeaturesSection() {
    return (
        <section id="feature-section" className="flex flex-col items-center py-16 px-6 gap-6">

            <div className="border border-[var(--color-gray)] rounded-full px-5 py-1">
                <span className="text-xs font-semibold tracking-widest text-[var(--black)] uppercase">
                    Fonctionnalités
                </span>
            </div>

            <h2 className="text-5xl font-bold text-[var(--black)] text-center">
                Tout ce dont vous avez besoin
            </h2>

            <p className="text-[var(--color-gray)] text-center text-lg">
                Une plateforme complète pour gérer, afficher et dynamiser vos événements.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-6xl">
                {features.map((feature, index) => (
                    <div key={index} className={feature.highlighted ? cardHighlighted : cardNormal}>
                        <div className={feature.highlighted ? iconHighlighted : iconNormal}>
                            <i className={feature.icon}></i>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-lg font-bold text-[var(--black)]">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}

export default FeaturesSection;