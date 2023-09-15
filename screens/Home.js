import { StyleSheet, Text, TextInput, View, FlatList, ScrollView } from 'react-native';
import { colors } from '../lib/colors';
import { useNavigation } from '@react-navigation/native';
import CCpayDisplay from '../lib/components/CCpayDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { Divider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import Matches from './Matches';
import UpcomingMatchCard from '../lib/components/UpcomingMatchCard'
import HeadlineFixtureCard from '../lib/components/HeadlineFixtureCard'
import StreamCard from '../lib/components/StreamCard'
import { fontSize } from '../lib/fontSize';
import request from '../lib/request';
import { api_uri } from '../lib/api_uri';
import rupiahFormat from '../lib/rupiahFormat';

function Home() {
    const matchesUrl = 'https://api.cccup.id/get_matches';
    const navigation = useNavigation();
    const [accountState, setAccountState] = useState('guest');

    const UpcomingMatchesswitch = () => {
        navigation.navigate('Matches', { screen: 'Upcoming' });
    };
    const Fixturesswitch = () => {
        navigation.navigate('Matches', { screen: 'Fixtures' });
    };

    const Streamswitch = () => {
        navigation.navigate('Streams');
    };

    const data = [
        { competition_id: "basket-putra", venue: "Sporthall", level: "Penyisihan", status: "ongoing", player1: "Kolese Kanisius A", player2: "Kolese Kanisius B", time: "08.20" },
        { competition_id: "basket-putri", venue: "Lapbol A", level: "Penyisihan", status: "scheduled", player1: "Santa Ursula", player2: "Santa Theresia", time: "08.30" },
        { competition_id: "voli-putra", venue: "Aula Lantai 7", level: "Perebutan Juara 3", status: "scheduled", player1: "Jubilee", player2: "PL A", time: "08.40" },
        { competition_id: "voli-putri", venue: "Aula Lantai 4", level: "Final", status: "scheduled", player1: "NJIS", player2: "Santa Theresia", time: "08.50" },
        { competition_id: "futsal", venue: "Aula Lantai 7", level: "Final", status: "scheduled", player1: "Kolese Kanisius A", player2: "Kolese Kanisius B", time: "09.00" },
    ];

    const renderItem = ({ item }) => (
        <UpcomingMatchCard competition_id={item.competition_id} status={item.status} player1={item.player1} player2={item.player2} time={item.time} level={item.level} venue={item.venue} />
    );

    const data2 = [
        { competition_id: "basket-putra", time: "08.20", venue: "Lapbol B", level: "Penyisihan", status: "ongoing", player1: "Kolese Kanisius A", player2: "Kolese Kanisius B", team1_score: 5, team2_score: 10 },
        { competition_id: "voli-putra", time: "09.30", venue: "Lapvol 1", level: "Semifinal 1", status: "finished", player1: "Santa Theresia", player2: "Pangudi Luhur A", team1_set1: 1, team1_set2: 3, team1_set3: 4, team1_set4: 6, team1_set5: 6, team2_set1: 7, team2_set2: 1, team2_set3: 1, team2_set4: 8, team2_set5: 5 },
        { competition_id: "voli-putri", time: "10.40", venue: "Lapvol 2", level: "Perebutan Juara 3", status: "finished", player1: "North Jakarta International School", player2: "Santa Theresia", team1_set1: 15, team1_set2: 30, team1_set4: 60, team1_set5: 65, team2_set1: 7, team2_set2: 14, team2_set3: 21, team2_set4: 28, team2_set5: 35 },
        { competition_id: "futsal", time: "11.50", venue: "GBK", level: "Final", status: "ongoing", player1: "SMAN 8", player2: "SMAN64", team1_score: 12, team2_score: 14 },
    ];

    const renderItem2 = ({ item }) => (
        <HeadlineFixtureCard competition_id={item.competition_id} level={item.level} status={item.status} player1={item.player1} player2={item.player2} team1_score={item.team1_score} team2_score={item.team2_score} venue={item.venue} time={item.time} team1_set1={item.team1_set1} team1_set2={item.team1_set2} team1_set3={item.team1_set3} team1_set4={item.team1_set4} team1_set5={item.team1_set5} team2_set1={item.team2_set1} team2_set2={item.team2_set2} team2_set3={item.team2_set3} team2_set4={item.team2_set4} team2_set5={item.team2_set5} />
    );

    const data3 = [
        { streaming_link: "aPrT4mA4tXw", time: "08.20", title: "Pembukaan", status: "finished" },
        { streaming_link: "KVoloRxrADw", time: "09.30", title: "H1", status: "delayed" },
        { streaming_link: "psmLklH91u0", time: "10.40", title: "H2", status: "cancelled" },
        { streaming_link: "OYcaMoiVJ5I", time: "10.40", title: "H3", status: "live" },
        { streaming_link: "iL8OUJlPUcc", time: "11.50", title: "Penutup", status: "scheduled" },
    ];

    const renderItem3 = ({ item }) => (
        <StreamCard streaming_link={item.streaming_link} title={item.title} time={item.time} status={item.status} />
    );

    /*
    =========== GET MATCHES ============
    request("https://api.cccup.id/get_matches", "GET", {}, {}).then((response) => response.json()).then((data) => {
        console.log(JSON.stringify(data));
    })
    */

    let [balance, setBalance] = useState("Loading...");

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem('accountState').then(state => {
                setAccountState(state);
                if (state === 'user') {
                    AsyncStorage.getItem("access_token").then(token => {
                        //console.log("token is " + token);
                        request(api_uri + "/balance", "GET", {}, { "Authorization": token }, "json").then(response => {
                            setBalance(String(JSON.parse(response).balance));
                        })
                    })
                }
                if (state === 'guest') {
                    //console.log('Not logged in');
                }
            })
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);



    return (
        <ScrollView><View style={styles.screen}>
            {
                accountState === 'user' ? (
                    <View>
                        <View style={{ marginBottom: 11 }}>
                            <CCpayDisplay balance={balance} />
                        </View><Divider style={{ marginVertical: 15 }} /></View>) : (<View></View>)
            }
            <View>
                <TouchableOpacity onPress={UpcomingMatchesswitch}><Text style={[styles.homeoption, fontSize.xxlg]}>Upcoming Matches</Text></TouchableOpacity>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.competition_id + item.status + item.player1 + item.player2 + item.time + item.level + item.venue}
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    style={{ flexGrow: 0 }}
                />
                <Divider style={{ marginVertical: 15 }} />
                <TouchableOpacity onPress={Fixturesswitch}><Text style={[styles.homeoption, fontSize.xxlg]}>Fixtures</Text></TouchableOpacity>
                <FlatList
                    data={data2}
                    renderItem={renderItem2}
                    keyExtractor={(item) => item.competition_id + item.status + item.player1 + item.player2 + item.team1_score + item.team2_score + item.team1_set1 + item.team1_set2 + item.team1_set3 + item.team1_set4 + item.team1_set5 + item.team2_set1 + item.team2_set2 + item.team2_set3 + item.team2_set4 + item.team2_set5 + item.level + item.venue + item.time}
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    style={{ flexGrow: 0 }}
                />
                <Divider style={{ marginVertical: 15 }} />
                <TouchableOpacity onPress={Streamswitch}><Text style={[styles.homeoption, fontSize.xxlg]}>Streams</Text></TouchableOpacity>
                <FlatList
                    data={data3}
                    renderItem={renderItem3}
                    keyExtractor={(item) => item.streaming_link + item.status + item.title + item.time}
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    style={{ flexGrow: 0 }}
                />
                <Divider style={{ marginVertical: 15 }} />
            </View>
        </View></ScrollView>
    )
}

export default Home;

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
        fontFamily: 'Montserrat-Bold',
        marginLeft: 8
    },
    homeoption: {
        marginLeft: 8,
        fontFamily: 'Montserrat-Bold',
        paddingBottom: 15
    },
});
