import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button, TouchableOpacity, Image, ScrollView } from "react-native";
import { RadioButton } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, authentication } from '../database/configdb';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


import * as ImagePicker from 'expo-image-picker';

//import RadioButtonRN from 'radio-buttons-react-native'; firebase
const UselessTextInput = ({ route, navigation }) => {
    const [firstname, onChangeFirstname] = React.useState("");
    const [lastname, onChangeLastname] = React.useState("");
    const [passport, onChangePassport] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [address, onChangeAddress] = React.useState("");
    const [username, onChangeUsername] = React.useState("");
    const [numBank, onChangenumBank] = React.useState("");
    const [nameBank, onChangenameBank] = React.useState("");
    const [tel, onChangeTel] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [newPassword, onChangeNewPassword] = React.useState("");
    //const [startDate, setStartDate] = useState(new Date());
    const [role, radioCheck] = React.useState("rental");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = React.useState(new Date());
    const [num, onChangeNum] = React.useState("");
    const [street, onChangeStreet] = React.useState("");
    const [tumbon, onchangeTumbon] = React.useState("");
    const [amphoe, onChangeAmphoe] = React.useState("");
    const [province, onchangeProvince] = React.useState("");
    const [postal, onChangePostal] = React.useState("");
    const [ShopName, onchangeShopName] = React.useState("");
    const [isSignIn, setIsSignedIn] = useState(false)

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // console.warn("A date has been picked: ", date);
        setDate(date);
        hideDatePicker();
    };
    const roles = () => {
        if (role == "renter") { }
    }
    const created = () => {

        addDoc(collection(db, "signup"), {
            role: role,
            firstname: firstname,
            lastname: lastname,
            passport: passport,
            date: date.toISOString().slice(0, 10),
            tel: tel,
            num: num,
            street: street,
            tumbon: tumbon,
            amphoe: amphoe,
            province: province,
            postal: postal,
            numBank: numBank,
            nameBank: nameBank,
            username: username,
            password: password,
            newPassword: newPassword,
            ShopName: ShopName,
            email: email,
            image: image,
            imageUser: imageUser,
            makeContract: false

        }

        ).then(() => {
            // Data saved successfully!
            alert('sign-up success');

        }).catch((error) => {
            // The write failed...
            alert(error);
        });
    }
    const RegisterUser = () => {
        createUserWithEmailAndPassword(authentication, email, password)

            .then((re) => {
                console.log(re);
                setIsSignedIn(true)
            })
            .catch((re) => {
                console.log(re);
            })

    }

    //รูป
    const [image, setImage] = useState(null);//รูปบัตรปปช.
    const [imageUser, setImageUser] = useState(null);//รูปUser

    useEffect(() => {
        if (Platform.OS !== 'web') {
            const { status } = ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                console.log('null')
            }
        }
    })

    const PickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        // console.log(result)
        if (!result.cancelled) {
            setImageUser(result.uri)
        }
    };

    const PickImage2 = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        // console.log(result)
        if (!result.cancelled) {
            setImage(result.uri)
        }
    };




    return (
        <ScrollView style={styles.container}>

            <Image style={styles.pic1}
                source={require("../assets/carbg.png")}

            ></Image>
            <Image style={styles.pic2}
                source={require("../assets/carbg.png")}

            ></Image>
            <Image style={styles.pic3}
                source={require("../assets/carbg2.png")}

            ></Image>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={styles.group}>
                    <View style={{ flexDirection: "row", flex: 12, margin: 20, justifyContent: "center" }}>
                        <RadioButton style={{ margin: 5 }}
                            value="rental"

                            status={role === 'rental' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                radioCheck("rental");
                                console.log(role);
                            }}
                        />
                        <Text
                            onPress={() => {
                                radioCheck("rental");

                            }}
                            style={{ margin: 5 }}>ผู้ให้เช่ายานพาหนะ</Text>

                        <RadioButton style={{}}
                            value="renter"

                            status={role === 'renter' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                radioCheck("renter");
                                console.log(role);
                            }}
                        />
                        <Text
                            onPress={() => {
                                radioCheck("renter");

                            }}
                            style={{ margin: 5 }}>ผู้เช่ายานพาหนะ</Text>
                    </View>
                </View>
                <View>
                    <View style={styles.group1} >
                        <View style={{ width: 150, height: 45, borderRadius: 40, marginLeft: 15, marginBottom: 15, backgroundColor: "#FBE0AB", alignSelf: "flex-start" }}>
                            <Text style={[, { marginBottom: 15, alignContent: "center", alignItems: "center", textAlign: "center" }]}>ข้อมูลส่วนตัว <MaterialIcons name="account-box" size={22} color="black" /> </Text>
                        </View>


                        <Text style={{ marginLeft: 15, fontWeight: "bold", marginBottom: 15 }}>รูปโปรไฟล์ </Text>
                        <View style={{ borderWidth: 1, width: 90, height: 90, borderRadius: 360 }}>
                            {imageUser && <Image source={{ uri: imageUser }} style={{ width: 90, height: 90, borderRadius: 360 }} />}
                        </View>
                        <TouchableOpacity style={{
                            textAlign: "center", padding: 10, borderRadius: 20, margin: 10, width: 150, backgroundColor: "#D58C00", shadowColor: "black", marginBottom: 20, marginTop: 20,
                            shadowOffset: {
                                width: 0,
                                height: 8,
                            },
                            shadowOpacity: 1,
                            shadowRadius: 16.00,

                            elevation: 14
                        }}

                            onPress={() => {
                                PickImage()
                            }}>
                            <Text style={styles.but}>ถ่ายรูปโปรไฟล์</Text>
                        </TouchableOpacity>


                        <Text style={[styles.txt, { marginLeft: 15 }]}>ชื่อ
                        </Text>

                        <TextInput
                            style={[styles.input,]}
                            onChangeText={(text) => onChangeFirstname(text)}
                            placeholder="ชื่อจริง"
                            value={firstname}


                        />

                        <Text style={[styles.txt, { marginLeft: 15 }]}>นามสกุล </Text>
                        <TextInput
                            style={[styles.input,]}
                            onChangeText={(text) => onChangeLastname(text)}
                            placeholder="นามสกุล"
                            value={lastname}

                        />


                        <Text style={[styles.txt, { marginLeft: 15, justifyContent: "flex-start", alignContent: "flex-start", alignSelf: "flex-start", textAlign: "left" }]}>เลขบัตรประชาชน </Text>
                        <TextInput
                            style={[styles.input,]}
                            onChangeText={(text) => onChangePassport(text)}
                            value={passport}
                            placeholder="เลขบัตรประชาชน 13 หลัก"

                        />

                        {(passport.length < 13) && (passport.length > 0) ? <Text style={{ marginLeft: 15, color: "red", justifyContent: "flex-start", alignContent: "flex-start", alignSelf: "flex-start", textAlign: "left" }}>เลขบัตรประชาชนต้องมี 13 หลัก</Text> : ""}

                        <Text style={[styles.txt, { margin: 15 }]}>วันเกิด(MM/DD/YYYY) </Text>
                        <TouchableOpacity style={styles.DatePicker} onPress={showDatePicker}>
                            <Text style={styles.but}>{date.toLocaleDateString()}</Text>
                            <AntDesign name="calendar" style={{ position: "absolute", right: 30, top: 5 }} size={24} color="black" />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />

                        <Text style={[styles.txt, { marginLeft: 15 }]}>Email </Text>
                        <TextInput
                            style={[styles.input,]}
                            onChangeText={(text) => onChangeEmail(text)}
                            value={email}
                            placeholder="อีเมล"

                        />

                        <Text style={[styles.txt, { marginLeft: 15 }]}>เบอร์โทรศัพท์ </Text>
                        <TextInput
                            style={[styles.input,]}
                            onChangeText={(text) => onChangeTel(text)}
                            value={tel}
                            placeholder="เบอร์โทร"


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

                            />

                            <TextInput
                                style={[styles.inputbox,]}
                                placeholder="ถนน"
                                onChangeText={(text) => onChangeStreet(text)}
                                value={street}

                            />
                        </View>

                        <Text style={[styles.txt, { marginLeft: 15 }]}>ตำบล                                     อำเภอ</Text>
                        <View style={{ flexDirection: "row" }}>
                            <TextInput
                                style={[styles.inputbox,]}
                                placeholder="ตำบล"
                                onChangeText={(text) => onchangeTumbon(text)}
                                value={tumbon}

                            />

                            <TextInput
                                style={[styles.inputbox,]}
                                placeholder="อำเภอ"
                                onChangeText={(text) => onChangeAmphoe(text)}
                                value={amphoe}

                            />
                        </View>
                        <Text style={[styles.txt, { marginLeft: 15 }]}>จังหวัด                                    รหัสไปรษณีย์</Text>
                        <View style={{ flexDirection: "row" }}>
                            <TextInput
                                style={[styles.inputbox,]}
                                placeholder="จังหวัด"
                                onChangeText={(text) => onchangeProvince(text)}
                                value={province}

                            />

                            <TextInput
                                style={[styles.inputbox,]}
                                placeholder="รหัสไปรษณีย์"
                                onChangeText={(text) => onChangePostal(text)}
                                value={postal}

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

                            />


                            <Text style={[styles.txt, { marginLeft: 15 }]}>เลขบัญชีธนาคาร</Text>
                            <TextInput
                                style={[styles.input,]}
                                onChangeText={(text) => onChangenumBank(text)}
                                value={numBank}
                                placeholder="เลขบัญชีธนาคาร"

                            />
                            <Text style={[styles.txt, { marginLeft: 15 }]}>ชื่อธนาคาร </Text>
                            <TextInput
                                style={[styles.input,]}
                                onChangeText={(text) => onChangenameBank(text)}
                                value={nameBank}
                                placeholder="ชื่อธนาคาร"

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

                        />
                        <Text style={[styles.txt, { marginLeft: 15 }]}>รหัสผ่าน (Password) </Text>
                        <TextInput
                            style={[styles.input,]}
                            onChangeText={(text) => onChangePassword(text)}
                            value={password}
                            placeholder="รหัสผ่าน"
                            secureTextEntry={true}

                        />
                        {(password.length < 8) && (password.length >= 1) ? <Text style={{ marginLeft: 15, color: "red", alignSelf: "flex-start", marginBottom: 15 }}>รหัสผ่านต้องมีอย่างน้อย 8 ตัว</Text> : ""}
                        <Text style={[styles.txt, { marginLeft: 15 }]}>ยืนยันรหัสผ่าน (Confirm password) </Text>
                        <TextInput

                            style={styles.input}
                            onChangeText={(text) => onChangeNewPassword(text)}
                            value={newPassword}
                            placeholder="ยืนยันรหัสผ่าน"
                            secureTextEntry={true}
                        />

                        {(password === newPassword) || ((newPassword.length < 2) && (password.length <= 8)) ? "" : <Text style={{ marginLeft: 15, color: "red", alignSelf: "flex-start" }}>รหัสผ่านไม่ตรงกัน</Text>}


                    </View>


                    <View style={styles.group5}>
                        <View style={{ width: 120, height: 50, borderRadius: 40, marginLeft: 15, marginBottom: 15, padding: 1, backgroundColor: "#FBE0AB", alignSelf: "flex-start" }}>
                            <Text style={[, { marginBottom: 15, alignContent: "center", alignItems: "center", textAlign: "center", marginTop: 5 }]}>ยืนยันตัวตน <FontAwesome5 name="user-circle" size={22} color="black" /></Text>
                        </View>
                        <Text style={{ marginLeft: 15, fontWeight: "bold", marginBottom: 15 }}>รูปบัตรประชาชน </Text>
                        <View style={{ borderWidth: 1, width: 200, height: 100, borderRadius: 15 }}>
                            {image && <Image source={{ uri: image }} style={{ width: 200, height: 100, borderRadius: 15 }} />}
                        </View>
                        <TouchableOpacity style={{
                            textAlign: "center", padding: 10, borderRadius: 20, margin: 10, width: 230, backgroundColor: "#D58C00", shadowColor: "black", marginTop: 20, marginBottom: 20,
                            shadowOffset: {
                                width: 0,
                                height: 8,
                            },
                            shadowOpacity: 1,
                            shadowRadius: 16.00,

                            elevation: 14
                        }}

                            onPress={() => {
                                PickImage2()
                            }}>
                            <Text style={styles.but}>ถ่ายรูปบัตรประชาชน</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

            <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 60 }}>
                <TouchableOpacity
                    style={{
                        textAlign: "center", padding: 10, borderRadius: 20, margin: 20, width: 120, backgroundColor: "#FBE0AB", shadowColor: "black", marginBottom: 20, marginTop: 20,
                        shadowOffset: {
                            width: 0,
                            height: 8,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 16.00,

                        elevation: 14
                    }}

                    onPress={() => {
                        navigation.navigate("LOG-IN");
                    }}
                >
                    <Text style={styles.but}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        textAlign: "center", alignItems: "center", padding: 10, borderRadius: 20, margin: 20, width: 120, backgroundColor: "#D58C00", shadowColor: "black", marginBottom: 20, marginTop: 20,
                        shadowOffset: {
                            width: 0,
                            height: 8,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 16.00,

                        elevation: 14
                    }}

                    onPress={() => {
                        created();
                        RegisterUser();
                        navigation.navigate("LOG-IN");
                    }}
                >
                    <Text style={styles.but}>Sign-up</Text>
                </TouchableOpacity>

            </View>
        </ScrollView >
        // justifyContent
    );
};

