import { Pressable, StyleSheet, Text, TextInput, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { colors } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { cardStyle } from '../cardStyle';
import { fontSize } from '../fontSize';

export default function UpcomingMatchCard({ title, streaming_link, time, status }) {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate('StreamDetails', {
            status,
            title,
            streaming_link,
            time,
        });
    };
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
    if (typeof title != 'undefined' && typeof time != 'undefined' && typeof streaming_link != 'undefined' && typeof status != 'undefined') {
    if(status != "cancelled") {
        return (
        <View style={[styles.view, {backgroundColor:cardcolor}]}>
        <TouchableOpacity onPress={handlePress} style={[cardStyle.view, cardStyle.matchView]}>
            <View style={[styles.label, { marginBottom: 7.5, marginTop: 22 }]}>
                <Text style={[fontSize.lg, { fontFamily: 'Montserrat', color:labelcolor }]}>{labeltext}</Text>
            </View>
            <Text style={{ marginBottom: 7.5, flexWrap: 'wrap', flexShrink: 1, width: 300 }}>
                <Text style={[fontSize.xlg, { fontFamily: 'Montserrat-Bold', flexWrap: 'nowrap', flex: 1 }]}>{title} </Text>
            </Text>
            <Text style={[fontSize.lg, { fontFamily: 'Montserrat', marginBottom: 7.5 }]}>{time}</Text>
        </TouchableOpacity>
        </View>
    )
        }else{
            return (
                <View style={[styles.view, {backgroundColor:cardcolor}]}>
                <View style={[cardStyle.view, cardStyle.matchView]}>
                    <View style={[styles.label, { marginBottom: 7.5, marginTop: 22 }]}>
                        <Text style={[fontSize.lg, { fontFamily: 'Montserrat', color:labelcolor }]}>{labeltext}</Text>
                    </View>
                    <Text style={{ marginBottom: 7.5, flexWrap: 'wrap', flexShrink: 1, width: 300 }}>
                        <Text style={[fontSize.xlg, { fontFamily: 'Montserrat-Bold', flexWrap: 'nowrap', flex: 1 }]}>{title} </Text>
                    </Text>
                    <Text style={[fontSize.lg, { fontFamily: 'Montserrat', marginBottom: 7.5 }]}>{time}</Text>
                </View>
                </View>
            )
        }
    }
}

let styles = StyleSheet.create(
    {
        view: {
            paddingVertical: 10,
            paddingHorizontal: 7.5,
            borderRadius: 10,
            width:280,
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height:140,
            marginRight:20, 
        },
        invisiblestyle: {
            display: 'none',
        },
        label: {
            flexDirection: 'row',
        },
        innerView: {
            marginLeft: 15
        },
        innerView: {
            marginLeft: 5
        },
        sm: {
            fontSize: 12
        },
        md: {
            fontSize: 13
        },
        ld: {
            paddingLeft: 5,
            fontSize: 15,
        },
        icon: { width: '100%', alignSelf: 'center', textAlign: 'center' },
        button: {
            backgroundColor: colors.text + '00'
        },
    });