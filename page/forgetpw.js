import React, { useState, useEffect } from "react";
import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, authentication } from '../database/configdb';
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button, TouchableOpacity, Image, ScrollView, FlatList } from "react-native";
import { RadioButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import DatePicker from "react-datepicker";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
// import "react-datepicker/dist/react-datepicker.css";
//import CheckBox from '@react-native-community/checkbox';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Checkbox } from 'react-native-paper';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { NavigationContainer } from "@react-navigation/native";
import signIn from '../page/signIn'
//import RadioButtonRN from 'radio-buttons-react-native';
const UselessTextInput = ({ route, navigation }) => {
    const { Email } = route.params;
    const [email, onChangeEmail] = React.useState("");
    const [count, setCount] = React.useState(0);
    const [Id, setId] = React.useState(false);
    const [user, setUser] = React.useState([]);
    const [check, onChangeCheck] = React.useState(false);
    const [checked, setChecked] = useState(false)

    useEffect((id) => {

        getDocs(collection(db, "signup"))
            .then(docSnap => {
                let users = [];
                docSnap.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id })

                });
                let group = [];
                for (let i = 0; i < users.length; i++) {
                    // console.log("Doc:", users[i].email)
                    group.push(users[i].email)

                }
                // console.log(group)
                setUser(group)
                // console.log(user)
            }).catch((error) => {
                // The write failed...

            });

    }, [])

    const valid = () => {
        for (let i = 0; i <= user.length; i++) {
            console.log(i)
            console.log('z', user[i])
            if (user[i] == email) {
                // alert(i)
                navigation.navigate("NEW PASSWORD", { Email: email })
                break;
            }
            else if (i == (user.length)) {
                //  alert(i)
                alert("No email")
            }

        }
    };
    console.log("a", count)

    return (
        <ScrollView style={styles.container}>

            {/* 
            <Image style={styles.pic2}
                source={require("../assets/carbg.png")}

            ></Image>
            <Image style={styles.pic3}
                source={require("../assets/carbg2.png")}

            ></Image> */}
            <View style={styles.box}>
                {/* <Image style={styles.pic1}
                    source={require("../assets/mrvehicle_logo.png")}

                ></Image> */}
                {/* <Text style={{ textAlign: "center", marginTop: 120 }}>----------------------------------------------------------------------</Text> */}
                <Text style={styles.txt}>Email <MaterialCommunityIcons name="email-box" size={24} color="black" /></Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => onChangeEmail(text)}
                    value={email}
                    placeholder="Email"
                />

                {/* <Text style={[styles.txt2, { marginTop: 8, marginLeft: 20, textAlign: "right", color: "blue", textDecorationLine: "underline" }]}
                    onPress={() => {
                        navigation.navigate("FORGET PASSWORD");
                    }}>FORGOT PASSWORD?</Text> */}

                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                        style={{
                            textAlign: "center", padding: 10, borderRadius: 20, margin: 15, width: 150, backgroundColor: "#D58C00", shadowColor: "black",
                            shadowOffset: {
                                width: 0,
                                height: 8,
                            },
                            shadowOpacity: 1,
                            shadowRadius: 16.00,

                            elevation: 14
                        }}
                        onPress={() => {
                            valid();

                        }}
                    >
                        <Text style={[styles.but, styles.txt]}>NEXT</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 150,
        //marginTop: 50,

        backgroundColor: "#2D2B29"

    }, pic1: { width: 300, height: 220, zIndex: 1, position: "absolute", top: -100, left: 45, },
    pic2: { width: 300, height: 260, zIndex: -1, position: "absolute", left: -60, bottom: 120, opacity: 0.3 },
    pic3: { width: 350, height: 280, zIndex: -1, position: "absolute", right: -20, top: 290, opacity: 0.3 },
    box: {

        backgroundColor: "#F3C623", margin: 15, padding: 30, justifyContent: "center"
        , borderRadius: 20, shadowColor: "#fff",
        shadowOffset: {
            width: 2,
            height: 8,
        },
        shadowOpacity: 0.6,
        shadowRadius: 10.00,

        elevation: 10
    },
    input: {
        height: 40,
        margin: 15,

        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white"

    }, inputbox: {
        height: 80,
        margin: 12,

        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white"
    }, DatePicker: {
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white", flexDirection: "row"
    }, but: { justifyContent: "center", textAlign: "center" },
    head: {
        fontSize: 33,
        fontWeight: "600", textAlign: "center", paddingTop: 30
    },
    txt: { fontSize: 16, fontWeight: "500" },
    txt2: { fontSize: 14, fontWeight: "500" }
});

export default UselessTextInput;