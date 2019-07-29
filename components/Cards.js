import React from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native'

const Cards = props => (
    <View style={styles.card}>
        <View style={styles.cover}>
            <Image style={styles.image} source={props.image} resizeMode="cover" />
        </View>
        <Text style={styles.title}>{props.title}</Text>
    </View>
)

export default Cards;


const styles = StyleSheet.create({
    card: {
        width: 176,
        height: 300,
        marginTop: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginLeft: 20,
        alignItems: "center",



    },
    cover: {
        height: 250,
        borderRadius: 20,
        overflow: "hidden",
    },
    image: {
        width: 176,
        height: "100%",
    },
    title: {
        color: "white",
        fontSize: 18,
        width: "100%",
        marginTop: 10,
        marginLeft: 10,
        fontWeight: "500",
        height: "100%",
        textAlign: "center"

    },
})