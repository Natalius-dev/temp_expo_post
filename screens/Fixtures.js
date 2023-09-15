import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { colors } from '../lib/colors';
import { useNavigation } from '@react-navigation/native';
import CCpayDisplay from '../lib/components/CCpayDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import FixtureDisplay from '../lib/components/FixtureDisplay';

function Fixtures() {

    const data2 = [
        { competition_id: "basket-putra", time: "08.20", venue: "Lapbol B", level: "Penyisihan", status: "ongoing", player1: "Kolese Kanisius A", player2: "Kolese Kanisius B", team1_score: 5, team2_score: 10 },
        { competition_id: "voli-putra", time: "09.30", venue: "Lapvol 1", level: "Semifinal 1", status: "finished", player1: "Santa Theresia", player2: "Pangudi Luhur A", team1_set1: 1, team1_set2: 3, team1_set3: 4, team1_set4: 6, team1_set5: 6, team2_set1: 7, team2_set2: 1, team2_set3: 1, team2_set4: 8, team2_set5: 5 },
        { competition_id: "voli-putri", time: "10.40", venue: "Lapvol 2", level: "Perebutan Juara 3", status: "finished", player1: "North Jakarta International School", player2: "Santa Theresia", team1_set1: 15, team1_set2: 30, team1_set4: 60, team1_set5: 65, team2_set1: 7, team2_set2: 14, team2_set3: 21, team2_set4: 28, team2_set5: 35 },
        { competition_id: "futsal", time: "11.50", venue: "GBK", level: "Final", status: "ongoing", player1: "SMAN 8", player2: "SMAN64", team1_score: 12, team2_score: 14 },
    ];

    const renderItem2 = ({ item }) => (
        <FixtureDisplay competition_id={item.competition_id} level={item.level} status={item.status} player1={item.player1} player2={item.player2} team1_score={item.team1_score} team2_score={item.team2_score} venue={item.venue} time={item.time} team1_set1={item.team1_set1} team1_set2={item.team1_set2} team1_set3={item.team1_set3} team1_set4={item.team1_set4} team1_set5={item.team1_set5} team2_set1={item.team2_set1} team2_set2={item.team2_set2} team2_set3={item.team2_set3} team2_set4={item.team2_set4} team2_set5={item.team2_set5}/>
    );
      
    return (
        <View style={[styles.screen]}>        
            <FlatList
                data={data2}
                renderItem={renderItem2}
                keyExtractor={(item) => item.competition_id + item.status + item.player1 + item.player2 + item.team1_score + item.team2_score + item.team1_set1 + item.team1_set2 + item.team1_set3 + item.team1_set4 + item.team1_set5 + item.team2_set1 + item.team2_set2 + item.team2_set3 + item.team2_set4 + item.team2_set5 + item.level + item.venue +item.time}
                vertical={true} 
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default Fixtures;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background2,
        paddingVertical: 25,
        paddingHorizontal: 25
    },
    heading: {
        fontSize: 30,
        fontFamily: 'Montserrat-Bold',
        marginLeft: 8
    }
});
