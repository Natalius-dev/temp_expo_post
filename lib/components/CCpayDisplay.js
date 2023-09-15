import { Pressable, StyleSheet, Text, TextInput, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { colors } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import rupiahFormat from '../rupiahFormat';

export default function CCpayDisplay(props) {
    const navigation = useNavigation();

    return (
        <View style={[styles.view, { backgroundColor: colors.accent }]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons name='wallet' size={28} color={colors.background} style={styles.innerView} />
                <View style={[styles.innerView, {flexDirection: 'column', justifyContent: 'center'}]}>
                    <Text style={[styles.md, {fontFamily: 'Montserrat-Bold'}]}>{rupiahFormat(props.balance)}</Text>
                    <Text style={[styles.md, {fontFamily: 'Montserrat'}]}>Resets 17:00</Text>
                </View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10}}>
                    <TouchableOpacity hitSlop={15} onPressOut={() => {navigation.navigate("CCPay")}} style={{marginBottom: 1.5}}><MaterialCommunityIcons name='qrcode-scan' size={28} color={colors.background} /></TouchableOpacity>
                    <Text style={[styles.sm, {marginTop: 1.5, fontFamily: 'Montserrat-Bold', textAlign: 'center'}]}>Pay</Text>
                </View>
                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10}}>
                    <TouchableOpacity hitSlop={15} onPressOut={() => {navigation.navigate("History")}} style={{marginBottom: 1.5}}><MaterialCommunityIcons name='history' size={28} color={colors.background} /></TouchableOpacity>
                    <Text style={[styles.sm, {marginTop: 1.5, fontFamily: 'Montserrat-Bold', textAlign: 'center'}]}>History</Text>
                </View>
            </View>
        </View>
    )
}

let styles = StyleSheet.create(
    {
    view: {
        paddingVertical: 15,
        paddingHorizontal: 7.5,
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: 0
    },
    innerView: {
        marginLeft: 15
    },
    sm: {
        fontSize: 12
    },
    md: {
        fontSize: 13
    },
    labelContainer: {
        transform: [{translateY: (17.5/2)-2.5}]
    },
    icon: {width:'100%', alignSelf: 'center', textAlign: 'center'},
    button: {
        backgroundColor: colors.text+'00'
    }
});