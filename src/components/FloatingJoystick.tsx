import React, { useMemo, useRef } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';

import { KNOB_RADIUS } from '../game/constants';

type FloatingJoystickProps = {
  visible: boolean;
  baseX: number;
  baseY: number;
  radius: number;
  knobX: number;
  knobY: number;
  onStart: (x: number, y: number) => void;
  onVectorChange: (vx: number, vy: number) => void;
  onEnd: () => void;
};

function clampVector(dx: number, dy: number, radius: number): { x: number; y: number } {
  const distance = Math.hypot(dx, dy);
  if (distance <= radius || distance === 0) {
    return { x: dx, y: dy };
  }

  const scale = radius / distance;
  return {
    x: dx * scale,
    y: dy * scale,
  };
}

export function FloatingJoystick({
  visible,
  baseX,
  baseY,
  radius,
  knobX,
  knobY,
  onStart,
  onVectorChange,
  onEnd,
}: FloatingJoystickProps): React.JSX.Element {
  const activeBaseRef = useRef({ x: baseX, y: baseY });

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: (event) => {
          const { locationX, locationY } = event.nativeEvent;
          activeBaseRef.current = { x: locationX, y: locationY };
          onStart(locationX, locationY);
          onVectorChange(0, 0);
        },
        onPanResponderMove: (event) => {
          const { locationX, locationY } = event.nativeEvent;
          const dx = locationX - activeBaseRef.current.x;
          const dy = locationY - activeBaseRef.current.y;
          const clamped = clampVector(dx, dy, radius);

          onVectorChange(clamped.x / radius, clamped.y / radius);
        },
        onPanResponderRelease: onEnd,
        onPanResponderTerminate: onEnd,
        onPanResponderTerminationRequest: () => true,
      }),
    [onEnd, onStart, onVectorChange, radius]
  );

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="auto" {...panResponder.panHandlers}>
      {visible ? (
        <View
          pointerEvents="none"
          style={[
            styles.base,
            {
              width: radius * 2,
              height: radius * 2,
              borderRadius: radius,
              left: baseX - radius,
              top: baseY - radius,
            },
          ]}
        >
          <View
            style={[
              styles.knob,
              {
                left: knobX - baseX + radius - KNOB_HALF,
                top: knobY - baseY + radius - KNOB_HALF,
              },
            ]}
          />
        </View>
      ) : null}
    </View>
  );
}

const KNOB_SIZE = KNOB_RADIUS * 2;
const KNOB_HALF = KNOB_RADIUS;

const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  knob: {
    position: 'absolute',
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_HALF,
    backgroundColor: 'rgba(241, 245, 255, 0.9)',
  },
});
