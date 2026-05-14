import { View, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Typography } from '../atoms/Typography';
import { IconButton } from '../molecules/IconButton';
import { type Park } from '@/api/types';
import { Colors } from '@/constants/theme';
import { Icon } from '../atoms/Icon';

export type ParkCardProps = {
  park: Park;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onPress?: () => void;
};

export function ParkCard({ park, isSaved, onToggleSave, onPress }: ParkCardProps) {
  const imageUrl = park.images?.[0]?.url;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        source={imageUrl}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.overlay} />
      
      <View style={styles.header}>
        <View style={styles.spacer} />
        {onToggleSave && (
          <IconButton
            name={isSaved ? "heart" : "heart-outline"}
            color={isSaved ? "red" : Colors.onPrimary}
            onPress={onToggleSave}
            style={styles.favoriteButton}
          />
        )}
      </View>

      <View style={styles.footer}>
        <Typography variant="heading2" style={styles.title} numberOfLines={1}>
          {park.fullName}
        </Typography>
        <View style={styles.locationRow}>
          <Icon name="location-outline" size={14} color={Colors.onPrimary} />
          <Typography variant="caption" style={styles.locationText}>
            {park.states}
          </Typography>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: Colors.surfaceVariant,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  spacer: {
    flex: 1,
  },
  favoriteButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  title: {
    color: Colors.onPrimary,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: Colors.onPrimary,
    marginLeft: 4,
  },
});
