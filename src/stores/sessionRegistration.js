import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useSessionRegistrationStore = create(
  persist(
    (set, get) => ({
      registeredSessions: [],

      notifications: [],
      notifiedSessions: [],
      register(sessionId) {
        set((state) => ({
          registeredSessions: state.registeredSessions.includes(sessionId)
            ? state.registeredSessions
            : [...state.registeredSessions, sessionId],
        }));
      },

      unregister(sessionId) {
        set((state) => ({
          registeredSessions: state.registeredSessions.filter(
            (id) => id !== sessionId
          ),
        }));
      },

      isRegistered(sessionId) {
        return get().registeredSessions.includes(sessionId);
      },

      /**
        @param {{ sessionId: string, title: string, room?: string, startTime: string }} payload
       */
      addNotification(payload) {
        const notification = {
          id: `${payload.sessionId}-${Date.now()}`,
          sessionId: payload.sessionId,
          title: payload.title,
          room: payload.room ?? null,
          startTime: payload.startTime,
          createdAt: new Date().toISOString(),
          read: false,
        };

        set((state) => ({
          notifications: [notification, ...state.notifications],
          notifiedSessions: [...state.notifiedSessions, payload.sessionId],
        }));
      },

      hasBeenNotified(sessionId) {
        return get().notifiedSessions.includes(sessionId);
      },

      dismissNotification(id) {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      markAllRead() {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      clearAllNotifications() {
        set({ notifications: [] });
      },

      get unreadCount() {
        return get().notifications.filter((n) => !n.read).length;
      },
    }),
    {
      name: "session-registration-v1",
      partialize: (state) => ({
        registeredSessions: state.registeredSessions,
        notifiedSessions: state.notifiedSessions,
        notifications: state.notifications,
      }),
    }
  )
);