import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function BrowseScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Browse Parks</Text>
      <Link href="/park/yellowstone" style={styles.link}>
        View Yellowstone
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
