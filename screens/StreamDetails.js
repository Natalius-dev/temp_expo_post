import { StyleSheet, Text, TextInput, View, FlatList, Image, Button, ScrollView } from 'react-native';
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
import YoutubePlayer from "react-native-youtube-iframe";

function StreamDetails({route, navigation}) {
    const {streaming_link, title, time, status} = route.params;
    const [playing, setPlaying] = useState(false);
    switch(status){
      case "finished":
          cardcolor = "#e3e3e3";
          labelcolor = "gray";
          labeltext = "FINISHED";
          break;
      case "delayed":
          cardcolor = "#faffa3";
          labelcolor = "#b8871f";
          labeltext = "DELAYED";
          break;
      case "live":
          cardcolor = "#ffb0b0";
          labelcolor = "red";
          labeltext = "LIVE";
          break;
      case "cancelled":
          cardcolor = "#e3e3e3";
          labelcolor = "red";
          labeltext = "CANCELLED";
          break;
      case "scheduled":
          cardcolor = "#c2ffc9";
          labelcolor = "green";
          labeltext = "SCHEDULED";
          break;
  }

    const onStateChange = useCallback((state) => {
      if (state === "ended") {
        setPlaying(false);
      }
    }, []);

  return (
    <View style={[styles.scrollcanvas]}>
    <View style={[styles.screen]}>
      <View style={[styles.view, {backgroundColor:cardcolor}]}>
        <View style={{ alignItems: 'center', width: '98%' }}>
          <View style={[styles.innerView,{ flexDirection: 'column', justifyContent: 'center', width: '95%' },]}>
            <View style={{paddingTop:20}}>
                <YoutubePlayer
                  height={250}
                  play={playing}
                  videoId={streaming_link}
                  onChangeState={onStateChange}
                />
              </View>
              <View style={[styles.label, {flexDirection: 'row', justifyContent: 'left', alignItems: 'center', width: '100%',},]}>
              <Text style={[styles.ld, { fontFamily: 'Montserrat-Bold', paddingLeft: 10 },]}>{title}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={[styles.box, {backgroundColor: colors.background, marginRight:'2%' }]}><Text style={[styles.mds, { fontFamily: 'Montserrat-Bold' }]}>Waktu</Text><Text style={[styles.md, { fontFamily: 'Montserrat' }]}>{time}</Text></View>
                <View style={[styles.box, {backgroundColor: colors.background, marginLeft:'2%' }]}><Text style={[styles.mds, { fontFamily: 'Montserrat-Bold' }]}>Status</Text><Text style={[styles.md, { fontFamily: 'Montserrat', color:labelcolor }]}>{labeltext}</Text></View>
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
    </View>
        )
  }
  

export default StreamDetails;

let styles = StyleSheet.create(
    {
        touchable: {
            height: "50%",
        },
    scrollcanvas: {
      height:'100%',
    },
    view: {
        paddingHorizontal: 7.5,
        paddingTop:'5%',
        overflow: 'hidden',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
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
