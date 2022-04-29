import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import { colors } from '../constants/colors';



const CustomBackground = ({ style, children }) => {

   const styles = [{
      paddingHorizontal: 20,
      flex: 1,
      backgroundColor: colors.background
   }, style];

   return (
      <KeyboardAwareScrollView
         contentContainerStyle={{ flexGrow: 1 }}
         bounces={false}
         nestedScrollEnabled={true}
      >
         <View style={styles}>{children}</View>
      </KeyboardAwareScrollView>
   );
};

CustomBackground.propsType = {
   style: PropTypes.object,
   children: PropTypes.node,
}
export default CustomBackground;