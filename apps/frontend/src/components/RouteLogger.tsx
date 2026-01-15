import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { log } from "@/lib/logger";

export default function RouteLogger() {
  const loc = useLocation();
  useEffect(() => {
    log('[ROUTE]', loc.pathname + loc.search + loc.hash);
  }, [loc.pathname, loc.search, loc.hash]);
  return null;
}

