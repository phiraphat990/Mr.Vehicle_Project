import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button, TouchableOpacity, Image, ScrollView } from "react-native";
import { RadioButton } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from '../database/configdb';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Manage = ({ route, navigation }) => {
    const { userRenterEmail } = route.params;
    const [firstname, onChangeFirstname] = React.useState("");
    const [lastname, onChangeLastname] = React.useState("");
    const [passport, onChangePassport] = React.useState("");
    const [email, onChangeEmail] = React.useState(userRenterEmail);
    const [username, onChangeUsername] = React.useState("");
    const [numBank, onChangenumBank] = React.useState("");
    const [nameBank, onChangenameBank] = React.useState("");
    const [tel, onChangeTel] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [role, radioCheck] = React.useState("rental");
    const [num, onChangeNum] = React.useState("");
    const [street, onChangeStreet] = React.useState("");
    const [tumbon, onchangeTumbon] = React.useState("");
    const [amphoe, onChangeAmphoe] = React.useState("");
    const [province, onchangeProvince] = React.useState("");
    const [postal, onChangePostal] = React.useState("");
    const [check, onCheck] = React.useState(false);
    const [Id, setId] = React.useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
    const [isEditable, setisEditable] = useState(false);
    const [ShopName, onchangeShopName] = React.useState("");
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        //console.warn("A date has been picked: ", date);
        setDate(date);
        hideDatePicker();
    };


    useEffect((id) => {
        getDocs(query(collection(db, "signup"), where('email', '==', email)))
            .then(docSnap => {
                let users = [];
                docSnap.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id })
                });
                setId(users[0].id)
                onChangeFirstname(users[0].firstname);
                onChangeLastname(users[0].lastname);
                onChangePassport(users[0].passport);
                onChangeTel(users[0].tel);
                onChangeNum(users[0].num);
                onChangeStreet(users[0].street);
                onchangeTumbon(users[0].tumbon);
                onChangeAmphoe(users[0].amphoe);
                onchangeProvince(users[0].province);
                onChangePostal(users[0].postal);
                onChangePassword(users[0].password);
                onChangeEmail(users[0].email);
                onChangeUsername(users[0].username);
                onChangenameBank(users[0].nameBank);
                onChangenumBank(users[0].numBank);
                radioCheck(users[0].role);
                onchangeShopName(users[0].ShopName)
                setDate(users[0].date);
                console.log("Doc:", users[0].email);
                console.log("Doc:", users[0].id);
            }).catch((error) => {
                // The write failed...
                alert(error);
            });
    }, [])


    return (
        <ScrollView style={styles.container}>

            {/* <Image style={styles.pic1}
                source={require("../assets/carbg.png")}

            ></Image>
            <Image style={styles.pic2}
                source={require("../assets/carbg.png")}

            ></Image>
            <Image style={styles.pic3}
                source={require("../assets/carbg2.png")}

            ></Image> */}
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View>
                    <View style={styles.group1} >
                        <View style={{ width: 150, height: 45, borderRadius: 40, marginLeft: 15, marginBottom: 15, backgroundColor: "#FBE0AB", alignSelf: "flex-start" }}>
                            <Text style={[, { marginBottom: 15, alignContent: "center", alignItems: "center", textAlign: "center" }]}>ข้อมูลส่วนตัว <MaterialIcons name="account-box" size={22} color="black" /> </Text>
                        </View>
                        <Text style={[styles.txt, { marginLeft: 15 }]}>ชื่อ
                        </Text>

                        <TextInput
                            style={[styles.input,]}
                            onChangeText={(text) => onChangeFirstname(text)}
                            placeholder="ชื่อจริง"
                            value={firstname}
                            editable={isEditable}

                        />

                        <Text style={[styles.txt, { marginLeft: 15 }]}>นามสกุล </Text>
                        <TextInput
                            style={[styles.input,]}
                            onChangeText={(text) => onChangeLastname(text)}
                            placeholder="นามสกุล"
                            value={lastname}
                            editable={isEditable}
                        />

                        <Text style={[styles.txt, { marginLeft: 15 }]}>เลขบัตรประชาชน </Text>
                        <TextInput
                            style={[styles.input,]}
                            onChangeText={(text) => onChangePassport(text)}
                            value={passport}
                            placeholder="เลขบัตรประชาชน 13 หลัก"
                            editable={isEditable}
                        />

                        {(passport.length < 13) && (passport.length > 0) ? <Text style={{ marginLeft: 15, color: "red" }}>เลขบัตรประชาชนต้องมี 13 หลัก</Text> : ""}
                        <Text style={[styles.txt, { marginLeft: 15 }]}>วันเกิด(MM/DD/YYYY) </Text>
                        <TouchableOpacity style={[styles.DatePicker, isEditable ? { backgroundColor: "white" } : { backgroundColor: "#FBE0AB" }]} onPress={showDatePicker}>
                            <Text style={styles.but}>{date}</Text>
                            <AntDesign name="calendar" style={{ position: "absolute", right: 30, top: 5 }} size={24} color="black" />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            editable={isEditable}
                        />


                        <Text style={[styles.txt, { marginLeft: 15 }]}>Email </Text>
                        <TextInput
                            style={[styles.input,]}
                            onChangeText={(text) => onChangeEmail(text)}
                            value={email}
                            placeholder="อีเมล"
                            editable={isEditable}
                        />

                        <Text style={[styles.txt, { marginLeft: 15 }]}>เบอร์โทรศัพท์ </Text>
                        <TextInput
                            style={[styles.input,]}
                            onChangeText={(text) => onChangeTel(text)}
                            value={tel}
                            placeholder="เบอร์โทร"
                            editable={isEditable}

                        />
                    </View>
                    <View style={styles.group2}>
                        <View style={{ width: 80, height: 50, borderRadius: 40, marginLeft: 15, marginBottom: 15, padding: 1, backgroundColor: "#FBE0AB", alignSelf: "flex-start" }}>
                            <Text style={[, { marginBottom: 15, alignContent: "center", alignItems: "center", textAlign: "center", marginTop: 5 }]}>ที่อยู่ <FontAwesome name="address-book-o" size={22} color="black" /> </Text>
                        </View>
                        <Text style={[styles.txt, { marginLeft: 15 }]}>บ้านเลขที่                              ถนน</Text>
                        <View style={{ flexDirection: "row" }}>
                            <TextInput
                                style={[styles.inputbox,]}
                                placeholder="บ้านเลขที่"
                                onChangeText={(text) => onChangeNum(text)}
                                value={num}
                                editable={isEditable}
                            />

                            <TextInput
                                style={[styles.inputbox,]}
                                placeholder="ถนน"
                                onChangeText={(text) => onChangeStreet(text)}
                                value={street}
                                editable={isEditable}
                            />
                        </View>

                        <Text style={[styles.txt, { marginLeft: 15 }]}>ตำบล                                     อำเภอ</Text>
                        <View style={{ flexDirection: "row" }}>
                            <TextInput
                                style={[styles.inputbox,]}
                                placeholder="ตำบล"
                                onChangeText={(text) => onchangeTumbon(text)}
                                value={tumbon}
                                editable={isEditable}
                            />

                            <TextInput
                                style={[styles.inputbox,]}
                                placeholder="อำเภอ"
                                onChangeText={(text) => onChangeAmphoe(text)}
                                value={amphoe}
                                editable={isEditable}
                            />
                        </View>
                        <Text style={[styles.txt, { marginLeft: 15 }]}>จังหวัด                                    รหัสไปรษณีย์</Text>
                        <View style={{ flexDirection: "row" }}>
                            <TextInput
                                style={[styles.inputbox,]}
                                placeholder="จังหวัด"
                                onChangeText={(text) => onchangeProvince(text)}
                                value={province}
                                editable={isEditable}
                            />

                            <TextInput
                                style={[styles.inputbox,]}
                                placeholder="รหัสไปรษณีย์"
                                onChangeText={(text) => onChangePostal(text)}
                                value={postal}
                                editable={isEditable}
                            />
                        </View>
                    </View>
                    {role === "rental" ?
                        <View style={styles.group3}>
                            <View style={{ width: 120, height: 50, borderRadius: 40, marginLeft: 15, marginBottom: 15, padding: 2, backgroundColor: "#FBE0AB", alignSelf: "flex-start" }}>
                                <Text style={[, { marginBottom: 15, alignContent: "center", alignItems: "center", textAlign: "center", marginTop: 5 }]}>ข้อมูลร้าน <FontAwesome5 name="credit-card" size={22} color="black" /></Text>
                            </View>
                            <Text style={[styles.txt, { marginLeft: 15 }]}>ชื่อร้าน</Text>
                            <TextInput
                                style={[styles.input,]}
                                onChangeText={(text) => onchangeShopName(text)}
                                value={ShopName}
                                placeholder="ชื่อร้าน"
                                editable={isEditable}
                            />

                            <Text style={[styles.txt, { marginLeft: 15 }]}>เลขบัญชีธนาคาร</Text>
                            <TextInput
                                style={[styles.input,]}
                                onChangeText={(text) => onChangenumBank(text)}
                                value={numBank}
                                placeholder="เลขบัญชีธนาคาร"
                                editable={isEditable}
                            />
                            <Text style={[styles.txt, { marginLeft: 15 }]}>ชื่อธนาคาร </Text>
                            <TextInput
                                style={[styles.input,]}
                                onChangeText={(text) => onChangenameBank(text)}
                                value={nameBank}
                                placeholder="ชื่อธนาคาร"
                                editable={isEditable}
                            />
                        </View> : ""}

                    <View style={styles.group4}>
                        <View style={{ width: 120, height: 50, borderRadius: 40, marginLeft: 15, marginBottom: 15, padding: 1, backgroundColor: "#FBE0AB", alignSelf: "flex-start" }}>
                            <Text style={[, { marginBottom: 15, alignContent: "center", alignItems: "center", textAlign: "center", marginTop: 5 }]}>บัญชีส่วนตัว <FontAwesome5 name="user-circle" size={22} color="black" /></Text>
                        </View>
                        <Text style={[styles.txt, { marginLeft: 15 }]}>ชื่อผู้ใช้ (Username) </Text>
                        <TextInput
                            style={[styles.input,]}
                            onChangeText={(text) => onChangeUsername(text)}
                            value={username}
                            placeholder="ชื่อผู้ใช้ (username)"
                            editable={isEditable}
                        />
                        <Text style={[styles.txt, { marginLeft: 15 }]}>รหัสผ่าน (Password) </Text>
                        <TextInput
                            style={[styles.input,]}
                            onChangeText={(text) => onChangePassword(text)}
                            value={password}
                            placeholder="รหัสผ่าน"
                            secureTextEntry={true}
                            editable={isEditable}
                        />


                    </View>
                </View>

            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
                {check == true ?
                    [<TouchableOpacity
                        style={{
                            textAlign: "center", padding: 10, borderRadius: 20, margin: 20, width: 120, backgroundColor: "#FBE0AB", shadowColor: "black", marginBottom: 20, marginTop: 20,
                            shadowOffset: {
                                width: 0,
                                height: 8,
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 10.00,

                            elevation: 1
                        }}
                        onPress={() => {

                            onCheck(false)
                            setisEditable(false);
                        }}
                    >
                        <Text style={styles.but}>Cancel</Text>
                    </TouchableOpacity>,
                    <TouchableOpacity
                        style={{
                            textAlign: "center", alignItems: "center", padding: 10, borderRadius: 20, margin: 20, width: 120, backgroundColor: "#D58C00", shadowColor: "black", marginBottom: 20, marginTop: 20,
                            shadowOffset: {
                                width: 0,
                                height: 8,
                            },
                            shadowOpacity: 1,
                            shadowRadius: 16.00,

                            elevation: 10
                        }}

                        onPress={() => {
                            navigation.navigate("CONFIRM CHANGE", {
                                firstName: firstname,
                                lastName: lastname,
                                Passport: passport,
                                Email: email,
                                Username: username,
                                NumBank: numBank,
                                NameBank: nameBank,
                                Tel: tel,
                                Num: num,
                                Street: street,
                                Tumbon: tumbon,
                                Amphoe: amphoe,
                                Province: province,
                                Postal: postal,
                                Role: role,
                                Password: password,
                                ID: Id,
                                dates: date,
                                ShopNames: ShopName
                            });
upd
                            setisEditable(false);
                            onCheck(false)
                        }}
                    >
                        <Text style={styles.but}>Save</Text>
                    </TouchableOpacity>]
                    :
                    <View style={{ justifyContent: "center" }} >
                        <TouchableOpacity
                            style={{ textAlign: "center", padding: 10, borderRadius: 20, margin: 20, width: 150, backgroundColor: "#3EB8E9" }}

                            onPress={(text) => {
                                onCheck(true);
                                setisEditable(!isEditable);

                            }}>
                            <Text style={styles.but}>Edit</Text>
                        </TouchableOpacity>

                    </View>

                }

            </View>
        </ScrollView >
        // justifyContent
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#2D2B29"
        // backgroundColor: "rgba(213,250,244,0.45)"

    }, pic1: { width: 280, height: 200, zIndex: -1, position: "absolute", left: -60, top: 50, opacity: 0.3 },
    pic2: { width: 300, height: 260, zIndex: -1, position: "absolute", left: -60, bottom: 120, opacity: 0.3 },
    pic3: { width: 350, height: 280, zIndex: -1, position: "absolute", right: -20, top: 290, opacity: 0.3 },
    txt: { alignSelf: "flex-start" },
    input: {
        height: 40,
        width: 300,
        margin: 12,

        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white"

    }, inputbox: {
        height: 40,
        margin: 12,
        width: 140
        ,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white"
    }, DatePicker: {
        margin: 12, width: 300,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white", flexDirection: "row"
    }, but: { justifyContent: "center", textAlign: "center", },
    group: {
        width: 380, height: 70, backgroundColor: "#F3C623", borderRadius: 40, justifyContent: "center", marginTop: 15, shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    group1: {
        paddingBottom: 15, backgroundColor: "#F3C623", borderRadius: 40, marginTop: 30, paddingTop: 40, alignContent: "center", alignItems: "center", shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    group2: {
        paddingBottom: 15, backgroundColor: "#F3C623", borderRadius: 40, marginTop: 30, paddingTop: 40, alignContent: "center", alignItems: "center", shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    group3: {
        height: 370, backgroundColor: "#F3C623", borderRadius: 40, marginTop: 30, paddingTop: 40, alignContent: "center", alignItems: "center", shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    }
    , group4: {
        paddingBottom: 15, backgroundColor: "#F3C623", borderRadius: 40, marginTop: 30, paddingTop: 40, alignContent: "center", alignItems: "center", shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    }
});

export default Manage;