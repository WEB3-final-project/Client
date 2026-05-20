const steps = [
    {
        number: "01",
        icon: "fa-solid fa-magnifying-glass",
        title: "Explorez les événements",
        description: "Accédez librement à la liste des événements disponibles et consultez leurs détails.",
        highlighted: false,
    },
    {
        number: "02",
        icon: "fa-regular fa-calendar",
        title: "Parcourir le planning",
        description: "Visualisez les sessions par salle et par horaire grâce au planning multi-piste interactif.",
        highlighted: false,
    },
    {
        number: "03",
        icon: "fa-regular fa-comment",
        title: "Interagissez en direct",
        description: "Posez vos questions pendant les sessions live et votez pour les plus pertinentes.",
        highlighted: true,
    },
    {
        number: "04",
        icon: "fa-regular fa-star",
        title: "Gérez vos favoris",
        description: "Ajoutez des séances en favoris pour construire votre programme personnalisé.",
        highlighted: false,
    },
];

const iconBase = "w-12 h-12 flex items-center justify-center rounded-xl text-lg transition-colors duration-300 group-hover:bg-[var(--color-accent)] group-hover:text-white";
const iconNormal = iconBase + " bg-[var(--white-background)] border border-[var(--color-gray)] text-[var(--black)]";
const iconHighlighted = iconBase + " bg-[#d4d8f8] text-[var(--color-accent-dark)]";

function HowItWorksSection() {
    return (
        <section id="how-it-works-section" className="flex flex-col items-center py-16 px-6 gap-6 bg-[#f7f7f8]">

            <div className="border border-[var(--color-gray)] rounded-full px-5 py-1">
                <span className="text-xs font-semibold tracking-widest text-[var(--black)] uppercase">
                    Comment ça marche
                </span>
            </div>

            <h2 className="text-5xl font-bold text-[var(--black)] text-center">
                Simple comme bonjour
            </h2>

            <p className="text-[var(--color-gray)] text-center text-lg max-w-xl">
                Aucune inscription requise pour les participants. Accédez et interagissez instantanément.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 w-full max-w-6xl">
                {steps.map((step, index) => (
                    <div key={index} className="group flex flex-col gap-4">

                        <span className="text-7xl font-bold text-gray-200 leading-none select-none">
                            {step.number}
                        </span>

                        <div className={step.highlighted ? iconHighlighted : iconNormal}>
                            <i className={step.icon}></i>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-base font-bold text-[var(--black)]">
                                {step.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {step.description}
                            </p>
                        </div>

                    </div>
                ))}
            </div>

        </section>
    );
}

export default HowItWorksSection;