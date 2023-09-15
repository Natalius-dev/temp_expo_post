import { Pressable, StyleSheet, Text, TextInput, TouchableHighlight, TouchableNativeFeedback, View } from 'react-native';
import { colors } from '../colors';

export default function Button(props) {
    let defaultStyle = StyleSheet.create({button: {paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5}});
    
    return (
        <Pressable style={({pressed}) => [pressed ? {backgroundColor: colors.background+'b0'} : {backgroundColor: colors.background+'ff'}, defaultStyle.button]} onPressIn={props.callbackIn} onPressOut={props.callbackOut}>
            <View><Text style={{fontFamily: 'Montserrat-Bold', color: '#ffffff'}}>{props.label}</Text></View>
        </Pressable>
    )
}