import { useEffect, useRef, useState } from "react";
import { useSessionRegistrationStore } from "@/stores/sessionRegistration";

export function NotificationBox() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  const notifications = useSessionRegistrationStore((s) => s.notifications);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAllRead = useSessionRegistrationStore((s) => s.markAllRead);
  const dismissNotification = useSessionRegistrationStore(
    (s) => s.dismissNotification
  );
  const clearAll = useSessionRegistrationStore((s) => s.clearAllNotifications);

  useEffect(() => {
    if (open && unreadCount > 0) markAllRead();
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} non lues)` : ""}`}
      >
        <BellIcon />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Notifications"
          className="absolute right-0 z-50 mt-2 w-80 origin-top-right rounded-xl border border-gray-200 bg-white shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-800">
              Notifications
            </h3>
            {notifications.length > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-gray-400 hover:text-red-500"
              >
                Tout effacer
              </button>
            )}
          </div>

          <ul className="max-h-96 divide-y divide-gray-50 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="px-4 py-8 text-center text-sm text-gray-400">
                Aucune notification pour l'instant.
              </li>
            ) : (
              notifications.map((notif) => (
                <NotificationItem
                  key={notif.id}
                  notification={notif}
                  onDismiss={() => dismissNotification(notif.id)}
                />
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

function NotificationItem({ notification, onDismiss }) {
  const timeAgo = formatTimeAgo(new Date(notification.createdAt));

  return (
    <li className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50">
      <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-snug text-gray-900 line-clamp-2">
          🔴 {notification.title} a commencé !
        </p>
        {notification.room && (
          <p className="mt-0.5 text-xs text-gray-500">
            Salle : {notification.room}
          </p>
        )}
        <p className="mt-0.5 text-xs text-gray-400">{timeAgo}</p>
      </div>

      <button
        onClick={onDismiss}
        className="ml-1 flex-shrink-0 rounded text-gray-300 hover:text-gray-600"
        aria-label="Fermer"
      >
        <XIcon />
      </button>
    </li>
  );
}

function formatTimeAgo(date) {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "À l'instant";
  if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)} h`;
  return date.toLocaleDateString("fr-FR");
}
function BellIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
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

function XIcon() {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}