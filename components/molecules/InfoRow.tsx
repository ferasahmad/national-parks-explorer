import { View, StyleSheet } from 'react-native';
import { Typography } from '../atoms/Typography';

export type InfoRowProps = {
  label: string;
  value: string;
};

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View style={styles.container}>
      <Typography variant="body" style={styles.label}>{label}</Typography>
      <Typography variant="body" style={styles.value}>{value}</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    color: '#666',
  },
  value: {
    fontWeight: '600',
  },
});
