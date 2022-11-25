import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { ScrollView, } from "react-native-gesture-handler";
import { DataTable } from 'react-native-paper';
import Dropdown from 'react-dropdown';
import { collection, doc, addDoc, updateDoc, getDoc, onSnapshot, getDocs, query, where } from "firebase/firestore";
import { db } from "../database/configdb"
import { useFocusEffect } from "@react-navigation/native";
import { color } from "react-native-reanimated";
import { FontAwesome5 } from '@expo/vector-icons';
const MakeInvoice = ({ route, navigation }) => {
    const { RentalEmail, userRenterEmail, uID, vehicleId } = route.params;

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
    const [isEditable6, setisEditable6] = useState(false); //Textinput


    const [confirmButton, setconfirmButton] = useState(false); //Textinput
    const [firstname, onChangeFirstname] = React.useState("");
    const [lastname, onChangeLastname] = React.useState("");
    const [Id, setId] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [deposit, setDeposit] = useState(0);//มัดจำ
    const [vehicle, setVehicle] = useState(0);//ยานพาหนะ
    const [insurance, setInsurance] = useState(0);//ประกัน
    const [fine, setFine] = useState(0);//ค่าปรับ
    const [other, setOther] = useState(0);//อื่นๆ
    const [beforeTax, setBeforeTax] = useState("0");//ก่อนภาษี
    const [tax, settax] = useState("0");//หลังภาษี
    const [total, setTotal] = useState("0");//รวมทั้งหมด
    const [IdInvoice, setIdInvoice] = useState("");
    const [Paid, setPaid] = useState("");
    const [IdContract, setIdContract] = useState("");


    const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
    const [dates, setDates] = React.useState(new Date().toISOString().slice(0, 10));
    const [time, setTime] = React.useState(new Date(Date.now()).toISOString().slice(0, 5));
    const [dateDrop, setDateDrop] = React.useState(new Date().toISOString().slice(0, 10));
    const [timeDrop, setTimeDrop] = React.useState(new Date(Date.now()).toISOString().slice(0, 5));
    const [countDate, onChangecountDate] = React.useState("");



    const [imageInvoice, setImageInvoice] = useState(null);//รูปสลิป

    const reset = () => {
        setBeforeTax(0)
        setDeposit(0),
            setFine(0),
            setOther(0),
            settax(0),
            setVehicle(0),
            setInsurance(0),
            setTotal(0)
    }//reset
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

                console.log("Doc:", users[0].email);
                console.log("Doc:", users[0].id);
            }).catch((error) => {
                // The write failed...
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

            }).catch((error) => {
                // The write failed...
                alert(error);
            });

    }, [])


    useFocusEffect(useCallback(() => {
        getDocs(query(collection(db, "contract"), where('renterEmail', '==', userRenterEmail)))
            .then(docSnap => {
                let users = [];
                docSnap.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id })
                });
                setconfirmButton(users[0].confirmpay)
                setPaid(users[0].paid)
                setIdContract(users[0].id)

                setImageInvoice(users[0].invoicePic)
            }).catch((error) => {
                // The write failed...
                alert(error);
            });

        return () => {
            console.log("success")
        }


    }, [])
    )
    const update = () => {

        updateDoc(doc(db, "MakeInvoice", IdInvoice), {
            tax: ((parseInt(deposit) + parseInt(fine) + parseInt(insurance) + parseInt(other) + (parseInt(vehicle) * parseInt(countDate))) * 0.07).toFixed(2),
            beforeTax: (parseInt(deposit) + parseInt(fine) + parseInt(insurance) + parseInt(other) + (parseInt(vehicle) * parseInt(countDate))).toFixed(2),
            deposit: deposit,
            fine: fine,
            insurance: insurance,
            other: other,
            total: ((parseInt(deposit) + parseInt(fine) + parseInt(insurance) + parseInt(other) + (parseInt(vehicle) * parseInt(countDate))) * 0.07 + (parseInt(deposit) + parseInt(fine) + parseInt(insurance) + parseInt(other) + (parseInt(vehicle) * parseInt(countDate)))).toFixed(2),

            vehicle: vehicle,

        }).then(() => {
            // Data saved successfully!

        }).catch((error) => {
            // The write failed...
            alert(error);
        });

    };//update
    // if (tax != newbeforeTax) {
    //     console.log("tax : ", tax);
    //     console.log("beforetax : ", newbeforeTax);
    //     setBeforeTax(newbeforeTax);

    // }
    useEffect((id) => {
        getDocs(query(collection(db, "MakeInvoice"), where('Rentermail', '==', userRenterEmail)))
            .then(docSnap => {
                let users = [];
                docSnap.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id })
                });
                setIdInvoice(users[0].id)
                setDeposit(users[0].deposit)
                setVehicle(users[0].vehicle)
                setInsurance(users[0].insurance)
                setFine(users[0].fine)
                setOther(users[0].other)
                setBeforeTax(users[0].beforeTax)
                settax(users[0].tax)
                setTotal(users[0].total)

                console.log("a", users[0].deposit)
            }).catch((error) => {
                // The write failed...
                // alert(error);
            })


    }, [])


    return (
        <ScrollView style={styles.container}>


            <View style={styles.view}>
                <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", backgroundColor: "#FBE0AB", width: 200, height: 50, padding: 10, alignSelf: "center", marginBottom: 20, borderRadius: 20 }}>ใบแจ้งหนี้</Text>
                <Text>ชื่อ <Text style={{ fontWeight: "600" }}>{firstname}</Text> นามสกุล  <Text style={{ fontWeight: "600" }}>{lastname}</Text>
                    {"\n"}การเช่ายานพาหนะกำหนดระยะเวลา  <Text style={{ fontWeight: "600" }}>{countDate}</Text>วัน
                    {"\n"}นับตั้งแต่วันที่ <Text style={{ fontWeight: "600" }}>{dates}</Text> ถึงวันที่ <Text style={{ fontWeight: "600" }}>{dateDrop}</Text>
                </Text>
            </View>
            <DataTable style={styles.view2}>
                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell style={{ paddingLeft: 42 }}>รายการ</DataTable.Cell>
                    <DataTable.Cell style={{ borderLeftWidth: 2, justifyContent: "flex-end" }}>จำนวนเงิน (บาท)</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell>ค่ามัดจำ</DataTable.Cell>
                    <View style={styles.btn2}>

                        {p1 == true ?
                            [
                                <TouchableOpacity >
                                    <Text style={styles.text4}
                                        onPress={deposit_can} >Cancel</Text>
                                </TouchableOpacity>
                                ,
                                <TouchableOpacity >
                                    <Text style={styles.text5}
                                        onPress={() => { deposit_save(); update(); }}>Save</Text>
                                </TouchableOpacity>
                            ] :
                            <TouchableOpacity  >
                                <Text style={styles.text3}
                                    onPress={deposit_edit}>Edit</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <DataTable.Cell style={{ borderLeftWidth: 2, justifyContent: "flex-end" }} >
                        <View>
                            <TextInput style={[styles.textinput, !p1 ? { backgroundColor: "#FBE0AB" } : { backgroundColor: "white" }]}
                                value={deposit} onChangeText={text => setDeposit(text)} />
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell>ค่าเช่ายานพาหนะ</DataTable.Cell>
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
                                        onPress={() => { vehicle_save(); update(); }}>Save</Text>
                                </TouchableOpacity>
                            ] :
                            <TouchableOpacity  >
                                <Text style={styles.text3}
                                    onPress={vehicle_edit} >Edit</Text>
                            </TouchableOpacity> : ""
                        }
                    </View>
                    <DataTable.Cell style={{ borderLeftWidth: 2, justifyContent: "flex-end" }} >
                        <View>
                            <TextInput style={[styles.textinput, !p2 ? { backgroundColor: "#FBE0AB" } : { backgroundColor: "white" }]}
                                value={vehicle} onChangeText={text => setVehicle(text)} />
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell>ค่าประกัน</DataTable.Cell>
                    <View style={styles.btn2}>
                        {p3 == true ?
                            [
                                <TouchableOpacity  >
                                    <Text style={styles.text4}
                                        onPress={insurance_can}>Cancel</Text>
                                </TouchableOpacity>
                                ,
                                <TouchableOpacity >
                                    <Text style={styles.text5}
                                        onPress={() => { insurance_save(); update(); }}>Save</Text>
                                </TouchableOpacity>
                            ] :
                            <TouchableOpacity  >
                                <Text style={styles.text3}
                                    onPress={insurance_edit}>Edit</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <DataTable.Cell style={{ borderLeftWidth: 2, justifyContent: "flex-end" }} >
                        <View>
                            <TextInput style={[styles.textinput, !p3 ? { backgroundColor: "#FBE0AB" } : { backgroundColor: "white" }]}
                                value={insurance} onChangeText={text => setInsurance(text)} />
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell>ค่าปรับ ค่าเสียหาย</DataTable.Cell>
                    <View style={styles.btn2}>
                        {p4 == true ?
                            [
                                <TouchableOpacity  >
                                    <Text style={styles.text4}
                                        onPress={fine_can}>Cancel</Text>
                                </TouchableOpacity>
                                ,
                                <TouchableOpacity >
                                    <Text style={styles.text5}
                                        onPress={() => { fine_save(); update(); }}>Save</Text>
                                </TouchableOpacity>
                            ] :
                            <TouchableOpacity  >
                                <Text style={styles.text3}
                                    onPress={fine_edit} >Edit</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <DataTable.Cell style={{ borderLeftWidth: 2, justifyContent: "flex-end" }} >
                        <View>
                            <TextInput style={[styles.textinput, !p4 ? { backgroundColor: "#FBE0AB" } : { backgroundColor: "white" }]}
                                value={fine} onChangeText={text => setFine(text)} />
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell>อื่น ๆ</DataTable.Cell>
                    <View style={styles.btn2}>
                        {p5 == true ?
                            [
                                <TouchableOpacity  >
                                    <Text style={styles.text4}
                                        onPress={other_can}>Cancel</Text>
                                </TouchableOpacity>
                                ,
                                <TouchableOpacity >
                                    <Text style={styles.text5}
                                        onPress={() => { other_save(); update(); }}>Save</Text>
                                </TouchableOpacity>
                            ] :
                            <TouchableOpacity  >
                                <Text style={styles.text3}
                                    onPress={other_edit}   >Edit</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <DataTable.Cell style={{ borderLeftWidth: 2, justifyContent: "flex-end" }} >
                        <View>

                            <TextInput style={[styles.textinput, !p5 ? { backgroundColor: "#FBE0AB" } : { backgroundColor: "white" }]}
                                value={other} onChangeText={text => setOther(text)} />

                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={[styles.tableHeader,]}>
                    <DataTable.Cell style={{ borderRightWidth: 2, paddingRight: 42.5 }}>เงินรวมก่อนภาษี</DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: "flex-end" }} >
                        <View>
                            <TextInput style={[styles.textinput, { backgroundColor: "#FBE0AB" },]}
                                editable={isEditable} value={(parseInt(deposit) + parseInt(fine) + parseInt(insurance)
                                    + parseInt(other) + parseInt(vehicle)).toFixed(2)} />
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell style={{ borderRightWidth: 2, paddingRight: 42.5 }}>ภาษีมูลค่าเพิ่ม 7 %</DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: "flex-end" }}>
                        <View>
                            <TextInput style={[styles.textinput, { backgroundColor: "#FBE0AB" }]}
                                editable={isEditable} value={((parseInt(deposit) + parseInt(fine) + parseInt(insurance)
                                    + parseInt(other) + parseInt(vehicle)) * 0.07).toFixed(2)} onChangeText={text => settax(text)} />
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader2}>
                    <DataTable.Cell style={{ borderRightWidth: 2, paddingRight: 42.5 }}>รวมสุทธิ</DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: "flex-end" }}>
                        <View>
                            <TextInput style={[styles.textinput, { backgroundColor: "#FBE0AB" }]}
                                editable={isEditable} value={((parseInt(deposit) + parseInt(fine) + parseInt(insurance) + parseInt(other) + parseInt(vehicle)) * 0.07
                                    + (parseInt(deposit) + parseInt(fine) + parseInt(insurance) + parseInt(other) + parseInt(vehicle))).toFixed(2)} onChangeText={text => setTotal(text)} />
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>


                {/* <Picker>
                    <Picker.Item label="samad" value ="จ่ายเงินแล้ว"/>
                    <Picker.Item label="samad" value ="ยังไม่ได้จ่ายเงิน"/>
                </Picker> */}

            </DataTable>
            <View style={{ borderRadius: 10, marginLeft: 15, marginBottom: 15, padding: 10, backgroundColor: "#FBE0AB", marginTop: 20, alignSelf: "center" }}>
                <Text style={[, { alignItems: "center", }]}>หลักฐานการชำระเงิน </Text>
            </View>
            <Image style={styles.pic10} source={{ uri: imageInvoice }} />

            <Text style={{ color: "white", margin: 15 }}>Status : </Text>
            <View style={{ flexDirection: "row", justifyContent: "center", textAlign: "center", marginBottom: 20 }}>
                <View style={styles.paid}>
                    <Text style={{ color: "white" }}>{Paid}</Text>

                </View>
                <TouchableOpacity
                    editable={isEditable}
                    style={[isEditable ? { backgroundColor: "#FF4D00" } : { backgroundColor: "white" }, {
                        textAlign: "center", alignItems: "center", marginBottom: 20, padding: 10, marginBottom: 50, borderRadius: 10, margin: 10, width: 80, backgroundColor: "#E34C0B", shadowColor: "white",
                        shadowOffset: {
                            width: 0,
                            height: 8,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 16.00,

                        elevation: 6,
                    },]}

                    onPress={() => {
                        setisEditable6(true)
                        setPaid("Paid")
                        updateDoc(doc(db, "contract", IdContract), {
                            paid: "Paid"
                        })

                    }}>
                    <Text style={styles.but}>Approved</Text>
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
        padding: 30, marginBottom: 20,
        shadowColor: "white",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 1,
        shadowRadius: 16.00,
        elevation: 14,
    }, view2: {
        // height:1490,
        borderRadius: 20,
        backgroundColor: "white",
        marginBottom: 5
    },
    textinput: {
        borderRadius: 360,
        borderWidth: 1,
        height: 30,
        color: "black",
        width: 100,
        textAlign: "center",
    },
    textinput2: {
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: "center",
    }, but: {
        color: "white"
    },
    btn1: {
        backgroundColor: "white",
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
    }, paid: {
        alignItems: "center",
        padding: 10,
        textAlign: "center",
        borderRadius: 10,
        height: 40,
        backgroundColor: "#005ED5",
        width: 200,
        color: "white",
        marginTop: 10,
        shadowColor: "white",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 16.00,
        elevation: 6,
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
    text3: {
        fontSize: 14,
        // lineHeight: 21,
        fontWeight: "400",
        letterSpacing: 0.25,
        color: 'black',
        backgroundColor: "#F29946",
        borderRadius: 360,
        padding: 7,
    },
    text4: {
        fontSize: 10,
        // lineHeight: 21,
        fontWeight: "400",
        letterSpacing: 0.25,
        color: 'black',
        backgroundColor: "#F57B41",
        borderRadius: 360,
        padding: 3,
        marginBottom: 3,
        marginTop: 2
    },
    text5: {
        fontSize: 10,
        fontWeight: "400",
        letterSpacing: 0.25,
        color: 'black',
        backgroundColor: "#7BE121",
        borderRadius: 360,
        padding: 3,
        marginBottom: 3,
        textAlign: "center"

    },
    tableHeader: {
        borderWidth: 2,
    },
    tableHeader2: {
        borderWidth: 2,
        borderBottomColor: "black",
        borderBottomWidth: 2,
    },
    pic10: { width: 300, height: 300, left: 15, borderWidth: 2, borderColor: "#F3C623" },
});

export default MakeInvoice;
