import { Pressable, StyleSheet, Text, TextInput, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { colors } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { cardStyle } from '../cardStyle';
import { fontSize } from '../fontSize';

export default function HeadlineFixtureCard({ competition_id, time, status, player1, player2, team1_score, team2_score, team1_set1, team1_set2, team1_set3, team1_set4, team1_set5, team2_set1, team2_set2, team2_set3, team2_set4, team2_set5, level, venue }) {
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
    const navigation = useNavigation();
    const handlePress = () => {
        if (competition_id == "futsal" || competition_id == "basket-putra" || competition_id == "basket-putri") {
            navigation.navigate('FixtureDetails', {
                competition_id,
                status,
                player1,
                player2,
                time,
                level,
                venue,
                team1_score,
                team2_score,
            });
        } else if (competition_id == "voli-putra" || competition_id == "voli-putri" || competition_id == "bulu-tangkis" || competition_id == "tenis-meja") {
            navigation.navigate('FixtureDetails', {
                competition_id,
                status,
                player1,
                player2,
                time,
                level,
                venue,
                team1_set1,
                team1_set2,
                team1_set3,
                team1_set4,
                team1_set5,
                team2_set1,
                team2_set2,
                team2_set3,
                team2_set4,
                team2_set5,
            });
        }
    }

    if (typeof team1_set1 != 'undefined' && typeof team2_set1 != 'undefined') {
        n11 = team1_set1;
        n21 = team2_set1;
    } else {
        n11 = 0;
        n21 = 0;
    }
    if (typeof team1_set2 != 'undefined' && typeof team2_set2 != 'undefined') {
        n12 = team1_set2;
        n22 = team2_set2;
    } else {
        n12 = 0;
        n22 = 0;
    }
    if (typeof team1_set3 != 'undefined' && typeof team2_set3 != 'undefined') {
        n13 = team1_set3;
        n23 = team2_set3;
    } else {
        n13 = 0;
        n23 = 0;
    }
    if (typeof team1_set4 != 'undefined' && typeof team2_set4 != 'undefined') {
        n14 = team1_set4;
        n24 = team2_set4;
    } else {
        n14 = 0;
        n24 = 0;
    }
    if (typeof team1_set5 != 'undefined' && typeof team2_set5 != 'undefined') {
        n15 = team1_set5;
        n25 = team2_set5;
    } else {
        n15 = 0;
        n25 = 0;
    }

        return (
            <TouchableOpacity onPress={handlePress} style={[cardStyle[competition_id], cardStyle.view, { flexDirection: 'column', justifyContent: 'center', width: 400 }]}>
                <View style={[styles.label, { marginBottom: 7.5, marginTop: 22 }]}>
                    <MaterialCommunityIcons name={icon} size={20} color={colors.icon} />
                    <Text style={[styles.ld, { fontFamily: 'Montserrat-Bold' }]}>{cabangText}</Text>
                </View>
                <Text style={[fontSize.sm, { fontFamily: 'Montserrat', marginBottom: 7.5 }]}>{level}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7.5 }}>
                    <View style={{ flexDirection: 'column', marginRight: 25, alignItems: 'center' }}>
                        <Text style={[fontSize.lg, { fontFamily: 'Montserrat-Bold', flexWrap: 'wrap', maxWidth: 200, textAlign: 'center', justifyContent: 'center' }]}>{player1}</Text>
                        <Text style={[fontSize.xxxlg, { fontFamily: 'Montserrat-Bold' }]}>{(competition_id == "futsal" || competition_id == "basket-putra" || competition_id == "basket-putri") ? team1_score : (n11 + n12 + n13 + n14 + n15)}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', marginLeft: 25, alignItems: 'center', flexWrap: 'wrap', maxWidth: 200, textAlign: 'center', justifyContent: 'center' }}>
                        <Text style={[fontSize.lg, { fontFamily: 'Montserrat-Bold' }]}>{player2}</Text>
                        <Text style={[fontSize.xxxlg, { fontFamily: 'Montserrat-Bold' }]}>{(competition_id == "futsal" || competition_id == "basket-putra" || competition_id == "basket-putri") ? team2_score : (n21 + n22 + n23 + n24 + n25)}</Text>
                    </View>
                </View>
                <Text style={[fontSize.md, { fontFamily: 'Montserrat', marginBottom: 22 }]}>{status === "ongoing" ? (<Text style={{ color: 'red' }}>ONGOING</Text>) : (<Text style={{ color: 'grey' }}>FINISHED</Text>)}</Text>
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
        labelContainer: {
            transform: [{ translateY: (17.5 / 2) - 2.5 }]
        },
        icon: { width: '100%', alignSelf: 'center', textAlign: 'center' },
        button: {
            backgroundColor: colors.text + '00'
        },
    });