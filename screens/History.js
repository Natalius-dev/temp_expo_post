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
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HistoryCard = props => {
    return (
        <View>
            <View style={{ display: 'flex', flexDirection: 'row', padding: 20, borderRadius: 10, backgroundColor: '#dfccee' }}>
                <View style={{display: 'flex', justifyContent: 'space-evenly', marginRight: 10}}>
                    <MaterialCommunityIcons name='account-sync' size={28} />
                    <MaterialCommunityIcons name='cash' size={28} />
                    <MaterialCommunityIcons name='calendar-clock' size={28} />
                </View>
                <View style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text>{props.username}</Text>
                        <MaterialCommunityIcons name='arrow-right-thick' style={{ marginHorizontal: 5 }} />
                        <Text>{props.merchant}</Text>
                    </View>
                    <View>
                        <Text>{rupiahFormat(props.amount)}</Text>
                    </View>
                    <View>
                        <Text>{String(props.date).replace(", ", " - ")}</Text>
                    </View>
                </View>
            </View>
            <Divider style={{ marginVertical: 15 }} />
        </View>
    )
}

function History() {
    const navigation = useNavigation();
    const [accountState, setAccountState] = useState('guest');

    let [history, setHistory] = useState([]);
    AsyncStorage.getItem("history").then(history => {
        const historyArr = JSON.parse(history).reverse();
        if(history !== null) {
            setHistory(historyArr);
        }
    })

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem("access_token").then(token => {
                //console.log("token is " + token);
                request(api_uri + "/payment/history", "GET", {}, { "Authorization": token }, "json").then(response => {
                    setHistory(JSON.parse(response).reverse());
                    AsyncStorage.setItem("history", response);
                })
            });
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    return (
        <ScrollView style={{ height: '100%', backgroundColor: colors.background2 }}>
            <View style={styles.screen}>
                <View>
                    {history.map(entry => <HistoryCard username={entry.username} merchant={entry.merchant} amount={entry.amount} date={entry.datetime} key={entry.datetime} />)}
                </View>
            </View>
        </ScrollView>
    )
}

export default History;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        height: '100%',
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
