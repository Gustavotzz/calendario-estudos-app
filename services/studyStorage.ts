import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@study-time';

type StudyData = {
  date: string; // YYYY-MM-DD
  seconds: number;
};

export async function saveStudyTime(seconds: number) {
  const today = new Date().toISOString().split('T')[0];

  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  const data: StudyData[] = stored ? JSON.parse(stored) : [];

  const index = data.findIndex(item => item.date === today);

  if (index >= 0) {
    data[index].seconds += seconds;
  } else {
    data.push({ date: today, seconds });
  }

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function getStudyData(): Promise<StudyData[]> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}