import { useCallback, useEffect, useMemo, useState } from "react";

export function useIsMountedState() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return useMemo(() => isMounted, [isMounted]);
}
