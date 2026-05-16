import { router } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { ParkCard } from '../../components/organisms/ParkCard';
import { useParks } from '../../hooks/nps/use-parks';
import { useSavedParksStorage } from '../../hooks/use-saved-parks-storage';

export default function BrowseScreen() {
  const { parks, isLoading } = useParks();
  const { isSaved, toggleSave } = useSavedParksStorage();

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
          isLoading ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" />
            </View>
          ) : null
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
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
});
