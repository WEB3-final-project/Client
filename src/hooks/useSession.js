"use client";

import { useEffect, useState } from "react";

import {
  getSessions,
} from "@/lib/api/session";

export function useSessions() {
  const [sessions, setSessions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data =
          await getSessions();

        setSessions(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    sessions,
    loading,
  };
}