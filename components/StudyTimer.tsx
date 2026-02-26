import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStudyTimer } from '../hooks/useStudyTimer';
import { saveStudyTime } from '../services/studyStorage';

export function StudyTimer() {
  const { seconds, start, stop, reset } = useStudyTimer();

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  async function handleStop() {
    stop();

    if (seconds > 0) {
      await saveStudyTime(seconds);
    }
  }

  async function handleReset() {
    if (seconds > 0) {
      await saveStudyTime(seconds);
    }
    reset();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.time}>
        {minutes.toString().padStart(2, '0')}:
        {remainingSeconds.toString().padStart(2, '0')}
      </Text>

      <TouchableOpacity style={styles.button} onPress={start}>
        <Text style={styles.buttonText}>▶ Estudar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleStop}>
        <Text style={styles.buttonText}>⏸ Pausar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetText}>⟲ Finalizar sessão</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
  },
  time: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 12,
    width: 220,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    marginTop: 10,
  },
  resetText: {
    color: '#9ca3af',
    fontSize: 14,
  },
});