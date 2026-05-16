import { StyleSheet, FlatList } from 'react-native';
import { StateFilterItem } from '../molecules/StateFilterItem';

export type StateData = {
  code: string;
  name: string;
};

export type StateFilterListProps = {
  states: StateData[];
  selectedStates: string[];
  onToggleState: (stateCode: string) => void;
};

export function StateFilterList({
  states,
  selectedStates,
  onToggleState,
}: StateFilterListProps) {
  return (
    <FlatList
      data={states}
      keyExtractor={(item) => item.code}
      renderItem={({ item }) => (
        <StateFilterItem
          stateName={item.name}
          checked={selectedStates.includes(item.code)}
          onToggle={() => onToggleState(item.code)}
        />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 40,
  },
});
