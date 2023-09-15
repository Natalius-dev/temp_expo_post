import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../lib/colors';
import { CommonActions, useNavigation } from '@react-navigation/native';
import CCpayDisplay from '../lib/components/CCpayDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { Divider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import Matches from './Matches';
import { fontSize } from '../lib/fontSize';
import request from '../lib/request';
import { api_uri } from '../lib/api_uri';

function Account() {
    const navigation = useNavigation();
    const [parsedUserData, setParsedUserData] = useState(false);
    const [accountState, setAccountState] = useState('guest');

    const Matchestest = () => {
        navigation.navigate('Matches');
    };

    const resetLoginCache = () => {
        AsyncStorage.removeItem('access_token');
        AsyncStorage.removeItem('accountState');
        navigation.navigate('root', {screen: 'Login'});
    }

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
        <View style={styles.screen}>
            {
                accountState === 'user' ? (
                    <View>
                        <View style={{ marginBottom: 11 }}>
                            <CCpayDisplay balance={balance} />
                        </View>
                        <Divider style={{ marginVertical: 15 }} />
                    </View>) : (<View></View>)
            }
            <View style={{ alignItems: 'flex-end', alignSelf: 'center', flexDirection: 'row', flexGrow: 1 }}>
                <TouchableOpacity onPress={resetLoginCache} style={{ alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Montserrat', opacity: 0.5 }}>{accountState === 'user' ? 'Logout' : 'Login'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Account;

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