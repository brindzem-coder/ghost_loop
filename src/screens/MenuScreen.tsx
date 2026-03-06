import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Menu'>;

export function MenuScreen({ navigation }: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ghost Loop</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Game')}>
        <Text style={styles.buttonLabel}>Play</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    backgroundColor: '#10131a',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 44,
    fontWeight: '800',
    color: '#f1f5ff',
    letterSpacing: 1,
  },
  button: {
    minWidth: 180,
    borderRadius: 14,
    backgroundColor: '#4f7bff',
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  buttonLabel: {
    color: '#f1f5ff',
    fontSize: 20,
    fontWeight: '700',
  },
});
