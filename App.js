
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity, ActivityIndicator, StatusBar, Platform } from 'react-native';
import Reactotron from 'reactotron-react-native'
import Cards from "./components/Cards";
import { createStackNavigator, createAppContainer } from 'react-navigation'
import SearchPage from './components/SearchPage';
import DetailPage from './components/DetailsPage';

const { height, width } = Dimensions.get('window')

Reactotron
    .configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect() // let's connect!


class App extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        isloading: true,
        moviesData: [],
        topRated: []
    }
    componentDidMount() {
        this.fetchMoviesData("popular");
        this.fetchMoviesDataTopRated("top_rated");
        StatusBar.setBarStyle('light-content', true);
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
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>

                    <ActivityIndicator />
                </View>
            )
        }
        return (


            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.headerText}>Hello, what do you want to search ?</Text>

                    <TouchableOpacity onPress={() => {
                        this.props.navigation.push("SearchPage")
                    }}>
                        <View style={{ justifyContent: "center", bottom: 40, paddingTop: 5 }}>
                            <Image
                                style={styles.searchImage}
                                source={require("./assets/Rectangle.png")}
                                resizeMode="contain"
                            />
                            <Text style={styles.searchText}>Search</Text>
                        </View>


                    </TouchableOpacity>

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
                            <TouchableOpacity
                                key={items.id}
                                onPress={() => {
                                    this.props.navigation.push("DetailPage", {
                                        section: items
                                    })
                                }}
                            >

                                <Cards

                                    image={{ uri: `http://image.tmdb.org/t/p/w185/${items.poster_path}` }}
                                    title={items.title}
                                />
                            </TouchableOpacity>

                        ))}
                    </ScrollView>

                    <Text style={styles.topratedtext}>TOP RATED</Text>

                    <ScrollView showsHorizontalScrollIndicator={false} style={{ marginTop: 60 }} horizontal={true}>
                        {this.state.topRated.map(items => (
                            <TouchableOpacity key={items.id}
                                onPress={() => {
                                    this.props.navigation.push("DetailPage", {
                                        section: items
                                    })
                                }}
                            >

                                <Cards
                                    image={{ uri: `http://image.tmdb.org/t/p/w185/${items.poster_path}` }}
                                    title={items.title}
                                />
                            </TouchableOpacity>

                        ))}
                    </ScrollView>
                </ScrollView>

            </View>



        )
    }
}


const AppStackNavigator = createStackNavigator({
    Home: App,
    SearchPage: SearchPage,
    DetailPage: DetailPage
}, {
        mode: "modal"
    })

export default createAppContainer(AppStackNavigator);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#5ca0d3",

    },
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

    searchImage: {
        height: 40,
        width: width - 100,
        marginLeft: 50,
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
        marginLeft: 40,
        marginTop: 450,
        fontSize: 16,
        position: "absolute"

    },
    searchText: {
        marginLeft: 70,
        color: "white",
        position: "absolute",
    }

});
