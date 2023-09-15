import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { colors } from '../lib/colors';
import { useNavigation } from '@react-navigation/native';
import CCpayDisplay from '../lib/components/CCpayDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import StreamDisplay from '../lib/components/StreamDisplay'

function Matches() {

    const data2 = [
        { streaming_link: "aPrT4mA4tXw", time:"08.20", title:"Pembukaan", status:"finished"},
        { streaming_link: "KVoloRxrADw", time:"09.30", title:"H1", status:"delayed"},
        { streaming_link: "psmLklH91u0", time:"10.40", title:"H2", status:"cancelled"},
        { streaming_link: "OYcaMoiVJ5I", time:"10.40", title:"H3", status:"live"},
        { streaming_link: "iL8OUJlPUcc", time:"11.50", title:"Penutup", status:"scheduled"},
    ];

    const renderItem2 = ({ item }) => (
        <StreamDisplay streaming_link={item.streaming_link} title={item.title} time={item.time} status={item.status}/>
    );
      
    return (
        <View style={[styles.screen]}>        
            <FlatList
                data={data2}
                renderItem={renderItem2}
                keyExtractor={(item) => item.streaming_link + item.time + item.title + item.status }
                vertical={true} 
                showsVerticalScrollIndicator={false}
            />
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
        paddingVertical: 25,
        paddingHorizontal: 25
    },
    heading: {
        fontSize: 30,
        fontFamily: 'Montserrat-Bold',
        marginLeft: 8
    }
});
