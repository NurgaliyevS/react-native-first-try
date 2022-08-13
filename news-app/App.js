import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    // VIEW === div
    // style === className
    <View style={styles.container}>
      {/* TEXT === span / p */}
      <Text style={styles.testText}>Test app!</Text>
      {/* alternative way to style */}
      <Text
        style={{
          color: 'green',
          fontSize: 28,
        }}
      >
        whuahah!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testText: {
    color: 'red',
    fontSize: 24,
  },
});
