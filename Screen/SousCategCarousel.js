import React, { Component, useState, createRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ImageBackground,

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

export default class SousCategCarousel extends Component {

    isComponentMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            SousCateg: [],
            PCategID: '1'
        }
    }
    /*let isSubscribed = true*/
    displaySCateg = () => {
        const PCategID = this.state.PCategID;
        const baseUrl = `api/api/categories/${PCategID}`;

        fetch(baseUrl)
            .then((response) => response.json())
            .then((responseJson) => {
                if (this.isComponentMounted) {
                    let data = []
                    Object.entries(responseJson.data).map(([key, value]) => {
                        data.push(
                            { id: value.id, title: value.titre, backgroundColor: 'green' });
                    });
                    this.setState({ SousCateg: data });
                }
            });

    }

    componentDidMount() {
        this.isComponentMounted = true;
        this.displaySCateg()
        const SsCateg = this.state.SousCateg
        ////console.log("this.state.SousCateg", SsCateg)
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

        const SsCateg = this.state.SousCateg
        return (
            <Carousel
                style={styles.carousel}
                data={SsCateg}
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
