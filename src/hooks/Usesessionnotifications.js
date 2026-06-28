import { useEffect, useRef } from "react";
import { useSessionRegistrationStore } from "@/stores/sessionRegistration";
import { getSessions } from "@/lib/api/session";

const POLL_INTERVAL_MS = 30_000;

export function useSessionNotifications() {
  const registeredSessions = useSessionRegistrationStore(
    (s) => s.registeredSessions
  );
  const addNotification = useSessionRegistrationStore(
    (s) => s.addNotification
  );
  const hasBeenNotified = useSessionRegistrationStore(
    (s) => s.hasBeenNotified
  );
  const stateRef = useRef({ registeredSessions, addNotification, hasBeenNotified });
  useEffect(() => {
    stateRef.current = { registeredSessions, addNotification, hasBeenNotified };
  });

  useEffect(() => {
    const check = async () => {
      const { registeredSessions, addNotification, hasBeenNotified } =
        stateRef.current;

      if (registeredSessions.length === 0) return;

      try {
        const sessions = await getSessions();
        const now = new Date();

        for (const session of sessions) {
          if (!registeredSessions.includes(session.id)) continue;
          if (hasBeenNotified(session.id)) continue;

          const start = new Date(session.start_time);
          const end = new Date(session.end_time);

          if (now >= start && now <= end) {
            addNotification({
              sessionId: session.id,
              title: session.title,
              room: session.room?.name,
              startTime: session.start_time,
            });
          }
        }
      } catch (err) {
        console.error("[useSessionNotifications] polling error:", err);
      }
    };

    check();

    const timer = setInterval(check, POLL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);
}