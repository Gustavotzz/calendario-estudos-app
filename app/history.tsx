import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getSessions } from '../services/studyStorage';
import { StudySession } from '../types/StudySession';

export default function History() {
  const [sessions, setSessions] = useState<StudySession[]>([]);

  useEffect(() => {
    loadSessions();
  }, []);

  async function loadSessions() {
    const data = await getSessions();
    setSessions(data.reverse());
  }

  function renderItem({ item }: { item: StudySession }) {
    return (
      <View style={styles.card}>
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={styles.text}>
          Tempo: {item.durationMinutes} minutos
        </Text>
        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Estudos</Text>

      {sessions.length === 0 ? (
        <Text style={styles.empty}>Nenhum estudo registrado ainda.</Text>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  subject: {
    color: '#00ff99',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: '#ccc',
    marginTop: 4,
  },
  date: {
    color: '#888',
    marginTop: 4,
    fontSize: 12,
  },
  empty: {
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
  },
});