import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button, TouchableOpacity, Image, ScrollView, FlatList } from "react-native";
import { collection, doc, addDoc, updateDoc, getDoc, onSnapshot, getDocs, query, where } from "firebase/firestore";
import { db } from "../database/configdb"
import { AntDesign } from '@expo/vector-icons';
const UselessTextInput = ({ route, navigation }) => {
    const { Email } = route.params;
    const [newPassword, onChangeNewPassword] = React.useState("");
    const [Id, setId] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    useEffect((id) => {
        getDocs(query(collection(db, "signup"), where('email', '==', Email)))
            .then(docSnap => {
                let users = [];
                docSnap.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id })
                });
                setId(users[0].id)

            }).catch((error) => {
                // The write failed...
                alert(error);
            });
    }, [])

    const update = () => {

        updateDoc(doc(db, "signup", Id), {
            password: password,
            newPassword: newPassword

        }).then(() => {
            // Data saved successfully!

        }).catch((error) => {
            // The write failed...
            alert(error);
        });

    };

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
                <Text style={styles.txt}>New Password  <AntDesign name="lock1" size={24} color="black" /></Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => onChangePassword(text)}
                    value={password}
                    placeholder="รหัสผ่านใหม่"
                    secureTextEntry={true}
                />
                <Text style={{ marginLeft: 15, color: "red", marginBottom: 3 }}>
                    {(password.length < 8) && (password.length >= 1) ? "รหัสผ่านต้องมีอย่างน้อย 8 ตัว" : ""}
                </Text>
                <Text style={styles.txt}>Confirm Password  <AntDesign name="lock1" size={24} color="black" /></Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => onChangeNewPassword(text)}
                    value={newPassword}
                    placeholder="ยืนยันรหัสผ่าน"
                    secureTextEntry={true}
                />
                <Text style={{ marginLeft: 15, color: "red" }}>
                    {(password === newPassword) || ((newPassword.length < 2) && (password.length <= 8)) ? "" : "รหัสผ่านไม่ตรงกัน"}
                </Text>


                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                        style={{
                            textAlign: "center", padding: 10, borderRadius: 20, margin: 10, width: 120, backgroundColor: "#FBE0AB", shadowColor: "black",
                            shadowOffset: {
                                width: 0,
                                height: 8,
                            },
                            shadowOpacity: 1,
                            shadowRadius: 16.00,

                            elevation: 14
                        }}

                        onPress={() => {
                            navigation.navigate("FORGOT PASSWORD", { Emails: Email });
                        }}
                    >
                        <Text style={styles.but}>Cancel</Text>
                    </TouchableOpacity>
                    {password == newPassword && password.length >= 8 ?
                        <TouchableOpacity
                            style={{
                                textAlign: "center", alignItems: "center", padding: 10, borderRadius: 20, margin: 10, width: 120, backgroundColor: "#D58C00", shadowColor: "black",
                                shadowOffset: {
                                    width: 0,
                                    height: 8,
                                },
                                shadowOpacity: 1,
                                shadowRadius: 16.00,

                                elevation: 14
                            }}

                            onPress={() => {
                                navigation.navigate("LOG-IN", { Emails: Email });
                                update();
                                alert("Change password success")
                            }}>
                            <Text style={styles.but}>Save</Text>
                        </TouchableOpacity> : <TouchableOpacity
                            style={{
                                textAlign: "center", alignItems: "center", padding: 10, borderRadius: 20, margin: 10, width: 120, backgroundColor: "#D58C00", shadowColor: "black",
                                shadowOffset: {
                                    width: 0,
                                    height: 8,
                                },
                                shadowOpacity: 1,
                                shadowRadius: 16.00,

                                elevation: 14
                            }}

                            onPress={() => {

                                alert("please fill new password")
                            }}>
                            <Text style={styles.but}>Save</Text>
                        </TouchableOpacity>
                    }
                </View>

            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 120,
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