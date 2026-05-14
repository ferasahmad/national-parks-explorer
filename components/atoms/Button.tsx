import { Colors } from '@/constants/theme';
import { Pressable, StyleSheet, ViewStyle, type PressableProps } from 'react-native';
import { Typography } from './Typography';

export type ButtonProps = PressableProps & {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: ViewStyle;
};

export function Button({ title, variant = 'primary', style, disabled, ...rest }: ButtonProps) {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary': 
        return Colors.primary;
      case 'secondary': 
        return Colors.secondary;
      case 'outline': 
        return 'transparent';
      default: 
        return Colors.primary;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary': 
        return Colors.onPrimary;
      case 'secondary': 
        return Colors.onSecondary;
      case 'outline': 
        return Colors.light.text;
      default: 
        return Colors.onPrimary;
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case 'outline': 
        return Colors.light.icon;
      default: 
        return 'transparent';
    }
  };

  const getOpacity = (pressed: boolean) => {
    if (disabled) return 0.5;
    if (pressed) return 0.8;
    return 1;
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 1 : 0,
          opacity: getOpacity(pressed),
        },
        style,
      ]}
      disabled={disabled}
      {...rest}
    >
      <Typography
        style={[styles.text, { color: getTextColor() }]}
        variant="subtitle"
      >
        {title}
      </Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: 'bold',
  },
});
