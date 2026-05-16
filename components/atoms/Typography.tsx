import { Text, type TextProps, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export type TypographyVariant =
  | 'heading1'
  | 'heading2'
  | 'subtitle'
  | 'body'
  | 'caption';

export type TypographyProps = TextProps & {
  color?: string;
  variant?: TypographyVariant;
};

export function Typography({
  style,
  color = Colors.light.text,
  variant = 'body',
  ...rest
}: TypographyProps) {
  return <Text style={[{ color }, styles[variant], style]} {...rest} />;
}

const styles = StyleSheet.create({
  heading1: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 34,
  },
  heading2: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
});
