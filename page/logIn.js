import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button, TouchableOpacity, Image, ScrollView, FlatList } from "react-native";
import { RadioButton } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Checkbox } from 'react-native-paper';
import signIn from '../page/signIn';
import { db, authentication } from '../database/configdb';
import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { MaterialCommunityIcons } from '@expo/vector-icons';
const UselessTextInput = ({ route, navigation }) => {
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [role, onChangeRole] = React.useState("");
    const [Id, setId] = React.useState("");
    const [checked, setChecked] = useState(false)
    const [isSignIn, setIsSignedIn] = useState(false)

    const signOutUser = () => {
        signOut(authentication)
            .then((re) => {
                // console.log(re);
                setIsSignedIn(false)

            })
            .catch((err) => {
                //console.log(err);
            })
    }
    const signInUser = () => {

        signInWithEmailAndPassword(authentication, email, password)
            .then((re) => {
                console.log(re);
                if (role == "renter") {

                    navigation.navigate("MAIN", { Email: email, Role: role });

                } else if (role == "rental") {

                    navigation.navigate("MAINRENTAL", { Email: email, Role: role });

                }
                setIsSignedIn(true)

            })
            .catch((err) => {
                alert("Wrong Email/password")
                console.log(err);
            })
    }


    const getMail = () => {
        getDocs(query(collection(db, "signup"), where('email', '==', email)))
            .then(docSnap => {
                let users = [];
                docSnap.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id })
                });
                console.log(users)
                setId(users[0].id)
                onChangeEmail(users[0].email);
                onChangeRole(users[0].role)

            }).catch((error) => {
                // The write failed...
                alert(error);
            });
    }

    return (
        <ScrollView style={styles.container}>


            <Image style={styles.pic2}
                source={require("../assets/carbg.png")}

            ></Image>
            <Image style={styles.pic3}
                source={require("../assets/carbg2.png")}

            ></Image>
            <View style={styles.box}>
                <Image style={styles.pic1}
                    source={require("../assets/mrvehicle_logo.png")}

                ></Image>
                <Text style={{ textAlign: "center", marginTop: 120 }}>-----------------------------------------------------------------</Text>
                <Text style={styles.txt}>Email  <MaterialCommunityIcons name="email-box" size={24} color="black" /></Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => onChangeEmail(text)}
                    value={email}
                    placeholder="Email"
                />
                <Text style={styles.txt}>Password <AntDesign name="lock1" size={24} color="black" /></Text>
                {checked == true ? <TextInput
                    style={styles.input}
                    onChangeText={(text) => onChangePassword(text)}
                    value={password}
                    placeholder="Password"
                    secureTextEntry={false}
                /> : <TextInput
                    style={styles.input}
                    onChangeText={(text) => onChangePassword(text)}
                    value={password}
                    placeholder="Password"
                    secureTextEntry={true}
                />}

                <View style={{ flexDirection: "row", marginLeft: -20 }}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />

                    <Text
                        onPress={() => {
                            setChecked(!checked);
                        }}
                        style={[styles.txt2, { marginTop: 8 }]} >SHOW PASSWORD</Text>
                    <Text style={[styles.txt2, { marginTop: 8, marginLeft: 20, textAlign: "right", color: "blue", textDecorationLine: "underline" }]}
                        onPress={() => {
                            navigation.navigate("FORGOT PASSWORD", { Email: email });
                        }}>FORGOT PASSWORD?</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    {isSignIn === true ?
                        <TouchableOpacity
                            style={{
                                textAlign: "center", padding: 10, borderRadius: 20, margin: 15, width: 150, backgroundColor: "#FBE0AB", shadowColor: "black",
                                shadowOffset: {
                                    width: 0,
                                    height: 8,
                                },
                                shadowOpacity: 1,
                                shadowRadius: 16.00,

                                elevation: 10
                            }}

                            onPress={() => {
                                signOutUser();

                            }}
                        >
                            <Text style={[styles.but, styles.txt]}>LOG-OUT</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={{
                                textAlign: "center", padding: 10, borderRadius: 20, margin: 15, width: 150, backgroundColor: "#FBE0AB", shadowColor: "black",
                                shadowOffset: {
                                    width: 0,
                                    height: 8,
                                },
                                shadowOpacity: 1,
                                shadowRadius: 16.00,

                                elevation: 14
                            }}

                            onPress={() => {
                                getMail()
                                signInUser();

                            }}
                        >
                            <Text style={[styles.but, styles.txt]}>LOG-IN</Text>

                        </TouchableOpacity>
                    }


                    <Text style={{ textAlign: "center" }}>-------------------------------------------------</Text>

                    <TouchableOpacity
                        style={{
                            textAlign: "center", alignItems: "center", padding: 10, borderRadius: 20, margin: 15, width: 150, backgroundColor: "#D58C00", shadowColor: "black",
                            shadowOffset: {
                                width: 0,
                                height: 6,
                            },
                            shadowOpacity: 0.8,
                            shadowRadius: 10.00,

                            elevation: 4
                        }}
                        onPress={() => {
                            navigation.navigate("SIGN-UP");
                        }}
                    // onPress={() => { alert("confirm") }}
                    >
                        <Text style={[styles.but, styles.txt]}>SIGN-UP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        //marginTop: 50,

        backgroundColor: "#2D2B29"

    }, pic1: { width: 300, height: 220, zIndex: 1, position: "absolute", top: -100, left: 20, },
    pic2: { width: 300, height: 260, zIndex: -1, position: "absolute", left: -60, bottom: 120, opacity: 0.3 },
    pic3: { width: 350, height: 280, zIndex: -1, position: "absolute", right: -20, top: 290, opacity: 0.3 },
    box: {

        backgroundColor: "#F3C623", margin: 15, padding: 20, justifyContent: "center"
        , borderRadius: 20, shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.6,
        shadowRadius: 10.00,

        elevation: 6, marginBottom: 100
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