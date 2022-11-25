import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button, TouchableOpacity, Image, ScrollView, Platform } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { db } from "../database/configdb";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { MaterialIcons } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';




const AddCarInfo = ({ route, navigation }) => {

    const { rentalEmail } = route.params;

    const [image, setImage] = useState(null);
    useEffect(() => {
        if (Platform.OS !== 'web') {
            const { status } = ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                console.log('null')
            }
        }
    })

    const PickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        console.log(result)
        if (!result.cancelled) {
            setImage(result.uri)
        }
    };//image



    const [brand, setBrand] = useState('');//ยี่ห้อ
    const [periodUsed, setPeriodUsed] = useState('');//น้ำมันที่เหลือ
    const [price, setPrice] = useState('');//ราคาต่อวัน
    const [seats, setSeats] = useState('');//จำนวนที่นั่ง
    const [model, setModel] = useState('');//รุ่น
    const [otherInfo, setotherInfo] = useState('');//รายละเอียดอื่นๆ
    //  const [size, setSize] = useState('');//ขนาดรถ

    // const [number, setNumber] = useState('');//
    // const [email, setEmail] = useState('');//

    const [osCar, setosCar] = useState([
        { label: 'Auto', value: 'auto' },
        { label: 'Manual', value: 'manual' },
        { label: 'Null', value: 'null' }
    ]);//ระบบ

    const [TypeCar, setTypeCar] = useState([
        { label: 'รถยนต์', value: 'car' },
        { label: 'จักรยานยนต์', value: 'motorcycle' },
        { label: 'จักรยาน', value: 'bicycle' }
    ]);//ชนิดรถ
    const [size, setSize] = useState([
        { label: 'เล็ก', value: 'small' },
        { label: 'กลาง', value: 'medium' },
        { label: 'ใหญ่', value: 'big' }
    ]);//ชนิดรถ

    const [openSize, setOpenSize] = useState(false);
    const [open, setOpen] = useState(false);
    const [openType, setOpenType] = useState(false);
    const [value, setValue] = useState("");
    const [valueOs, setValueOs] = useState("");
    const [valueSize, setValueSize] = useState("");
    const create = () => {
        addDoc(collection(db, "vehicleDetails"), {
            brand: brand,
            oilUsed: periodUsed,
            seats: seats,
            model: model,
            otherInfo: otherInfo,
            size: valueSize,
            os: valueOs,
            VehicleType: value,
            Image: image,
            vehicle: vehicle,
            usedStatus: false,
            rentalEmail: rentalEmail,
            deposit: deposit,
            fine: fine,
            insurance: insurance,
            other: other,
            vehicle: vehicle,
            number: 1
        }).then(() =>
            alert("add suces")
        ).catch((error) => {
            alert(error)
        })
    }


    const [vehicle, setVehicle] = useState('');//ราคาต่อวัน
    const [deposit, setDeposit] = useState(0);//มัดจำ
    const [insurance, setInsurance] = useState(0);//ประกัน
    const [fine, setFine] = useState(0);//ค่าปรับ
    const [other, setOther] = useState(0);//อื่นๆ

    // const createToMAkeInvoice = () => {
    //     addDoc(collection(db, "MakeInvoice"), {
    //         deposit: deposit,
    //         fine: fine,
    //         insurance: insurance,
    //         other: other,
    //         vehicle: vehicle,
    //         rentalEmail: rentalEmail,
    //         renterEmail: ""

    //     }).then(() =>
    //         alert("add suces")
    //     ).catch((error) => {
    //         alert(error)
    //     })
    // }



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

            <View style={[styles.view, { zIndex: 20 }]}>
                <View style={{ width: 150, height: 45, borderRadius: 40, marginLeft: 15, marginBottom: 15, backgroundColor: "#FBE0AB", alignSelf: "flex-start" }}>
                    <Text style={[, { marginBottom: 15, alignContent: "center", alignItems: "center", textAlign: "center" }]}>ประเภท <MaterialIcons name="account-box" size={22} color="black" /> </Text>
                </View>
                <Text style={{ marginLeft: 15, }}>ประเภท                                   ระบบ</Text>
                <View style={{ zIndex: 20, width: 260, flexDirection: "row", paddingHorizontal: 50, justifyContent: "center", marginLeft: 10 }}>
                    <DropDownPicker style={[styles.dropdown, { width: 150 }]}
                        placeholder="ประเภท"
                        open={openType}
                        value={value}
                        items={TypeCar}
                        setOpen={setOpenType}
                        setValue={setValue}
                        setItems={setTypeCar}
                    />
                    <View style={{ zIndex: 1 }}>
                        <DropDownPicker style={[styles.dropdown]}
                            placeholder="ระบบ"
                            open={open}
                            value={valueOs}
                            items={osCar}
                            setOpen={setOpen}
                            setValue={setValueOs}
                            setItems={setosCar}
                        />
                    </View>
                </View>



            </View>

            <View style={styles.view}>
                <View style={{ width: 150, height: 45, borderRadius: 40, marginLeft: 15, marginBottom: 15, backgroundColor: "#FBE0AB", alignSelf: "flex-start" }}>
                    <Text style={[, { marginBottom: 15, alignContent: "center", alignItems: "center", textAlign: "center" }]}>ข้อมูลยานพาหนะ <MaterialIcons name="account-box" size={22} color="black" /> </Text>
                </View>
                <Text style={{ marginLeft: 15, }}>ยี่ห้อ </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setBrand(text)}
                    placeholder="ยี่ห้อ"
                    value={brand}
                // editable={isEditable}
                />

                <Text style={{ marginLeft: 15, }}>รุ่น </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setModel(text)}
                    placeholder="รุ่น"
                    value={model}
                // editable={isEditable}
                />
                <Text style={{ marginLeft: 15, }}>ขนาดรถ                                 จำนวนที่นั่ง</Text>
                <View style={{ zIndex: 1, width: 260, flexDirection: "row", paddingHorizontal: 50, justifyContent: "center", marginLeft: 0, padding: 6 }}>
                    <DropDownPicker style={[styles.dropdown, { marginLeft: 30, width: 110 }]}
                        placeholder="ขนาดรถ"
                        open={openSize}
                        value={valueSize}
                        items={size}
                        setOpen={setOpenSize}
                        setValue={setValueSize}
                        setItems={setSize}
                    />

                    <Text style={{ marginLeft: 15 }}> </Text>
                    <TextInput
                        style={[styles.inputbox]}
                        placeholder="จำนวนที่นั่ง"
                        onChangeText={(text) => setSeats(text)}
                        value={seats}
                    // editable={isEditable}
                    />
                </View>

                <Text style={{ marginLeft: 15, }}>น้ำมันที่เหลือ                           ราคาต่อวัน </Text>
                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={[styles.inputbox]}
                        placeholder="ลิตร"
                        onChangeText={(text) => setPeriodUsed(text)}
                        value={periodUsed}
                    // editable={isEditable}
                    />

                    <Text style={{ marginLeft: 30, }}> </Text>
                    <TextInput
                        style={[styles.inputbox]}
                        placeholder="ราคาต่อวัน"
                        onChangeText={(text) => setVehicle(text)}
                        value={vehicle}
                    // editable={isEditable}
                    />
                </View>

                <Text style={{ marginLeft: 15, fontWeight: "bold" }}>ค่ามัดจำ                                  ค่าประกัน</Text>
                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={[styles.inputbox]}
                        placeholder="ทั้งหมด"
                        onChangeText={(text) => setDeposit(text)}
                        value={deposit}
                    // editable={isEditable}
                    />

                    <Text style={{ marginLeft: 30, fontWeight: "bold" }}> </Text>
                    <TextInput
                        style={[styles.inputbox]}
                        placeholder="ค่าประกัน"
                        onChangeText={(text) => setInsurance(text)}
                        value={insurance}
                    // editable={isEditable}
                    />
                </View>

                <Text style={{ marginLeft: 15, fontWeight: "bold" }}>ค่าปรับ                                    ค่าอื่น ๆ</Text>
                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={[styles.inputbox]}
                        placeholder="ค่าปรับ"
                        onChangeText={(text) => setFine(text)}
                        value={fine}
                    // editable={isEditable}
                    />

                    <Text style={{ marginLeft: 30, fontWeight: "bold" }}> </Text>
                    <TextInput
                        style={[styles.inputbox]}
                        placeholder="ค่าอื่น ๆ"
                        onChangeText={(text) => setOther(text)}
                        value={other}
                    // editable={isEditable}
                    />
                </View>

            </View>
            <View style={styles.view}>
                <View style={{ width: 150, height: 45, borderRadius: 40, marginLeft: 15, marginBottom: 15, backgroundColor: "#FBE0AB", alignSelf: "flex-start" }}>
                    <Text style={[, { marginBottom: 15, alignContent: "center", alignItems: "center", textAlign: "center"}]}>รูปภาพยานพาหนะ <MaterialIcons name="account-box" size={22} color="black" /> </Text>
                </View>
                <Text style={{ marginLeft: 15, }}>รูปภาพ </Text>
                <View>
                    <TouchableOpacity style={{
                        textAlign: "center", alignItems: "center", padding: 10, borderRadius: 20, margin: 20, width: 240, backgroundColor: "#D58C00", shadowColor: "black", marginBottom: 20, marginTop: 20,
                        shadowOffset: {
                            width: 0,
                            height: 8,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 16.00,

                        elevation: 14

                    }} onPress={PickImage}>
                        <Text style={[styles.text,]}>Pick an image</Text>
                    </TouchableOpacity>

                    {image && <Image source={{ uri: image }} style={{ width: 220, height: 220, marginLeft: 30, marginBottom: 10 }} />}

                </View>

            </View>
            <View style={styles.view}>
                <View style={{ width: 150, height: 45, borderRadius: 40, marginLeft: 15, marginBottom: 15, backgroundColor: "#FBE0AB", alignSelf: "flex-start" }}>
                    <Text style={[, { marginBottom: 15, alignContent: "center", alignItems: "center", textAlign: "center" }]}>ข้อมูลเพิ่มเติม <MaterialIcons style={{ position: "position", top: 10 }} name="account-box" size={22} color="black" /> </Text>
                </View>
                <Text style={{ marginLeft: 15, }}>รายละเอียดอื่น ๆ</Text>
                <TextInput
                    style={[styles.inputbox, { height: 90, width: 255 }]}
                    placeholder="รายละเอียดอื่น ๆ"
                    onChangeText={(text) => setotherInfo(text)}
                    value={otherInfo}
                // editable={isEditable}
                />
            </View>

            <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 10, justifyContent: "center" }}>
                <TouchableOpacity
                    style={{
                        textAlign: "center", padding: 10, borderRadius: 20, margin: 20, width: 120, backgroundColor: "#FBE0AB", shadowColor: "black", marginBottom: 20, marginTop: 20,
                        shadowOffset: {
                            width: 0,
                            height: 8,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 5.00,

                        elevation: 1
                    }}

                    onPress={() => {
                        navigation.navigate("MAINRENTAL");
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
                        shadowOpacity: 0.5,
                        shadowRadius: 10.00,

                        elevation: 1
                    }}

                    onPress={() => {

                        create();
                        navigation.navigate('MAINRENTAL', { Email: rentalEmail })
                    }}
                >
                    <Text style={styles.but}>Confirm</Text>
                </TouchableOpacity>

            </View>
        </ScrollView >
        // justifyContent
    );
};

