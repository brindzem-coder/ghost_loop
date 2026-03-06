export type Vec2 = {
  x: number;
  y: number;
};

export type PlayerState = {
  pos: Vec2;
};

export type JoystickState = {
  visible: boolean;
  base: Vec2;
  knob: Vec2;
  vector: Vec2;
};

export type ArenaBounds = {
  width: number;
  height: number;
};

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
