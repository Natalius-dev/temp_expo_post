import { StyleSheet } from "react-native";

export const cardStyle = StyleSheet.create({
    view: {
        borderRadius: 10,
        flexDirection: 'row',
        flexShrink: 1,
        flexDirection: 'column',
        marginRight: 20,
        paddingHorizontal: 30,
        justifyContent: 'center',
        flexWrap: 'nowrap',
        flex: 1
    },
    matchView: { maxWidth: 300 },
    'basket-putra': {
        backgroundColor: '#aaffee'
    },
    'basket-putri': {
        backgroundColor: '#aaffee'
    },
    'voli-putra': {
        backgroundColor: '#aaeeff'
    },
    'voli-putri': {
        backgroundColor: '#aaeeff'
    },
    'futsal': {
        backgroundColor: '#aaeeee'
    },
    'bulu-tangkis': {
        backgroundColor: '#f3ff8a'
    },
    'tenis-meja': {
        backgroundColor: '#a1b2ff'
    },
    backbutton: {
        marginTop:10,
        marginLeft:20,
        width:20,
        height:20
    },
});