import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button, TouchableOpacity, Image, ScrollView, FlatList } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from '../database/configdb';
import { useFocusEffect } from "@react-navigation/native";


import MapView, { Callout, Circle, Marker } from 'react-native-maps'

import MapAPI from "../screens/mapAPI";

const UselessTextInput = ({ route, navigation }) => {

    const { Email, MakeContracts } = route.params;
    const [userRenterEmails, setuserRenterEmail] = useState(Email);
    const [Id, setId] = useState("");
    const [makeContract, onChangemakeContract] = useState(MakeContracts);
    const [isEditable, setisEditable] = useState(true);

    const [open, setOpen] = useState(false);
    const [username, onChangeUsername] = React.useState("");
    const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
    const [tel, onChangeTel] = React.useState("");
    const [firstname, onChangeFirstname] = React.useState("");
    const [lastname, onChangeLastname] = React.useState("");
    const [Province, setProvince] = useState("");
    const [itemsProvince, setItemsProvince] = useState([
        { label: 'Chiangmai', value: 'Chiangmai' },
        { label: 'Korat', value: 'Korat' },
        { label: 'Kanchanaburi', value: 'Kanchanaburi' },
        { label: 'Prachuap Khiri Khan', value: 'Prachuap Khiri Khan' }
    ]);

    const [opencC, setOpencC] = useState(false);
    const [LocationC, setLocationC] = useState("");
    const [itemLocationC, setitemLocationC] = useState([
        { label: 'P.Neay Car Rental', value: 'P.Neay Car Rental' },
        { label: 'ST Car Service', value: 'ST Car Service' },
        { label: 'ลานนารถเช่าเชียงใหม่', value: 'ลานนารถเช่าเชียงใหม่' },
        { label: 'M&M Car Rent Chiangmai', value: 'M&M Car Rent Chiangmai' }
    ]);

    const [opencKo, setOpencKo] = useState(false);
    const [LocationKo, setLocationKo] = useState("");
    const [itemLocationKo, setitemLocationKo] = useState([
        { label: 'Touch Car Rental', value: 'Touch Car Rental' },
        { label: 'BPK Car Rental& Tour', value: 'BPK Car Rental& Tour' },
        { label: 'เต้รถเช่า กาญจนบุรี', value: 'เต้รถเช่า กาญจนบุรี' },
        { label: 'Por Car Rental', value: 'Por Car Rental' }
    ]);

    const [opencKa, setOpencKa] = useState(false);
    const [LocationKa, setLocationKa] = useState("");
    const [itemLocationKa, setitemLocationKa] = useState([
        { label: 'ท่าเรือรถเช่า', value: 'ท่าเรือรถเช่า' },
        { label: 'พิเพลง คาร์เร้นท์', value: 'พิเพลง คาร์เร้นท์' },
        { label: 'VIP Car Rental Service', value: 'VIP Car Rental Service' },
        { label: 'Asop Array Car Service', value: 'Asop Array Car Service' }
    ]);

    const [opencP, setOpencP] = useState(false);
    const [LocationP, setLocationP] = useState("");
    const [itemLocationP, setitemLocationP] = useState([
        { label: 'JKN Car Rental HuaHin', value: 'JKN Car Rental HuaHin' },
        { label: 'S&K Service', value: 'S&K Service' },
        { label: 'Mink KiKi รถเช่า', value: 'Mink KiKi รถเช่า' },
        { label: 'บาร์คาร์ Rental', value: 'บาร์คาร์ Rental' },
    ]);

    const [confirmMakeInvoice, setconfirmMakeInvoice] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [isDateDropVisible, setDateDropVisibility] = useState(false);
    const [isTimeDropVisible, setTimeDropVisibility] = useState(false);

    const [dates, setDates] = React.useState(new Date().toISOString().slice(0, 10));
    const [time, setTime] = React.useState(new Date(Date.now()).toISOString().slice(0, 5));
    const [dateDrop, setDateDrop] = React.useState(new Date().toISOString().slice(0, 10));
    const [timeDrop, setTimeDrop] = React.useState(new Date(Date.now()).toISOString().slice(0, 5));

    const [locations, setLocations] = React.useState("");
    const [p1, setp1] = React.useState(false);
    const [p2, setp2] = React.useState(false);
    const [d1, setd1] = React.useState(false);
    const [d2, setd2] = React.useState(false);
    const [vId, onChangevId] = useState("");

    const [imageUser, setImageUser] = useState(null);//รูปUser

    const showDatePicker = () => {
        setDatePickerVisibility(true);

    };
    const showTimePicker = () => {
        setTimePickerVisibility(true);

    };
    const showDateDrop = () => {
        setDateDropVisibility(true);

    };
    const showTimeDrop = () => {
        setTimeDropVisibility(true);

    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };
    const hideDateDPicker = () => {
        setDateDropVisibility(false);
    };
    const hideTimeDPicker = () => {
        setTimeDropVisibility(false);
    };


    const handleConfirm = (date) => {
        // console.warn("A date has been picked: ", date);
        setDates(date);
        setp1(true)
        locate();
        hideDatePicker();

    };
    const timehandleConfirm = (time) => {
        //  console.warn("A time has been picked: ", time);
        setTime(time);
        setp2(true)
        locate();
        //  // alert(time)
        hideTimePicker();
    };
    const handleDropConfirm = (dateDrop) => {
        //  console.warn("A date has been picked: ", dateDrop);
        setDateDrop(dateDrop);
        setd1(true)
        locate();
        hideDateDPicker();
    };
    const timeDrophandleConfirm = (timeDrop) => {
        //  console.warn("A time has been picked: ", timeDrop);
        setTimeDrop(timeDrop);
        setd2(true)
        locate();
        //  // alert(time)
        hideTimeDPicker();
    };
    useFocusEffect(useCallback(() => {
        getDocs(query(collection(db, "signup"), where('email', '==', Email)))
            .then(docSnap => {
                let users = [];
                docSnap.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id })
                });
                setId(users[0].id)
                setconfirmMakeInvoice(users[0].confirm);
                setuserRenterEmail(users[0].email);
                onChangeFirstname(users[0].firstname)
                onChangeLastname(users[0].lastname)
                onChangeTel(users[0].tel)
                onChangeUsername(users[0].username)
                onChangemakeContract(users[0].makeContract)
                setDate(users[0].date)


                setImageUser(users[0].imageUser)
                console.log("g", users[0].makeContract)

            }).catch((error) => {
                // The write failed...
                alert(error);
            });
        return () => {
            console.log("success")
        }


    }, [])
    )


    const locate = () => {
        if (Province == "Chiangmai") {
            setLocations(LocationC)
            console.log(LocationC)
        }
        else if (Province == "Korat") {
            setLocations(LocationKo)
        }
        else if (Province == "Kanchanaburi") {
            setLocations(LocationKa)
        }
        else if (Province == "Prachuap Khiri Khan") {
            setLocations(LocationP)
        } else {
            setLocations("")
        }
    }
    const created = () => {
        addDoc(collection(db, "location-time"), {

            datePick: dates.toISOString().slice(0, 10),
            timePick: time.toLocaleTimeString('en-US'),
            dateDrop: dateDrop.toISOString().slice(0, 10),
            timeDrop: timeDrop.toLocaleTimeString('en-US'),
            renterEmail: Email,
            province: Province,
            location: locations


        }
        ).then(() => {
            // Data saved successfully!
            // alert('sign-up success');

        }).catch((error) => {
            // The write failed...
            alert(error);
        });
    }
    useEffect((id) => {
        getDocs(query(collection(db, "vehicleReservation"), where('renterEmail', '==', Email)))
            .then(docSnap => {
                let users = [];
                docSnap.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id })
                });
                onChangevId(users[0].vehicleID)
                // onchangeRentalEmail(users[0].rentalEmail)

                console.log("1", users[0].vehicleID)
            }).catch((error) => {
                // The write failed...
                // alert(error);
            });

    }, [])
    const [ChaingShop, setChiangmai] = React.useState({
        latitude: 18.7604283,
        longitude: 98.9549625
    })

    const [kanShop, setkanShop] = React.useState({
        latitude: 14.034542,
        longitude: 99.5148365
    })

    const [huahinShop, sethuahinShop] = React.useState({
        latitude: 12.6042707,
        longitude: 99.9325204
    })

    const [korat, setkorat] = React.useState({
        latitude: 14.9560627,
        longitude: 102.0815706
    })
    //  console.log(time.toLocaleTimeString('en-US'))
    return (
        <ScrollView style={styles.container}>
            <View style={[{ flexDirection: "row", justifyContent: "space-evenly" }]}>

                <View style={styles.acBox}>
                    <Text style={{ fontSize: 16, textAlign: "center", color: "black", marginTop: 10 }}><Entypo name="emoji-flirt" size={15} color="black" /> {username} <Entypo name="emoji-flirt" size={15} color="black" /></Text>
                    <View style={{ width: 300, height: 1, backgroundColor: "black", marginTop: 5 }}></View>
                    <Image style={styles.pic7} source={{ uri: imageUser }} />
                    <View style={{ position: "absolute", top: 70, right: 20, marginTop: 10 }}>
                        <Text style={styles.txt4}><MaterialCommunityIcons name="account-cowboy-hat" size={21} color="#0D1A9D" />   {firstname}   {lastname}</Text>
                        <Text style={styles.txt4}><Foundation name="telephone" size={21} color="#0D1A9D" />     {tel}</Text>
                        <Text style={styles.txt4}><Entypo name="cake" size={21} color="#0D1A9D" />   {date}</Text>
                    </View>

                </View>
            </View>

            <Text style={{ margin: 15, fontSize: 16, fontWeight: "500", color: "white" }}>Location </Text>
            <View>
                <DropDownPicker style={[styles.dropdown, { zIndex: 5 }]}
                    placeholder="Pick province"
                    open={open}
                    value={Province}
                    items={itemsProvince}
                    setOpen={setOpen}
                    setValue={setProvince}
                    setItems={setItemsProvince}
                />
            </View>
            {Province == "Chiangmai" ?
                <View>
                    <DropDownPicker style={[styles.dropdown, { zIndex: 2 }]}
                        placeholder="Pick location"
                        open={opencC}
                        value={LocationC}
                        items={itemLocationC}
                        setOpen={setOpencC}
                        setValue={setLocationC}
                        setItems={setitemLocationC}
                    />
                </View>
                : ""
            }
            {Province == "Korat" ?
                <View>
                    <DropDownPicker style={[styles.dropdown, { zIndex: 2 }]}
                        placeholder="Pick location"
                        open={opencKo}
                        value={LocationKo}
                        items={itemLocationKo}
                        setOpen={setOpencKo}
                        setValue={setLocationKo}
                        setItems={setitemLocationKo}
                    />
                </View>
                : ""
            }
            {Province == "Kanchanaburi" ?
                <View>
                    <DropDownPicker style={[styles.dropdown, { zIndex: 2 }]}
                        placeholder="Pick location"
                        open={opencKa}
                        value={LocationKa}
                        items={itemLocationKa}
                        setOpen={setOpencKa}
                        setValue={setLocationKa}
                        setItems={setitemLocationKa}
                    />
                </View>
                : ""
            }
            {Province == "Prachuap Khiri Khan" ?
                <View>
                    <DropDownPicker style={[styles.dropdown, { zIndex: 2 }]}
                        placeholder="Pick location"
                        open={opencP}
                        value={LocationP}
                        items={itemLocationP}
                        setOpen={setOpencP}
                        setValue={setLocationP}
                        setItems={setitemLocationP}
                    />
                </View>
                : ""
            }


            {
                Province == "Chiangmai" ?
                    <View style={styles.map}>
                        {/*เชียงใหม่*/}
                        <MapView style={styles.map} initialRegion={{
                            latitude: ChaingShop.latitude,
                            longitude: ChaingShop.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01
                        }}>
                            <Marker coordinate={{
                                latitude: 18.7604283,
                                longitude: 98.9549625,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01
                            }}
                                pinColor="red">
                                <Callout ><Text>P.Neay Car Rental</Text></Callout>
                            </Marker>
                        </MapView>
                    </View> : ""
            }

            {
                Province == "Kanchanaburi" ?
                    <View style={styles.map}>
                        {/*กาญ*/}
                        <MapView style={styles.map} initialRegion={{
                            latitude: kanShop.latitude,
                            longitude: kanShop.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01
                        }}>
                            <Marker coordinate={{
                                latitude: 14.034542,
                                longitude: 99.5148365,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01
                            }}
                                pinColor="red" >
                                <Callout ><Text>Por Car Rental</Text></Callout>
                            </Marker>
                        </MapView>
                    </View> : ""
            }

            {
                Province == "Prachuap Khiri Khan" ?
                    <View style={styles.map}>
                        {/*หัวหิน*/}
                        <MapView style={styles.map} initialRegion={{
                            latitude: huahinShop.latitude,
                            longitude: huahinShop.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01
                        }}><Marker coordinate={{
                            latitude: 12.6042707,
                            longitude: 99.9325204,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01
                        }}
                            pinColor="red">
                                <Callout ><Text>พิเพลง คาร์เร้นท์</Text></Callout>
                            </Marker>
                        </MapView>
                    </View> : ""
            }


            {
                Province == "Korat" ?
                    <View style={styles.map}>
                        {/*โคราช*/}
                        <MapView style={styles.map} initialRegion={{
                            latitude: korat.latitude,
                            longitude: korat.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01
                        }}>
                            <Marker coordinate={{
                                latitude: 14.9560627,
                                longitude: 102.0815706,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01
                            }}
                                pinColor="red">
                                <Callout ><Text>S&K Service</Text></Callout>
                            </Marker>
                        </MapView>
                    </View> : ""
            }



            <View style={{ flexDirection: "row" }}>
                {p1 == true ? <TouchableOpacity style={styles.DatePicker} onPress={showDatePicker}>
                    <Text style={styles.but}>{dates.toLocaleDateString()}</Text>
                    <AntDesign name="calendar" style={{ position: "absolute", right: 10, top: 5, zIndex: -1 }} size={24} color="black" />
                </TouchableOpacity> : <TouchableOpacity style={styles.DatePicker} onPress={showDatePicker}>
                    <Text style={styles.but}>Pick-up Date</Text>
                    <AntDesign name="calendar" style={{ position: "absolute", right: 10, top: 5, zIndex: -1 }} size={24} color="black" />
                </TouchableOpacity>
                }

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                {p2 == true ?
                    <TouchableOpacity style={styles.timePicker} onPress={showTimePicker}>
                        <Text style={styles.but}>{time.toLocaleTimeString('en-US')}</Text>
                        <Ionicons name="time-outline" style={{ position: "absolute", right: 10, top: 5 }} size={24} color="black" />
                    </TouchableOpacity> :
                    <TouchableOpacity style={styles.timePicker} onPress={showTimePicker}>
                        <Text style={styles.but}>Pick-up Time</Text>
                        <Ionicons name="time-outline" style={{ position: "absolute", right: 10, top: 5 }} size={24} color="black" />
                    </TouchableOpacity>}
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={timehandleConfirm}
                    onCancel={hideTimePicker}
                />
            </View>
            <View style={{ flexDirection: "row" }}>
                {d1 == true ?
                    <TouchableOpacity style={styles.DatePicker} onPress={showDateDrop}>
                        <Text style={styles.but}>{dateDrop.toLocaleDateString()}</Text>
                        <AntDesign name="calendar" style={{ position: "absolute", right: 10, top: 5 }} size={24} color="black" />
                    </TouchableOpacity> : <TouchableOpacity style={styles.DatePicker} onPress={showDateDrop}>
                        <Text style={styles.but}>Drop-off Date</Text>
                        <AntDesign name="calendar" style={{ position: "absolute", right: 10, top: 5 }} size={24} color="black" />
                    </TouchableOpacity>}
                <DateTimePickerModal
                    isVisible={isDateDropVisible}
                    mode="date"
                    onConfirm={handleDropConfirm}
                    onCancel={hideDateDPicker}
                />
                {d2 == true ?
                    <TouchableOpacity style={styles.timePicker} onPress={showTimeDrop}>
                        <Text style={styles.but}>{timeDrop.toLocaleTimeString('en-US')}</Text>
                        <Ionicons name="time-outline" style={{ position: "absolute", right: 10, top: 5 }} size={24} color="black" />
                    </TouchableOpacity> :
                    <TouchableOpacity style={styles.timePicker} onPress={showTimeDrop}>
                        <Text style={styles.but}>Drop-off Time</Text>
                        <Ionicons name="time-outline" style={{ position: "absolute", right: 10, top: 5 }} size={24} color="black" />
                    </TouchableOpacity>}
                <DateTimePickerModal
                    isVisible={isTimeDropVisible}
                    mode="time"
                    onConfirm={timeDrophandleConfirm}
                    onCancel={hideTimeDPicker}
                />
            </View>

            <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity
                    style={{ padding: 10, borderRadius: 20, margin: 15, width: 150, backgroundColor: "#3195D3" }}
                    onPress={() => {
                        // locate();
                        created();
                        navigation.navigate("RENTER LOOKING", { uID: Id, userRenterEmail: Email });

                    }}
                >
                    <Text style={[styles.but, styles.txt]}>Search</Text>
                </TouchableOpacity>


            </View>

            {/* แผนที่ */}



            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

                <View style={{ flexDirection: "column" }}>
                    <TouchableOpacity style={[styles.bt1, { backgroundColor: "#F3C623" }]}
                        onPress={() =>
                            navigation.navigate('MANAGE ACCOUNT', { userRenterEmail: Email })}
                    >

                        <Image style={styles.pic5}
                            source={require("../assets/account.png")}

                        ></Image>
                    </TouchableOpacity>
                    <Text style={[styles.txt3, { marginLeft: 15 }]}>Manage Account</Text>
                </View>


                {makeContract ? <View style={{ flexDirection: "column" }}>
                    <TouchableOpacity style={[styles.bt1, { backgroundColor: '#F3C623' }]}
                        disabled={false}
                        onPress={() =>
                            navigation.navigate('Contract page 1', { userRenterEmail: userRenterEmails, uID: Id, vehicleId: vId })}
                    >
                        <Image style={styles.pic2}
                            source={require("../assets/contracts.png")}

                        ></Image></TouchableOpacity>
                    <Text style={[styles.txt3, { marginLeft: 45 }]}>Contract</Text>
                </View> : <View style={{ flexDirection: "column" }}>
                    <TouchableOpacity style={[styles.bt1, { backgroundColor: '#8E8E8E' }]}
                        disabled={true}
                        onPress={() =>
                            navigation.navigate('Contract page 1', { userRenterEmail: userRenterEmails, uID: Id, vehicleId: vId })}
                    >
                        <Image style={styles.pic2}
                            source={require("../assets/contracts.png")}

                        ></Image></TouchableOpacity>
                    <Text style={[styles.txt3, { marginLeft: 45 }]}>Contract</Text>
                </View>}

                {makeContract ? <View style={{ flexDirection: "column" }}>
                    <TouchableOpacity style={[styles.bt1, { backgroundColor: "#F3C623" }]}
                        disabled={false}
                        onPress={() =>
                            navigation.navigate('Make Invoice', { userRenterEmail: Email, confirm: confirmMakeInvoice })}
                    >
                        <Image style={styles.pic3}
                            source={require("../assets/invoices.png")}
                        ></Image></TouchableOpacity>
                    <Text style={styles.txt3}>Invoice</Text>
                </View> : <View style={{ flexDirection: "column" }}>
                    <TouchableOpacity style={[styles.bt1, { backgroundColor: '#8E8E8E' }]}
                        disabled={true}
                        onPress={() =>
                            navigation.navigate('Make Invoice', { userRenterEmail: Email, confirm: confirmMakeInvoice })}
                    >
                        <Image style={styles.pic3}
                            source={require("../assets/invoices.png")}
                        ></Image></TouchableOpacity>
                    <Text style={styles.txt3}>Invoice</Text>
                </View>}
            </View>


            <View style={{ flexDirection: "column", alignItems: "flex-end", marginBottom: 50 }}>
                <TouchableOpacity style={styles.bt2}
                    onPress={() =>
                        navigation.navigate('Chat', { userRenterEmail: userRenterEmails })}
                >
                    <Image style={styles.pic4}
                        source={require("../assets/chats.png")}
                    ></Image>
                </TouchableOpacity>
                {/* <Text style={styles.txt3}>Invoice</Text> */}
            </View>

        </ScrollView >

    );
};

