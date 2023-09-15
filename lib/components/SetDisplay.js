import { Pressable, StyleSheet, Text, TextInput, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { colors } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { cardStyle } from '../cardStyle';

export default function SetDisplay({set, scorea, scoreb}) {
    return (
        <View style={[styles.view, { height: 100, marginRight:20 }]}>
            <View style={{alignItems: 'center'}}>
                <View style={[styles.innerView, {flexDirection: 'column', alignItems:'center', justifyContent: 'center', width:'95%'}]}>
                <View style={{flexDirection: 'row'}}>
                    <View style={[styles.label, { justifyContent: 'center', width: '100%' }]}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:'40%', flexDirection:'row', alignItems:'center'}}>
                        <Text style={[styles.md, {fontFamily: 'Montserrat-Bold', fontSize:35}]}>{scorea}</Text>
                        </View>
                        <View style={[styles.label, { flexDirection:'column', justifyContent: 'center', alignItems: 'flex-end', width:'20%'}]}>
                        <Text style={[styles.md, {paddingRight:30, fontFamily: 'Montserrat-Bold', fontSize:15}]}>Set</Text>
                        <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}><Text style={[styles.md, {paddingRight:30, fontFamily: 'Montserrat-Bold', fontSize:25}]}>{set}</Text></View>
                        </View>
                        <View style={[styles.label, { justifyContent: 'center', alignItems: 'flex-end', width:'40%'}]}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={[styles.md, {paddingRight:6, fontFamily: 'Montserrat-Bold', fontSize:35}]}>{scoreb}</Text>
                        </View>
                        </View>
                        </View>
                        <View style={{width:'100%', flexDirection:'row'}}>
                        </View>
                    </View>
                </View>
                </View>
      </View>
                <View style={{width:'100%', flexDirection:'row', paddingTop:10, alignItems:'flex-start'}}>
            </View>
        </View>
    )
}

let styles = StyleSheet.create(
    {
        view: {
            paddingHorizontal: 20,
            flexDirection: 'row',
            flexShrink: 1,
            flexDirection: 'column',
            marginRight: 20,
            padding: 22,
            justifyContent: 'center',
            flexWrap: 'nowrap',
            flex: 1,
            width:'100%',
            height:250,
        },
    touchable: {
        height:240,
        paddingTop:20,
    },
    invisiblestyle: {
        display: 'none',
    },
    label: {
        justifyContent: 'center',
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
    ld: {
        fontSize: 15,
    },
    labelContainer: {
        transform: [{translateY: (17.5/2)-2.5}]
    },
    icon: {width:'100%', alignSelf: 'center', textAlign: 'center'},
    button: {
        backgroundColor: colors.text+'00'
    },
});