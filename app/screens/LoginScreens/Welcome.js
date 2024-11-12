import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Welcome() {
    return (
        <View style={{ justifyContent: "center", alignItems: "center", height: "90%" }}>
            <Text style={styles.title}>Welcome!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontFamily: "Black",
        color: "#1E232C",
    },
})