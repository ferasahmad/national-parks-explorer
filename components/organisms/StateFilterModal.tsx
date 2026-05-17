import { Modal, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';
import { IconButton } from '../molecules/IconButton';
import { Colors } from '@/constants/theme';
import {
  StateFilterList,
  type StateData,
} from './StateFilterList';

export type StateFilterModalProps = {
  visible: boolean;
  states: StateData[];
  selectedStates: string[];
  onToggleState: (stateCode: string) => void;
  onClearAll: () => void;
  onClose: () => void;
};

export function StateFilterModal({
  visible,
  states,
  selectedStates,
  onToggleState,
  onClearAll,
  onClose,
}: StateFilterModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={styles.header}>
          <Typography variant="heading2">Filter by State</Typography>
          <IconButton name="close" onPress={onClose} />
        </View>

        <View style={styles.list}>
          <StateFilterList
            states={states}
            selectedStates={selectedStates}
            onToggleState={onToggleState}
          />
        </View>

        <View style={styles.footer}>
          <Button
            title="Clear all"
            variant="outline"
            style={styles.footerButton}
            onPress={onClearAll}
          />
          <Button
            title="Done"
            style={styles.footerButton}
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  list: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 16,
  },
  footerButton: {
    flex: 1,
  },
});
