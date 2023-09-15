import { StyleSheet, Text, TextInput, View, FlatList, Image, ScrollView } from 'react-native';
import { colors } from '../lib/colors';
import { useNavigation } from '@react-navigation/native';
import CCpayDisplay from '../lib/components/CCpayDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback } from 'react';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cardStyle } from '../lib/cardStyle';
import LeftArrow from '../assets/leftarrow.png'

function MatchDetails({route, navigation}) {
    const {competition_id, status, player1, player2, team2_score, team1_score, team1_set1, team1_set2, team1_set3, team1_set4, team1_set5, team2_set1, team2_set2, team2_set3, team2_set4, team2_set5, time, level, venue } = route.params;
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
  return (
    <View style={[styles.screen]}>
      <View style={[styles.view, cardStyle[competition_id]]}>
        <View style={{ alignItems: 'center', width: '98%'}}>
          <View style={[styles.innerView,{ flexDirection: 'column', justifyContent: 'center', width: '95%' },]}>
            <View style={[styles.label, {flexDirection: 'row', justifyContent: 'left', alignItems: 'center', width: '100%',},]}>
              <MaterialCommunityIcons name={icon} size={40} color={colors.icon} style={styles.innerViewIcon}/>
              <Text style={[styles.ld, { fontFamily: 'Montserrat-Bold', paddingLeft: 10 },]}>{cabangText}</Text>
            </View>
            <Text style={[{ fontFamily: 'Montserrat', fontSize: 20, paddingLeft: 50 }]}>{level}</Text>
            <View style={{flexDirection: 'row', paddingTop: 20, justifyContent: 'space-between', width: '100%',}}>
              <View style={[styles.label, {justifyContent: 'center', alignItems: 'center', width: '48%',},]}>
                <View style={{ flexDirection: 'row', alignItems: 'center',}}>
                  <Text style={[styles.md, { paddingLeft: 6, fontFamily: 'Montserrat-Bold', fontSize:25 },]}>{player1}</Text>
                </View>
              </View>
              <View style={[styles.label, {justifyContent: 'center', alignItems: 'center', width: '48%',},]}>
                <View style={{flexDirection: 'row', alignItems: 'center', }}>
                  <Text style={[styles.md, { paddingLeft: 6, fontFamily: 'Montserrat-Bold', fontSize:25 },]}> {player2}</Text></View></View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={[styles.box, {backgroundColor: colors.background, marginRight:'2%' }]}><Text style={[styles.mds, { fontFamily: 'Montserrat-Bold' }]}>Waktu</Text><Text style={[styles.md, { fontFamily: 'Montserrat' }]}>{time}</Text></View>
                <View style={[styles.box, {backgroundColor: colors.background, marginLeft:'2%' }]}><Text style={[styles.mds, { fontFamily: 'Montserrat-Bold' }]}>Venue</Text><Text style={[styles.md, { fontFamily: 'Montserrat' }]}>{venue}</Text></View>
            </View>
            <View style={[styles.box, {backgroundColor: colors.background }]}><Text style={[styles.mds, { fontFamily: 'Montserrat-Bold' }]}>Status</Text>
            <Text style={[styles.md, { fontFamily: 'Montserrat', color: 'red' }, status === 'ongoing' ? {} : styles.invisiblestyle, ]}>ONGOING</Text>
            <Text style={[styles.md, { fontFamily: 'Montserrat', color: 'green' }, status === 'scheduled' ? {} : styles.invisiblestyle,]}>SCHEDULED</Text>
            </View>
          </View>
          <View style={{width:'100%', flexDirection:'row', paddingTop:10, alignItems:'flex-start'}}>
        <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => navigation.goBack()}>
          <Image source={LeftArrow} style={cardStyle.backbutton}/>
          <Text style={[{ fontFamily: 'Montserrat', fontSize: 18, paddingTop:10}]}> Kembali</Text>
        </TouchableOpacity>
      </View>
        </View>
      </View>
    </View>
    
        )
  }

export default MatchDetails;

let styles = StyleSheet.create(
    {
        touchable: {
            height: "50%",
        },
    view: {
        paddingHorizontal: 7.5,
        paddingTop:'5%',
        overflow: 'hidden',
        flexDirection: 'row',
        width: '100%',
        height: '100%'
    },
    box: {
        marginTop:25,
        paddingHorizontal: 7.5,
        paddingTop:'3%',
        paddingLeft:'5%',
        paddingRight:'5%',
        paddingBottom:'3%',
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'column',
        width: '48%',
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
        fontSize: 18
    },
    mds: {
        fontSize: 16
    },
    ld: {
        fontSize: 25,
    },
    icon: {width:'100%', alignSelf: 'center', textAlign: 'center'},
    button: {
        backgroundColor: colors.text+'00'
    },
});
