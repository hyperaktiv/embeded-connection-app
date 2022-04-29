import React, { useEffect, useState } from 'react';
import CustomText from '../../components/CustomText';
import { useNavigation, CommonActions } from '@react-navigation/native';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import CustomBackground from '../../components/CustomBackground';
import PropTypes from 'prop-types';

const DeviceControll = ({ }) => {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: 'CHẾ ĐỘ ACCESS POINT',
            headerTitleAlign: 'center',
            headerTransparent: false,
            headerLeft: () => <CustomHeaderButton type="goback" onPress={() => navigation.dispatch(CommonActions.goBack())} />,
        })
    }, [])

    return (
        <CustomBackground>
            <Text>DeviceControl</Text>
        </CustomBackground>
    )
}

DeviceControll.propsType = {

}

export default DeviceControll