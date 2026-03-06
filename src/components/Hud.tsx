import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type HudProps = {
  round: number;
  time: string;
  onStart: () => void;
  onReset: () => void;
};

export function Hud({ round, time, onStart, onReset }: HudProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.stats}>
        <Text style={styles.stat}>Round: {round}</Text>
        <Text style={styles.stat}>Time: {time}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable style={[styles.button, styles.start]} onPress={onStart}>
          <Text style={styles.buttonLabel}>Start</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.reset]} onPress={onReset}>
          <Text style={styles.buttonLabel}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171c27',
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    color: '#f1f5ff',
    fontSize: 18,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  start: {
    backgroundColor: '#3ea861',
  },
  reset: {
    backgroundColor: '#4f7bff',
  },
  buttonLabel: {
    color: '#f1f5ff',
    fontWeight: '700',
    fontSize: 16,
  },
});
