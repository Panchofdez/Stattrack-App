import React from 'react';
import { View, StyleSheet , Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Spacer = ({ children }) => {
  return <View style={styles.spacer}>{children}</View>;
};

const styles = StyleSheet.create({
  spacer: {
    marginVertical: 0.03 *width,
    marginHorizontal:0.03*width
  }
});

export default Spacer;