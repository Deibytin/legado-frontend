import { Player } from "./player";

export interface DashboardData {
  totalTeams: number;
  totalPlayers: number;
  totalCoaches: number;
  recentPlayers: Player[];
}
