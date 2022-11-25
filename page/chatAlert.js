import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from '../database/configdb';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const MakeContract_2 = ({ route, navigation }) => {
    const { userRentalEmail, userRenterEmail, vehicleIds } = route.params;

    const [dateNow, setDateNow] = React.useState(new Date().toISOString().slice(0, 10));
    const [timeNow, setTimeNow] = React.useState(new Date(Date.now()).toLocaleTimeString());
    const [dates, setDates] = React.useState(new Date().toISOString().slice(0, 10));
    const [time, setTime] = React.useState(new Date(Date.now()).toISOString().slice(0, 1));
    const [dateDrop, setDateDrop] = React.useState(new Date().toISOString().slice(0, 10));
    const [timeDrop, setTimeDrop] = React.useState(new Date(Date.now()).toISOString().slice(0, 5));
    const [countDate, onChangecountDate] = React.useState("");
    const [province, onChangeprovince] = React.useState("");

    const [location, onChangelocation] = React.useState("");

    const [renterEmail, onChangerenterEmail] = useState("")


    const[Nowdatereal, setNowdatereal]= useState("");//วันคืน
    const[Nowtimereal, setNowtimereal]= useState("");//เวลาคืน
    const[Overdate, setOverdate]= useState("");//วันที่เกิน
    const[Overtime, setOvertime]= useState("");//เวลาที่เกิน


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
                onChangerenterEmail(users[0].renterEmail)


                setNowdatereal(users[0].Nowdatereal)
                setNowtimereal(users[0].Nowtimereal)
                setOverdate(users[0].Overdate)
                setOvertime(users[0].Overtime)


            }).catch((error) => {
                // The write failed...
                alert(error);
            });

    }, [])


    return (
        <ScrollView style={styles.container}>
            <Text style={{color:"#ffffff",fontSize:16,paddingBottom:15,marginLeft:15}}>ผู้คืนยานพาหนะ</Text>
            <Text style={styles.province}> {renterEmail}</Text>

            <View style={{ padding: 20, borderRadius: 10, backgroundColor: "#FBE0AB",marginTop:30 }}>
                <Text style={{ color: "#ffffff",alignItems:"center",paddingBottom:10,color:"black" }}>Pick-up Date                            Pick-up Time</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.date}>{dates}</Text>
                    <Text style={styles.date}>{time}</Text>
                </View>

                <Text style={{ color: "#ffffff",alignItems:"center",paddingBottom:10,color:"black" }}>Drop Date                            Drop Time</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.date}>{dateDrop}</Text>
                    <Text style={styles.date}>{timeDrop}</Text>
                </View>
            </View>

            <View style={{marginTop:30 }}>
                <Text style={{ color: "#ffffff",alignItems:"center",paddingBottom:10,marginLeft:30 }}>จำนวนวันที่เกิน                      จำนวนเวลาที่เกิน</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.date}>{Nowdatereal}</Text>
                    <Text style={[styles.date, {marginLeft:35}]}>{Nowtimereal} </Text>
                </View>
            </View>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2D2B29",
        padding: 15,
    },
    province: {
        padding: 10,
        backgroundColor: "white",
        borderWidth: 2,
        borderRadius: 30,
        width:220,
        marginLeft: 15,

    },
    date: {
        padding: 10,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 30,
        width: 130,
        marginLeft: 15,
        alignItems:"center"
    }
});

export default MakeContract_2;
