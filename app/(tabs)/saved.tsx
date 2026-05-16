import { router } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { Typography } from '../../components/atoms/Typography';
import { ParkCard } from '../../components/organisms/ParkCard';
import { Colors } from '../../constants/theme';
import { useParks } from '../../hooks/nps/use-parks';
import { useSavedParksStorage } from '../../hooks/use-saved-parks-storage';

export default function SavedScreen() {
  const { savedParkCodes, isSaved, toggleSave } = useSavedParksStorage();
  const parkCode = savedParkCodes.join(',');

  const { parks, isLoading } = useParks({
    parkCode,
    enabled: savedParkCodes.length > 0,
  });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={parks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ParkCard
            park={item}
            isSaved={isSaved(item.parkCode)}
            onToggleSave={() => toggleSave(item.parkCode)}
            onPress={() => router.push(`/park/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Typography
              variant="body"
              color={Colors.onSurfaceVariant}
              style={styles.emptyStateText}
            >
              No saved parks yet. Browse parks and tap the heart to save them.
            </Typography>
            <Button
              title="Browse Parks"
              onPress={() => router.push('/(tabs)/browse')}
              style={styles.emptyStateButton}
            />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  emptyStateText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyStateButton: {
    minWidth: 160,
  },
});
