import { EngineConfig, GameState } from './types';

type TickHandler = (elapsedMs: number) => void;

type EngineController = {
  start: (fromElapsedMs?: number) => void;
  stop: () => void;
  isRunning: () => boolean;
};

export function initState(): GameState {
  return {
    round: 1,
    elapsedMs: 0,
    running: false,
    ghostPath: [],
  };
}

export function startRound(state: GameState): GameState {
  return {
    ...state,
    running: true,
  };
}

export function reset(state: GameState): GameState {
  return {
    ...state,
    elapsedMs: 0,
    running: false,
    ghostPath: [],
  };
}

export function createEngineController(config: EngineConfig, onTick: TickHandler): EngineController {
  let timer: ReturnType<typeof setInterval> | null = null;
  let elapsedMs = 0;

  return {
    start(fromElapsedMs = 0) {
      if (timer) {
        return;
      }

      elapsedMs = fromElapsedMs;
      timer = setInterval(() => {
        elapsedMs += config.tickMs;
        onTick(elapsedMs);
      }, config.tickMs);
    },
    stop() {
      if (!timer) {
        return;
      }

      clearInterval(timer);
      timer = null;
    },
    isRunning() {
      return timer !== null;
    },
  };
}
