import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, authentication } from '../database/configdb';

const SelectVehicleDetails = ({ route, navigation, props }) => {
    const [vBrand, setVBrand] = useState()
    const [vSeats, setVSeats] = useState()
    const [vOS, setVOS] = useState()
    const [vPrice, setVPrice] = useState()
    const [vPeriodUsed, setVPeriodUsed] = useState()
    const [vImage, setVImage] = useState()
    const [vId, setVId] = useState("UxSgfMrWAClY3BAzkSLI")

    useEffect(() => {
        getDoc(doc(db, "vehicleDetails", vId))
            .then(docData => {
                if (docData.exists()) {
                    // console.log(docData.data());
                    setVBrand(docData.data().brand);
                    setVSeats(docData.data().seats);
                    setVOS(docData.data().os);
                    setVPrice(docData.data().price);
                    setVPeriodUsed(docData.data().periodUsed);
                }
            }).catch((error) => {
                // The write failed...
                alert(error);
            });
    })

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#DADBFB', borderRadius: 10, width: '100%', flexWrap: 'wrap', marginTop: '2%' }}>

            <SafeAreaView style={[styles.boxLayout, { flexDirection: 'row' }]}>
                <SafeAreaView style={styles.viewVehicleImage}>
                    <Image source={{ uri: "https://www.engdict.com/data/dict/media/images_public/car-00084470637418118683737545_normal.png" }} style={[styles.vehicleImage, {}]} />
                </SafeAreaView>
                <SafeAreaView style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                    <Text style={styles.headText}>{vBrand}</Text>
                    <Text style={styles.text}><AntDesign name="caretright" size={16} color="black" />{vSeats} Seats</Text>
                    <Text style={styles.text}><AntDesign name="caretright" size={16} color="black" />{vOS}</Text>
                    <Text style={styles.text}><AntDesign name="caretright" size={16} color="black" />{vPeriodUsed} Km perrental</Text>
                </SafeAreaView>
            </SafeAreaView>

            <SafeAreaView style={[styles.boxLayout, { marginTop: '-2%', flexDirection: 'column', alignItems: 'flex-start' }]}>
                <SafeAreaView style={[styles.Layout, { marginLeft: '6%' }]}>
                    <View style={styles.viewBoxUn}>
                        <Text style={styles.text}>Price for 3 Days</Text>
                    </View>
                </SafeAreaView>
                <SafeAreaView style={[styles.Layout, { marginLeft: '12%' }]}>
                    <View style={[styles.viewBoxUn]}>
                        <Text style={styles.text}>THB {vPrice}</Text>
                    </View>
                </SafeAreaView>
            </SafeAreaView>

            <SafeAreaView style={[styles.boxLayout, { padding: 10, marginRight: '6%' }]}>
                <SafeAreaView style={[styles.Layout, { alignItems: 'flex-end' }]}>
                    <TouchableOpacity
                        style={[styles.touchableOpacity]}
                    >
                        <Text style={styles.text}>View Details</Text>
                        <AntDesign name="caretright" size={20} color="black" />
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    vehicleImage: {
        width: 180,
        height: 120,
        borderRadius: 15,
    },
    boxLayout: {
        flex: 1,
        margin: '3%'
    },
    text: {
        fontSize: 18,
        fontWeight: '600'
    },
    headText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    Layout: {
        flex: 1,
        width: 'auto'
    },
    touchableOpacity: {
        padding: 10,
        backgroundColor: '#FFD051',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewBoxUn: {
        borderRadius: 10,
    },
    viewBoxAva: {
        padding: 5,
        backgroundColor: '#ADFFBA',
        borderRadius: 10,
    },
    viewVehicleImage: {
        flex: 1,
        width: '100%',
        backgroundColor: '#D5FAF4',
        alignItems: 'center',
        borderRadius: 10
    }
})

export default SelectVehicleDetails