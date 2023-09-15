import { StyleSheet, Text, TextInput, View, FlatList, Image, ScrollView } from 'react-native';
import { colors } from '../lib/colors';
import { useNavigation } from '@react-navigation/native';
import CCpayDisplay from '../lib/components/CCpayDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cardStyle } from '../lib/cardStyle';
import LeftArrow from '../assets/leftarrow.png'
import SetDisplay from '../lib/components/SetDisplay'

function MatchDetails({route, navigation}) {
    const {competition_id, time, status, player1, player2, team1_score, team2_score, team1_set1, team1_set2, team1_set3, team1_set4, team1_set5, team2_set1, team2_set2, team2_set3, team2_set4, team2_set5, level, venue} = route.params;
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
  if(competition_id == "futsal" || competition_id == "basket-putra" || competition_id == "basket-putri") {
  return (
    <View style={[styles.scrollcanvas, cardStyle[competition_id]]}>
    <ScrollView>
    <View style={[styles.screen]}>
      <View style={[styles.view, cardStyle[competition_id]]}>
        <View style={{ alignItems: 'center', width: '98%' }}>
          <View style={[styles.innerView,{ flexDirection: 'column', justifyContent: 'center', width: '95%' },]}>
            <View style={[styles.label, {flexDirection: 'row', justifyContent: 'left', alignItems: 'center', width: '100%',},]}>
              <MaterialCommunityIcons name={icon} size={40} color={colors.icon} style={styles.innerViewIcon}/>
              <Text style={[styles.ld, { fontFamily: 'Montserrat-Bold', paddingLeft: 10 },]}>{cabangText}</Text>
            </View>
            <Text style={[{ fontFamily: 'Montserrat', fontSize: 20, paddingLeft: 50 }]}>{level}</Text>
            <View style={{flexDirection: 'row', paddingTop: 20, justifyContent: 'space-between', width: '100%', height:100}}>
              <View style={[styles.label, {flexDirection:'row', justifyContent: 'center', alignItems: 'center', width: '100%', height:'100%'}]}>
                <View style={[{ flexDirection: 'row', paddingRight:10, alignItems: 'center', height:80}]}>
                <View style={{justifyContent:'center', alignItems: 'center', width:'48%', paddingRight:5, marginRight:10, height:'100%', borderRadius:10, backgroundColor:colors.background}}><Text style={[styles.md, { paddingLeft: 6, fontFamily: 'Montserrat-Bold', fontSize: 40},]}>{team1_score}</Text></View>
                  <View style={{justifyContent:'center', alignItems: 'center', width:'48%', paddingLeft:5, marginLeft:10, height:'100%', borderRadius:10, backgroundColor:colors.background}}><Text style={[styles.md, { paddingRight: 6, fontFamily: 'Montserrat-Bold' , fontSize: 40},]}>{team2_score}</Text></View>
                </View>
              </View>
              <View style={[styles.label, {justifyContent: 'center', alignItems: 'center', width: '30%',},]}>
                </View>
            </View>
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
            <Text style={[styles.md, { fontFamily: 'Montserrat', color: 'gray' }, status === 'finished' ? {} : styles.invisiblestyle,]}>FINISHED</Text>
            </View>
          </View>
          <View style={{width:'100%', flexDirection:'row', paddingTop:10, alignItems:'flex-start'}}>
        <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginBottom:20}} onPress={() => navigation.goBack()}>
          <Image source={LeftArrow} style={cardStyle.backbutton}/>
          <Text style={[{ fontFamily: 'Montserrat', fontSize: 18, paddingTop:10 }]}> Kembali</Text>
        </TouchableOpacity>
      </View>
        </View>
      </View>
    </View>
    </ScrollView>
    </View>
        )
  }else if(competition_id == "voli-putra" || competition_id == "voli-putri" || competition_id == "bulu-tangkis" ||competition_id == "tenis-meja") {
    const data2 = [
  ];
  if (typeof team1_set1 != 'undefined' && typeof team2_set1 != 'undefined') {
    data2.push({set:1, scorea:team1_set1, scoreb: team2_set1})
  }
  if (typeof team1_set2 != 'undefined' && typeof team2_set2 != 'undefined') {
    data2.push({set:2, scorea:team1_set2, scoreb: team2_set2})
  }
  if (typeof team1_set3 != 'undefined' && typeof team2_set3 != 'undefined') {
    data2.push({set:3, scorea:team1_set3, scoreb: team2_set3})
  }
  if (typeof team1_set4 != 'undefined' && typeof team2_set4 != 'undefined') {
    data2.push({set:4, scorea:team1_set4, scoreb: team2_set4})
  }
  if (typeof team1_set5 != 'undefined' && typeof team2_set5 != 'undefined') {
    data2.push({set:5, scorea:team1_set5, scoreb: team2_set5})
  }

  if (typeof team1_set1 != 'undefined' && typeof team2_set1 != 'undefined') {
    n11 = team1_set1;
    n21 = team2_set1;
  }else{
    n11 = 0;
    n21 = 0;
  }
  if (typeof team1_set2 != 'undefined' && typeof team2_set2 != 'undefined') {
    n12 = team1_set2;
    n22 = team2_set2;
  }else{
    n12 = 0;
    n22 = 0;
  }
  if (typeof team1_set3 != 'undefined' && typeof team2_set3 != 'undefined') {
    n13 = team1_set3;
    n23 = team2_set3;
  }else{
    n13 = 0;
    n23 = 0;
  }
  if (typeof team1_set4 != 'undefined' && typeof team2_set4 != 'undefined') {
    n14 = team1_set4;
    n24 = team2_set4;
  }else{
    n14 = 0;
    n24 = 0;
  }
  if (typeof team1_set5 != 'undefined' && typeof team2_set5 != 'undefined') {
    n15 = team1_set5;
    n25 = team2_set5;
  }else{
    n15 = 0;
    n25 = 0;
  }
  
  const renderItem2 = ({ item }) => (
      <SetDisplay set={item.set} scorea={item.scorea} scoreb={item.scoreb} />
  );
    return (
      <View style={[styles.scrollcanvas, cardStyle[competition_id]]}>
      <ScrollView>
      <View style={[styles.screen]}>
        <View style={[styles.view, cardStyle[competition_id]]}>
          <View style={{ alignItems: 'center', width: '98%' }}>
            <View style={[styles.innerView,{ flexDirection: 'column', justifyContent: 'center', width: '95%' },]}>
              <View style={[styles.label, {flexDirection: 'row', justifyContent: 'left', alignItems: 'center', width: '100%',},]}>
                <MaterialCommunityIcons name={icon} size={40} color={colors.icon} style={styles.innerViewIcon}/>
                <Text style={[styles.ld, { fontFamily: 'Montserrat-Bold', paddingLeft: 10 },]}>{cabangText}</Text>
              </View>
              <Text style={[{ fontFamily: 'Montserrat', fontSize: 20, paddingLeft: 50 }]}>{level}</Text>
              <View style={{flexDirection: 'row', paddingTop: 20, justifyContent: 'space-between', width: '100%', height:100}}>
                <View style={[styles.label, {flexDirection:'row', justifyContent: 'center', alignItems: 'center', width: '100%', height:'100%'}]}>
                  <View style={[{ flexDirection: 'row', paddingRight:10, alignItems: 'center', height:80}]}>
                  <View style={{justifyContent:'center', alignItems: 'center', width:'48%', paddingRight:5, marginRight:10, height:'100%', borderRadius:10, backgroundColor:colors.background}}><Text style={[styles.md, { paddingLeft: 6, fontFamily: 'Montserrat-Bold', fontSize: 40},]}>{n11 + n12 + n13 + n14 + n15}</Text></View>
                    <View style={{justifyContent:'center', alignItems: 'center', width:'48%', paddingLeft:5, marginLeft:10, height:'100%', borderRadius:10, backgroundColor:colors.background}}><Text style={[styles.md, { paddingRight: 6, fontFamily: 'Montserrat-Bold' , fontSize: 40},]}>{n21 + n22 + n23 + n24 + n25}</Text></View>
                  </View>
                </View>
                <View style={[styles.label, {justifyContent: 'center', alignItems: 'center', width: '30%',},]}>
                  </View>
              </View>
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
              <View style = {{backgroundColor:colors.background, width:'100%', marginTop:20 }}>
              <FlatList
                data={data2}
                renderItem={renderItem2}
                keyExtractor={(item) => item.set + item.scorea + item.scoreb }
                vertical={true} 
                showsVerticalScrollIndicator={false}
            />
            </View>
              <View style={{flexDirection:'row'}}>
                  <View style={[styles.box, {backgroundColor: colors.background, marginRight:'2%' }]}><Text style={[styles.mds, { fontFamily: 'Montserrat-Bold' }]}>Waktu</Text><Text style={[styles.md, { fontFamily: 'Montserrat' }]}>{time}</Text></View>
                  <View style={[styles.box, {backgroundColor: colors.background, marginLeft:'2%' }]}><Text style={[styles.mds, { fontFamily: 'Montserrat-Bold' }]}>Venue</Text><Text style={[styles.md, { fontFamily: 'Montserrat' }]}>{venue}</Text></View>
              </View>
              <View style={[styles.box, {backgroundColor: colors.background }]}><Text style={[styles.mds, { fontFamily: 'Montserrat-Bold' }]}>Status</Text>
              <Text style={[styles.md, { fontFamily: 'Montserrat', color: 'red' }, status === 'ongoing' ? {} : styles.invisiblestyle, ]}>ONGOING</Text>
              <Text style={[styles.md, { fontFamily: 'Montserrat', color: 'gray' }, status === 'finished' ? {} : styles.invisiblestyle,]}>FINISHED</Text>
              </View>
            </View>
            <View style={{width:'100%', flexDirection:'row', paddingTop:10, marginBottom:30, alignItems:'flex-start'}}>
          <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => navigation.goBack()}>
            <Image source={LeftArrow} style={cardStyle.backbutton}/>
            <Text style={[{ fontFamily: 'Montserrat', fontSize: 18, paddingTop:10}]}> Kembali</Text>
          </TouchableOpacity>
        </View>
          </View>
        </View>
      </View>
      </ScrollView>
      </View>
          )
  }
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
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        width: '100%',
        height: '100%'
    },
    scrollcanvas: {
      height:'100%',
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
