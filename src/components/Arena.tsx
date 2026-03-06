import React from 'react';
import { StyleSheet, View } from 'react-native';

export function Arena(): React.JSX.Element {
  return (
    <View style={styles.wrapper}>
      <View style={styles.character} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  character: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#f1f5ff',
  },
});
