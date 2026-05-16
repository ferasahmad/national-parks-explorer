import { TextInput, type TextInputProps, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export type InputProps = TextInputProps;

export function Input({ style, ...rest }: InputProps) {
  const color = Colors.light.text;
  const backgroundColor = Colors.surfaceVariant;
  const placeholderColor = '#717976';

  return (
    <TextInput
      style={[styles.input, { color, backgroundColor }, style]}
      placeholderTextColor={placeholderColor}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});
