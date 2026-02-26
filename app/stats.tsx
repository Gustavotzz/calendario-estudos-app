import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { getStudyData } from '../services/studyStorage';

type StudyItem = {
  date: string;
  seconds: number;
};

export default function Stats() {
  const [data, setData] = useState<StudyItem[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const stored = await getStudyData();
    setData(stored.slice(-7));
  }

  const totalHours =
    data.reduce((acc, item) => acc + item.seconds, 0) / 3600;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 Estatísticas</Text>

      <Text style={styles.total}>
        Total estudado: {totalHours.toFixed(2)} horas
      </Text>

      {data.length === 0 ? (
        <Text style={styles.empty}>Nenhum estudo registrado</Text>
      ) : (
        data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.hours}>
              {(item.seconds / 3600).toFixed(2)} horas
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  total: {
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 20,
  },
  empty: {
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    backgroundColor: '#111827',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  date: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hours: {
    color: '#60a5fa',
    marginTop: 4,
  },
});