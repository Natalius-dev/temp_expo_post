import { View, StyleSheet, Text } from "react-native"

export default function Card () { 
    return (
        <View style={styles.card}>
            <Text>TESTING</Text>
        </View>
    )
}

const styles = new StyleSheet.create({
    card: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20
    }
});