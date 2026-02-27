import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStudyTimer } from '../hooks/useStudyTimer';

export function StudyTimer() {
  const {
    seconds,
    isRunning,
    start,
    stop,
    reset,
    finishStudy,
  } = useStudyTimer();

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <View>
      <Text style={styles.time}>
        {minutes}:{String(remainingSeconds).padStart(2, '0')}
      </Text>

      {!isRunning ? (
        <TouchableOpacity style={styles.button} onPress={start}>
          <Text style={styles.buttonText}>▶️ Iniciar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={stop}>
          <Text style={styles.buttonText}>⏸ Pausar</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.finishButton}
        onPress={() => finishStudy('Estudo Geral')}
      >
        <Text style={styles.finishText}>✅ Finalizar estudo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={reset}>
        <Text style={styles.reset}>🔄 Resetar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  time: {
    color: '#fff',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  finishButton: {
    backgroundColor: '#16a34a',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  finishText: {
    color: '#fff',
    fontWeight: '600',
  },
  reset: {
    color: '#9ca3af',
    marginTop: 10,
    textAlign: 'center',
  },
});