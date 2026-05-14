"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { persistProgressValueSoon } from "../../app/dashboard/tco-6/progression";

const DAILY_DURATION_EVENT = "aba-mastered-daily-duration-updated";
export const FLUSH_DAILY_DURATION_EVENT = "aba-mastered-flush-daily-duration";
const SAVE_INTERVAL_MS = 5000;

type DailyDurationRecord = {
  date: string;
  totalMs: number;
  updatedAt: string;
};

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getStorageKey(userId: string, dateKey = getLocalDateKey()) {
  return `aba-mastered:daily-duration:${userId}:${dateKey}`;
}

function readDailyDurationMs(userId: string) {
  if (typeof window === "undefined") {
    return 0;
  }

  const dateKey = getLocalDateKey();
  const stored = window.localStorage.getItem(getStorageKey(userId, dateKey));

  if (!stored) {
    return 0;
  }

  try {
    const parsed = JSON.parse(stored) as Partial<DailyDurationRecord>;

    if (parsed.date !== dateKey || typeof parsed.totalMs !== "number") {
      return 0;
    }

    return Math.max(0, parsed.totalMs);
  } catch {
    return 0;
  }
}

function readDailyDurationMsForDate(userId: string, dateKey: string) {
  if (typeof window === "undefined") {
    return 0;
  }

  const stored = window.localStorage.getItem(getStorageKey(userId, dateKey));

  if (!stored) {
    return 0;
  }

  try {
    const parsed = JSON.parse(stored) as Partial<DailyDurationRecord>;

    if (parsed.date !== dateKey || typeof parsed.totalMs !== "number") {
      return 0;
    }

    return Math.max(0, parsed.totalMs);
  } catch {
    return 0;
  }
}

function writeDailyDurationMs(userId: string, totalMs: number) {
  const dateKey = getLocalDateKey();
  const record: DailyDurationRecord = {
    date: dateKey,
    totalMs: Math.max(0, Math.round(totalMs)),
    updatedAt: new Date().toISOString(),
  };

  const key = getStorageKey(userId, dateKey);
  window.localStorage.setItem(key, JSON.stringify(record));
  persistProgressValueSoon(key, record);
  window.dispatchEvent(new CustomEvent(DAILY_DURATION_EVENT));
}

function getLastSevenDailyDurations(userId: string) {
  const today = new Date();

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setHours(12, 0, 0, 0);
    date.setDate(today.getDate() - (6 - index));
    const dateKey = getLocalDateKey(date);

    return {
      dateKey,
      dayLabel: date.toLocaleDateString(undefined, { weekday: "short" }),
      minutes: Math.floor(readDailyDurationMsForDate(userId, dateKey) / 60000),
    };
  });
}

export function formatDailyDuration(totalMs: number) {
  const totalMinutes = Math.floor(totalMs / 60000);

  if (totalMinutes < 1) {
    return "0 minutes";
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours < 1) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  }

  if (minutes === 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }

  return `${hours} ${hours === 1 ? "hour" : "hours"} ${minutes} ${
    minutes === 1 ? "minute" : "minutes"
  }`;
}

export function useWeeklyDailyDuration() {
  const { user, loading } = useAuth();
  const userId = user?.id;
  const [days, setDays] = useState<
    Array<{ dateKey: string; dayLabel: string; minutes: number }>
  >([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loading || !userId) {
      return;
    }

    const activeUserId = userId;

    function syncDuration() {
      setDays(getLastSevenDailyDurations(activeUserId));
      setLoaded(true);
    }

    syncDuration();
    window.addEventListener(DAILY_DURATION_EVENT, syncDuration);
    window.addEventListener("aba-mastered-remote-progress-hydrated", syncDuration);
    window.addEventListener("storage", syncDuration);

    return () => {
      window.removeEventListener(DAILY_DURATION_EVENT, syncDuration);
      window.removeEventListener("aba-mastered-remote-progress-hydrated", syncDuration);
      window.removeEventListener("storage", syncDuration);
    };
  }, [loading, userId]);

  return {
    loaded: userId ? loaded : !loading,
    days: userId ? days : [],
  };
}

export function useDailyDuration() {
  const { user, loading } = useAuth();
  const userId = user?.id;
  const [totalMs, setTotalMs] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loading || !userId) {
      return;
    }

    const activeUserId = userId;

    function syncDuration() {
      setTotalMs(readDailyDurationMs(activeUserId));
      setLoaded(true);
    }

    syncDuration();
    window.addEventListener(DAILY_DURATION_EVENT, syncDuration);
    window.addEventListener("aba-mastered-remote-progress-hydrated", syncDuration);
    window.addEventListener("storage", syncDuration);

    return () => {
      window.removeEventListener(DAILY_DURATION_EVENT, syncDuration);
      window.removeEventListener("aba-mastered-remote-progress-hydrated", syncDuration);
      window.removeEventListener("storage", syncDuration);
    };
  }, [loading, userId]);

  return {
    loaded: userId ? loaded : !loading,
    totalMs: userId ? totalMs : 0,
    formatted: formatDailyDuration(userId ? totalMs : 0),
  };
}

export function DailyDurationTracker() {
  const { user, loading } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    if (loading || !userId) {
      return;
    }

    const activeUserId = userId;
    let activeDateKey = getLocalDateKey();
    let lastStartedAt = Date.now();

    function flushElapsed() {
      const nextDateKey = getLocalDateKey();

      if (nextDateKey !== activeDateKey) {
        activeDateKey = nextDateKey;
        lastStartedAt = Date.now();
        window.dispatchEvent(new CustomEvent(DAILY_DURATION_EVENT));
        return;
      }

      if (document.visibilityState !== "visible") {
        lastStartedAt = Date.now();
        return;
      }

      const now = Date.now();
      const elapsedMs = now - lastStartedAt;
      lastStartedAt = now;

      if (elapsedMs <= 0) {
        return;
      }

      const currentTotal = readDailyDurationMs(activeUserId);
      writeDailyDurationMs(activeUserId, currentTotal + elapsedMs);
    }

    function handleVisibilityChange() {
      flushElapsed();
      lastStartedAt = Date.now();
    }

    const intervalId = window.setInterval(flushElapsed, SAVE_INTERVAL_MS);
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", flushElapsed);
    window.addEventListener("beforeunload", flushElapsed);
    window.addEventListener(FLUSH_DAILY_DURATION_EVENT, flushElapsed);

    return () => {
      flushElapsed();
      window.clearInterval(intervalId);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", flushElapsed);
      window.removeEventListener("beforeunload", flushElapsed);
      window.removeEventListener(FLUSH_DAILY_DURATION_EVENT, flushElapsed);
    };
  }, [loading, userId]);

  return null;
}
