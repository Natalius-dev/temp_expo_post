import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { colors } from '../lib/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import request from '../lib/request';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { api_uri } from '../lib/api_uri'

function Login() {
    const navigation = useNavigation();

    const [checkedAuth, setCheckedAuth] = useState(false);

    if (checkedAuth === false) {
        AsyncStorage.getItem('accountState').then(state => {
            if (state === 'guest') {
                navigation.navigate("HomeTabs");
                AsyncStorage.clear();
            } else if (state === "user") {
                AsyncStorage.getItem("access_token").then(token => {
                    //console.log("token is " + token);
                    request(api_uri + "/balance", "GET", {}, { "Authorization": token }, "json").then(response => {
                        if (JSON.parse(response).balance !== undefined) {
                            navigation.navigate("HomeTabs");
                        } else {
                            AsyncStorage.clear();
                        }
                    })
                });
            }
        })
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function submitLogin() {
        //console.log(username + " | " + password);
        request(api_uri + '/create-token', 'POST', { 'username': username, 'password': password }, {}, "json").then(data => {
            try {
                const dataObj = JSON.parse(JSON.parse(JSON.stringify(data)));
                //console.log(dataObj.access_token);
                if (Object.keys(dataObj)[0] === 'access_token') {
                    AsyncStorage.setItem('access_token', 'Bearer ' + dataObj.access_token)
                        .then(() => {
                            AsyncStorage.setItem('accountState', 'user'); // Set the account state to 'user'
                            navigation.navigate("HomeTabs");
                        })
                        .catch(error => {
                            // Handle AsyncStorage storage error
                            console.error('Error storing access token:', error);
                        });
                    AsyncStorage.setItem('accountState', 'user');
                    navigation.navigate("HomeTabs");
                } else if (Object.keys(dataObj)[0] === 'message') {
                    AsyncStorage.removeItem('access_token');
                    Alert.alert('Login Error', dataObj.message);
                } else {
                    AsyncStorage.removeItem('access_token');
                    AsyncStorage.removeItem('accountState');
                    Alert.alert('Login Error', 'There was a problem with logging in. Please try again.');
                }
            } catch (e) {
                AsyncStorage.removeItem('access_token');
                AsyncStorage.removeItem('accountState');
                console.log(e);
                Alert.alert('Login Error', e);
            }
        });
    }

    function continueGuest() {
        navigation.navigate("HomeTabs");
        AsyncStorage.setItem('accountState', 'guest');
    }

    return (
        <View style={styles.screen}>
            <View style={styles.input}>
                <Text style={styles.input_label}>Username</Text>
                <TextInput onChangeText={value => setUsername(value)} autoComplete='username' autoCorrect={false} inputMode='username' style={styles.input_box}></TextInput>
            </View>
            <View style={styles.input}>
                <Text style={styles.input_label}>Password</Text>
                <TextInput onChangeText={value => { setPassword(value) }} secureTextEntry={true} autoCorrect={false} style={styles.input_box}></TextInput>
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity activeOpacity={0.75} style={styles.button} onPressOut={() => { submitLogin() }}><Text style={{ fontFamily: 'Montserrat-Bold', color: '#ffffff' }}>Login</Text></TouchableOpacity>
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity onPressOut={() => { continueGuest() }}><Text style={{ fontFamily: 'Montserrat', opacity: 0.5 }}>Continue as a Guest</Text></TouchableOpacity>
            </View>
        </View>
    )

}

export default Login;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background2
    },
    input: {
        marginVertical: 10,
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '60%'
    },
    buttonView: {
        marginVertical: 10,
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: colors.primary
    },
    input_label: {
        margin: 0,
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        lineHeight: 25
    },
    input_box: {
        marginTop: 10,
        fontSize: 15,
        fontFamily: 'Montserrat',
        height: 45,
        borderRadius: 5,
        paddingHorizontal: 15,
        backgroundColor: colors.secondary,
        color: '#ffffff'
    }
});
