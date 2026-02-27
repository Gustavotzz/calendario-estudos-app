import AsyncStorage from '@react-native-async-storage/async-storage';
import { StudySession } from '../types/StudySession';

const STORAGE_KEY = 'study_sessions';

export async function getSessions(): Promise<StudySession[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveSession(session: StudySession) {
  const sessions = await getSessions();
  const updated = [...sessions, session];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}