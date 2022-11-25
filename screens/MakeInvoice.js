import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { ScrollView, } from "react-native-gesture-handler";
import { DataTable } from 'react-native-paper';
import Dropdown from 'react-dropdown';
import { collection, doc, addDoc, updateDoc, getDoc, onSnapshot, getDocs, query, where } from "firebase/firestore";
import { db } from "../database/configdb"
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const MakeInvoice = ({ route, navigation }) => {
    const { userRenterEmail, confirm, vehicleId } = route.params;

    const [p1, setP1] = useState(false);
    const [p2, setP2] = useState(false);
    const [p3, setP3] = useState(false);
    const [p4, setP4] = useState(false);
    const [p5, setP5] = useState(false);

    const [isEditable, setisEditable] = useState(false); //Textinput
    const [isEditable2, setisEditable2] = useState(false); //Textinput
    const [isEditable3, setisEditable3] = useState(false); //Textinput
    const [isEditable4, setisEditable4] = useState(false); //Textinput
    const [isEditable5, setisEditable5] = useState(false); //Textinput
    const [editBtn, setEditBtn] = useState(false); //Textinput

    const [vId, onchangevId] = useState(vehicleId); //Textinput
    const [conFirm, onchangeconFirm] = useState(confirm); //Textinput
    const [rentalEmail, onchangeRentalEmail] = useState(""); //Textinput
    const [confirmButton, setconfirmButton] = useState(false); //Textinput
    const [firstname, onChangeFirstname] = React.useState("");
    const [lastname, onChangeLastname] = React.useState("");
    const [Id, setId] = React.useState("");
    const [IdInvoice, setIdInvoice] = React.useState("");

    const [renteremail, setEmail] = React.useState(userRenterEmail);
    const [deposit, setDeposit] = useState(0);//มัดจำ
    const [insurance, setInsurance] = useState(0);//ประกัน
    const [fine, setFine] = useState(0);//ค่าปรับ
    const [other, setOther] = useState(0);//อื่นๆ
    const [vehicle, setVehicle] = React.useState(22)
    const [beforeTax, setBeforeTax] = useState("0");//ก่อนภาษี
    const [tax, settax] = useState("0");//หลังภาษี
    const [total, setTotal] = useState("0");//รวมทั้งหมด

    const [Paid, setPaid] = useState("");
    const [IdContract, setIdContract] = useState("");

    const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
    const [dates, setDates] = React.useState(new Date().toISOString().slice(0, 10));
    const [time, setTime] = React.useState(new Date(Date.now()).toISOString().slice(0, 5));
    const [dateDrop, setDateDrop] = React.useState(new Date().toISOString().slice(0, 10));
    const [timeDrop, setTimeDrop] = React.useState(new Date(Date.now()).toISOString().slice(0, 5));
    const [countDate, onChangecountDate] = React.useState("");


    const [imageInvoice, setImageInvoice] = useState(null);//รูปสลิป

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
            setImageInvoice(result.uri)
        }
    };//image


    const reset = () => {
        setBeforeTax(0)
        setDeposit(0),
            setFine(0),
            setOther(0),
            settax(0),
            setVehicle(0),
            setInsurance(0),
            setTotal(0)
    }//reset vec
    const deposit_edit = () => {
        setisEditable(!isEditable);
        setP1(true);
    }
    const deposit_can = () => {
        setisEditable(!isEditable);
        setP1(false);

    }
    const deposit_save = () => {
        setisEditable(!isEditable);
        setP1(false);
    };//มัดจำ

    const vehicle_edit = () => {
        setisEditable2(!isEditable2);
        setP2(true);
    }
    const vehicle_can = () => {
        setisEditable2(!isEditable2);
        setP2(false);

    }
    const vehicle_save = () => {
        setisEditable2(!isEditable2);
        setP2(false);
    };//ค่าเช่ายานพาหนะ

    const insurance_edit = () => {
        setisEditable3(!isEditable3);
        setP3(true);
    }
    const insurance_can = () => {
        setisEditable3(!isEditable3);
        setP3(false);

    }
    const insurance_save = () => {
        setisEditable3(!isEditable3);
        setP3(false);
    };//ค่าประกัน

    const fine_edit = () => {
        setisEditable4(!isEditable4);
        setP4(true);
    }
    const fine_can = () => {
        setisEditable4(!isEditable4);
        setP4(false);

    }
    const fine_save = () => {
        setisEditable4(!isEditable4);
        setP4(false);
    };//ค่าปรับ

    const other_edit = () => {
        setisEditable5(!isEditable5);
        setP5(true);
    }
    const other_can = () => {
        setisEditable5(!isEditable5);
        setP5(false);

    }
    const other_save = () => {
        setisEditable5(!isEditable5);
        setP5(false);
    };//ค่าอื่นๆ

    const hi = () => {
        setconfirmButton(true);
    };//ค่าอื่นๆ

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

                //console.log("Doc:", users[0].email);
                // console.log("Doc:", users[0].id);
            }).catch((error) => {
                // The write failed... imageinvoice
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

                setDeposit(users[0].deposit)
                setVehicle(users[0].vehicle)
                setInsurance(users[0].insurance)
                setFine(users[0].fine)
                setOther(users[0].other)
                console.log("Doc:", users[0].id, users[0].insurance);

            }).catch((error) => {

                alert(error);
            });
    }, [])

    // contract
    useEffect((id) => {
        getDocs(query(collection(db, "contract"), where('renterEmail', '==', userRenterEmail)))
            .then(docSnap => {
                let users = [];
                docSnap.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id })
                });
                setconfirmButton(users[0].confirmpay)
                setPaid(users[0].paid)
                setIdContract(users[0].id)
            }).catch((error) => {
                // The write failed... vId
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
                console.log("Time", users[0].datePick)
            }).catch((error) => {
                // The write failed... vec
                alert(error);
            });

    }, [])


    return (
        <ScrollView style={styles.container}>
            <View style={styles.view}>

                <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", backgroundColor: "#FBE0AB", width: 200, height: 50, padding: 10, alignSelf: "center", marginBottom: 20, borderRadius: 20 }}>ใบแจ้งหนี้</Text>
                <Text>ชื่อ <Text style={{ fontWeight: "600" }}>{firstname}</Text> นามสกุล  <Text style={{ fontWeight: "600" }}>{lastname}</Text>
                    {"\n"}การเช่ายานพาหนะกำหนดระยะเวลา  <Text style={{ fontWeight: "600" }}>{countDate}</Text> วัน
                    {"\n"}นับตั้งแต่วันที่ <Text style={{ fontWeight: "600" }}>{dates}</Text> ถึงวันที่ <Text style={{ fontWeight: "600" }}>{dateDrop}</Text>
                </Text>
            </View>
            <DataTable style={styles.view2}>
                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell style={{ paddingLeft: 37 }}>รายการ</DataTable.Cell>
                    <DataTable.Cell style={{ borderLeftWidth: 2, justifyContent: "flex-end" }}>จำนวนเงิน (บาท)</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell >ค่ามัดจำ</DataTable.Cell>
                    <View style={styles.btn2}>

                        {confirmButton == true ? p1 == true ?
                            [
                                <TouchableOpacity >
                                    <Text style={styles.text4}
                                        onPress={deposit_can} >Cancel</Text>
                                </TouchableOpacity>
                                ,
                                <TouchableOpacity >
                                    <Text style={styles.text5}
                                        onPress={() => { deposit_save(); }}>Save</Text>
                                </TouchableOpacity>
                            ] :
                            <TouchableOpacity  >
                                <Text style={styles.text3}
                                    onPress={deposit_edit}>          </Text>
                            </TouchableOpacity> : ""
                        }
                    </View>
                    <DataTable.Cell style={{ borderLeftWidth: 2, justifyContent: "flex-end" }} >
                        <View>
                            <TextInput style={[styles.textinput, { backgroundColor: "white" }]}
                                editable={isEditable} value={deposit} onChangeText={text => setDeposit(text)} />
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell >ค่าเช่ายานพาหนะ</DataTable.Cell>
                    <View style={styles.btn2}>
                        {confirmButton == true ? p2 == true ?
                            [
                                <TouchableOpacity >
                                    <Text style={styles.text4}
                                        onPress={vehicle_can}>Cancel</Text>
                                </TouchableOpacity>
                                ,
                                <TouchableOpacity >
                                    <Text style={styles.text5}
                                        onPress={() => { vehicle_save(); }}>Save</Text>
                                </TouchableOpacity>
                            ] :
                            <TouchableOpacity  >
                                <Text style={styles.text3}
                                    onPress={vehicle_edit} >          </Text>
                            </TouchableOpacity> : ""
                        }
                    </View>
                    <DataTable.Cell style={{ borderLeftWidth: 2, justifyContent: "flex-end" }} >
                        <Text>{setVehicle}</Text>
                        <View>
                            <TextInput style={[styles.textinput, { backgroundColor: "white" }]}
                                editable={isEditable} value={vehicle} onChangeText={(text) => setVehicle(text)} />
                        </View>

                    </DataTable.Cell>
                </DataTable.Row>
                {/* vehicle vec*/}
                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell >ค่าประกัน</DataTable.Cell>
                    <View style={styles.btn2}>
                        {confirmButton == true ? p3 == true ?
                            [
                                <TouchableOpacity  >
                                    <Text style={styles.text4}
                                        onPress={insurance_can}>Cancel</Text>
                                </TouchableOpacity>
                                ,
                                <TouchableOpacity >
                                    <Text style={styles.text5}
                                        onPress={() => { insurance_save(); }}>Save</Text>
                                </TouchableOpacity>
                            ] :
                            <TouchableOpacity  >
                                <Text style={styles.text3}
                                    onPress={insurance_edit}>          </Text>
                            </TouchableOpacity> : ""
                        }
                    </View>
                    <DataTable.Cell style={{ borderLeftWidth: 2, justifyContent: "flex-end" }} >
                        <View>
                            <TextInput style={[styles.textinput, { backgroundColor: "white" }]}
                                editable={isEditable} value={insurance} onChangeText={text => setInsurance(text)} />
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell >ค่าปรับ ค่าเสียหาย</DataTable.Cell>
                    <View style={styles.btn2}>
                        {confirmButton == true ? p4 == true ?
                            [
                                <TouchableOpacity  >
                                    <Text style={styles.text4}
                                        onPress={fine_can}>Cancel</Text>
                                </TouchableOpacity>
                                ,
                                <TouchableOpacity >
                                    <Text style={styles.text5}
                                        onPress={() => { fine_save(); }}>Save</Text>
                                </TouchableOpacity>
                            ] :
                            <TouchableOpacity  >
                                <Text style={styles.text3}
                                    onPress={fine_edit} >          </Text>
                            </TouchableOpacity> : ""
                        }
                    </View>
                    <DataTable.Cell style={{ borderLeftWidth: 2, justifyContent: "flex-end" }} >
                        <View>
                            <TextInput style={[styles.textinput, { backgroundColor: "white" }]}
                                editable={isEditable} value={fine} onChangeText={text => setFine(text)} />
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell >อื่น ๆ</DataTable.Cell>
                    <View style={styles.btn2}>
                        {confirmButton == true ? p5 == true ?
                            [
                                <TouchableOpacity  >
                                    <Text style={styles.text4}
                                        onPress={other_can}>Cancel</Text>
                                </TouchableOpacity>
                                ,
                                <TouchableOpacity >
                                    <Text style={styles.text5}
                                        onPress={() => { other_save(); }}>Save</Text>
                                </TouchableOpacity>
                            ] :
                            <TouchableOpacity  >
                                <Text style={styles.text3}
                                    onPress={other_edit}   >          </Text>
                            </TouchableOpacity> : ""
                        }
                    </View>
                    <DataTable.Cell style={{ borderLeftWidth: 2, justifyContent: "flex-end" }} >
                        <View>

                            <TextInput style={[styles.textinput, { backgroundColor: "white" }]}
                                editable={isEditable} value={other} onChangeText={text => setOther(text)} />

                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={[styles.tableHeader,]}>
                    <DataTable.Cell style={{ borderRightWidth: 2, paddingRight: 37 }}>เงินรวมก่อนภาษี</DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: "flex-end" }} >
                        <View>
                            <TextInput style={[styles.textinput, { backgroundColor: '' },]}
                                editable={isEditable} value={(parseInt(deposit) + parseInt(fine) + parseInt(insurance)
                                    + parseInt(other) + parseInt(vehicle)).toFixed(2)} />
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell style={{ borderRightWidth: 2, paddingRight: 37 }}>ภาษีมูลค่าเพิ่ม 7 %</DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: "flex-end" }}>
                        <View>
                            <TextInput style={[styles.textinput, { backgroundColor: '' }]}
                                editable={isEditable} value={((parseInt(deposit) + parseInt(fine) + parseInt(insurance)
                                    + parseInt(other) + parseInt(vehicle)) * 0.07).toFixed(2)} onChangeText={text => settax(text)} />
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader2}>
                    <DataTable.Cell style={{ borderRightWidth: 2, paddingRight: 37 }}>รวมสุทธิ</DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: "flex-end" }}>
                        <View>
                            <TextInput style={[styles.textinput, { backgroundColor: '' }]}
                                editable={isEditable} value={((parseInt(deposit) + parseInt(fine) + parseInt(insurance) + parseInt(other) + parseInt(vehicle)) * 0.07
                                    + (parseInt(deposit) + parseInt(fine) + parseInt(insurance) + parseInt(other) + parseInt(vehicle))).toFixed(2)} onChangeText={text => setTotal(text)} />
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>


            </DataTable>
            <View style={styles.view3}>
                <View style={{ borderRadius: 30, marginLeft: 15, marginBottom: 15, padding: 5, backgroundColor: "#FBE0AB", alignSelf: "flex-start", marginTop: 10 }}>
                    <Text style={[, { marginBottom: 15, alignContent: "center", alignItems: "center", textAlign: "center" }]}>หลักฐานการชำระเงิน <FontAwesome5 name="user-circle" size={22} color="black" /></Text>
                </View>
                <Text style={{ marginLeft: 15, fontWeight: "bold", marginBottom: 15 }}> รูปสลิปธนาคาร </Text>
                <View style={{ borderWidth: 1, width: 300, height: 300, borderRadius: 10 }}>
                    {imageInvoice && <Image source={{ uri: imageInvoice }} style={{ width: 300, height: 300, borderRadius: 10 }} />}
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
                        PickImage()
                    }}>
                    <Text style={{ textAlign: "center" }}>แนบสลิปธนาคาร</Text>
                </TouchableOpacity>
            </View>


            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", textAlign: "center", marginBottom: 20 }}>
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

                    onPress={() =>
                        navigation.navigate('MAIN', { Email: userRenterEmail })
                    }
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
                       navigation.navigate('MAIN', { Email: userRenterEmail });
                        // updateDoc(doc(db, "vehicleDetails", vehicleId), {
                        //    usedStatus: true
                        // })
                        updateDoc(doc(db, "contract", IdContract), {
                            invoicePic: imageInvoice,
                            paid: "waiting"
                        })
                    }}>
                    <Text style={styles.but}>Confirm</Text>
                </TouchableOpacity>
            </View>

        </ScrollView >

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2D2B29",
        padding: 15, paddingTop: 40
    },
    view: {

        // height:1490,
        borderRadius: 20,

        backgroundColor: "#F3C623",

        padding: 30, marginBottom: 20
    }, view2: {
        // width: 350,
        // height:1490,
        borderRadius: 20,
        backgroundColor: "#fff",
        alignSelf: "center",
        marginBottom: 20
    },
    view3: {
        backgroundColor: "#F3C623", alignItems: "center",
        // height:1490,
        borderRadius: 30,
        width: 330,
        alignSelf: "center",
        marginBottom: 20
    },
    textinput: {
        borderRadius: 360,
        borderWidth: 1,
        height: 30,
        width: 100,
        textAlign: "center",
        color: "black"
    },
    textinput2: {
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: "center",
    },
    btn1: {
        color: "black",
        fontWeight: "bold",
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 70,
        paddingTop: 30,
        paddingBottom: 50
    },
    btn2: {
        justifyContent: "center",
        marginRight: 3
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

    tableHeader: {
        borderWidth: 1,
        borderRightWidth: 1
    },
    tableHeader2: {
        borderWidth: 1,
        borderBottomColor: "black",
        borderBottomWidth: 1,
    }
});

export default MakeInvoice;
