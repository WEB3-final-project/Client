function HeroSection() {
    return (
        <section className="flex flex-col items-center py-8 px-4 gap-8 md:gap-10">
            <div className="bg-[var(--white)] shadow-sm border border-[var(--color-gray)] rounded-4xl flex flex-row justify-center items-center gap-2 px-4 py-2 text-sm md:text-base">
                <i className="animate-pulse-live text-[var(--color-accent-dark)] fa-regular fa-calendar-check"></i>
                <span>Plateforme d'événements en temps réel</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
                Vos événements,
                <br /><span className="text-[var(--color-accent)]">synchronisés.</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-center max-w-3xl">
                EventSync remplace les supports statiques par une interface
                dynamique. Naviguez dans vos événements, interagissez en direct
                avec les sessions, et engagez vos participants comme jamais.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                <button className="w-full sm:w-auto flex flex-row justify-center items-center gap-2 text-white font-bold bg-[var(--black)] px-6 py-4 rounded-4xl">
                    <span className="text-base md:text-lg">Découvrir la plateforme</span>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
                <button className="w-full sm:w-auto text-base md:text-lg text-[var(--black)] font-bold border border-[var(--color-gray)] px-6 py-4 rounded-4xl">
                    Se connecter
                    <span className="text-gray-600"> (admin)</span>
                </button>
            </div>
        </section>
    );
}

export default HeroSection;