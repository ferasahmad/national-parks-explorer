import { useColorScheme } from '@/hooks/theme/use-color-scheme';
import { SavedParksProvider } from '@/hooks/use-saved-parks-storage';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <SavedParksProvider>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="park/[parkCode]"
              options={{ title: 'Park Details' }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SavedParksProvider>
    </QueryClientProvider>
  );
}
