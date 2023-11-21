import React, { Component, useState, createRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ImageBackground
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';

const { width } = Dimensions.get('window');

const data = [
    { backgroundColor: 'red' },
    { backgroundColor: 'green' },
    { backgroundColor: 'blue' },
    { backgroundColor: 'yellow' }
];

const url = "https://huma.bzh/";
/*const [SousCateg, setSousCateg] = useState([]);
const [PCategID, setPCategID] = useState(1)*/

export default class CategCarousel extends Component {

    isComponentMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            Categ: [],
            //PCategID: '1'
        }
    }
    /*let isSubscribed = true*/
    displaySCateg = () => {
        //const PCategID = this.state.PCategID;
        const baseUrl = url + 'api/api/categories';

        fetch(baseUrl)
            .then((response) => response.json())
            .then((responseJson) => {
                if (this.isComponentMounted) {
                    let data = []
                    Object.entries(responseJson.data).map(([key, value]) => {
                        data.push(
                            { id: value.id, title: value.titre, backgroundColor: 'green' });
                    });
                    this.setState({ Categ: data });
                }
            });

    }

    componentDidMount() {
        this.isComponentMounted = true;
        this.displaySCateg()
        const Categs = this.state.Categ
        ////console.log("this.state.Categ", Categs)
    }
    componentWillUnmount = () => {
        this.isComponentMounted = false;
    };
    renderItem = ({ item, index }) => {
        const { backgroundColor } = item.backgroundColor
        return (
            <TouchableOpacity
                style={[styles.item, { backgroundColor }]}
                onPress={() => {
                    this.numberCarousel.scrollToIndex(index);
                }}
            >
                <Text style={styles.text}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    render() {

        const Categs = this.state.Categ
        return (
            <Carousel
                style={styles.carousel}
                data={Categs}
                renderItem={this.renderItem}
                itemWidth={130}
                containerWidth={width - 10}
                ref={(c) => {
                    this.numberCarousel = c;
                }}
            />
        );
    }
}
{/*a mettre dans la page concernée
    <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
              <Text style={styles.title}>Catégories</Text>
              <CategCarousel />
            </ScrollView>
          </View>*/}
const styles = StyleSheet.create({
    carousel: {
        flex: 1,
    },
    item: {
        borderWidth: 1,
        borderColor: '#c4d63c',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#49382f'
    }
});