const styles = StyleSheet.create({
    xx: { color: "red" },
    container: {
        padding: 10,paddingTop:20,
        backgroundColor: "#2D2B29",paddingBottom:30
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
        height: 70, backgroundColor: "#F3C623", borderRadius: 40, justifyContent: "center", marginTop: 15, shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 1,
    },
    group1: {
        height: 857, backgroundColor: "#F3C623", borderRadius: 40, marginTop: 30, paddingTop: 40, alignContent: "center", alignItems: "center", shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 1,
    },
    group2: {
        paddingBottom: 40, backgroundColor: "#F3C623", borderRadius: 40, marginTop: 30, paddingTop: 40, alignContent: "center", alignItems: "center", shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 1,
    },
    group3: {
        paddingBottom: 30, backgroundColor: "#F3C623", borderRadius: 40, marginTop: 30, paddingTop: 40, alignContent: "center", alignItems: "center", shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 1,
    }
    , group4: {
        height: 440, backgroundColor: "#F3C623", borderRadius: 40, marginTop: 30, paddingTop: 40, alignContent: "center", alignItems: "center", shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.8,
        shadowRadius: 10.00,
        elevation: 1,
    },

    group5: {
        paddingBottom: 40, backgroundColor: "#F3C623", borderRadius: 40, marginTop: 30, paddingTop: 40, alignContent: "center", alignItems: "center", shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.8,
        shadowRadius: 10.00,
        elevation: 1,
    },


    btn1: {
        color: "black",
        fontWeight: "bold",
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 70,
        paddingBottom: 40,
        paddingTop: 10
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
        borderRadius: 4,
        padding: 10,
        textAlign: "center",
    },

});

export default UselessTextInput;