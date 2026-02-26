import { StyleSheet, Text, View } from 'react-native';
import StudyTimer from '../components/StudyTimer';

export default function Calendar() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sessão de Estudo</Text>
      <StudyTimer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 24,
  },
  title: {
    fontSize: 22,
    color: '#E5E7EB',
    fontWeight: '600',
    marginBottom: 20,
  },
});