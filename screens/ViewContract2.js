import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from '../database/configdb';

const MakeContract_2 = ({ route, navigation }) => {
    const { uEmail, RentalEmail, VId, UId } = route.params;
    const [userrenterEmail, setUserrenterEmail] = useState(uEmail)

    const [rentalemail, setrenteremail] = useState(RentalEmail)

    const [vehicleId, setVehicleId] = useState(VId)
    const [UserRenterId, setUserRenterId] = useState(UId)
    const [disable, setDisable] = useState(false)
    const [vehicle, setVehicle] = useState("")

    const mud = () => {
        setDisable(!disable)
    }
    useEffect((id) => {
        getDoc(doc(db, "vehicleDetails", vehicleId))
            .then(docData => {
                if (docData.exists()) {

                    setVehicle(docData.data().vehicle)

                }
            }).catch((error) => {
                // The write failed...
                alert(error);
            });
    }, [])
    return (
        <ScrollView style={styles.container}>

            <View style={{ flexDirection: "row", justifyContent: "center", paddingTop: 10, marginBottom: 15, textAlign: "center" }}>
                <View style={{ width: 100, height: 4, backgroundColor: "white", position: "absolute", top: 40 }}></View>
                <TouchableOpacity style={{ width: 40, textAlign: "center", margin: 10, height: 40, borderRadius: 360, padding: 10, backgroundColor: '#FBE0AB' }} ><Text style={{ textAlign: "center" }}>1</Text></TouchableOpacity>
                <TouchableOpacity style={{ width: 40, textAlign: "center", margin: 10, height: 40, borderRadius: 360, padding: 10, backgroundColor: disable ? '#FBE0AB' : '#F3C623' }} setDisable={disable}><Text Text style={{ textAlign: "center" }}>2</Text></TouchableOpacity>
                <TouchableOpacity style={{ width: 40, textAlign: "center", margin: 10, height: 40, borderRadius: 360, padding: 10, backgroundColor: "#FBE0AB" }} ><Text style={{ textAlign: "center" }}>3</Text></TouchableOpacity>
            </View>
            <View style={styles.view}>
                <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", padding: 20 }}>สัญญาเช่ายานพาหนะ</Text>
                <Text style={{ fontWeight: "bold", marginTop: 10 }}>ข้อที่ ๔ การบอกเลิกสัญญา</Text>

                <Text>
                    {" "}           เมื่อครบกำหนดส่งมอบรถยนต์ที่เช่าตามสัญญาแล้ว ถ้าผู้เช่าไม่ส่งมอบยานพาหนะที่เช่า หรือส่งมอบแต่เพียงบางส่วนให้แก่ผู้ให้เช่า หรือส่งมอบยานพาหนะที่เช่าไม่ตรงตามสัญญา
                    หรือมีคุณลักษณะเฉพาะไม่ถูกต้องตามสัญญา หรือส่งมอบแล้วเสร็จภายในกำหนดแต่ไม่สามารถใช้งานได้อย่างมีประสิทธิภาพ หรือใช้งานได้
                    ไม่ครบถ้วนตามสัญญา หรือผู้เช่าไม่ปฏิบัติตามสัญญาข้อใดข้อหนึ่ง ผู้ให้เช่ามีสิทธิบอกเลิกสัญญาทั้งหมด
                    หรือแค่บางส่วนได้

                    ในกรณีที่ผู้เช่าใช้สิทธิบอกเลิกสัญญา ผู้ให้เช่ามีสิทธิริบหรือบังคับจากหลักประกัน
                    เป็นจำนวนเงินทั้งหมดหรือแค่บางส่วนก็ได้แล้วแต่ผู้ให้เช่าจะเห็นสมควร ผู้เช่ายอมรับผิดชดใช้ค่าเช่าที่เพิ่มขึ้นจากค่าเช่าที่กำหนดไว้ในสัญญานี้ รวมทั้งค่าใช้จ่ายใด ๆ ด้วย
                    ในกรณีมีความจำเป็น ผู้เช่ามีสิทธิที่จะบอกเลิกสัญญาเช่านี้ก่อนเริ่มระยะเวลาการเช่าได้
                    โดยแจ้งเป็นข้อความให้ผู้ให้เช่าทราบล่วงหน้าไม่น้อยกว่า 2 วัน โดยผู้ให้เช่าจะไม่มีสิทธิเรียกร้องค่าเสียหายใดๆ จากผู้เช่า หรือถ้าจองแล้วไม่ชำระเงินเกิน 2 วัน จะยึดเงินมัดจำทั้งหมด

                </Text>

            </View>
            <View style={styles.view}>
                <Text style={{ fontWeight: "bold", marginTop: 10 }}>ข้อ ๕ ค่าปรับกรณีส่งมอบช้า</Text>

                <Text>
                    {" "}           ในกรณีที่ผู้ให้เช่าส่งมอบยานพาหนะที่เช่าล่วงเลยกำหนดส่งมอบตามสัญญา
                    ผู้ให้เช่าจะต้องชำระค่าปรับให้ผู้เช่าเป็นรายวัน สำหรับยานพาหนะคันที่ยังไม่ได้ส่งมอบตามสัญญาขึ้นอยู่กับการ กำหนดของร้าน
                    นับถัดจากวันครบกำหนดส่งมอบตามสัญญาจนถึงวันที่ผู้ให้เช่าได้นำยานพาหนะที่เช่ามาส่งมอบให้แก่ผู้เช่าจนถูกต้องครบถ้วน
                    ในระหว่างที่ผู้เช่ายังมิได้ใช้สิทธิบอกเลิกสัญญานั้น หากผู้เช่าเห็นว่าผู้ให้เช่าไม่อาจปฏิบัติ
                    ตามสัญญาต่อไปได้ ผู้เช่าจะใช้สิทธิบอกเลิกสัญญา และริบหรือบังคับจากหลักประกันการปฏิบัติตามสัญญา
                    กับเรียกร้องให้ชดใช้ค่าเช่าที่เพิ่มขึ้นตามที่กำหนดไว้ก็ได้ และถ้าผู้เช่าได้แจ้งข้อเรียกร้องเป็นข้อความให้ชำระค่าปรับไปยังผู้ให้เช่าเมื่อครบกำหนดส่งมอบดังกล่าวแล้วผู้เช่ามีสิทธิที่จะปรับผู้ให้เช่าจนถึง
                    วันบอกเลิกสัญญาได้อีกด้วย</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <TouchableOpacity
                    style={{
                        textAlign: "center", padding: 10, borderRadius: 20, margin: 10, width: 150, backgroundColor: "#FBE0AB", marginBottom: 40, shadowColor: "black",
                        shadowOffset: {
                            width: 0,
                            height: 8,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 16.00,

                        elevation: 14
                    }}

                    onPress={() => {
                        [navigation.goBack(), mud]
                    }}
                >
                    <Text style={{ textAlign: "center" }}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        textAlign: "center", alignItems: "center", marginBottom: 20, padding: 10, marginBottom: 40, borderRadius: 20, margin: 10, width: 150, backgroundColor: "#D58C00", shadowColor: "black",
                        shadowOffset: {
                            width: 0,
                            height: 8,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 16.00,

                        elevation: 14
                    }}

                    onPress={() => {
                        navigation.navigate('Contract page 3', { userEmail: userrenterEmail, rentalEmail: rentalemail, vId: vehicleId, uId: UserRenterId }, mud)

                    }}>
                    <Text style={styles.but}>Next</Text>
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
    view: {
        width: 350,
        // height:1490,
        borderRadius: 20,

        backgroundColor: "#ffffff",
        alignSelf: "center",
        padding: 30, marginBottom: 20
    },
    textinput: {
        borderRadius: 4,
        borderColor: "black",
        borderWidth: 1,
        height: 17,
        width: 80,
        alignSelf: "center",
    },
    btn1: {
        marginBottom: 20,
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
        padding: 10
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

export default MakeContract_2;
