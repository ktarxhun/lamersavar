"use client";

import { useState, useCallback } from "react";

export function useJumpscare() {
  const [isActive, setIsActive] = useState(false);

  const trigger = useCallback(() => {
    setIsActive(true);
  }, []);

  const reset = useCallback(() => {
    setIsActive(false);
  }, []);

  return {
    isActive,
    trigger,
    reset,
  };
}
