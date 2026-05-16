import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = '@national_parks_saved_codes';

type SavedParksContextValue = {
  savedParkCodes: string[];
  toggleSave: (parkCode: string) => Promise<void>;
  isSaved: (parkCode: string) => boolean;
};

const SavedParksContext = createContext<SavedParksContextValue | null>(null);

export function SavedParksProvider({ children }: { children: ReactNode }) {
  const [savedParkCodes, setSavedParkCodes] = useState<string[]>([]);

  useEffect(() => {
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

    loadSavedParks();
  }, []);

  const toggleSave = useCallback(async (parkCode: string) => {
    setSavedParkCodes((current) => {
      const newSaved = current.includes(parkCode)
        ? current.filter((c) => c !== parkCode)
        : [...current, parkCode];

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSaved)).catch((e) => {
        console.error('Failed to save park', e);
      });

      return newSaved;
    });
  }, []);

  const isSaved = useCallback(
    (parkCode: string) => savedParkCodes.includes(parkCode),
    [savedParkCodes],
  );

  const value = useMemo(
    () => ({ savedParkCodes, toggleSave, isSaved }),
    [savedParkCodes, toggleSave, isSaved],
  );

  return (
    <SavedParksContext.Provider value={value}>
      {children}
    </SavedParksContext.Provider>
  );
}

export function useSavedParksStorage() {
  const context = useContext(SavedParksContext);
  if (!context) {
    throw new Error(
      'useSavedParksStorage must be used within a SavedParksProvider',
    );
  }
  return context;
}
