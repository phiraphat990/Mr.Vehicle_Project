import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from '../database/configdb';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const MakeContract_2 = ({ route, navigation }) => {
    const { userRenterEmail } = route.params;
    const [dateNow, setDateNow] = React.useState(new Date().toISOString().slice(0, 10));
    const [timeNow, setTimeNow] = React.useState(new Date(Date.now()).toLocaleTimeString());
    const [dates, setDates] = React.useState(new Date().toISOString().slice(0, 10));
    const [time, setTime] = React.useState(new Date(Date.now()).toISOString().slice(0, 1));
    const [dateDrop, setDateDrop] = React.useState(new Date().toISOString().slice(0, 10));
    const [timeDrop, setTimeDrop] = React.useState(new Date(Date.now()).toISOString().slice(0, 5));
    const [countDate, onChangecountDate] = React.useState("");
    const [province, onChangeprovince] = React.useState("");
    const [check, ischeck] = React.useState("");

    const [location, onChangelocation] = React.useState("");
    const [locationID, onChangelocationID] = React.useState("");


    useEffect((id) => {
        getDocs(query(collection(db, "location-time"), where('renterEmail', '==', userRenterEmail)))
            .then(docSnap => {
                let users = [];
                docSnap.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id })
                });
                onChangelocation(users[0].location)
                onChangeprovince(users[0].province)
                setDates(users[0].datePick)
                setDateDrop(users[0].dateDrop)
                setTime(users[0].timePick)
                setTimeDrop(users[0].timeDrop)
                onChangecountDate(parseInt(users[0].dateDrop.slice(8, 10)) - parseInt(users[0].datePick.slice(8, 10)))


                onChangelocationID(users[0].id)

            }).catch((error) => {
                // The write failed...
                alert(error);
            });

    }, [])

    // const[IdContract,setIdContract] = useState("")
    // useEffect((id) => {
    //     getDocs(query(collection(db, ""), where('renterEmail', '==', userRenterEmail)))
    //         .then(docSnap => {
    //             let users = [];
    //             docSnap.forEach((doc) => {
    //                 users.push({ ...doc.data(), id: doc.id })
    //             });
    //             setIdContract(users[0].id)
    //             console.log("a",users[0].id)

    //         }).catch((error) => {
    //             // The write failed...
    //             alert(error);
    //         });

    // }, [])





    return (
        <ScrollView style={styles.container}>
            <Text style={{ color: "#ffffff", marginTop: 30, marginLeft: 30 }}>จังหวัด                                      ร้าน</Text>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.province}>{province}</Text>
                <Text style={styles.province}>{location}</Text>
            </View>

            {/* 
            <Text>ชั่วโมงเวลาปัจจุบัน : {timeNow.slice(0, 2)} </Text>
            <Text>นาทีเวลาปัจจุบัน : {timeNow.slice(2, 4)} </Text> */}

            <View style={{ padding: 30, borderRadius: 10, alignSelf: "center", backgroundColor: "#FBE0AB", marginTop: 30, alignItems: "center" }}>
                <Text style={{ color: "black" }}>Pick-up Date                  Pick-up Time</Text>
                <View style={{ flexDirection: "row", padding: 10 }}>
                    <Text style={styles.date}>{dates}</Text>
                    <Text style={styles.date}>{time}</Text>
                </View>

                <Text style={{ color: "black" }}>Drop Date                            Drop Time</Text>
                <View style={{ flexDirection: "row", padding: 10 }}>
                    <Text style={styles.date}>{dateDrop}</Text>
                    <Text style={styles.date}>{timeDrop}</Text>
                </View>
            </View>


{check?
            <View style={{ marginTop: 30, backgroundColor: "#ffffff", padding: 5, borderRadius: 15, alignSelf: "center", alignItems: "center" }}>
                <Text style={{ color: "#ffffff", marginTop: 10, color: "black" }}>จำนวนวันที่เกิน</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.date3}>{parseInt(dateNow.slice(8, 10) - parseInt(dateDrop.slice(8, 10))) > 0 ? 0 : 0}</Text>

                </View>
            </View>
:""}
            <Text style={{ color: "#ffffff", marginLeft: 30, marginTop: 10 }}>" Date now "                            " Time now "</Text>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.date2}>{dateNow}</Text>
                <Text style={styles.date2}>{timeNow}</Text>
            </View>

            <TouchableOpacity style={{ borderRadius: 30, backgroundColor: "#F3C623", width: 70, alignSelf: "center", padding: 10, marginTop: 40}}

            ><Text style={{textAlign: "center" }}
                onPress={() => {
        ischeck(true)
                   // navigation.navigate('MAIN', { Email: userRenterEmail });
                    updateDoc(doc(db, "location-time", locationID), {
                        Nowdatereal: dateNow,//วันที่คืนจิง
                        Nowtimereal: timeNow,//เวลาที่คืนจิง
                        Overtime: parseInt(dateNow.slice(8, 10) - parseInt(dateDrop.slice(8, 10))),//เวลาที่เกิน
                        Overdate: parseInt(timeNow.slice(0, 2) - parseInt(timeDrop.slice(0, 2)))//วันที่เกิน

                    }).then(
                        alert("ยืนยันเวลาคืน")
                    )
                }}
            >Save</Text></TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2D2B29",
        // height: "100%"
        // padding: 15,
    },
    province: {
        padding: 8,
        backgroundColor: "white",
        borderWidth: 2,
        borderRadius: 30,
        width: 150,
        marginLeft: 15,
        marginTop: 10


    },
    date: {
        padding: 10,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 30,
        width: 100,
        marginLeft: 15,
    },
    date2: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 30,
        width: 150,
        marginLeft: 20,
    },
    date3: {
        marginTop: 10,
        padding: 10,
        // backgroundColor: "white",
        // borderWidth: 1,
        // borderRadius: 30,
        // width: 120,
        // marginLeft: 30,
        left: 0
    }
});

export default MakeContract_2;
