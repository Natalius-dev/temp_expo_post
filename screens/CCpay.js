import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { Dimensions } from 'react-native';
import { colors } from '../lib/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fontSize } from '../lib/fontSize';
import { useNavigation } from '@react-navigation/native';
import { api_uri } from '../lib/api_uri';
import rupiahFormat from '../lib/rupiahFormat';
import request from '../lib/request';

export default function CCpay() {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	const [parsedUserData, setParsedUserData] = useState(false);
	const [paymentValue, setPaymentValue] = useState("");
	const [userData, setUserData] = useState({});
	const [qrData, setQrData] = useState("");

	const navigation = useNavigation();
    navigation.addListener("beforeRemove", (e) => {
		setScanned(false);
    })

	AsyncStorage.getItem('accountState').then(state => {
		if (state === 'user') {
			if (parsedUserData === false) {
				setParsedUserData(true);
				AsyncStorage.getItem('userData').then(data => { setUserData(JSON.parse(JSON.parse(JSON.stringify(data)))); });
			}
		} else {
			AsyncStorage.removeItem('access_token');
			AsyncStorage.removeItem('accountState');
			navigation.navigate('root', {screen: 'Login'});
		}
	})

	const cameraWidth = Dimensions.get('window').width * (75 / 100);
	const cameraHeight = cameraWidth;

	useEffect(() => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		};

		getBarCodeScannerPermissions();
	}, []);

	const dummyResponse = paymentValue > 25000 ? `{"message": "insufficient amount"}` : `{"message": "successfully paid"}`

	const confirmPayment = () => {
		setScanned(false);
		AsyncStorage.getItem("access_token").then(token => {
			
			request(api_uri + "/payment", "POST", {"merchant_name": qrData, "amount": paymentValue}, {"Authorization": token}, "json").then((response) => {
				console.log(JSON.stringify(response));
				const responseObj = JSON.parse(JSON.parse(JSON.stringify(response)));
				if(responseObj.message !== "successfully paid") {
					alert("Failed to make payment: "+responseObj.message);
				} else if(responseObj.message === "invalid username") {
					AsyncStorage.removeItem('access_token');
					AsyncStorage.removeItem('accountState');
					navigation.navigate('root', {screen: 'Login'});
				} else {
					alert("Successfully made payment to "+qrData)
				}
			})
			
			/*
			console.log("\nPOST Request\n\n{\nmerchant_name: " + qrData + ",\namount: " + paymentValue + "\n}\n\n{\nAuthorization: " + token + "\n}");
			responseObj = JSON.parse(JSON.parse(JSON.stringify(dummyResponse)));
			setPaymentValue("");
			if (responseObj.message !== "successfully paid") {
				alert("Failed to make payment: " + responseObj.message);
			} else if(responseObj.message === "invalid username") {
				AsyncStorage.removeItem('access_token');
				AsyncStorage.removeItem('accountState');
				navigation.navigate('root', {screen: 'Login'});
			} else {
				alert("Successfully made payment to "+qrData)
			}
			*/
		})
	}

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		setQrData(data);
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={[styles.container, { paddingVertical: '25%' }]}>
			<View style={{ flexDirection: 'column', width: '100%', alignSelf: 'center' }}>
				<View style={{ width: cameraWidth, height: cameraHeight, borderRadius: 15, overflow: 'hidden', alignSelf: 'center' }}>
					<Camera
						barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
						onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
						style={{ width: cameraWidth, height: cameraHeight, alignSelf: 'center' }}
						ratio={"1:1"}
					/>
					{/*scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />*/}
				</View>
			</View>
			{scanned === true ?
				<View style={{ flexDirection: 'column', width: '50%', flexGrow: 0.5, alignSelf: 'center', justifyContent: 'space-evenly' }}>
					<TextInput value={paymentValue !== "" ? rupiahFormat(paymentValue) : ""} textAlign='center' maxLength={11} placeholder='Rp. 15.000' placeholderTextColor={'#ffffffaa'} inputMode='numeric' keyboardType='numeric' onChangeText={value => {setPaymentValue(String(value).replace("Rp. ", "").replace(",", ""));}} style={[styles.input_box, fontSize.md]}></TextInput>
					<TouchableOpacity activeOpacity={0.75} style={[styles.button, fontSize.md]} onPressOut={() => { confirmPayment() }}><Text style={{ fontFamily: 'Montserrat-Bold', color: '#ffffff' }}>Confirm Payment</Text></TouchableOpacity>
				</View> :
				<View></View>
			}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignContent: 'center',
		backgroundColor: colors.background2
	},
	input_box: {
		fontFamily: 'Montserrat',
		height: 45,
		borderRadius: 5,
		paddingHorizontal: 15,
		backgroundColor: colors.secondary,
		color: '#ffffff'
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		backgroundColor: colors.primary,
		alignItems: 'center'
	}
});
