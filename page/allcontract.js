import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from '../database/configdb';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const MakeContract_2 = ({ route, navigation }) => {
    const { userRentalEmail, userRenterEmail, vehicleIds } = route.params;
    const [renteremail, onChangerenterEmail] = useState("")

    const [userall, setUserAll] = useState([])
    const [renterall] = useState([])
    useEffect((id) => {
        getDocs(query(collection(db, "contract"), where('rentalEmail', '==', userRentalEmail)))
            .then(docSnap => {
                let users = [];
                docSnap.forEach((doc, index) => {
                    users.push({ ...doc.data(), id: doc.id })

                });
                setUserAll(users)

            }).catch((error) => {
                // The write failed...
                alert(error);
            });
    }, [])

    const ListItem = userall.map((user, index) =>
        <SafeAreaView key={index} style={styles.box}>

            <TouchableOpacity style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}
                onPress={() => {
                    navigation.navigate('Contract page 1', { userRenterEmail: user.renterEmail, uID: user.renterId, vehicleId: vehicleIds })
                }}
            >
                <Text style={styles.text}><Feather name="user" size={25} color="black" />  {user.renterEmail} </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )


    return (
        <ScrollView style={styles.container}>

            <TouchableOpacity style={{ flex: 1, width: '100%', padding: 10 }}
                onPress={() => console.log("s")}
            ></TouchableOpacity>
            <SafeAreaView style={{ flex: 6, width: '100%', flexDirection: 'column', }}>
                <View style={{ flex: 1, width: '100%', padding: 10 }}>
                    {ListItem}
                </View>
            </SafeAreaView>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2D2B29",
        padding: 15,
    }, box: {
        flex: 1, backgroundColor: '#FBE0AB', borderRadius: 10, width: '100%', flexWrap: 'wrap', marginTop: '2%', height: 80, marginBottom: 15,
        shadowColor: "white",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10.00,

        elevation: 1,
    },
    view: {
        width: 350,
        // height:1490,
        borderRadius: 20,

        backgroundColor: "#ffffff",
        alignSelf: "center",
        padding: 30, marginBottom: 20
    },
    text: {
        fontSize: 16,
        color: 'black',
        padding: 10
    },

});

export default MakeContract_2;
