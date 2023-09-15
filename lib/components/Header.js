import { StyleSheet, Text, View, Image } from 'react-native';
import { colors } from '../colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header() {
    return (
        <View style={styles.header}>
            <Image source={require('./../../assets/SuryanaGold.png')} style={styles.logo} />
            <Text style={styles.heading}>CC CUP XXXVIII</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        height: 80,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 2.5,
        borderBottomColor: colors.background2+'88'
    },
    logo: {
        width: 55,
        height: 55,
        marginLeft: 15,
        marginRight: 10
    },
    heading: {
        fontSize: 30,
        color: colors.accent,
        fontFamily: 'Caruban'
    }
});
