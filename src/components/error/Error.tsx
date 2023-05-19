import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  error: string;
};

const Error = ({error}: Props) => {
  return (
    <View style={styles.Container}>
      <Text style={styles.Text}>An Error Occured: {error}</Text>
    </View>
  );
};

export default Error;

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
