import { type Park } from '@/api/types';
import { Colors } from '@/constants/theme';
import { Image } from 'expo-image';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { Icon } from '../atoms/Icon';
import { Typography } from '../atoms/Typography';
import { IconButton } from '../molecules/IconButton';

export type ParkCardProps = {
  park: Park;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onPress?: () => void;
};

export function ParkCard({
  park,
  isSaved,
  onToggleSave,
  onPress,
}: ParkCardProps) {
  const imageUrl = park.images?.[0]?.url;

  const handleToggleSave = () => {
    if (!onToggleSave) return;

    if (isSaved) {
      Alert.alert(
        'Remove from Saved',
        `Are you sure you want to remove ${park.fullName} from your saved parks?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Remove', style: 'destructive', onPress: onToggleSave },
        ],
      );
    } else {
      onToggleSave();
    }
  };

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
            name={isSaved ? 'heart' : 'heart-outline'}
            color={isSaved ? 'red' : Colors.onPrimary}
            onPress={handleToggleSave}
            style={styles.favoriteButton}
          />
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.locationRow}>
          <Icon name="location-outline" size={14} color={Colors.onPrimary} />
          <Typography variant="caption" style={styles.locationText}>
            {park.states}
          </Typography>
        </View>
        <Typography variant="heading2" style={styles.title} numberOfLines={2}>
          {park.fullName}
        </Typography>
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
