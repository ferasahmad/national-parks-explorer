import { View, StyleSheet } from 'react-native';
import { Typography } from '../atoms/Typography';
import { Colors } from '@/constants/theme';

export type FeeCardProps = {
  title: string;
  price: string;
  description: string;
};

export function FeeCard({ title, price, description }: FeeCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Typography variant="subtitle">{title}</Typography>
        <Typography variant="subtitle">{price}</Typography>
      </View>
      <Typography variant="caption" style={styles.description}>
        {description}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceVariant,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  description: {
    color: '#666',
  },
});
