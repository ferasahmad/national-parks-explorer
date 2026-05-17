import { type StandardIconProps } from '@/components/atoms/Icon';

export function getActivityIcon(
  activityName: string,
): StandardIconProps['name'] {
  const name = activityName.toLowerCase();

  if (name.includes('hik') || name.includes('walk')) return 'walk-outline';
  if (
    name.includes('kayak') ||
    name.includes('canoe') ||
    name.includes('boat') ||
    name.includes('raft')
  ) {
    return 'boat-outline';
  }
  if (name.includes('camp')) return 'bonfire-outline';
  if (
    name.includes('wildlife') ||
    name.includes('bird') ||
    name.includes('photo')
  ) {
    return 'camera-outline';
  }
  if (name.includes('bike') || name.includes('cycl')) return 'bicycle-outline';
  if (name.includes('fish')) return 'fish-outline';
  if (name.includes('climb')) return 'trending-up-outline';
  if (name.includes('ski') || name.includes('snow')) return 'snow-outline';
  if (name.includes('swim')) return 'water-outline';

  return 'leaf-outline';
}

export function formatEntranceFee(cost: string): string {
  const amount = parseFloat(cost);
  if (Number.isNaN(amount)) return cost;
  if (amount === 0) return 'Free';
  return `$${amount.toFixed(2)}`;
}
