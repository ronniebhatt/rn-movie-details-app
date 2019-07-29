import React, { Component } from 'react';
import { View, StyleSheet, Alert, TextInput, Dimensions, ScrollView, TouchableOpacity } from "react-native"
import Cards from './Cards';
import CloseButton from './CloseButton';

const { height, width } = Dimensions.get('window')

class SearchPage extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        isLoading: true,
        moviesData: [],
        text: ""

    }



    searchMovieHandler = () => {
        let text = this.state.text


        this.fetchMoviesData(text)

        this.setState({ text: "", moviesData: [] })

    }

    async fetchMoviesData(name) {
        if (name === "") {
            Alert.alert(
                'Alert',
                'Enter Some Text',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                ],
                { cancelable: false },
            );

        } else {

            try {
                let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=3b127329950d5ec483e2330695ac6f12&language=en-US&query=${name}&page=1&include_adult=false`);
                let responseJson = await response.json();

                this.setState({
                    isLoading: false,
                    moviesData: responseJson.results
                })

            } catch (error) {
                console.error(error);
            }

        }
    }
    changeNameHandler = (val) => {
        this.setState({
            text: val
        })
    }

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>

                <CloseButton navigation={navigation} />


                <TextInput
                    placeholder="Seach Movie"
                    style={styles.searchInput}
                    placeholderTextColor="white"

                    onChangeText={this.changeNameHandler}
                    value={this.state.text}
                    onSubmitEditing={this.searchMovieHandler}
                />



                <ScrollView
                    style={styles.scrollViewStyle}
                    contentContainerStyle={{
                        paddingBottom: 50
                    }}
                    showsVerticalScrollIndicator={false}
                >

                    {this.state.moviesData.map(items => (
                        <TouchableOpacity key={items.id} onPress={() => {
                            this.props.navigation.push("DetailPage", {
                                section: items
                            })
                        }}>

                            <Cards

                                image={{ uri: `http://image.tmdb.org/t/p/w185/${items.poster_path}` }}
                                title={items.title}
                            />
                        </TouchableOpacity>

                    ))}
                </ScrollView>

            </View>
        );
    }
}

export default SearchPage;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2c3848",
        flex: 1,
        alignItems: "center"

    },
    searchInput: {
        width: width - 60,
        borderWidth: 0.9,
        height: 50,
        borderRadius: 14,
        paddingLeft: 20,
        marginTop: 100,
        fontSize: 19,
        marginRight: 30,
        marginLeft: 30,
        borderColor: "white",
        color: "white",


    },
    scrollViewStyle: {
        paddingRight: 20
    },
    buttonStyle: {
        backgroundColor: "white"
    }

})