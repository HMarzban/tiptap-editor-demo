import { useState, useEffect } from "react";

function getOnLine(): boolean {
  if (typeof navigator === "undefined") return true;
  return navigator.onLine;
}

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(getOnLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
