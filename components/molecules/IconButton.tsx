import { Pressable, StyleSheet, type PressableProps } from 'react-native';
import { Icon, type StandardIconProps } from '../atoms/Icon';

export type IconButtonProps = PressableProps & {
  name: StandardIconProps['name'];
  size?: number;
  color?: string;
};

export function IconButton({
  name,
  size = 24,
  color,
  ...rest
}: IconButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, { opacity: pressed ? 0.7 : 1 }]}
      {...rest}
    >
      <Icon name={name} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
