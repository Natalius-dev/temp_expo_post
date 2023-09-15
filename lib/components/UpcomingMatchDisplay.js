import { Pressable, StyleSheet, Text, TextInput, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { colors } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { cardStyle } from '../cardStyle';

export default function UpcomingMatchDisplay({competition_id, status, time, player1, player2, level, venue, team1_score, team2_score, team1_set1, team1_set2, team1_set3, team1_set4, team1_set5, team2_set1, team2_set2, team2_set3, team2_set4, team2_set5}) {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate('MatchDetails', {
          competition_id,
          status,
          player1,
          player2,
          time,
          level,
          venue,
          team1_score, team2_score, team1_set1, team1_set2, team1_set3, team1_set4, team1_set5, team2_set1, team2_set2, team2_set3, team2_set4, team2_set5,
        });
      };
      switch (competition_id) {
        case "basket-putra":
            cabangText = "Basket Putra";
            icon = "basketball";
            break;
        case "basket-putri":
            cabangText = "Basket Putri";
            icon = "basketball";
            break;
        case "voli-putra":
            cabangText = "Voli Putra";
            icon = "volleyball";
            break;
        case "voli-putri":
            cabangText = "Voli Putri";
            icon = "volleyball";
            break;
        case "futsal":
            cabangText = "Futsal";
            icon = "soccer";
            break;
        case "bulu-tangkis":
            cabangText = "Bulu Tangkis";
            icon = "badminton";
            break;
        case "tenis-meja":
            cabangText = "Tenis Meja";
            icon = "table-tennis";
            break;
    }
    return (
    <TouchableOpacity style={[styles.touchable]} onPress={handlePress}>
    <View style={[styles.view, cardStyle[competition_id] , { marginRight:20 }]}>
        <View style={{alignItems: 'center'}}>
            <View style={[styles.innerView, {flexDirection: 'column', alignItems:'center', justifyContent: 'center', width:'95%'}]}>
            <View style={[styles.label, { justifyContent: 'center', alignItems: 'center', width: '100%' }]}><MaterialCommunityIcons name={icon} size={20} color={colors.icon} style={styles.innerViewIcon} /><Text style={[styles.ld, {fontFamily: 'Montserrat-Bold'}]}>{cabangText}</Text><Text style={[{fontFamily: 'Montserrat', fontSize: 12}]}>{level}</Text></View>
            <View style={{flexDirection: 'row'}}><View style={[styles.label, { justifyContent: 'center', width: '50%' }]}><Text style={[styles.md, {paddingLeft:6, fontFamily: 'Montserrat-Bold', fontSize:20}]}>{player1}</Text></View>
            <View style={[styles.label, { justifyContent: 'center', alignItems: 'flex-end', width: '48%' }]}><Text style={[styles.md, {paddingRight:6, fontFamily: 'Montserrat-Bold', fontSize:20}]}>{player2}</Text></View></View>
                <Text style={[styles.md, {fontFamily: 'Montserrat-Bold', fontSize:18}]}>{time}</Text>
                <Text style={[styles.md, { fontFamily: 'Montserrat' , color: 'red'}, status === "ongoing" ? {} : styles.invisiblestyle]}>ONGOING</Text>
                <Text style={[styles.md, { fontFamily: 'Montserrat' , color:'green'}, status === "scheduled" ? {} : styles.invisiblestyle]}>SCHEDULED</Text>
            </View>
        </View>
    </View>
    </TouchableOpacity>
    )
}

let styles = StyleSheet.create(
    {
        touchable: {
            height: 220,
            paddingTop: 20
        },
    view: {
        paddingHorizontal: 7.5,
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '100%'
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
    icon: {width:'100%', alignSelf: 'center', textAlign: 'center'},
    button: {
        backgroundColor: colors.text+'00'
    },
});