const styles = StyleSheet.create({
    xx: { color: "red" },
    container: {
        padding: 0,
        backgroundColor: "#2D2B29"

    }, pic1: { width: 280, height: 200, zIndex: -1, position: "absolute", left: -60, top: 50, opacity: 0.3 },
    pic2: { width: 300, height: 260, zIndex: -1, position: "absolute", left: -60, bottom: 120, opacity: 0.3 },
    pic3: { width: 350, height: 280, zIndex: -1, position: "absolute", right: -20, top: 290, opacity: 0.3 },

    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: "white",

    }, inputbox: {
        height: 40,
        margin: 12,
        width: 100,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: "white"
    }, DatePicker: {
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white", flexDirection: "row"
    }, but: { justifyContent: "center", textAlign: "center" }
    , colorWhite: { backgroundColor: "white" }
    , colorGray: { backgroundColor: "#d8d8d8" },
    view: {
        // width: 590,
        // height:1490,
        borderRadius: 20,

        backgroundColor: "#F3C623",
        alignSelf: "center",
        padding: 15,
        marginTop: 15,
        marginBottom: 15
        , shadowColor: "white",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 8.00,

        elevation: 1

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
    dropdown: {
        margin: 10,
        borderWidth: 1,
        padding: 5,
        borderRadius: 20,
        backgroundColor: "white",
        width: 100,
        height: 40

    },
});

export default AddCarInfo;