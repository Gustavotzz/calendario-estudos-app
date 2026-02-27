import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StudyTimer } from '../components/StudyTimer';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>📚 Meu Estudo</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sessão atual</Text>
        <StudyTimer />
      </View>

      <TouchableOpacity
        style={styles.statsButton}
        onPress={() => router.push('/stats')}
      >
        <Text style={styles.statsText}>📊 Ver estatísticas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => router.push('/history')}
      >
        <Text style={styles.historyText}>📜 Ver histórico</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 20,
  },
  cardTitle: {
    color: '#9ca3af',
    marginBottom: 10,
  },
  statsButton: {
    marginTop: 30,
    backgroundColor: '#1f2933',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  statsText: {
    color: '#60a5fa',
    fontSize: 16,
    fontWeight: '600',
  },
  historyButton: {
    marginTop: 16,
    backgroundColor: '#111827',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  historyText: {
    color: '#34d399',
    fontSize: 16,
    fontWeight: '600',
  },
});