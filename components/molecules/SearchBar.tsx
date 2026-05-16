import { View, StyleSheet } from 'react-native';
import { Input } from '../atoms/Input';
import { Icon } from '../atoms/Icon';
import { IconButton } from './IconButton';
import { Colors } from '@/constants/theme';

export type SearchBarProps = {
  value?: string;
  onChangeText?: (text: string) => void;
  onFilterPress?: () => void;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChangeText,
  onFilterPress,
  placeholder = 'Search parks, trails, or states',
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Icon
        name="search"
        size={20}
        color={Colors.light.icon}
        style={styles.icon}
      />
      <Input
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      <IconButton name="options-outline" onPress={onFilterPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceVariant,
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  icon: {
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
