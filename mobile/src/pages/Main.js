import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'; 

import Api from '../services/api';
import { connect, disconnect, subsribeToNewDevs } from '../services/socket';

function Main({ navigation }) {
    const [devs, setDevs] = useState([]);
    const [currentRegio, setCurrentRegio] = useState(null);
    const [techs, setTechs] = useState('');

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;
                setCurrentRegio({
                    latitude,
                    longitude,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                });
            }
        }

        loadInitialPosition();

    }, []);

    useEffect(() => {
        subsribeToNewDevs(dev => setDevs([...devs, dev]));
    }, [devs]);

    function searchDevs() {
        if (!techs ? loadTodosDevs() : loadDevs());

    }

    function setupWebsocket() {
        disconnect();

        const { latitude, longitude } = currentRegio;
        connect(
            latitude,
            longitude,
            techs,
        );
    }

    async function loadDevs() {
        const {latitude, longitude } = currentRegio;
        const response = await Api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });

        setDevs(response.data.devs);
        setupWebsocket();
    }

    async function loadTodosDevs() {
        const response = await Api.get('/devs');
        setDevs(response.data);
    }
    
    function handleRegionChanged(region){
        setCurrentRegio(region);
    }

    if (!currentRegio) {
        return null;
    }

    return(
        <>
        <MapView 
            onRegionChangeComplete={handleRegionChanged} 
            initialRegion={currentRegio} 
            style={styles.map}
        >
            {devs.map(dev => (
                
                <Marker 
                    key={dev._id} 
                    coordinate={{ 
                        latitude: dev.location.coordinates[1], 
                        longitude: dev.location.coordinates[0],
                    }}
                >
                    <Image 
                        style={styles.avatar} 
                        source={{uri: dev.avatar_url}} 
                    />
                    <Callout onPress={() => {
                        navigation.navigate('Profile', {github_username: dev.github_username})
                    }}>
                        <View style={styles.callout} >
                            <Text style={styles.name}>{dev.name}</Text>
                            <Text style={styles.techs}>{dev.techs.join(', ')}</Text>
                            <Text style={styles.bio}>{dev.bio}</Text>
                        </View>
                    </Callout>
                </Marker>
                 
            ))}
            
        </MapView>

        <View style={styles.searchForm}>
            <TextInput 
                style={styles.searchInput}
                placeholder="Buscar desenvolvedores por tecnologias ..."
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={techs}
                onChangeText={setTechs}
            />
            <TouchableOpacity onPress={searchDevs} style={styles.loadButton}>
                <MaterialIcons name="my-location" size={20} color="#FFF" />
            </TouchableOpacity>
                    
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#FFF"
    },
    callout: {
        width: 260,
    }, 
    name: {
        fontWeight: 'bold',
        fontSize: 16
    },
    bio: {
        marginTop: 5,
        fontSize: 14,
        lineHeight: 20
    },
    techs: {
        fontSize: 12,
        color: '#666'
    },
    searchForm: {
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        flexDirection: "row",
        zIndex: 5,
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 13,
        // Efeito de sombra para IOS
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        // Efeito de sombra para android
        elevation: 4,
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        borderRadius: 25,
    },
    
});

export default Main;