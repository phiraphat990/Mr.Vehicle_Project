import React, { useState } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import CheckBox from "expo-checkbox";

const CancelContract = (props) => {
    const [isSelected, setSelection] = useState(false); //checkbox
    const [firstName, setsetFirstName] = useState("");//ชื่อ
    const [lastName, setLastName] = useState("");//นามสกุล
    const [days, setDays] = useState("");//วันที่
    const [mounts, setMounts] = useState("");//เดือน
    const [years, setYears] = useState("");//ปี
    const [houseId, setHouseId] = useState("");//บ้านเลขที่
    const [roadName, setRoadName] = useState("");//ถนน
    const [tumbon, setTumbon] = useState("");//ตำบล
    const [aumper, setUmper] = useState("");//อำเภอ
    const [jungwat, setJungwat] = useState("");//จังหวัด
    const [postId, setPostId] = useState("");//รหัสไปรษณีย์
    const [id, setId] = useState("");//เลขบัตรปปช.

    const [bran, setBarn] = useState("");//ยี่ห้อ
    const [run, setRun] = useState("");//รุ่น
    const [max, setMax] = useState("");//ขนาดเครื่องยนต์
    const [count, setCount] = useState("");//จำนวน

    const [countDay, setCountDay] = useState("");//จำนวนวัน
    const [newDays, setNewDays] = useState("");//วันใหม่
    const [newMount, setNewMount] = useState("");//วันใหม่
    const [newYear, setNewYear] = useState("");//วันใหม่

    const [newDays_2, setNewDays_2] = useState("");//วันใหม่
    const [newMount_2, setNewMount_2] = useState("");//วันใหม่
    const [newYear_2, setNewYear_2] = useState("");//วันใหม่

    const [money, setMoney] = useState("");//จำนวนเงิน

    return (
        <ScrollView style={styles.container}>
            <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", padding: 20 }}>ยกเลิกสัญญาเช่ายานพาหนะ</Text>

            <View style={styles.view}>
                <Text style={{ fontWeight: "bold",paddingTop:10 }}>ข้อที่ ๑ ข้อมูลผู้เช่ายานพาหนะ</Text>
                <Text>สัญญาฉบับนี้ทำขึ้น เมื่อวันที่ <View><TextInput style={styles.textinput} /></View>เดือน <View><TextInput style={styles.textinput} /></View>พ.ศ. <View><TextInput style={styles.textinput} /></View>
                    ซึ่งต่อไปนี้สัญญานี้เรียกว่า "ผู้เช่า" ฝ่ายหนึ่ง ชื่อ <View><TextInput style={styles.textinput} /></View> นามสกุล<View><TextInput style={styles.textinput} /></View>
                    อยู่บ้านเลขที่ <View><TextInput style={styles.textinput} /></View> ถนน <View><TextInput style={styles.textinput} /></View> ตำบล/แขวง <View><TextInput style={styles.textinput} /></View>
                    อำเภอ/เขต <View><TextInput style={styles.textinput} /></View> จังหวัด <View><TextInput style={styles.textinput} /></View>  รหัสไปรษณีย์ <View><TextInput style={styles.textinput} /></View>
                    ผู้ถือบัตรประจำตัวประชาชนเลขที่ <View><TextInput style={styles.textinput} /></View> (ดังปรากฏตามสำเนาบัตรประจำตัวประชาชนแนบท้ายสัญญานี้)
                    ซึ่งต่อไปในสัญญานี้เรียกว่า “ผู้ให้เช่า” อีกฝ่ายหนึ่ง
                    คู่สัญญาได้ตกลงกันมีข้อความดังต่อไปนี้



                    {"\n"}<Text style={{ fontWeight: "bold" }}>ข้อ ๑	ข้อตกลงเช่า</Text>{"\n"}
                    ผู้เช่าตกลงเช่า และผู้ให้เช่าตกลงให้เช่ายานพาหนะ ประเภท <TextInput />
                    ยี่ห้อ <View><TextInput style={styles.textinput} /></View> รุ่น <View><TextInput style={styles.textinput} /></View> ขนาดเครื่องยนต์ <View><TextInput style={styles.textinput} /></View>
                    ซึ่งต่อไป
                    ในสัญญานี้เรียกว่า “รถยนต์ที่เช่า” จำนวน <View><TextInput style={styles.textinput} /></View> คัน เพื่อใช้ในกิจการของผู้เช่า
                    การเช่ารถยนต์ตามวรรคหนึ่งมีกำหนดระยะเวลา <View><TextInput style={styles.textinput} /></View> วัน นับตั้งแต่วันที่ <View><TextInput style={styles.textinput} /></View> เดือน <View><TextInput style={styles.textinput} /></View> พ.ศ. <View><TextInput style={styles.textinput} /></View>
                    ถึงวันที่ <View><TextInput style={styles.textinput} /></View> เดือน <View><TextInput style={styles.textinput} /></View> พ.ศ. <View><TextInput style={styles.textinput} /></View>

                    ผู้ให้เช่ารับรองว่ายานพาหนะที่เช่าตามสัญญานี้เป็นยานพาหนะมี
                    คุณสมบัติ คุณภาพสมบูรณ์ และลักษณะตรงตามข้อมูลที่ให้ทุกประการ

                    ผู้ให้เช่าได้ชำระภาษีอากร ค่าธรรมเนียมอื่นใด ครบถ้วนถูกต้อง
                    ตามกฎหมายแล้ว ผู้ให้เช่ามีสิทธินำมาให้เช่าโดยปราศจากการรอนสิทธิ
                    และยานพาหนะ์ที่เช่ามีอุปกรณ์และเครื่องมือประจำยานพาหนะ
                    ตามมาตรฐานของผู้ผลิตยานพาหนะที่เช่า และตามความต้องการ
                    ของผู้เช่าโดยครบถ้วน และผู้ให้เช่าได้ตรวจสอบแล้วว่ายานพาหนะที่เช่า
                    ตลอดจนอุปกรณ์ทั้งปวงปราศจากความชำรุดบกพร่อง


                    สัญญานี้มีผลบังคับใช้ตั้งแต่วันที่ลงนามในสัญญาแต่การคำนวณค่าเช่า
                    สำหรับยานพาหนะที่เช่า แต่ละคันให้เริ่มนับตั้งแต่วันที่ผู้เช่าได้รับมอบ
                    ยานพาหนะที่เช่าคันนั้น ๆ ไว้เป็นที่เรียบร้อยแล้ว



                    {"\n"}<Text style={{ fontWeight: "bold" }}>ข้อ ๒ ค่าเช่ายานพาหนะ</Text>{"\n"}
                    ผู้เช่าตกลงชำระค่าเช่าให้แก่ผู้ให้เช่าเป็นรายวัน อัตราค่าเช่าตลอด
                    ทั้งการเช่ายานพาหนะ <View><TextInput style={styles.textinput} /></View> บาท ต่อยานพาหนะที่เช่าหนึ่งคัน
                    ซึ่งรวมภาษีมูลค่าเพิ่ม ภาษีอากรอื่น ๆ ค่าใช้จ่ายในการบำรุงรักษา
                    ค่าภาษยานพาหนะ ค่าใช้จ่ายในการจัดทำประกันภัยยานพาหนะที่เช่า
                    ค่าตรวจสภาพ ค่าอะไหล่สิ้นเปลือง ค่าน้ำมันหล่อลื่นทุกชนิด
                    ค่าซ่อมแซมยานพาหนะในการใช้งานตามปกติ และค่าใช้จ่ายอื่น ๆ
                    ไว้ด้วยแล้ว ส่วนค่าน้ำมันเชื้อเพลิงที่ใช้ผู้เช่าเป็นผู้รับผิดชอบ

                </Text>
            </View>


            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>ข้าพเจ้าต้องการที่จะยกเลิกสัญญา และพร้อมที่จะชดใช้ค่าปรับทั้งหมด</Text>
            </View>



            <View style={styles.btn1}><TouchableOpacity >
                <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styles.text2}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#CCE1F4",
        padding: 15,
    },
    view: {
        // width: 590,
        // height:1490,
        borderRadius: 15,
        borderColor: "black",
        borderWidth: 3,
        backgroundColor: "#ffffff",
        alignSelf: "center",
        padding: 10
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
        color: "black",
        fontWeight: "bold",
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 70,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
        backgroundColor: "#E75656",
        borderRadius: 4,
        padding: 10
    },
    text2: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
        backgroundColor: "#33DB18",
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

export default CancelContract;
