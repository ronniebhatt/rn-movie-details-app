
import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, ScrollView, Dimensions } from 'react-native';
import Reactotron from 'reactotron-react-native'
import Cards from "./components/Cards";
import Grid from "react-native-grid-component"

const { height, width } = Dimensions.get('window')

Reactotron
    .configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect() // let's connect!


export default class App extends Component {

    state = {
        isloading: true,
        moviesData: [],
        topRated: []
    }
    componentDidMount() {
        this.fetchMoviesData("popular");
        this.fetchMoviesDataTopRated("top_rated");
    }

    async fetchMoviesData(query) {
        try {
            let response = await fetch(`https://api.themoviedb.org/3/movie/${query}?api_key=3b127329950d5ec483e2330695ac6f12&language=en-US&page=1`);
            let responseJson = await response.json();
            Reactotron.log("moviesData:", responseJson.results)
            this.setState({
                isLoading: false,
                moviesData: responseJson.results
            })

        } catch (error) {
            console.error(error);
        }

    }

    async fetchMoviesDataTopRated(query) {
        try {
            let response = await fetch(`https://api.themoviedb.org/3/movie/${query}?api_key=3b127329950d5ec483e2330695ac6f12&language=en-US&page=1`);
            let responseJson = await response.json();
            Reactotron.log("moviesData:", responseJson.results)
            this.setState({
                isLoading: false,
                topRated: responseJson.results
            })

        } catch (error) {
            console.error(error);
        }

    }


    render() {
        return (


            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.headerText}>Hello, what do you want to watch ?</Text>
                    <TextInput
                        placeholder="Search"
                        style={styles.searchField}
                    />
                </View>
                {/* main content */}


                <ScrollView
                    style={styles.content}
                    contentContainerStyle={{
                        paddingBottom: 50
                    }}
                    showsVerticalScrollIndicator={false}>

                    <Text style={styles.contentText}>RECOMMENDED FOR YOU</Text>

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {this.state.moviesData.map(items => (
                            <Cards
                                key={items.id}
                                image={{ uri: `http://image.tmdb.org/t/p/w185/${items.poster_path}` }}
                                title={items.title}
                            />

                        ))}
                    </ScrollView>

                    <Text style={styles.topratedtext}>TOP RATED</Text>

                    <ScrollView showsHorizontalScrollIndicator={false} style={{ marginTop: 60 }} horizontal={true}>
                        {this.state.topRated.map(items => (
                            <Cards

                                key={items.id}
                                image={{ uri: `http://image.tmdb.org/t/p/w185/${items.poster_path}` }}
                                title={items.title}
                            />

                        ))}
                    </ScrollView>
                </ScrollView>

            </View>



        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#5ca0d3",



    }
    ,
    header: {
        width: "100%",
        height: 230,
    },
    headerText: {
        color: "white",
        fontSize: 26,
        fontWeight: "700",
        margin: 70,
        width: 240,
    },
    searchField: {
        borderWidth: 0.6,
        height: 30,
        width: 280,
        borderRadius: 11,
        position: "absolute",
        marginTop: 165,
        marginLeft: 60,
        paddingLeft: 20,
        borderColor: "#ffffff",
        backgroundColor: "#f5f4f0"


    },
    content: {
        backgroundColor: "#2c3848",
        width,
        height: height - 230,
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
    },

    contentText: {
        color: "white",
        marginTop: 50,
        marginLeft: 20,
        fontSize: 16
    },
    topratedtext: {
        color: "white",
        position: "absolute",
        marginLeft: 20,
        marginTop: 450,
        fontSize: 16,

    },

});
