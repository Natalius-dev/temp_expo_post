import { StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from './lib/colors';
import { fonts } from './lib/fonts';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme, Provider as PaperProvider } from 'react-native-paper';

// Screens
import Login from './screens/Login';
import Home from './screens/Home'
import CCpay from './screens/CCpay';
import History from './screens/History';
import Header from './lib/components/Header';
import Matches from './screens/Matches'
import Streams from './screens/Streams'
import Account from './screens/Account'
import MatchDetails from './screens/MatchDetails'
import FixtureDetails from './screens/FixtureDetails'
import StreamDetails from './screens/StreamDetails'

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const theme = useTheme();
  theme.colors.secondaryContainer = 'transparent';
  theme.fonts.labelMedium.fontFamily = 'Montserrat-Bold';

  const [loaded] = useFonts(fonts);

  if (!loaded) {
    return null;
  }

  function HomeTabs() {
    const navigation = useNavigation();
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    })

    return (
      <Tab.Navigator theme={theme} initialRouteName="Home" backBehavior="history" shifting={true} activeColor={'white'} inactiveColor={'whitesmoke'} barStyle={{ backgroundColor: colors.primary}} >
        <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: ({color, focused}) => { return (<MaterialCommunityIcons name="home" color={color} size={focused ? 24 : 30} style={{height:'110%'}} />)} }} />
        <Tab.Screen name="Matches" component={Matches} options={{ tabBarIcon: ({color, focused}) => { return (<MaterialCommunityIcons name="calendar-month" color={color} size={focused ? 24 : 30} style={{height: '110%'}} />)}  }} />
        <Tab.Screen name="Streams" component={Streams} options={{ tabBarIcon: ({color, focused}) => { return (<MaterialCommunityIcons name="television-play" color={color} size={focused ? 24 : 30} style={{height: '110%'}} />) }  }} />
        <Tab.Screen name="Account" component={Account} options={{ tabBarIcon: ({color, focused}) => { return (<MaterialCommunityIcons name="account" color={color} size={focused ? 24 : 30} style={{height: '110%'}} />) }  }} />
      </Tab.Navigator>
    )
  }

  function RootNav() {
    return (
      <Stack.Navigator id="root" initialRouteName="Login" backBehavior="none" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CCPay" component={CCpay} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen name="MatchDetails" component={MatchDetails} />
            <Stack.Screen name="FixtureDetails" component={FixtureDetails} />
            <Stack.Screen name="StreamDetails" component={StreamDetails} />
          </Stack.Navigator>
    )
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={colors.primary} />
        <SafeAreaView style={styles.container}>
          <Header />
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="root" component={RootNav} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: colors.background
  },
  header: {
    height: 80,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 20
  },
  body: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    fontSize: 30,
    color: colors.background,
    fontFamily: 'Rubik-Bold',
    position: 'absolute',
    zIndex: 1
  },
  heading_shadow: {
    fontSize: 30,
    color: colors.secondary,
    fontFamily: 'Rubik-Bold',
    transform: [{ translateY: 2 }, { translateX: 2 }],
    position: 'absolute'
  }
});
