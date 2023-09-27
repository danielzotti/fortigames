import { Database } from "~/types/database.types";

export interface GamesResults {
  volley: GameResult;
  soccer: GameResult;
  table_tennis: GameResult;
}

export interface GameResult {
  tigers: number;
  dragons: number;
}

export interface Game {
  db_key: string;
  label: string;
  team: boolean;
  icon: string;
}

export interface Games {
  soccer: Game;
  table_tennis: Game;
  volley: Game;
  board_games: Game;
}

export type SportGames = keyof Omit<Games, "board_games">;

export type GameRow = Database["public"]["Tables"]["games_results"]["Row"];
