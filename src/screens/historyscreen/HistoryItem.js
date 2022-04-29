import { View, Text } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types';


const HistoryItem = ({ actionBy, datetime }) => {
    return (
        <View style={{
            height: 40,
            justifyContent: 'space-between',
            alignItems: 'baseline',
            paddingHorizontal: 5,
            marginTop: 10
        }}>
            <View>
                <Text style={{ fontWeight: 'bold' }}>Bởi: </Text>
                <Text style={{ marginLeft: 3 }}>{actionBy}</Text>
            </View>

            <Text>{datetime}</Text>
        </View >
    )
}
HistoryItem.propsType = {
    actionBy: PropTypes.string,
    datetime: PropTypes.string
}

export default HistoryItem