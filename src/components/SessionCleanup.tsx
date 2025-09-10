"use client";

import { useEffect } from "react";

export default function SessionCleanup() {
  useEffect(() => {
    const clearSession = () => {
      document.cookie = "loggedIn=; Path=/; Max-Age=0; SameSite=Lax";
      try {
        sessionStorage.removeItem("loggedIn");
      } catch {}
    };

    window.addEventListener("beforeunload", clearSession);
    window.addEventListener("pagehide", clearSession);

    return () => {
      window.removeEventListener("beforeunload", clearSession);
      window.removeEventListener("pagehide", clearSession);
    };
  }, []);

  return null;
}
