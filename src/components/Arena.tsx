import React from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';

import { PLAYER_RADIUS } from '../game/constants';
import { Vec2 } from '../game/types';

type ArenaProps = {
  playerPos: Vec2;
  onLayout: (event: LayoutChangeEvent) => void;
  children?: React.ReactNode;
};

export function Arena({ playerPos, onLayout, children }: ArenaProps): React.JSX.Element {
  return (
    <View style={styles.wrapper} onLayout={onLayout}>
      <View
        style={[
          styles.player,
          {
            width: PLAYER_RADIUS * 2,
            height: PLAYER_RADIUS * 2,
            borderRadius: PLAYER_RADIUS,
            left: playerPos.x - PLAYER_RADIUS,
            top: playerPos.y - PLAYER_RADIUS,
          },
        ]}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: '#2d3547',
    borderRadius: 12,
    backgroundColor: '#0f1829',
    overflow: 'hidden',
  },
  player: {
    position: 'absolute',
    backgroundColor: '#f1f5ff',
  },
});
