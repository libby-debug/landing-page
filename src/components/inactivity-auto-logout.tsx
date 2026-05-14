"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { useAuth } from "@/components/auth-provider";
import { FLUSH_DAILY_DURATION_EVENT } from "@/components/daily-duration-tracker";
import {
  flushLocalProgressStateToSupabase,
  saveCurrentProgressLocation,
} from "../../app/dashboard/tco-6/progression";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

const IDLE_TIMEOUT_MS = 10 * 60 * 1000;
const MOUSE_ACTIVITY_THROTTLE_MS = 1000;
const INACTIVITY_MESSAGE_KEY = "aba-mastered:auth:inactivity-message";

function getCurrentLocation() {
  if (typeof window === "undefined") {
    return "/dashboard";
  }

  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export function InactivityAutoLogout() {
  const { loading, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const timeoutRef = useRef<number | null>(null);
  const lastMouseActivityRef = useRef(0);
  const loggingOutRef = useRef(false);

  const clearIdleTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const logoutForInactivity = useCallback(async () => {
    if (loggingOutRef.current || loading || !user) {
      return;
    }

    loggingOutRef.current = true;
    clearIdleTimer();

    window.dispatchEvent(new Event(FLUSH_DAILY_DURATION_EVENT));
    window.dispatchEvent(new Event("aba-mastered-before-idle-logout"));
    saveCurrentProgressLocation(getCurrentLocation());

    await new Promise((resolve) => window.setTimeout(resolve, 0));
    await flushLocalProgressStateToSupabase();

    window.localStorage.setItem(
      INACTIVITY_MESSAGE_KEY,
      "You were logged out due to inactivity. Your progress was saved.",
    );

    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }

    router.replace("/login?reason=inactive");
    router.refresh();
  }, [clearIdleTimer, loading, router, user]);

  const resetIdleTimer = useCallback(() => {
    if (loading || !user || loggingOutRef.current) {
      clearIdleTimer();
      return;
    }

    clearIdleTimer();
    timeoutRef.current = window.setTimeout(
      () => void logoutForInactivity(),
      IDLE_TIMEOUT_MS,
    );
  }, [clearIdleTimer, loading, logoutForInactivity, user]);

  useEffect(() => {
    resetIdleTimer();
  }, [pathname, resetIdleTimer]);

  useEffect(() => {
    if (loading || !user) {
      clearIdleTimer();
      return;
    }

    function handleActivity(event: Event) {
      if (event.type === "mousemove") {
        const now = Date.now();

        if (now - lastMouseActivityRef.current < MOUSE_ACTIVITY_THROTTLE_MS) {
          return;
        }

        lastMouseActivityRef.current = now;
      }

      resetIdleTimer();
    }

    const activityEvents: Array<keyof WindowEventMap> = [
      "click",
      "keydown",
      "mousemove",
      "scroll",
      "touchstart",
      "touchmove",
    ];

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, handleActivity, { passive: true });
    });
    resetIdleTimer();

    return () => {
      clearIdleTimer();
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, handleActivity);
      });
    };
  }, [clearIdleTimer, loading, resetIdleTimer, user]);

  return null;
}

export function readAndClearInactivityLogoutMessage() {
  if (typeof window === "undefined") {
    return "";
  }

  const message = window.localStorage.getItem(INACTIVITY_MESSAGE_KEY) ?? "";
  window.localStorage.removeItem(INACTIVITY_MESSAGE_KEY);

  return message;
}
