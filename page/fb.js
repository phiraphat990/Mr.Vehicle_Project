import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from '../database/configdb';
import { AntDesign } from '@expo/vector-icons';
import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";

//import RadioButtonRN from 'radio-buttons-react-native';
const UselessTextInput = ({ route, navigation }) => {
    const [firstname, onChangeFirstname] = React.useState("");
    const [lastname, onChangeLastname] = React.useState("");
    const [passport, onChangePassport] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [emails, onChangeEmails] = React.useState("");
    const [address, onChangeAddress] = React.useState("");
    const [username, onChangeUsername] = React.useState("");
    const [numBank, onChangenumBank] = React.useState("");
    const [nameBank, onChangenameBank] = React.useState("");
    const [tel, onChangeTel] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [newPassword, onChangeNewPassword] = React.useState("");
    //const [startDate, setStartDate] = useState(new Date());
    const [checked, radioCheck] = React.useState("rental");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = React.useState(new Date());
    const [num, onChangeNum] = React.useState("");
    const [street, onChangeStreet] = React.useState("");
    const [tumbon, onchangeTumbon] = React.useState("");
    const [amphoe, onChangeAmphoe] = React.useState("");
    const [province, onchangeProvince] = React.useState("");
    const [postal, onChangePostal] = React.useState("");
    getDoc(doc(db, "reactnative", "7HNJQQ2MzxWbCpQbWIIZ"))
        .then(docData => {
            if (docData.exists()) {
                // console.log(docData.data());
                onChangeEmail(docData.data().email);
                onChangeUsername(docData.data().username)
            }
        }).catch((error) => {
            // The write failed...
            alert(error);
        });
    const get = () => {
        getDoc(doc(db, "reactnative", "7HNJQQ2MzxWbCpQbWIIZ"))
            .then(docData => {
                if (docData.exists()) {
                    // console.log(docData.data());
                    onChangeEmail(docData.data().email);
                    onChangeUsername(docData.data().username)
                }
            }).catch((error) => {
                // The write failed...
                alert(error);
            });
    }
    const gets = () => {
        getDocs(collection(db, "reactnative"))
            .then(docSnap => {
                let users = [];
                docSnap.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id })
                });
                console.log("Doc:", users)
            }).catch((error) => {
                // The write failed...
                alert(error);
            });
    }
    const getsquery = () => {
        getDocs(query(collection(db, "reactnative"), where('email', '==', '...')))
            .then(docSnap => {
                let users = [];
                docSnap.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id })
                });
                console.log("Doc:", users.data().username);
            }).catch((error) => {
                // The write failed...
                alert(error);
            });
    }
    const getsqueryemail = () => {
        getDocs(query(collection(db, "signup"), where('email', '==', 'phiraphat@gmail.com'))).then(docSnap => {
            let users = [];
            docSnap.forEach((doc) => {
                users.push({ ...doc.data(), id: doc.id })
            });
            console.log("Document data:", users[0].username);
        });
    }

    const del = () => {
        deleteDoc(doc(db, "cities", "DC"))

    }

    const update = () => {
        updateDoc(doc(db, "reactnative", "7HNJQQ2MzxWbCpQbWIIZ"), {
            email: email,
            username: username
        }).then(() => {
            // Data saved successfully!
            alert('update');

        }).catch((error) => {
            // The write failed...
            alert(error);
        });
    }

    const create = () => {
        addDoc(collection(db, "reactnative"), {
            email: email,
            username: username
        }).then(() => {
            // Data saved successfully!
            alert('data submitted');

        }).catch((error) => {
            // The write failed...
            alert(error);
        });
    }
    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={{ padding: 10, borderWidth: 1 }}
                onChangeText={(text) => onChangeEmail(text)}
                value={emails}
                placeholder="ชื่อผู้ใช้ (username)"
            />
            <TextInput
                style={{ padding: 10, borderWidth: 1 }}
                onChangeText={(text) => onChangeUsername(text)}
                value={username}
                placeholder="รหัสผ่าน"

            />
            <TouchableOpacity style={{ padding: 10 }} onPress={() => get()}>
                <Text>
                    get
                </Text></TouchableOpacity>
            <TouchableOpacity style={{ padding: 10 }} onPress={() => gets()}>
                <Text>
                    gets
                </Text></TouchableOpacity>
            <TouchableOpacity style={{ padding: 10 }} onPress={() => create()}>
                <Text>
                    hi
                </Text></TouchableOpacity>
            <TouchableOpacity style={{ padding: 10 }} onPress={() => update()}>
                <Text>
                    ud
                </Text></TouchableOpacity>
            <TouchableOpacity style={{ padding: 10 }} onPress={() => del()}>
                <Text>
                    del
                </Text></TouchableOpacity>
            <TouchableOpacity style={{ padding: 10 }} onPress={() => getsqueryemail()}>
                <Text>
                    queryemail
                </Text></TouchableOpacity>
        </ScrollView >
        // justifyContent
    );
};

const styles = StyleSheet.create({
    xx: { color: "red" },
    container: {
        padding: 10,
        backgroundColor: "rgba(213,250,244,0.45)"

    }, pic1: { width: 280, height: 200, zIndex: -1, position: "absolute", left: -60, top: 50, opacity: 0.3 },
    pic2: { width: 300, height: 260, zIndex: -1, position: "absolute", left: -60, bottom: 120, opacity: 0.3 },
    pic3: { width: 350, height: 280, zIndex: -1, position: "absolute", right: -20, top: 290, opacity: 0.3 },

    input: {
        height: 40,
        margin: 12,

        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white"

    }, inputbox: {
        height: 40,
        margin: 12,
        width: 170
        ,
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
    }, but: { justifyContent: "center", textAlign: "center", }
});

export default UselessTextInput;