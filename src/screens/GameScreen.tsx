import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { Arena } from '../components/Arena';
import { Hud } from '../components/Hud';
import { DEFAULT_ENGINE_CONFIG } from '../game/constants';
import { createEngineController, initState, reset, startRound } from '../game/engine';
import { formatSeconds } from '../utils/time';

export function GameScreen(): React.JSX.Element {
  const [state, setState] = useState(() => initState());

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

  const handleStart = useCallback(() => {
    controller.stop();
    setState(startRound);
    controller.start(0);
  }, [controller]);

  const handleReset = useCallback(() => {
    controller.stop();
    setState((prev) => reset(prev));
  }, [controller]);

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
        <Arena />
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
