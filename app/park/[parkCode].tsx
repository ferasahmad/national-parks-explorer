import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';
import { ActivityPill } from '@/components/molecules/ActivityPill';
import { FeeCard } from '@/components/molecules/FeeCard';
import { OperatingHoursCard } from '@/components/organisms/OperatingHoursCard';
import { ParkImageCarousel } from '@/components/organisms/ParkImageCarousel';
import { Colors } from '@/constants/theme';
import { useParkDetail } from '@/hooks/nps/use-park-detail';
import {
  formatEntranceFee,
  getActivityIcon,
} from '@/utils/activity-icons';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

function normalizeParam(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export default function ParkDetailScreen() {
  const { parkCode: parkCodeParam } = useLocalSearchParams<{
    parkCode: string;
  }>();
  const parkCode = normalizeParam(parkCodeParam);
  const navigation = useNavigation();
  const { park, isLoading, isError, error, refetch } = useParkDetail(parkCode);

  useEffect(() => {
    if (park?.fullName) {
      navigation.setOptions({ title: park.fullName });
    }
  }, [park?.fullName, navigation]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Typography
          variant="body"
          color={Colors.onSurfaceVariant}
          style={styles.errorText}
        >
          {error instanceof Error
            ? error.message
            : 'Failed to load park details.'}
        </Typography>
        <Button title="Try Again" onPress={() => refetch()} />
      </View>
    );
  }

  if (!park) {
    return null;
  }

  const hasActivities = park.activities && park.activities.length > 0;
  const hasFees = park.entranceFees && park.entranceFees.length > 0;
  const hasImages = park.images && park.images.length > 0;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {hasImages && <ParkImageCarousel images={park.images} />}

      <View style={styles.body}>
        <View style={styles.parkHeader}>
          <Typography variant="heading1">{park.fullName}</Typography>
          <View style={styles.locationRow}>
            <Icon
              name="location-outline"
              size={16}
              color={Colors.onSurfaceVariant}
            />
            <Typography variant="body" color={Colors.onSurfaceVariant}>
              {park.states}
            </Typography>
          </View>
        </View>

        <View style={styles.section}>
        <Typography variant="heading2" style={styles.sectionTitle}>
          Overview
        </Typography>
        <Typography variant="body" color={Colors.onSurfaceVariant}>
          {park.description}
        </Typography>
      </View>

      {hasActivities && (
        <View style={styles.section}>
          <Typography variant="heading2" style={styles.sectionTitle}>
            Popular Activities
          </Typography>
          <View style={styles.activities}>
            {park.activities.map((activity) => (
              <ActivityPill
                key={activity.id}
                label={activity.name}
                iconName={getActivityIcon(activity.name)}
              />
            ))}
          </View>
        </View>
      )}

      <OperatingHoursCard operatingHours={park.operatingHours} />

      <View style={styles.feesSection}>
        <View style={styles.cardHeader}>
          <Icon name="cash-outline" size={20} color={Colors.light.text} />
          <Typography variant="subtitle" style={styles.cardHeaderTitle}>
            Entrance Fees
          </Typography>
        </View>
        {hasFees ? (
          park.entranceFees.map((fee, index) => (
            <FeeCard
              key={`${fee.title}-${index}`}
              title={fee.title}
              price={formatEntranceFee(fee.cost)}
              description={fee.description}
            />
          ))
        ) : (
          <Typography variant="body" color={Colors.onSurfaceVariant}>
            Entrance fee information is not available. Check the park website
            before you visit.
          </Typography>
        )}
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 32,
  },
  body: {
    paddingHorizontal: 20,
  },
  parkHeader: {
    marginBottom: 24,
    marginTop: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  activities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  feesSection: {
    backgroundColor: Colors.surfaceVariant,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardHeaderTitle: {
    marginLeft: 8,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 16,
  },
});