const styles = StyleSheet.create({
    container: {
        // justifyContent: "center",
        paddingTop: 40,
        // height: 605,
        //marginTop: 50,
        backgroundColor: "#2D2B29"
    },
    pic1: { width: 140, height: 140, zIndex: 1, position: "absolute", top: -3, left: -3 },
    pic2: { width: 160, height: 160, zIndex: 1, margin: 0, position: "absolute", top: -5, left: -25 },
    pic3: { width: 160, height: 160, zIndex: 1, margin: 0, position: "absolute", top: -25, left: -27 },
    pic4: { width: 100, height: 100, zIndex: 1, position: "absolute", top: -20, left: 120 },
    pic5: { width: 160, height: 160, zIndex: 1, position: "absolute", top: -30, left: -25 },
    pic7: { width: 90, height: 90, zIndex: 1, position: "absolute", top: 60, left: 5
    , borderRadius: 360, borderWidth: 2 },
    box: {
        width: 380,
        backgroundColor: "rgba(255,255,255,0.75)", margin: 15, padding: 30, justifyContent: "center"
        , borderRadius: 20,
    },
    dropdown: {
        margin: 10,
        borderWidth: 1,
        padding: 5,
        borderRadius: 20
        , backgroundColor: "white", zIndex: 2, width: 330

    },
    input: {
        height: 40,
        margin: 15,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white"

    },
    inputbox: {
        height: 80,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white"
    },
    DatePicker: {
        margin: 8, height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white", width: 160,
        zIndex: -1
    },
    timePicker: {
        margin: 8, height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white", width: 160,
        zIndex: -1
    },
    but: { justifyContent: "center" },
    head: {
        fontSize: 33,
        fontWeight: "600", textAlign: "center", paddingTop: 30
    },
    txt: { fontSize: 16, fontWeight: "500", textAlign: "center", color: "white" },
    txt2: { fontSize: 14, fontWeight: "500" },
    txt3: { fontSize: 16, fontWeight: "600", marginLeft: 50, color: "white" },
    txt5: { fontSize: 16, fontWeight: "400", textAlign: "center", color: "black" },
    bt1: {
        marginTop: 30,
        margin: 15,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white", width: 110, height: 110
    }, bt2: {
        alignSelf: "center",
        margin: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white", width: 350, height: 60
    }, bt3: {
        marginLeft: 20,
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white", width: 250, height: 100
    }, txt4: { fontSize: 15, color: "black", },
    txt5: { fontSize: 38, fontWeight: "900", color: "#0D1A9D", position: "absolute", top: 9, left: 80 }, acBox: {
        backgroundColor: "white"
        , width: 300, height: 220, alignContent: "center", borderRadius: 20, shadowColor: "#F3C623",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6.68,
        elevation: 14,
    },
    map: {
        width: 300, alignContent: "center", justifyContent: "center", alignSelf: "center", borderRadius: 700,
        height: 200, backgroundColor: "red"
    },
});

export default UselessTextInput;