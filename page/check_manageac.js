import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button, TouchableOpacity, Image, ScrollView, FlatList } from "react-native";
import { RadioButton } from 'react-native-paper';
// import DatePicker from "react-datepicker";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Checkbox } from 'react-native-paper';
import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from '../database/configdb';
import signIn from '../page/signIn'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const UselessTextInput = ({ route, navigation }) => {

    const { firstName, lastName, Passport, Email, Username, NumBank, NameBank, Tel, Num,
        Street,
        Tumbon,
        Amphoe,
        Province,
        Postal, Role, Password, dates, ID, ShopNames } = route.params;
    const [newPassword, onChangeNewPassword] = useState("");

    const [email, onChangeEmail] = React.useState("");


    const update = () => {
        updateDoc(doc(db, "signup", ID), {
            role: Role,
            firstname: firstName,
            lastname: lastName,
            passport: Passport,
            email: Email,
            tel: Tel,
            num: Num,
            date: dates,
            street: Street,
            tumbon: Tumbon,
            amphoe: Amphoe,
            province: Province,
            postal: Postal,
            numBank: NumBank,
            nameBank: NameBank,
            username: Username,
            password: Password,
            ShopName: ShopNames

        }).then(() => {
            // Data saved successfully!



        }).catch((error) => {
            // The write failed...
            alert(error);

        });
    }



    return (
        <ScrollView style={styles.container}>

            {/* <Image style={styles.pic2}
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

                <Text style={styles.txt}>Confirm Change Password <AntDesign name="lock1" size={24} color="black" /></Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => onChangeNewPassword(text)}
                    value={newPassword}
                    placeholder="รหัสผ่าน"
                    secureTextEntry={true}
                />

                <View style={{ flexDirection: "row", alignItems: "center",justifyContent:"center" }}>
                    <TouchableOpacity
                        style={{
                            textAlign: "center", padding: 10, borderRadius: 20, margin: 10, width: 100, backgroundColor: "#FBE0AB", shadowColor: "black",
                            shadowOffset: {
                                width: 0,
                                height: 8,
                            },
                            shadowOpacity: 1,
                            shadowRadius: 16.00,

                            elevation: 14
                        }}

                        onPress={() => {
                            navigation.navigate('MANAGE ACCOUNT', { Emails: email })
                        }}
                    >
                        <Text style={styles.but}>Cancel</Text>
                    </TouchableOpacity>

                    {Password === newPassword ?
                        <TouchableOpacity
                            style={{
                                textAlign: "center", alignItems: "center", padding: 10, borderRadius: 20, margin: 10, width: 100, backgroundColor: "#D58C00", shadowColor: "black",
                                shadowOffset: {
                                    width: 0,
                                    height: 8,
                                },
                                shadowOpacity: 1,
                                shadowRadius: 16.00,

                                elevation: 14
                            }}

                            onPress={() => {
                                update();
                                navigation.navigate('MANAGE ACCOUNT', { Emails: email })
                                alert("Update Profile Success");

                            }}>
                            <Text style={styles.but}>Confirm</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity
                            style={{
                                textAlign: "center", alignItems: "center", padding: 10, borderRadius: 20, margin: 10, width: 100, backgroundColor: "#D58C00", shadowColor: "black",
                                shadowOffset: {
                                    width: 0,
                                    height: 8,
                                },
                                shadowOpacity: 1,
                                shadowRadius: 16.00,

                                elevation: 14
                            }}

                            onPress={() => {
                                // navigation.navigate('MANAGE ACCOUNT', { Emails: email })
                                alert("Password wrong");
                            }}>
                            <Text style={styles.but}>Confirm</Text>
                        </TouchableOpacity>
                    }
                </View>

            </View>
        </ScrollView >

    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 200,
        //marginTop: 50,

        backgroundColor: "#2D2B29"

    }, pic1: { width: 300, height: 220, zIndex: 1, position: "absolute", top: -100, left: 45, },
    pic2: { width: 300, height: 260, zIndex: -1, position: "absolute", left: -60, bottom: 120, opacity: 0.3 },
    pic3: { width: 350, height: 280, zIndex: -1, position: "absolute", right: -20, top: 290, opacity: 0.3 },
    box: {
        height: 200,
        backgroundColor: "#F3C623", margin: 15, padding: 20, justifyContent: "center"
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