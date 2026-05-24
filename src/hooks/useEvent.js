"use client";

import { useEffect, useState } from "react";

import {
  getAllEvents,
} from "@/lib/api/event";

export function useEvents() {
  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data =
          await getAllEvents();

        setEvents(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    events,
    loading,
  };
}