import { View, StyleSheet } from 'react-native';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';
import { InfoRow } from '../molecules/InfoRow';
import { type OperatingHours } from '@/api/types';
import { Colors } from '@/constants/theme';

export type OperatingHoursCardProps = {
  operatingHours: OperatingHours[];
};

export function OperatingHoursCard({
  operatingHours,
}: OperatingHoursCardProps) {
  if (!operatingHours || operatingHours.length === 0) return null;

  const hours = operatingHours[0].standardHours;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="time-outline" size={20} color={Colors.light.text} />
        <Typography variant="subtitle" style={styles.title}>
          Operating Hours
        </Typography>
      </View>

      <View style={styles.content}>
        <InfoRow label="Monday" value={hours.monday} />
        <InfoRow label="Tuesday" value={hours.tuesday} />
        <InfoRow label="Wednesday" value={hours.wednesday} />
        <InfoRow label="Thursday" value={hours.thursday} />
        <InfoRow label="Friday" value={hours.friday} />
        <InfoRow label="Saturday" value={hours.saturday} />
        <InfoRow label="Sunday" value={hours.sunday} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceVariant,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    marginLeft: 8,
  },
  content: {
    gap: 4,
  },
});
