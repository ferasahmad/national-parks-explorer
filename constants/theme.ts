/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#16342d';
const tintColorDark = '#ffffff';

export const Colors = {
  primary: '#16342d',
  onPrimary: '#ffffff',
  primaryContainer: '#2d4b43',
  onPrimaryContainer: '#99bab0',
  secondary: '#40627d',
  onSecondary: '#ffffff',
  secondaryContainer: '#bcdeff',
  onSecondaryContainer: '#41627e',
  tertiary: '#273225',
  onTertiary: '#ffffff',
  tertiaryContainer: '#3d493a',
  onTertiaryContainer: '#abb8a4',
  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
  background: '#f9f9fe',
  onBackground: '#1a1c1f',
  surface: '#f9f9fe',
  onSurface: '#1a1c1f',
  surfaceVariant: '#e2e2e7',
  onSurfaceVariant: '#414846',
  outline: '#717976',
  outlineVariant: '#c1c8c4',
  inverseSurface: '#2e3034',
  inverseOnSurface: '#f0f0f5',
  inversePrimary: '#adcec3',
  light: {
    text: '#1a1c1f',
    background: '#f9f9fe',
    tint: tintColorLight,
    icon: '#717976',
    tabIconDefault: '#717976',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ffffff',
    background: '#1c1c1e',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
