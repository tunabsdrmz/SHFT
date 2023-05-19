import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View style={styles.Container}>
      <Text style={styles.Text}>Loading...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontSize: 24,
    fontWeight: '700',
  },
});
