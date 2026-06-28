import { useSessionRegistrationStore } from "@/stores/sessionRegistration";

export function SessionRegistrationButton({ session, className = "" }) {
    const isRegistered = useSessionRegistrationStore((s) =>
        s.isRegistered(session.id)
    );
    const register = useSessionRegistrationStore((s) => s.register);
    const unregister = useSessionRegistrationStore((s) => s.unregister);

    const now = new Date();
    const isOver = new Date(session.end_time) < now;
    const isLive = session.is_live ?? false;

    if (isOver) return null;

    if (isLive) {
        return (
            <span
                className={`bg-red-600
                    text-white
                    text-xs font-bold
                    px-3 py-1
                    rounded-full
                    shadow-md
                    animate-pulse
                    flex items-center gap-2`}
            >
                <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                LIVE
            </span>
        );
    }

    const toggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        isRegistered ? unregister(session.id) : register(session.id);
    };

    return (
        <button
            onClick={toggle}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        ${isRegistered
                    ? "bg-green-100 text-green-800 hover:bg-red-100 hover:text-red-700 focus-visible:ring-red-400"
                    : "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500"
                }
        ${className}`}
            aria-pressed={isRegistered}
        >
            {isRegistered ? (
                <>
                    <CheckIcon />
                    Inscrit · Annuler
                </>
            ) : (
                <>
                    <BellIcon />
                    Me notifier
                </>
            )}
        </button>
    );
}

function BellIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}