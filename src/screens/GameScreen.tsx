import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LayoutChangeEvent, SafeAreaView, StyleSheet, View } from 'react-native';

import { Arena } from '../components/Arena';
import { FloatingJoystick } from '../components/FloatingJoystick';
import { Hud } from '../components/Hud';
import { JOYSTICK_RADIUS, PLAYER_RADIUS, PLAYER_SPEED, DEFAULT_ENGINE_CONFIG } from '../game/constants';
import { createEngineController, initState, reset, startRound } from '../game/engine';
import { ArenaBounds, JoystickState, PlayerState } from '../game/types';
import { formatSeconds } from '../utils/time';

const INITIAL_BOUNDS: ArenaBounds = { width: 0, height: 0 };
const INITIAL_PLAYER: PlayerState = {
  pos: { x: 0, y: 0 },
};
const INITIAL_JOYSTICK: JoystickState = {
  visible: false,
  base: { x: 0, y: 0 },
  knob: { x: 0, y: 0 },
  vector: { x: 0, y: 0 },
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

export function GameScreen(): React.JSX.Element {
  const [state, setState] = useState(() => initState());
  const [arenaBounds, setArenaBounds] = useState<ArenaBounds>(INITIAL_BOUNDS);
  const [player, setPlayer] = useState<PlayerState>(INITIAL_PLAYER);
  const [joystick, setJoystick] = useState<JoystickState>(INITIAL_JOYSTICK);
  const lastElapsedRef = useRef(0);

  const controller = useMemo(
    () =>
      createEngineController(DEFAULT_ENGINE_CONFIG, (elapsedMs) => {
        setState((prev) => ({
          ...prev,
          elapsedMs,
        }));
      }),
    []
  );

  useEffect(() => {
    if (arenaBounds.width === 0 || arenaBounds.height === 0) {
      return;
    }

    setPlayer((prev) => {
      if (prev.pos.x !== 0 || prev.pos.y !== 0) {
        return prev;
      }

      return {
        pos: {
          x: arenaBounds.width / 2,
          y: arenaBounds.height / 2,
        },
      };
    });
  }, [arenaBounds.height, arenaBounds.width]);

  useEffect(() => {
    if (!state.running) {
      lastElapsedRef.current = state.elapsedMs;
      return;
    }

    const dt = (state.elapsedMs - lastElapsedRef.current) / 1000;
    lastElapsedRef.current = state.elapsedMs;

    if (dt <= 0 || arenaBounds.width === 0 || arenaBounds.height === 0) {
      return;
    }

    if (joystick.vector.x === 0 && joystick.vector.y === 0) {
      return;
    }

    setPlayer((prev) => {
      const nextX = prev.pos.x + joystick.vector.x * PLAYER_SPEED * dt;
      const nextY = prev.pos.y + joystick.vector.y * PLAYER_SPEED * dt;

      return {
        pos: {
          x: clamp(nextX, PLAYER_RADIUS, arenaBounds.width - PLAYER_RADIUS),
          y: clamp(nextY, PLAYER_RADIUS, arenaBounds.height - PLAYER_RADIUS),
        },
      };
    });
  }, [arenaBounds.height, arenaBounds.width, joystick.vector.x, joystick.vector.y, state.elapsedMs, state.running]);

  const handleArenaLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setArenaBounds({ width, height });
  }, []);

  const handleJoystickStart = useCallback((x: number, y: number) => {
    setJoystick({
      visible: true,
      base: { x, y },
      knob: { x, y },
      vector: { x: 0, y: 0 },
    });
  }, []);

  const handleJoystickVectorChange = useCallback((vx: number, vy: number) => {
    setJoystick((prev) => ({
      ...prev,
      vector: { x: vx, y: vy },
      knob: {
        x: prev.base.x + vx * JOYSTICK_RADIUS,
        y: prev.base.y + vy * JOYSTICK_RADIUS,
      },
    }));
  }, []);

  const handleJoystickEnd = useCallback(() => {
    setJoystick((prev) => ({
      ...prev,
      visible: false,
      vector: { x: 0, y: 0 },
      knob: prev.base,
    }));
  }, []);

  const handleStart = useCallback(() => {
    setState((prev) => startRound(prev));
    controller.stop();
    lastElapsedRef.current = 0;
    controller.start(0);
  }, [controller]);

  const handleReset = useCallback(() => {
    controller.stop();
    lastElapsedRef.current = 0;
    setState((prev) => reset(prev));
    setJoystick(INITIAL_JOYSTICK);
    setPlayer({
      pos: {
        x: arenaBounds.width / 2,
        y: arenaBounds.height / 2,
      },
    });
  }, [arenaBounds.height, arenaBounds.width, controller]);

  useEffect(() => () => controller.stop(), [controller]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Hud
          round={state.round}
          time={formatSeconds(state.elapsedMs)}
          onStart={handleStart}
          onReset={handleReset}
        />
        <Arena playerPos={player.pos} onLayout={handleArenaLayout}>
          <FloatingJoystick
            visible={joystick.visible}
            baseX={joystick.base.x}
            baseY={joystick.base.y}
            radius={JOYSTICK_RADIUS}
            knobX={joystick.knob.x}
            knobY={joystick.knob.y}
            onStart={handleJoystickStart}
            onVectorChange={handleJoystickVectorChange}
            onEnd={handleJoystickEnd}
          />
        </Arena>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#10131a',
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
});
