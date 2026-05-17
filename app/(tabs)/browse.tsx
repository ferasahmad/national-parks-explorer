import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Typography } from '../../components/atoms/Typography';
import { SearchBar } from '../../components/molecules/SearchBar';
import { ParkCard } from '../../components/organisms/ParkCard';
import { StateFilterModal } from '../../components/organisms/StateFilterModal';
import { Colors } from '../../constants/theme';
import { useParks } from '../../hooks/nps/use-parks';
import { useSavedParksStorage } from '../../hooks/use-saved-parks-storage';
import {
  filterParksBySearch,
  filterParksByState,
} from '../../utils/filter-parks';
import { getStatesForFilter } from '../../utils/states-for-filter';

function getNoResultsMessage(
  searchQuery: string,
  selectedStateCodes: string[],
): string {
  const hasSearch = searchQuery.trim().length > 0;
  const hasStates = selectedStateCodes.length > 0;

  if (hasSearch && hasStates) {
    return 'No parks match your search and state filters.';
  }
  if (hasSearch) {
    return `No parks match "${searchQuery.trim()}"`;
  }
  if (hasStates) {
    return 'No parks match the selected states.';
  }
  return 'No parks found.';
}

export default function BrowseScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateCodes, setSelectedStateCodes] = useState<string[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const { parks, isLoading } = useParks();
  const { isSaved, toggleSave } = useSavedParksStorage();

  const statesForFilter = useMemo(() => getStatesForFilter(parks), [parks]);

  const filteredParks = filterParksBySearch(
    filterParksByState(parks, selectedStateCodes),
    searchQuery,
  );

  const hasActiveFilters =
    searchQuery.trim().length > 0 || selectedStateCodes.length > 0;

  const showNoResults =
    !isLoading && parks.length > 0 && filteredParks.length === 0 && hasActiveFilters;

  const handleToggleState = (stateCode: string) => {
    setSelectedStateCodes((current) =>
      current.includes(stateCode)
        ? current.filter((code) => code !== stateCode)
        : [...current, stateCode],
    );
  };

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
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFilterPress={() => setFilterVisible(true)}
            />
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
                {getNoResultsMessage(searchQuery, selectedStateCodes)}
              </Typography>
            </View>
          ) : null
        }
      />

      <StateFilterModal
        visible={filterVisible}
        states={statesForFilter}
        selectedStates={selectedStateCodes}
        onToggleState={handleToggleState}
        onClearAll={() => setSelectedStateCodes([])}
        onClose={() => setFilterVisible(false)}
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
