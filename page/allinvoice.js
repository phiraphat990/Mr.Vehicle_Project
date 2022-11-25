import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from '../database/configdb';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import { useFocusEffect } from "@react-navigation/native";
const MakeContract_2 = ({ route, navigation }) => {
    const { userRentalEmail, userRenterEmail, vehicleIds } = route.params;
    const [renteremail, onChangerenterEmail] = useState("")

    const [userall, setUserAll] = useState([])
    const [renterall] = useState([])
    const [checked, setChecked] = useState(false)
    const [unchecked, setunChecked] = useState(false)
    const [waitchecked, setwaitChecked] = useState(false)

    useFocusEffect(useCallback(() => {
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
        return () => {
            console.log("success")
        }


    }, [])
    )


    const ListItem = userall.map((user, index) =>

        <SafeAreaView key={index} >
            {!checked && !unchecked && !waitchecked ?
                <View style={styles.box}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}
                        onPress={() => {
                            navigation.navigate('RENTER INVOICE', { userRenterEmail: user.renterEmail, uID: user.renterId, vehicleId: vehicleIds, RentalEmail: user.rentalEmail })
                        }} >
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.text}><Feather name="user" size={25} color="black" /> {user.renterEmail} </Text>
                            <TouchableOpacity
                                editable={true}
                                style={[{
                                    textAlign: "center", alignItems: "center", padding: 5, borderRadius: 20, margin: 10, width: 80, backgroundColor: "#D58C00", shadowColor: "black",
                                    shadowOffset: {
                                        width: 0,
                                        height: 5,
                                    },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 10.00,

                                    elevation: 1,
                                }]}

                            ><View><Text>{user.paid}</Text></View>

                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                </View> : ""}
            {checked == true && user.paid == "Paid" ?
                [<View style={styles.box}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}
                        onPress={() => {
                            navigation.navigate('RENTER INVOICE', { userRenterEmail: user.renterEmail, uID: user.renterId, vehicleId: vehicleIds, RentalEmail: user.rentalEmail })
                        }} >
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.text}><Feather name="user" size={25} color="black" /> {user.renterEmail} </Text>
                            <TouchableOpacity
                                editable={true}
                                style={[{
                                    textAlign: "center", alignItems: "center", padding: 5, borderRadius: 20, margin: 10, width: 80, backgroundColor: "#D58C00", shadowColor: "black",
                                    shadowOffset: {
                                        width: 0,
                                        height: 5,
                                    },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 10.00,

                                    elevation: 1,
                                }]}

                            ><View><Text>{user.paid}</Text></View>

                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>] : ""}
            {waitchecked == true && user.paid == "waiting" ?
                [<View style={styles.box}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}
                        onPress={() => {
                            navigation.navigate('RENTER INVOICE', { userRenterEmail: user.renterEmail, uID: user.renterId, vehicleId: vehicleIds, RentalEmail: user.rentalEmail })
                        }} >
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.text}><Feather name="user" size={25} color="black" /> {user.renterEmail} </Text>
                            <TouchableOpacity
                                editable={true}
                                style={[{
                                    textAlign: "center", alignItems: "center", padding: 5, borderRadius: 20, margin: 10, width: 80, backgroundColor: "#D58C00", shadowColor: "black",
                                    shadowOffset: {
                                        width: 0,
                                        height: 5,
                                    },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 10.00,

                                    elevation: 1,
                                }]}

                            ><View><Text>{user.paid}</Text></View>

                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>] : ""}
            {unchecked == true && user.paid == "Unpaid" ?
                [<View style={styles.box}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}
                        onPress={() => {
                            navigation.navigate('RENTER INVOICE', { userRenterEmail: user.renterEmail, uID: user.renterId, vehicleId: vehicleIds, RentalEmail: user.rentalEmail })
                        }} >
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.text}><Feather name="user" size={25} color="black" /> {user.renterEmail} </Text>
                            <TouchableOpacity
                                editable={true}
                                style={[{
                                    textAlign: "center", alignItems: "center", padding: 5, borderRadius: 20, margin: 10, width: 80, backgroundColor: "#D58C00", shadowColor: "black",
                                    shadowOffset: {
                                        width: 0,
                                        height: 5,
                                    },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 10.00,

                                    elevation: 1,
                                }]}

                            ><View><Text>{user.paid}</Text></View>

                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>] : ""}
        </SafeAreaView>
    )


    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: "row", marginTop: 20, marginBottom: 20, backgroundColor: "#F3C623", height: 60, padding: 15, borderRadius: 40 }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "row" }}>
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                        />
                    </View>
                    <Text style={{ color: "#2D2B29", marginTop: 5 }}>Paid</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "row", marginLeft: 40 }}>
                        <Checkbox
                            status={waitchecked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setwaitChecked(!checked);
                            }}
                        />
                    </View>
                    <Text style={{ color: "#2D2B29", marginTop: 5 }}>waiting</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "row", marginLeft: 40 }}>
                        <Checkbox
                            status={unchecked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setunChecked(!checked);
                            }}
                        />
                    </View>
                    <Text style={{ color: "#2D2B29", marginTop: 5 }}>Unpaid</Text>
                </View>
            </View>
            <SafeAreaView style={{ flex: 6, width: '100%', flexDirection: 'column', }}>
                <View style={{ flex: 1, width: '100%', padding: 10 }}>
                    {ListItem}
                </View>
            </SafeAreaView>



        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2D2B29",
        padding: 15,
    }, box: {
        flex: 1, backgroundColor: '#FBE0AB', borderRadius: 10, width: '100%', flexWrap: 'wrap', marginTop: '2%', height: 80, marginBottom: 10,
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
        // height:1090,
        borderRadius: 20,

        backgroundColor: "#ffffff",
        alignSelf: "center",
        padding: 30, marginBottom: 20
    },
    textinput: {
        borderRadius: 4,
        borderColor: "black",
        borderWidth: 1,
        height: 17,
        width: 80,
        alignSelf: "center",
    },
    btn1: {
        color: "black",
        fontWeight: "bold",
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 70,
        paddingBottom: 50,
        paddingTop: 30
    },
    text: {
        fontSize: 16,

        padding: 10
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
});

export default MakeContract_2;
