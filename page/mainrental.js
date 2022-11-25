import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button, TouchableOpacity, Image, ScrollView, FlatList } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from '../database/configdb';
const UselessTextInput = ({ route, navigation }) => {
    const { Email } = route.params;
    const [email, setEmail] = useState(Email);
    const [Id, setId] = useState("");
    const [uId, setuId] = useState("");
    const [renterEmail, setrenterEmail] = useState("");
    const [vId, setvId] = useState("");
    const [username, onChangeUsername] = React.useState("");
    const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
    const [tel, onChangeTel] = React.useState("");
    const [firstname, onChangeFirstname] = React.useState("");
    const [lastname, onChangeLastname] = React.useState("");
    //const [pic, setpic] = useState("");

    const [isEditable, setisEditable] = useState(false);

    const [confirmMakeInvoice, setconfirmMakeInvoice] = useState(false);
    const [imageUser, setImageUser] = useState(null);//รูปUser


    useEffect((id) => {
        getDocs(query(collection(db, "signup"), where('email', '==', Email)))
            .then(docSnap => {
                let users = [];
                docSnap.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id })
                });
                setId(users[0].id)
                setconfirmMakeInvoice(users[0].confirm);
                setEmail(users[0].email);
                onChangeFirstname(users[0].firstname)
                onChangeLastname(users[0].lastname)
                onChangeTel(users[0].tel)
                onChangeUsername(users[0].username)
                setDate(users[0].date)
                setImageUser(users[0].imageUser)

            }).catch((error) => {
                // The write failed...
                alert(error);
            });
    }, [])
    useEffect((id) => {
        getDocs(query(collection(db, "vehicleReservation"), where('rentalEmail', '==', Email)))
            .then(docSnap => {
                let users = [];
                docSnap.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id })
                });

                setrenterEmail(users[0].renterEmail);
                setvId(users[0].vehicleID)
            }).catch((error) => {
                // The write failed...
                //alert(error);
            });

    }, [])


    // open
    return (
        <ScrollView style={styles.container}>
            <View style={[{ flexDirection: "row", justifyContent: "space-evenly" }]}>

                <View style={styles.acBox}>

                    <Text style={styles.txt}><Entypo name="emoji-flirt" size={15} color="black" /> {username} <Entypo name="emoji-flirt" size={15} color="black" /></Text>
                    <View style={{ width: 300, height: 1, backgroundColor: "black", marginTop: 5 }}></View>
                    <Image style={styles.pic11} source={{uri: imageUser}} />
                    <View style={{ position: "absolute", top: 60, right: 35 }}>
                        <Text style={styles.txt4}><MaterialCommunityIcons name="account-cowboy-hat" size={21} color="#0D1A9D" />   {firstname}   {lastname}</Text>

                        <Text style={styles.txt4}><Foundation name="telephone" size={21} color="#0D1A9D" />     {tel}</Text>
                        <Text style={styles.txt4}><Entypo name="cake" size={21} color="#0D1A9D" />   {date}</Text>

                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                        <View style={styles.carRent}>
                            <Image style={styles.pic8}
                                source={require("../assets/unavailableCar.png")} />
                            <Text style={styles.txt5}>1</Text>
                        </View>
                        <View style={styles.carleft}>
                            <Image style={styles.pic9}
                                source={require("../assets/availableCar.png")} />
                            <Text style={styles.txt5}>15</Text>
                        </View>

                    </View>
                </View>
            </View>


            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                <View style={{ flexDirection: "column" }}>
                    <TouchableOpacity style={[styles.bt1, { backgroundColor: "#F3C623" }]}
                        onPress={() =>
                            navigation.navigate('MANAGE ACCOUNT', { userRenterEmail: Email })}
                    >

                        <Image style={styles.pic5}
                            source={require("../assets/account.png")}

                        ></Image>
                    </TouchableOpacity>
                    <Text style={[styles.txt3, { marginLeft: 20 }]}>Manage Account</Text>
                </View>
                <View style={{ flexDirection: "column" }}>
                    <TouchableOpacity style={[styles.bt1, { backgroundColor: "#F3C623" }]}
                        onPress={() =>
                            navigation.navigate('ADD CAR INFO', { rentalEmail: Email })}
                    >
                        <Image style={styles.pic6}
                            source={require("../assets/addVehicles.png")}

                        ></Image></TouchableOpacity>
                    <Text style={[styles.txt3, { marginLeft: 40 }]}>Add Vehicle</Text>
                </View>

            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                <View style={{ flexDirection: "column" }}>
                    <TouchableOpacity style={[styles.bt1, { backgroundColor: "#F3C623" }]}
                        onPress={() =>
                            navigation.navigate('All CONTRACT', { userRentalEmail: Email, userRenterEmail: renterEmail, vehicleIds: vId })}
                    >
                        <Image style={styles.pic7}
                            source={require("../assets/contracts.png")}

                        ></Image></TouchableOpacity>
                    <Text style={[styles.txt3, { marginLeft: 50 }]}>Contract</Text>
                </View>
                <View style={{ flexDirection: "column" }}>
                    <TouchableOpacity style={[styles.bt1, { backgroundColor: "#F3C623" }]}
                        onPress={() =>
                            navigation.navigate('All INVOICE', { userRentalEmail: Email, userRenterEmail: renterEmail, vehicleIds: vId })}
                    >
                        <Image style={styles.pic3}
                            source={require("../assets/invoices.png")}
                        ></Image></TouchableOpacity>
                    <Text style={[styles.txt3, { marginLeft: 60 }]}>Invoice</Text>
                </View>
            </View>


            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 50 }}>
                <View style={{ flexDirection: "column" }}>
                    <TouchableOpacity style={[styles.bt3, { backgroundColor: "#F3C623" }]}
                        onPress={() =>
                            navigation.navigate('RENTAL LOOKING', { Emails: email })}
                    >

                        <Image style={styles.pic1}
                            source={require("../assets/Vehicle.png")}

                        ></Image>
                    </TouchableOpacity>
                    <Text style={[styles.txt3, { marginLeft: 70 }]}>Status Vehicle</Text>
                </View>
                <TouchableOpacity style={styles.bt2}
                    onPress={() =>
                        navigation.navigate('All Chats', { userRentalEmail: Email, userRenterEmail: renterEmail, })}
                >
                    <Image style={styles.pic4}
                        source={require("../assets/chats.png")}
                    ></Image></TouchableOpacity>
                {/* <Text style={styles.txt3}>Invoice</Text> */}
            </View>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // justifyContent: "center",
        // paddingTop: 20, 

        //marginTop: 50,
        paddingTop: 40,
        backgroundColor: "#2D2B29"

    },
    pic1: { width: 140, height: 140, zIndex: 1, position: "absolute", top: -3, left: 35 },
    pic2: { width: 180, height: 180, zIndex: 1, margin: 0, position: "absolute", top: -5, left: -25 },
    pic3: { width: 180, height: 180, zIndex: 1, margin: 0, position: "absolute", top: -25, left: -27 },
    pic4: { width: 110, height: 110, zIndex: -1, position: "absolute", top: -20, left: -20 },
    pic5: { width: 180, height: 180, zIndex: 1, position: "absolute", top: -35, left: -25 },
    pic6: { width: 185, height: 185, zIndex: 1, position: "absolute", top: -15, left: -25 },
    pic7: { width: 180, height: 180, position: "absolute", top: -5, left: -25 },
    pic8: { width: 110, height: 110, zIndex: 1, position: "absolute", top: -20, left: -3, zIndex: 0 },
    pic9: { width: 110, height: 110, zIndex: 1, position: "absolute", top: -17, left: -5, zIndex: 0 },
    pic10: { width: 160, height: 160, zIndex: 1, position: "absolute", top: 10, left: -25 },
    pic11: { width: 90, height: 90, zIndex: 1, position: "absolute", top: 55, left: 5, borderRadius: 360, borderWidth: 2, marginLeft:20 },
    box: {
        width: 380, height: 250,
        backgroundColor: "rgba(255,255,255,0.75)", margin: 15, padding: 30, justifyContent: "center"
        , borderRadius: 20,
    },
    dropdown: {
        margin: 10,
        borderWidth: 1,
        padding: 5,
        borderRadius: 20
        , backgroundColor: "white", width: 390

    },
    input: {
        height: 40,
        margin: 15,

        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white"

    },
    inputbox: {
        height: 80,
        margin: 12,

        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white"
    },
    DatePicker: {
        margin: 8, height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white", width: 200
    },
    timePicker: {
        margin: 8, height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white", width: 180
    },
    but: { justifyContent: "center" },
    head: {
        fontSize: 33,
        fontWeight: "600", textAlign: "center", paddingTop: 30
    },
    txt: { fontSize: 16, textAlign: "center", color: "black", marginTop: 10 },
    txt2: { fontSize: 14, fontWeight: "500" },
    txt3: { fontSize: 16, fontWeight: "600", marginLeft: 50, color: "white" },
    txt4: { fontSize: 15, color: "black", },
    txt5: { fontSize: 38, fontWeight: "900", color: "#0D1A9D", position: "absolute", top: 9, left: 80 },
    bt1: {
        marginTop: 30,
        margin: 15,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white", width: 130, height: 130
    }, bt2: {
        marginTop: 90,
        margin: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white", width: 70, height: 70
    }, bt3: {
        marginTop: 40,
        marginLeft: 10,
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white", width: 200, height: 130
    }, acBox: {
        backgroundColor: "white"
        , width: 300, height: 220, alignContent: "center", borderRadius: 20, shadowColor: "#F3C623",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6.68,

        elevation: 14,
    }, carRent: {

        borderRadius: 20, width: 125, height: 65, margin: 10, marginTop: 110
    }, carleft: {

        borderRadius: 20, width: 125, height: 65, margin: 10, marginTop: 110
    }
});

export default UselessTextInput;