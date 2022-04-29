import { Text, StyleSheet } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const CustomText = (props) => {

    let style = {};
    if (props.t1) style = styles.t1;
    if (props.t2) style = styles.t2;
    if (props.t3) style = styles.t3;
    if (props.p1) style = styles.p1;
    if (props.p2) style = styles.p2;
    if (props.s) style = styles.s;

    return (
        <Text
            {...props}
            numberOfLines={props.numberOfLines ? props.numberOfLines : undefined}
            style={[style, {
                ...props.style,
            }]}>
            {props.text}
        </Text>
    )
}

const styles = StyleSheet.create({
    t1: {
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 24,
    },
    t2: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 20,
    },
    t3: {
        fontSize: 14,
        fontWeight: 'normal',
        lineHeight: 20,
    },
    p1: {
        fontSize: 17,
        fontWeight: 'normal',
        lineHeight: 27,
    },
    p2: {
        fontSize: 15,
        fontWeight: 'normal',
        lineHeight: 25
    },
    s: {
        fontSize: 13,
        fontWeight: 'bold',
        lineHeight: 15
    }
});

CustomText.propTypes = {
    t1: PropTypes.bool,
    t2: PropTypes.bool,
    t3: PropTypes.bool,
    p1: PropTypes.bool,
    p2: PropTypes.bool,
    s: PropTypes.bool,
    style: PropTypes.object,
    text: PropTypes.any,
    onPress: PropTypes.func,
    numberOfLines: PropTypes.number,
};

export default CustomText;