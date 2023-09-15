import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { colors } from '../lib/colors';
import { useNavigation } from '@react-navigation/native';
import CCpayDisplay from '../lib/components/CCpayDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import UpcomingMatchDisplay from '../lib/components/UpcomingMatchDisplay'

function Matches() {
    const data = [
        { competition_id: "basket-putra", venue: "Sporthall", level: "Penyisihan", status: "ongoing", player1: "Kolese Kanisius A", player2: "Kolese Kanisius B", time: "08.20" },
        { competition_id: "basket-putri", venue: "Lapbol A", level: "Penyisihan", status: "scheduled", player1: "Santa Ursula", player2: "Santa Theresia", time: "08.30" },
        { competition_id: "voli-putra", venue: "Aula Lantai 7", level: "Perebutan Juara 3", status: "scheduled", player1: "Jubilee", player2: "PL A", time: "08.40" },
        { competition_id: "voli-putri", venue: "Aula Lantai 4", level: "Final", status: "scheduled", player1: "NJIS", player2: "Santa Theresia", time: "08.50" },
        { competition_id: "futsal", venue: "Aula Lantai 7", level: "Final", status: "scheduled", player1: "Kolese Kanisius A", player2: "Kolese Kanisius B", time: "09.00" },
    ];

    const renderItem = ({ item }) => (
        <UpcomingMatchDisplay competition_id={item.competition_id} status={item.status} player1={item.player1} player2={item.player2} time={item.time} level={item.level} venue={item.venue} team1_set1={item.team1_set1} team1_set2={item.team1_set2} team1_set3={item.team1_set3} team1_set4={item.team1_set4} team1_set5={item.team1_set5} team2_set1={item.team2_set1} team2_set2={item.team2_set2} team2_set3={item.team2_set3} team2_set4={item.team2_set4} team2_set5={item.team2_set5} />
    );
      
    return (
        <View style={[styles.screen]}>        
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.competition_id + item.status + item.player1 + item.player2 + item.time + item.level + item.venue + item.team1_score + item.team2_score + item.team1_set1 + item.team1_set2 + item.team1_set3 + item.team1_set4 + item.team1_set5 + item.team2_set1 + item.team2_set2 + item.team2_set3 + item.team2_set4 + item.team2_set5}
                vertical={true} 
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default Matches;

const styles = StyleSheet.create({
    screen: {
        flex:10,
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'column',
        alignContent: 'center',
        backgroundColor: colors.background2,
        paddingVertical: 25,
        paddingHorizontal: 25,
      },
    heading: {
        fontSize: 30,
        fontFamily: 'Montserrat-Bold',
        marginLeft: 8
    }
});
