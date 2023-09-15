import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../lib/colors';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CCpayDisplay from '../lib/components/CCpayDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import UpcomingMatches from './UpcomingMatches';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Fixtures from './Fixtures';
const Top = createMaterialTopTabNavigator();

function Matches() {

    return (
        <View style={styles.screen}>
            <Top.Navigator screenOptions={{tabBarLabelStyle: { fontSize: 15, fontFamily: 'Montserrat-Bold' }, tabBarActiveTintColor: colors.accent, tabBarInactiveTintColor: 'gray', tabBarIndicatorStyle: { backgroundColor: colors.accent }}}>
                <Top.Screen name="Upcoming" component={UpcomingMatches} />
                <Top.Screen name="Fixtures" component={Fixtures} />
            </Top.Navigator>
        </View>
    )
}

export default Matches;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background2,
    },
    heading: {
        fontSize: 30,
        fontFamily: 'Montserrat-Bold',
        marginLeft: 8
    },
    
});
