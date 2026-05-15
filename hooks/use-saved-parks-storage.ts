import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const STORAGE_KEY = '@national_parks_saved_codes';

export function useSavedParksStorage() {
  const [savedParkCodes, setSavedParkCodes] = useState<string[]>([]);

  useEffect(() => {
    loadSavedParks();
  }, []);

  const loadSavedParks = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedParkCodes(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load saved parks', e);
    }
  };

  const toggleSave = async (parkCode: string) => {
    try {
      const newSaved = savedParkCodes.includes(parkCode)
        ? savedParkCodes.filter(c => c !== parkCode)
        : [...savedParkCodes, parkCode];
        
      setSavedParkCodes(newSaved);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSaved));
    } catch (e) {
      console.error('Failed to save park', e);
    }
  };

  const isSaved = (parkCode: string) => savedParkCodes.includes(parkCode);

  return { savedParkCodes, toggleSave, isSaved };
}
