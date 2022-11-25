import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

const Filter = ({ setFilter },) => {
    {/**โซนของค่า CheckBox*/ }
    const [checkBoxCar, setCheckBoxCar] = useState(false);
    const [checkBoxMotor, setCheckBoxMotor] = useState(false);
    const [checkBoxBysicle, setCheckBoxBysicle] = useState(false);
    const [checkBoxAuto, setCheckBoxAuto] = useState(false);
    const [checkBoxManual, setCheckBoxManual] = useState(false);
    const [sizeSmall, setSizeSmall] = useState(false);
    const [sizeMedium, setSizeMedium] = useState(false);
    const [sizeBig, setSizeBig] = useState(false);

    const [isSelectVehicle, setIsSelectVehicle] = useState(false)
    const [isSelectOS, setIsSelectOS] = useState(false)
    const [isSelectSize, setIsSelectSize] = useState(false)

    //กดปุ่มที่ถูกเลือกไปแล้วเพื่อยกเลิก
    {/**ฟังก์ชันใหญ่*/ }
    // condition=เป้าหมายการทำงาน, returnVar=แสดงผลว่าทำอะไร isType=แยกระหว่างโซน 1 กับ 3
    const ifChangeVar = (condition, var1, var2, var3, isSelectVar, returnVar, isType) => {
        if (condition == 'firstClick') {
            if (isType == 'Type') {
                setCheckBoxCar(var1)
                setCheckBoxMotor(var2)
                setCheckBoxBysicle(var3)
                setIsSelectVehicle(isSelectVar)
                console.log('vehicleType:', returnVar)
            } else if (isType == 'OS') {
                setCheckBoxAuto(var1)
                setCheckBoxManual(var2)
                setIsSelectOS(isSelectVar)
                console.log('vehicleOS:', returnVar)
            } else {
                setSizeSmall(var1);
                setSizeMedium(var2);
                setSizeBig(var3);
                setIsSelectSize(isSelectVar)
                console.log(returnVar)
            }
        } else if (condition == 'changeChoice') {
            if (isType == 'Type') {
                setCheckBoxCar(var1)
                setCheckBoxMotor(var2)
                setCheckBoxBysicle(var3)
                setIsSelectVehicle(isSelectVar)
                console.log('สถานะ:', returnVar)
            } else if (isType == 'OS') {
                setCheckBoxAuto(var1)
                setCheckBoxManual(var2)
                setIsSelectOS(isSelectVar)
                console.log(returnVar)
            } else {
                setSizeSmall(var1)
                setSizeMedium(var2)
                setSizeBig(var3)
                setIsSelectSize(isSelectVar)
                console.log('ขนาด: ', returnVar)
            }
        } else if (condition == 'cancel') {
            if (isType == 'Type') {
                setCheckBoxCar(var1)
                setCheckBoxMotor(var1)
                setCheckBoxBysicle(var1)
                setIsSelectVehicle(isSelectVar)
                console.log(returnVar)
            }
            else if (isType == 'OS') {
                setCheckBoxAuto(var1)
                setCheckBoxManual(var1)
                setIsSelectOS(isSelectVar)
                console.log(returnVar)
            }
            else {
                setSizeSmall(var1)
                setSizeMedium(var1)
                setSizeBig(var1)
                setIsSelectSize(isSelectVar)
                console.log(returnVar)
            }
        }
    }
    {/**จับ Case แล้วส่งค่าไปที่ ifChangeVar */ }
    const isType = (input, check) => {
        if (input == 1) {
            ifChangeVar('firstClick', true, false, false, true, 'รถยนต์', 'Type')
        }
        else if (input == 2) {
            ifChangeVar('firstClick', false, true, false, true, 'รถจักรยานยนต์', 'Type')
        }
        else if (input == 3) {
            ifChangeVar('firstClick', false, false, true, true, 'จักรยาน', 'Type')
        }
        //เปลี่ยนใจเลือกช้อย
        if (input == 'close' && check == 1) {
            if (checkBoxCar) {
                ifChangeVar('cancel', false, false, false, false, 'ยกเลิกการเลือก', 'Type')
            }
            else {
                ifChangeVar('changeChoice', true, false, false, true, 'เปลี่ยนใจไปเลือกรถยนต์', 'Type')
            }
        } else if (input == 'close' && check == 2) {
            if (checkBoxMotor) {
                ifChangeVar('cancel', false, false, false, false, 'ยกเลิกการเลือก', 'Type')
            }
            else {
                ifChangeVar('changeChoice', false, true, false, true, 'เปลี่ยนใจไปจักรยานยนต์', 'Type')
            }
        } else if (input == 'close' && check == 3) {
            if (checkBoxBysicle) {
                ifChangeVar('cancel', false, false, false, false, 'ยกเลิกการเลือก', 'Type')
            }
            else {
                ifChangeVar('changeChoice', false, false, true, true, 'เปลี่ยนใจไปจักรยาน', 'Type')
            }
        }

    }
    const isOS = (input, check) => {
        if (input == 1) {
            ifChangeVar('firstClick', true, false, false, true, 'ระบบ: Auto', 'OS')
        }
        else if (input == 2) {
            ifChangeVar('firstClick', false, true, false, true, 'ระบบ: Manual', 'OS')
        }
        //เปลี่ยนใจเลือกช้อย
        if (input == 'close' && check == 1) {
            if (checkBoxAuto) {
                ifChangeVar('cancel', false, false, false, false, 'ยกเลิกการเลือก OS', 'OS')
            }
            else {
                ifChangeVar('changeChoice', true, false, false, true, 'เปลี่ยนใจเป็น Auto', 'OS')
            }
        } else if (input == 'close' && check == 2) {
            if (checkBoxManual) {
                ifChangeVar('cancel', false, false, false, false, 'ยกเลิกการเลือก OS', 'OS')
            }
            else {
                ifChangeVar('changeChoice', false, true, false, true, 'เปลี่ยนใจเป็น Manual', 'OS')
            }
        }
    }
    const isSize = (input, check) => {
        if (input == 1) {
            ifChangeVar('firstClick', true, false, false, true, 'เลือกขนาดเล็ก', 'Size')
        }
        else if (input == 2) {
            ifChangeVar('firstClick', false, true, false, true, 'เลือกขนาดกลาง', 'Size')
        }
        else if (input == 3) {
            ifChangeVar('firstClick', false, false, true, true, 'เลือกขนาดใหญ่', 'Size')
        }
        if (input == 'close' && check == 1) {
            if (sizeSmall) {
                ifChangeVar('cancel', false, false, false, false, 'ยกเลิกการเลือก', 'Size')
            }
            else {
                ifChangeVar('changeChoice', true, false, false, true, 'เปลี่ยนใจไปเป็นขนาดเล็ก', 'Size')
            }
        } else if (input == 'close' && check == 2) {
            if (sizeMedium) {
                ifChangeVar('cancel', false, false, false, false, 'ยกเลิกการเลือก', 'Size')
            }
            else {
                ifChangeVar('changeChoice', false, true, false, true, 'เปลี่ยนใจไปเป็นขนาดกลาง', 'Size')
            }
        } else if (input == 'close' && check == 3) {
            if (sizeBig == true) {
                ifChangeVar('cancel', false, false, false, false, 'ยกเลิกการเลือก', 'Size')
            }
            else {
                ifChangeVar('changeChoice', false, false, true, true, 'เปลี่ยนใจไปเป็นขนาดใหญ่', 'Size')
            }
        }


    }
    {/**จบโซนกำหนด CheckBox*/ }

    return (
        <SafeAreaView transparent={true} style={{ flex: 1, backgroundColor: '#000000aa' }}>
            <SafeAreaView style={styles.outBorder}>
                {/**โซน 1 */}
                <View style={[styles.inBorder, { flex: 2 }]}>
                    <View style={[styles.inBorder, { flexDirection: 'row', flex: 1, width: '100%' }]}>
                        <Text style={[styles.headText, { flex: 9 }]}>ประเภทยานพาหนะ</Text>
                        <AntDesign onPress={() => setFilter('close')} name="close" size={24} color="black" style={{ flex: 1, marginRight: '2%' }} />
                    </View>
                    <View style={{ flexDirection: 'row', flex: 2 }}>
                        <View style={[styles.inBorder, { flex: 1 }]}>
                            {/**Mock Up*/}
                            <Checkbox style={styles.checkBox} value={checkBoxCar} onValueChange={() => { isSelectVehicle ? isType('close', 1) : isType(1) }} />
                            <Checkbox style={styles.checkBox} value={checkBoxMotor} onValueChange={() => { isSelectVehicle ? isType('close', 2) : isType(2) }} />
                            <Checkbox style={styles.checkBox} value={checkBoxBysicle} onValueChange={() => { isSelectVehicle ? isType('close', 3) : isType(3) }} />
                        </View>
                        <View style={[styles.inBorder, { flex: 5 }]}>
                            <Text style={[styles.softText, { alignSelf: 'flex-start' }]}>รถยนต์</Text>
                            <Text style={[styles.softText, { alignSelf: 'flex-start' }]}>จักรยานยนต์</Text>
                            <Text style={[styles.softText, { alignSelf: 'flex-start' }]}>จักรยาน</Text>
                        </View>
                    </View>
                </View>
                {/**โซน 2 */}
                <View style={[styles.inBorder, { flex: 1.5 }]}>
                    <View style={[styles.inBorder, { flex: 1 }]}>
                        <Text style={[styles.headText, { alignSelf: 'flex-start' }]}>ระบบ</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1.5 }}>
                        <View style={[styles.inBorder, { flex: 1 }]}>
                            {checkBoxBysicle ? (
                                <Checkbox disabled={true} style={styles.checkBox} value={false} onValueChange={() => { isSelectOS ? isOS('close', 1) : isOS(1) }} />
                            ) : (
                                <Checkbox style={styles.checkBox} value={checkBoxAuto} onValueChange={() => { isSelectOS ? isOS('close', 1) : isOS(1) }} />
                            )}
                            {checkBoxBysicle ? (
                                <Checkbox disabled={true} style={styles.checkBox} value={false} onValueChange={() => { isSelectOS ? isOS('close', 2) : isOS(2) }} />
                            ) : (
                                <Checkbox style={styles.checkBox} value={checkBoxManual} onValueChange={() => { isSelectOS ? isOS('close', 2) : isOS(2) }} />
                            )}
                        </View>
                        <View style={[styles.inBorder, { flex: 5 }]}>
                            {checkBoxCar ? (
                                <Text style={[styles.softText, { alignSelf: 'flex-start' }]}>เกียร์ ออโต้</Text>
                            ) : (
                                <Text style={[styles.softText, { alignSelf: 'flex-start' }]}>ใช้คลัตช์</Text>
                            )}
                            {checkBoxCar ? (
                                <Text style={[styles.softText, { alignSelf: 'flex-start' }]}>เกียร์ กระปุก</Text>
                            ) : (
                                <Text style={[styles.softText, { alignSelf: 'flex-start' }]}>ไม่ใช้คลัตช์</Text>
                            )}
                        </View>
                    </View>
                </View>
                {/**โซน 3 */}
                <View style={[styles.inBorder, { flex: 3 }]}>
                    <View style={[styles.inBorder, { flex: 1 }]}>
                        <Text style={[styles.headText, { alignSelf: 'flex-start' }]}>ขนาด</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 2 }}>
                        <View style={[styles.inBorder, { flex: 1 }]}>
                            <Checkbox style={styles.checkBox} value={sizeSmall} onValueChange={() => { isSelectSize ? isSize('close', 1) : isSize(1) }} />
                            <Checkbox style={styles.checkBox} value={sizeMedium} onValueChange={() => { isSelectSize ? isSize('close', 2) : isSize(2) }} />
                            <Checkbox style={styles.checkBox} value={sizeBig} onValueChange={() => { isSelectSize ? isSize('close', 3) : isSize(3) }} />
                        </View>
                        <View style={[styles.inBorder, { flex: 5 }]}>
                            <Text style={[styles.softText, { alignSelf: 'flex-start' }]}>เล็ก</Text>
                            <Text style={[styles.softText, { alignSelf: 'flex-start' }]}>กลาง</Text>
                            <Text style={[styles.softText, { alignSelf: 'flex-start' }]}>ใหญ่</Text>
                        </View>
                    </View>
                    <View style={[styles.inBorder, { flex: 1 }]}>
                        <TouchableOpacity
                            style={{ backgroundColor: 'white', width: 200, height: 50, borderRadius: 15, borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
                            onPress={() => setFilter(false, checkBoxCar, checkBoxMotor, checkBoxBysicle, checkBoxAuto, checkBoxManual, sizeSmall, sizeMedium, sizeBig)}
                        >
                            <AntDesign name="filter" size={24} color="black" />
                            <Text style={[styles.headText, { alignSelf: 'center' }]}>ยืนยัน</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    outBorder: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        margin: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '0000'
    },
    inBorder: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    headText: {
        fontSize: 20,
        fontWeight: '600',
        marginLeft: '4%'
    },
    softText: {
        fontSize: 20,
        fontWeight: '300',
        marginLeft: '2%'
    },
    checkBox: {
        width: 30,
        height: 30,
        borderColor: 'black',
        borderRadius: 5
    }
})
export default Filter