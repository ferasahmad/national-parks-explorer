import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { Colors } from '@/constants/theme';

export type StandardIconProps = IconProps<
  ComponentProps<typeof Ionicons>['name']
>;

export function Icon({
  style,
  color = Colors.light.icon,
  ...rest
}: StandardIconProps) {
  return <Ionicons style={style} color={color} {...rest} />;
}
