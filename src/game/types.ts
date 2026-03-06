export type GhostPathPoint = {
  x: number;
  y: number;
  t: number;
};

export type GameState = {
  round: number;
  elapsedMs: number;
  running: boolean;
  ghostPath: GhostPathPoint[];
};

export type EngineConfig = {
  tickMs: number;
};
