import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from '../database/configdb';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons';
const MakeContract = ({ route, navigation }) => {

    const { userRenterEmail, uID, vehicleId } = route.params;
    const [firstname, onChangeFirstname] = React.useState("");
    const [lastname, onChangeLastname] = React.useState("");
    const [passport, onChangePassport] = React.useState("");
    const [email, onChangeEmail] = React.useState(userRenterEmail);
    const [model, onChangemodel] = React.useState("");
    const [number, onChangenumber] = React.useState("");
    const [Tel, onChangeTel] = React.useState("");
    const [os, onChangeos] = React.useState("");
    const [brand, onChangebrand] = React.useState("");
    const [periodUse, onChangeperiodUse] = React.useState("");
    const [price, onChangeprice] = React.useState("");
    const [size, onChangesize] = React.useState("");
    const [vehicleType, onChangevehicleType] = React.useState("");
    const [seats, onChangeseats] = React.useState("");
    const [role, radioCheck] = React.useState("rental");
    const [num, onChangeNum] = React.useState("");
    const [street, onChangeStreet] = React.useState("");
    const [tumbon, onchangeTumbon] = React.useState("");
    const [amphoe, onChangeAmphoe] = React.useState("");
    const [province, onchangeProvince] = React.useState("");
    const [postal, onChangePostal] = React.useState("");
    const [RentalEmail, onchangeRentalEmail] = React.useState("");
    const [check, onCheck] = React.useState(false);
    const [Id, setId] = React.useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
    const [dates, setDates] = React.useState(new Date().toISOString().slice(0, 10));
    const [time, setTime] = React.useState(new Date(Date.now()).toISOString().slice(0, 5));
    const [dateDrop, setDateDrop] = React.useState(new Date().toISOString().slice(0, 10));
    const [timeDrop, setTimeDrop] = React.useState(new Date(Date.now()).toISOString().slice(0, 5));
    const [countDate, onChangecountDate] = React.useState("");
    const [total, setTotal] = React.useState("");

    //  const [vId, onChangevId] = React.useState("");
    const [rentalEmail, onChangerentalEmail] = React.useState("");


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
        getDocs(query(collection(db, "signup"), where('email', '==', userRenterEmail)))
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
                onChangeEmail(users[0].email);

                console.log("Doc:", users[0].email);
                console.log("Doc:", users[0].id);
            }).catch((error) => {
                // The write failed... uyhstyles
                alert(error);
            });

    }, [])
    useEffect((id) => {
        getDocs(query(collection(db, "location-time"), where('renterEmail', '==', userRenterEmail)))
            .then(docSnap => {
                let users = [];
                docSnap.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id })
                });
                setDates(users[0].datePick)
                setDateDrop(users[0].dateDrop)
                setTime(users[0].timePick)
                setTimeDrop(users[0].timeDrop)
                onChangecountDate(parseInt(users[0].dateDrop.slice(8, 10)) - parseInt(users[0].datePick.slice(8, 10)))
                console.log(parseInt(users[0].dateDrop.slice(8, 10)) - parseInt(users[0].datePick.slice(8, 10)))
                console.log("Doc:", users[0].datePick);
                console.log("Doc:", users[0].id);
            }).catch((error) => {
                // The write failed...
                alert(error);
            });

    }, [])
    useEffect((id) => {
        getDocs(query(collection(db, "MakeInvoice"), where('Rentermail', '==', userRenterEmail)))
            .then(docSnap => {
                let users = [];
                docSnap.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id })
                });
                //   setIdInvoice(users[0].id) vec

                setTotal(users[0].total)

                console.log("Doc:", users[0].vehicle);

            }).catch((error) => {

                alert(error);
            });
    }, [])
    useEffect((id) => {
        getDoc(doc(db, "vehicleDetails", vehicleId))
            .then(docData => {
                if (docData.exists()) {
                    console.log("s")
                    onChangemodel(docData.data().model);
                    onChangebrand(docData.data().brand);
                    onChangeos(docData.data().os);
                    onChangeseats(docData.data().seats);
                    onChangesize(docData.data().size);
                    onChangevehicleType(docData.data().type)
                    onChangenumber(docData.data().number)

                }
            }).catch((error) => {

                // alert(error);
            });
    }, [])

    const [disable, setDisable] = useState(false)

    const mud = () => {
        setDisable(!disable)
    }


    return (


        <ScrollView style={styles.container}>

            <View style={{ flexDirection: "row", justifyContent: "center", paddingTop: 10, marginBottom: 15, textAlign: "center" }}>
                <View style={{ width: 100, height: 4, backgroundColor: "white", position: "absolute", top: 40 }}></View>
                <TouchableOpacity style={{ width: 40, textAlign: "center", margin: 10, height: 40, borderRadius: 360, padding: 10, backgroundColor: disable ? '#FBE0AB' : '#F3C623' }} ><Text style={{ textAlign: "center" }}>1</Text></TouchableOpacity>
                <TouchableOpacity style={{ width: 40, textAlign: "center", margin: 10, height: 40, borderRadius: 360, padding: 10, backgroundColor: '#FBE0AB', }} setDisable={disable}><Text Text style={{ textAlign: "center" }}>2</Text></TouchableOpacity>
                <TouchableOpacity style={{ width: 40, textAlign: "center", margin: 10, height: 40, borderRadius: 360, padding: 10, backgroundColor: "#FBE0AB" }} ><Text style={{ textAlign: "center" }}>3</Text></TouchableOpacity>
            </View>

            <View style={styles.view}>

                <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", padding: 20 }}>สัญญาเช่ายานพาหนะ</Text>
                <Text style={{ fontWeight: "bold", paddingTop: 10 }}>ข้อที่ ๑ ข้อมูลผู้เช่ายานพาหนะ</Text>
                <Text>
                    {" "}           สัญญาฉบับนี้ทำขึ้น เมื่อวันที่ {date}   ซึ่งต่อไปนี้สัญญานี้เรียกว่า "ผู้เช่า" ฝ่ายหนึ่ง
                    {"\n"}
                    {"\n"} ชื่อ {firstname} นามสกุล {lastname}
                    {"\n"}
                    {"\n"}อยู่บ้านเลขที่ {num} ถนน {street} ตำบล/แขวง {tumbon} อำเภอ/เขต {amphoe} จังหวัด{province}  รหัสไปรษณีย์ {postal}
                    {"\n"}ผู้ถือบัตรประจำตัวประชาชนเลขที่ {passport}

                    {"\n"}(ดังที่ได้ปรากฏตามสำเนาบัตรประจำตัวประชาชนแนบท้ายสัญญานี้) ซึ่งต่อไปในสัญญานี้เรียกว่า “ผู้ให้เช่า” อีกฝ่ายหนึ่ง คู่สัญญาได้ตกลงกันมีข้อความดังต่อไปนี้
                </Text>
            </View>
            <View style={styles.view}>
                <Text style={{ fontWeight: "bold", marginTop: 10 }}>ข้อ ๒	ข้อตกลงเช่า</Text>

                <Text>
                    {" "}           ผู้เช่าตกลงเช่า และผู้ให้เช่าตกลงให้เช่ายานพาหนะ ประเภท {vehicleType} ยี่ห้อ {brand} รุ่น {model} ขนาดเครื่องยนต์ {size} ซึ่งต่อไป ในสัญญานี้เรียกว่า “ยานพาหนะที่เช่า” จำนวน {number} คัน เพื่อใช้ในกิจการของผู้เช่า
                    การเช่ารถยนต์ตามวรรคหนึ่งมีกำหนดระยะเวลา {countDate} วัน นับตั้งแต่วันที่ {dates} ถึงวันที่ {dateDrop}
                </Text>

                <Text>
                    {"\n"}          ผู้ให้เช่ารับรองว่ายานพาหนะที่เช่าตามสัญญานี้เป็นยานพาหนะมีคุณสมบัติ คุณภาพสมบูรณ์ และลักษณะตรงตามข้อมูลที่ให้
                    ทุกประการผู้ให้เช่าได้ชำระภาษีอากร ค่าธรรมเนียมอื่นใด ครบถ้วนถูกต้องตามกฎหมายแล้ว
                    ผู้ให้เช่ามีสิทธินำมาให้เช่าโดยปราศจากการรอนสิทธิและยานพาหนะ์ที่เช่ามีอุปกรณ์และเครื่องมือประจำยานพาหนะ
                    ตามมาตรฐานของผู้ผลิตยานพาหนะที่เช่า และตามความต้องการของผู้เช่าโดยครบถ้วน และผู้ให้เช่าได้ตรวจสอบแล้วว่ายานพาหนะที่เช่า
                    ตลอดจนอุปกรณ์ทั้งปวงปราศจากความชำรุดบกพร่อง

                    {"\n"}          สัญญานี้มีผลบังคับใช้ตั้งแต่วันที่ลงนามในสัญญาแต่การคำนวณค่าเช่า
                    สำหรับยานพาหนะที่เช่า แต่ละคันให้เริ่มนับตั้งแต่วันที่ผู้เช่าได้รับมอบ
                    ยานพาหนะที่เช่าคันนั้น ๆ ไว้เป็นที่เรียบร้อยแล้ว
                </Text>
            </View>
            <View style={styles.view}>
                <Text style={{ fontWeight: "bold", marginTop: 10 }}>ข้อ ๓ ค่าเช่ายานพาหนะ</Text>

                <Text>
                    {" "}           ผู้เช่าตกลงชำระค่าเช่าให้แก่ผู้ให้เช่าเป็นรายวัน อัตราค่าเช่าตลอดทั้งการเช่ายานพาหนะ
                    ต่อยานพาหนะที่เช่าหนึ่งคันซึ่งเป็นจำนวน {total} ซึ่งรวมภาษีมูลค่าเพิ่ม ภาษีอากรอื่น ๆ ค่าใช้จ่ายในการบำรุงรักษา ค่าภาษยานพาหนะ ค่าใช้จ่ายในการจัดทำประกันภัยยานพาหนะที่เช่า
                    ค่าตรวจสภาพ ค่าอะไหล่สิ้นเปลือง ค่าน้ำมันหล่อลื่นทุกชนิด ค่าซ่อมแซมยานพาหนะในการใช้งานตามปกติ และค่าใช้จ่ายอื่น ๆ ไว้ด้วยแล้ว ส่วนค่าน้ำมันเชื้อเพลิงที่ใช้ผู้เช่าเป็นผู้รับผิดชอบ
                </Text>
            </View>
            <View style={{ justifyContent: "center", alignContent: "center", marginBottom: 10, alignItems: "center" }} >
                <TouchableOpacity
                    style={{ textAlign: "center", justifyContent: "center", padding: 10, borderRadius: 20, margin: 20, width: 150, backgroundColor: "#D58C00" }}

                    onPress={(text) => {
                        navigation.navigate('Contract page 2', { uEmail: userRenterEmail, RentalEmail: rentalEmail, VId: vehicleId, UId: uID }, mud)

                    }}>
                    <Text style={{ textAlign: "center" }}>Next</Text>
                </TouchableOpacity>

            </View>

        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2D2B29",
        padding: 15,
    },
    // pic1: { width: 100, height: 120, zIndex: -1, position: "", top: -10, },
    // pic2: { width: 100, height: 260, zIndex: -1, position: "", left: 60,},
    view: {
        width: 350,
        // height:1490,
        borderRadius: 20,

        backgroundColor: "#ffffff",
        alignSelf: "center",
        padding: 30, marginBottom: 20
    },
    textinput: {
        borderRadius: 15,
        borderColor: "gray",
        borderWidth: 1,
        width: 80,
        textAlign: "center"
    },
    textinput: {
        borderRadius: 15,
        borderColor: "gray",
        borderWidth: 1,
        width: 100,
        textAlign: "center"
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
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
        borderRadius: 4,
        padding: 10,
        textAlign: "center"
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

export default MakeContract;
