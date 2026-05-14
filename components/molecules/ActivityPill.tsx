import { View, StyleSheet } from 'react-native';
import { Typography } from '../atoms/Typography';
import { Icon, type StandardIconProps } from '../atoms/Icon';
import { Colors } from '@/constants/theme';

export type ActivityPillProps = {
  label: string;
  iconName: StandardIconProps['name'];
};

export function ActivityPill({ label, iconName }: ActivityPillProps) {
  return (
    <View style={styles.container}>
      <Icon name={iconName} size={16} color={Colors.light.text} />
      <Typography variant="caption" style={styles.label}>
        {label}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceVariant,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  label: {
    marginLeft: 6,
    fontWeight: '500',
  },
});
