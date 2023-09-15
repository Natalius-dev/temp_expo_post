import { Pressable, StyleSheet, Text, TextInput, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { colors } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { cardStyle } from '../cardStyle';

export default function FixtureDisplay({competition_id, time, status, player1, player2, team1_score, team2_score, team1_set1, team1_set2, team1_set3, team1_set4, team1_set5, team2_set1, team2_set2, team2_set3, team2_set4, team2_set5, level, venue, }) {
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
        if(competition_id == "futsal" || competition_id == "basket-putra" || competition_id == "basket-putri") {
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
      }else if(competition_id == "voli-putra" || competition_id == "voli-putri" || competition_id == "bulu-tangkis" ||competition_id == "tenis-meja") {
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
if(competition_id == "futsal" || competition_id == "basket-putra" || competition_id == "basket-putri") {
    return (
        <TouchableOpacity style={[styles.touchable]} onPress={handlePress}>
        <View style={[styles.view, cardStyle[competition_id], { height: '100%', marginRight:20 }]}>
            <View style={{alignItems: 'center'}}>
                <View style={[styles.innerView, {flexDirection: 'column', alignItems:'center', justifyContent: 'center', width:'95%'}]}>
                <View style={[styles.label, { justifyContent: 'center', alignItems: 'center', width: '100%' }]}><MaterialCommunityIcons name={icon} size={20} color={colors.icon} style={styles.innerViewIcon} /><Text style={[styles.ld, {fontFamily: 'Montserrat-Bold'}]}>{cabangText}</Text><Text style={[{fontFamily: 'Montserrat', fontSize: 12}]}>{level}</Text></View>
                <View style={{flexDirection: 'row'}}>
                    <View style={[styles.label, { justifyContent: 'center', width: '100%' }]}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:'50%', flexDirection:'row', alignItems:'center'}}>
                        <Text style={[styles.md, {paddingLeft:6, fontFamily: 'Montserrat-Bold', fontSize:35}]}>{team1_score}</Text>
                        </View>
                        <View style={[styles.label, { justifyContent: 'center', alignItems: 'flex-end', width:'50%'}]}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={[styles.md, {paddingRight:6, fontFamily: 'Montserrat-Bold', fontSize:35}]}>{team2_score}</Text>
                        </View>
                        </View>
                        </View>
                        <View style={{width:'100%', flexDirection:'row'}}>
                        <View style={{width:'50%'}}><Text style={[styles.md, {paddingLeft:6, fontFamily: 'Montserrat-Bold', fontSize:18}]}>{player1}</Text></View>
                        <View style={[styles.label, { justifyContent: 'center', alignItems: 'flex-end', width: '50%' }]}><Text style={[styles.md, {paddingRight:6, fontFamily: 'Montserrat-Bold', fontSize:18}]}>{player2}</Text></View>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}><View style={[styles.label, { justifyContent: 'center', width: '50%' }]}></View>
                </View>
                    <Text style={[styles.md, { fontFamily: 'Montserrat' , color: 'red'}, status === "ongoing" ? {} : styles.invisiblestyle]}>ONGOING</Text>
                    <Text style={[styles.md, { fontFamily: 'Montserrat' , color:'gray'}, status === "finished" ? {} : styles.invisiblestyle]}>FINISHED</Text>
                </View>
      </View>
                <View style={{width:'100%', flexDirection:'row', paddingTop:10, alignItems:'flex-start'}}>
            </View>
        </View>
        </TouchableOpacity>
    )
}else if(competition_id == "voli-putra" || competition_id == "voli-putri" || competition_id == "bulu-tangkis" ||competition_id == "tenis-meja") {
    if (typeof team1_set1 != 'undefined' && typeof team2_set1 != 'undefined') {
        n11 = team1_set1;
        n21 = team2_set1;
      }else{
        n11 = 0;
        n21 = 0;
      }
      if (typeof team1_set2 != 'undefined' && typeof team2_set2 != 'undefined') {
        n12 = team1_set2;
        n22 = team2_set2;
      }else{
        n12 = 0;
        n22 = 0;
      }
      if (typeof team1_set3 != 'undefined' && typeof team2_set3 != 'undefined') {
        n13 = team1_set3;
        n23 = team2_set3;
      }else{
        n13 = 0;
        n23 = 0;
      }
      if (typeof team1_set4 != 'undefined' && typeof team2_set4 != 'undefined') {
        n14 = team1_set4;
        n24 = team2_set4;
      }else{
        n14 = 0;
        n24 = 0;
      }
      if (typeof team1_set5 != 'undefined' && typeof team2_set5 != 'undefined') {
        n15 = team1_set5;
        n25 = team2_set5;
      }else{
        n15 = 0;
        n25 = 0;
      }
    return (
        <TouchableOpacity style={[styles.touchable]} onPress={handlePress}>
        <View style={[styles.view, cardStyle[competition_id], { height: '100%', marginRight:20 }]}>
            <View style={{alignItems: 'center'}}>
                <View style={[styles.innerView, {flexDirection: 'column', alignItems:'center', justifyContent: 'center', width:'95%'}]}>
                <View style={[styles.label, { justifyContent: 'center', alignItems: 'center', width: '100%' }]}><MaterialCommunityIcons name={icon} size={20} color={colors.icon} style={styles.innerViewIcon} /><Text style={[styles.ld, {fontFamily: 'Montserrat-Bold'}]}>{cabangText}</Text><Text style={[{fontFamily: 'Montserrat', fontSize: 12}]}>{level}</Text></View>
                <View style={{flexDirection: 'row'}}>
                    <View style={[styles.label, { justifyContent: 'center', width: '100%' }]}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:'50%', flexDirection:'row', alignItems:'center'}}>
                        <Text style={[styles.md, {paddingLeft:6, fontFamily: 'Montserrat-Bold', fontSize:35}]}>{n11 + n12 + n13 + n14 + n15}</Text>
                        </View>
                        <View style={[styles.label, { justifyContent: 'center', alignItems: 'flex-end', width:'50%'}]}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={[styles.md, {paddingRight:6, fontFamily: 'Montserrat-Bold', fontSize:35}]}>{n21 + n22 + n23 + n24 + n25}</Text>
                        </View>
                        </View>
                        </View>
                        <View style={{width:'100%', flexDirection:'row'}}>
                        <View style={{width:'50%'}}><Text style={[styles.md, {paddingLeft:6, fontFamily: 'Montserrat-Bold', fontSize:18}]}>{player1}</Text></View>
                        <View style={[styles.label, { justifyContent: 'center', alignItems: 'flex-end', width: '50%' }]}><Text style={[styles.md, {paddingRight:6, fontFamily: 'Montserrat-Bold', fontSize:18}]}>{player2}</Text></View>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}><View style={[styles.label, { justifyContent: 'center', width: '50%' }]}></View>
                </View>
                    <Text style={[styles.md, { fontFamily: 'Montserrat' , color: 'red'}, status === "ongoing" ? {} : styles.invisiblestyle]}>ONGOING</Text>
                    <Text style={[styles.md, { fontFamily: 'Montserrat' , color:'gray'}, status === "finished" ? {} : styles.invisiblestyle]}>FINISHED</Text>
                </View>
      </View>
                <View style={{width:'100%', flexDirection:'row', paddingTop:10, alignItems:'flex-start'}}>
            </View>
        </View>
        </TouchableOpacity>
    )
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