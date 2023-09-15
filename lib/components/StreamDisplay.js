import { Pressable, StyleSheet, Text, TextInput, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { colors } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { cardStyle } from '../cardStyle';
import { useState, useCallback } from 'react';
import YoutubePlayer from "react-native-youtube-iframe";

export default function FixtureDisplay({title, time, streaming_link, status}) {
    const [playing, setPlaying] = useState(false);
    switch(status){
        case "finished":
            cardcolor = "#e3e3e3";
            labelcolor = "gray";
            labeltext = "FINISHED";
            break;
        case "delayed":
            cardcolor = "#faffa3";
            labelcolor = "#b8871f";
            labeltext = "DELAYED";
            break;
        case "live":
            cardcolor = "#ffb0b0";
            labelcolor = "red";
            labeltext = "LIVE";
            break;
        case "cancelled":
            cardcolor = "#e3e3e3";
            labelcolor = "red";
            labeltext = "CANCELLED";
            break;
        case "scheduled":
            cardcolor = "#c2ffc9";
            labelcolor = "green";
            labeltext = "SCHEDULED";
            break;
    }

    const onStateChange = useCallback((state) => {
      if (state === "ended") {
        setPlaying(false);
      }
    }, []);
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate('StreamDetails', {
          title,
          time,
          streaming_link,
          status,
        });
}
if (typeof title != 'undefined' && typeof time != 'undefined' && typeof streaming_link != 'undefined' && typeof status != 'undefined') {
    if(status != "cancelled") {
    return (
        <TouchableOpacity style={[styles.touchable]} onPress={handlePress}>
        <View style={[styles.view, { backgroundColor:cardcolor, height: '100%', marginRight:20 }]}>
            <View style={{alignItems: 'center'}}>
                <View style={[styles.innerView, {flexDirection: 'column', alignItems:'center', justifyContent: 'center', width:'95%'}]}>
                <View style={[styles.label, { justifyContent: 'center', alignItems: 'center', width: '100%' }]}><Text style={[styles.ld, {fontFamily: 'Montserrat-Bold', fontSize:24}]}>{title}</Text><Text style={[{fontFamily: 'Montserrat-Bold', fontSize:18}]}>{time}</Text><Text style={[{fontFamily: 'Montserrat', fontSize:16, color:labelcolor}]}>{labeltext}</Text></View>
                </View>
      </View>
        </View>
        </TouchableOpacity>
    )
    }else{
        return (
        <View style={[styles.touchable]}>
        <View style={[styles.view, { backgroundColor:cardcolor, height: '100%', marginRight:20 }]}>
        <View style={{alignItems: 'center'}}>
            <View style={[styles.innerView, {flexDirection: 'column', alignItems:'center', justifyContent: 'center', width:'95%'}]}>
            <View style={[styles.label, { justifyContent: 'center', alignItems: 'center', width: '100%' }]}><Text style={[styles.ld, {fontFamily: 'Montserrat-Bold', fontSize:24}]}>{title}</Text><Text style={[{fontFamily: 'Montserrat-Bold', fontSize:18}]}>{time}</Text><Text style={[{fontFamily: 'Montserrat', fontSize:16, color:labelcolor}]}>{labeltext}</Text></View>
            </View>
            </View>
        </View>
        </View>
        )
    }
}
}

let styles = StyleSheet.create(
    {
        view: {
            paddingHorizontal: 20,
            borderRadius: 5,
            flexDirection: 'row',
            flexShrink: 1,
            flexDirection: 'column',
            marginRight: 20,
            padding: 22,
            justifyContent: 'center',
            flexWrap: 'nowrap',
            flex: 1,
            width:'100%',
            height:200,
        },
    touchable: {
        height:200,
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