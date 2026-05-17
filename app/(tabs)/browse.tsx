import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Typography } from '../../components/atoms/Typography';
import { SearchBar } from '../../components/molecules/SearchBar';
import { ParkCard } from '../../components/organisms/ParkCard';
import { Colors } from '../../constants/theme';
import { useParks } from '../../hooks/nps/use-parks';
import { useSavedParksStorage } from '../../hooks/use-saved-parks-storage';
import { filterParksBySearch } from '../../utils/filter-parks';

export default function BrowseScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { parks, isLoading } = useParks();
  const { isSaved, toggleSave } = useSavedParksStorage();

  const filteredParks = filterParksBySearch(parks, searchQuery);

  const showNoResults =
    !isLoading && parks.length > 0 && filteredParks.length === 0;

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredParks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ParkCard
            park={item}
            isSaved={isSaved(item.parkCode)}
            onToggleSave={() => toggleSave(item.parkCode)}
            onPress={() => router.push(`/park/${item.parkCode}`)}
          />
        )}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        ListHeaderComponent={
          <View style={styles.searchBar}>
            <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" />
            </View>
          ) : showNoResults ? (
            <View style={styles.centered}>
              <Typography variant="body" color={Colors.onSurfaceVariant}>
                No parks match &quot;{searchQuery.trim()}&quot;
              </Typography>
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
  searchBar: {
    marginBottom: 16,
  },
});
