import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native"
import CloseButton from './CloseButton';

const { height, width } = Dimensions.get('window')

class DetailsPage extends Component {
    static navigationOptions = {
        header: null
    }
    state = {}

    render() {
        const { navigation } = this.props
        const section = navigation.getParam("section")
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container} contentContainerStyle={{
                paddingBottom: 50
            }}>
                <CloseButton navigation={navigation} />
                <Image resizeMode="cover" style={styles.image} source={{ uri: `http://image.tmdb.org/t/p/w185/${section.poster_path}` }} />
                <Text style={styles.title}>{section.title}</Text>
                <Text style={styles.voteAverage}>Average Vote: {section.vote_average}</Text>
                <Text style={styles.description}>{section.overview}</Text>
                <Text style={styles.releaseDate}>Release Date: {section.release_date}</Text>
            </ScrollView>
        );
    }
}

export default DetailsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2c3848"
    },
    image: {
        backgroundColor: "red",
        width,
        height: 400

    },
    title: {
        width: 300,
        marginTop: 20,
        height: 70,
        marginLeft: 20,
        fontSize: 25,
        fontWeight: "800",
        color: "white"
    },
    voteAverage: {
        height: 30,
        marginTop: 20,
        width: width - 100,
        marginLeft: 20,
        fontSize: 20,
        color: "white"

    },
    description: {
        marginTop: 20,
        width: width - 40,
        marginLeft: 20,
        fontSize: 16,
        marginRight: 20,
        color: "white",
        fontWeight: "500"
    },
    releaseDate: {
        marginTop: 20,
        width: width - 100,
        marginLeft: 20,
        fontWeight: "500",
        color: "white"
    }
})