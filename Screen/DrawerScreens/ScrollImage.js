import React, { useRef } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    View,
    ImageBackground,
    Animated,
    useWindowDimensions,
    FlatList,
    Platform
} from 'react-native';
/*const images = new Array(6).fill(
  'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
);*/

const useNativeDriver = Platform.OS === 'ios' || Platform.OS === 'android';
const ScrollImage = ({ images }) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const { width: windowWidth } = useWindowDimensions();

    return (
        <SafeAreaView >
            <ScrollView
                accessibilityLabel="image_slider"
                horizontal={true}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    {
                        nativeEvent: {
                            contentOffset: {
                                x: scrollX,
                            },
                        },
                    },
                ],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={1}>
                <FlatList
                    data={images}

                    renderItem={({ item }) => (
                        <View style={{ width: windowWidth, height: 250 }} key={item.id}>
                            <ImageBackground source={{ uri: item.url }} style={styles.card} />
                        </View>
                    )}

                    horizontal={true}
                    keyExtractor={(item, index) => index}
                />

            </ScrollView>
            <View style={styles.indicatorContainer}>
                {images.map((image, imageIndex) => {
                    const width = scrollX.interpolate({
                        inputRange: [
                            windowWidth * (imageIndex - 1),
                            windowWidth * imageIndex,
                            windowWidth * (imageIndex + 1),
                        ],
                        outputRange: [8, 16, 8],
                        extrapolate: 'clamp',
                    });
                    return (
                        <Animated.View
                            key={imageIndex}
                            style={[styles.normalDot, { width }]}
                        />
                    );
                })}
            </View>

        </SafeAreaView >

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        resizeMode: 'cover',
        marginVertical: 4,
        // marginHorizontal: 16,
        borderRadius: 5,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        //backgroundColor: 'rgba(0,0,0, 0.7)',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 5,
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: 'rgb(140, 153, 44)',
        marginHorizontal: 4,
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ScrollImage;