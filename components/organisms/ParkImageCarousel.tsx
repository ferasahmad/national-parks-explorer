import { type Image } from '@/api/types';
import { Colors } from '@/constants/theme';
import { Image as ExpoImage } from 'expo-image';
import { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const CAROUSEL_HEIGHT = 280;
const SCREEN_WIDTH = Dimensions.get('window').width;

export type ParkImageCarouselProps = {
  images: Image[];
};

export function ParkImageCarousel({ images }: ParkImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    return (
      <View style={styles.container}>
        <ExpoImage
          source={images[0].url}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Carousel
        width={SCREEN_WIDTH}
        height={CAROUSEL_HEIGHT}
        data={images}
        loop
        pagingEnabled
        snapEnabled
        onSnapToItem={setActiveIndex}
        renderItem={({ item }) => (
          <ExpoImage
            source={item.url}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />
        )}
      />
      <View style={styles.pagination} pointerEvents="none">
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: CAROUSEL_HEIGHT,
    backgroundColor: Colors.surfaceVariant,
  },
  image: {
    width: SCREEN_WIDTH,
    height: CAROUSEL_HEIGHT,
  },
  pagination: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  dotActive: {
    backgroundColor: 'rgb(141, 141, 141)',
  },
});
