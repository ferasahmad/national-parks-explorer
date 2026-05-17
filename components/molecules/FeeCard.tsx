import { Colors } from '@/constants/theme';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../atoms/Typography';

export type FeeCardProps = {
  title: string;
  price: string;
  description: string;
};

export function FeeCard({ title, price, description }: FeeCardProps) {
  return (
    <View style={styles.container}>
      <Typography variant="heading2">{title}</Typography>
      <Typography variant="subtitle" style={styles.price}>
        {price}
      </Typography>
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
  price: {
    marginTop: 4,
    marginBottom: 4,
    color: '#666',
  },
  description: {
    color: '#666',
  },
});
