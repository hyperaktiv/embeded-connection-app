import { useNavigation } from '@react-navigation/native';
import CustomBackground from '../../components/CustomBackground';
import HistoryItem from './HistoryItem';
import { View } from 'react-native'

const HistoryScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: 'LỊCH SỬ',
            headerTitleAlign: 'center',
            headerTransparent: false,
            headerRight: () => (
                <View
                    style={{
                        height: 80,
                        width: 60,
                    }}
                >
                </View>
            )
        })
    }, [])

    return (
        <CustomBackground>
            <HistoryItem actionBy={'Điện thoại'} datetime={'2022-02-25T09:05:42.207Z'} />

            <HistoryItem actionBy={'Điện thoại'} datetime={'2022-01-25T09:05:42.207Z'} />

            <HistoryItem actionBy={'Bấm tay'} datetime={'2022-02-15T09:05:42.207Z'} />

            <HistoryItem actionBy={'Bấm tay'} datetime={'2022-02-22T09:05:42.207Z'} />
        </CustomBackground>
    )
}

export default HistoryScreen