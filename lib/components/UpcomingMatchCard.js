import { Pressable, StyleSheet, Text, TextInput, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { colors } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { cardStyle } from '../cardStyle';
import { fontSize } from '../fontSize';

export default function UpcomingMatchCard({ competition_id, status, player1, player2, time, level, venue, team1_score, team2_score, team1_set1, team1_set2, team1_set3, team1_set4, team1_set5, team2_set1, team2_set2, team2_set3, team2_set4, team2_set5 }) {
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
            team1_score, team2_score, team1_set1, team1_set2, team1_set3, team1_set4, team1_set5, team2_set1, team2_set2, team2_set3, team2_set4, team2_set5
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
        <TouchableOpacity onPress={handlePress} style={[cardStyle.view, cardStyle.matchView, cardStyle[competition_id]]}>
            <View style={[styles.label, { marginBottom: 7.5, marginTop: 22 }]}>
                <MaterialCommunityIcons name={icon} size={20} color={'black'} /><Text style={[fontSize.lg, { fontFamily: 'Montserrat-Bold', paddingLeft: 7.5 }]}>{cabangText}</Text>
            </View>
            <Text style={{ marginBottom: 7.5, flexWrap: 'wrap', flexShrink: 1, width: 300 }}>
                <Text style={[fontSize.xlg, { fontFamily: 'Montserrat-Bold', flexWrap: 'nowrap', flex: 1 }]}>{player1.replaceAll(" ", "\u00A0")} </Text>
                <Text style={[fontSize.md, { fontFamily: 'Montserrat' }]}>vs</Text>
                <Text style={[fontSize.xlg, { fontFamily: 'Montserrat-Bold', flexWrap: 'nowrap', flex: 1 }]}> {player2.replaceAll(" ", "\u00A0")}</Text>
            </Text>
            <Text style={[fontSize.lg, { fontFamily: 'Montserrat', marginBottom: 7.5 }]}>{time}</Text>
            <Text style={[fontSize.md, { fontFamily: 'Montserrat', marginBottom: 22 }]}>{status === "ongoing" ? (<Text style={{ color: 'red' }}>ONGOING</Text>) : (<Text style={{ color: 'green' }}>SCHEDULED</Text>)}</Text>
        </TouchableOpacity>
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
            height: '70%',
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