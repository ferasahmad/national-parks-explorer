import { Pressable, StyleSheet } from 'react-native';
import { Typography } from '../atoms/Typography';
import Checkbox from 'expo-checkbox';
import { Colors } from '@/constants/theme';

export type StateFilterItemProps = {
  stateName: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
};

export function StateFilterItem({ stateName, checked, onToggle }: StateFilterItemProps) {
  return (
    <Pressable style={styles.container} onPress={() => onToggle(!checked)}>
      <Typography variant="body">{stateName}</Typography>
      <Checkbox
        value={checked}
        onValueChange={onToggle}
        color={checked ? Colors.primary : undefined}
        style={styles.checkbox}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceVariant,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
});
