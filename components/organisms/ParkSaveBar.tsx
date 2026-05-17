import { Button } from '@/components/atoms/Button';
import { Colors } from '@/constants/theme';
import { Alert, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ParkSaveBarProps = {
  parkName: string;
  isSaved: boolean;
  onToggleSave: () => void;
};

export function ParkSaveBar({
  parkName,
  isSaved,
  onToggleSave,
}: ParkSaveBarProps) {
  const insets = useSafeAreaInsets();

  const handlePress = () => {
    if (isSaved) {
      Alert.alert(
        'Remove from Saved',
        `Are you sure you want to remove ${parkName} from your saved parks?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Remove', style: 'destructive', onPress: onToggleSave },
        ],
      );
    } else {
      onToggleSave();
    }
  };

  return (
    <View
      style={[styles.container, { paddingBottom: Math.max(insets.bottom, 16) }]}
    >
      <Button
        title={isSaved ? 'Saved' : 'Save Park'}
        variant={isSaved ? 'outline' : 'primary'}
        onPress={handlePress}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant,
    backgroundColor: Colors.background,
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
  },
});
