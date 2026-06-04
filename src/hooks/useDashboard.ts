"use client";

import { useEffect, useState } from "react";
import { dashboardService } from "@/services/dashboardService";
import { DashboardData } from "@/types/dashboard";

interface DashboardState {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
}

export function useDashboard() {
  const [state, setState] = useState<DashboardState>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    dashboardService
      .getDashboard()
      .then((data) => {
        if (active) {
          setState({ data, isLoading: false, error: null });
        }
      })
      .catch(() => {
        if (active) {
          setState({ data: null, isLoading: false, error: "Unable to load dashboard" });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}
