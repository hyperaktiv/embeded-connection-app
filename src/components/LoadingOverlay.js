import React from 'react';
import { Modal, View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import {colors} from '../constants/colors';


const LoadingOverlay = ({ loading, ...rest }) => (
    <Modal animationType='fade' transparent visible={loading} {...rest}>
        <View 
            style={{ 
                flex: 1, 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
        >
            <ActivityIndicator size={'large'} color={colors.primary1} />
        </View>
    </Modal>
);

LoadingOverlay.propTypes = {
   title: PropTypes.string,
   loading: PropTypes.bool
}

export default LoadingOverlay;