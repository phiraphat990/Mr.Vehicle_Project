import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Modal, Alert, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, authentication } from '../database/configdb';

const VehicleDetail = ({ route, navigation }) => {
    const protectText = useState("ผู้ให้เช่ายานพาหนะเงินมัดจำในบัตรเครดิตของคุณ คุณอาจสูญเสียเงินมัดจำทั้งหมดหากรถเสียหายหรือถูกขโมย แต่ตราบใดที่คุณมีการคุ้มครองเต็มรูปแบบของเรา ทางผู้ให้เช่าจะคืนเงินให้คุณ")
    const redProtectText = useState("(ราคารวมภาษีและค่าธรรมเนียมที่เกี่ยวข้องทั้งหมดแล้ว)")
    const ruleDetail1 = useState("หากรถที่เช่าเกิดการถูกโจรกรรม ประกัน “ความคุ้มครองเต็มรูปแบบ” จะทำให้ผู้เช่าไม่เสียเงินมัดจำทั้งหมดแต่ยังต้องมีการตรวจสอบถึงสาเหตุการสูญหายเพื่อคำนวณเงินสำหรับค่าชดเชย")
    const ruleDetail2 = useState("ผลิตภัณฑ์ความคุ้มครองมักจะมีข้อยกเว้นต่าง ๆ แต่ประกัน “ความคุ้มครองเต็มรูปแบบ” นั้นครอบคลุมภายนอกและชิ้นส่วนเครื่องยนต์ของรถทุกชิ้น ตั้งแต่ยางรถและหน้าต่างรถ ไปจนถึงเครื่องยนต์ หลังคา และช่วงล่าง")
    const ruleDetail3 = useState("หากรถไม่สามารถใช้การได้ กุญแจสูญหาย หรือลืมกุญแจไว้ในรถ ประกัน “ความคุ้มครองเต็มรูปแบบ” จะคืนเงินให้กรณีที่มีค่าเรียกช่างมาให้บริการ ค่าลากรถ และค่าทำกุญแจใหม่")


    // ตัวแปรสำหรับส่วนที่ 2
    const [deposit, setDeposit] = useState("");//มัดจำ
    const [vehicles, setVehicles] = useState("0");//ยานพาหนะ
    const [insurance, setInsurance] = useState("0");//ประกัน
    const [fine, setFine] = useState("0");//ค่าปรับ
    const [other, setOther] = useState("0");//อื่นๆ
    const [beforeTax, setBeforeTax] = useState("0");//ก่อนภาษี
    const [tax, settax] = useState("0");//หลังภาษี
    const [total, setTotal] = useState("0");//รวมทั้งหมด
    const [vBrand, setVBrand] = useState()
    const [vSeats, setVSeats] = useState()
    const [vOS, setVOS] = useState()
    const [vModel, setVModel] = useState()
    const [vSize, setVSize] = useState()
    const [vPrice, setVPrice] = useState()
    const [vType, setVType] = useState()
    const [vNumber, setVNumber] = useState()
    const [vInsurance, setVInsurance] = useState("")
    const [countDate, onChangecountDate] = React.useState("");
    const [vOtherInfo, setVOtherInfo] = useState("")
    const [vImage, setVImage] = useState()

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [tel, setTel] = useState()
    const [userId, setId] = useState()

    const [status, setStatus] = useState()
    {/** Id ที่จะมากับ Nevigator เพื่อเป็นตัวเรียกข้อมูลมาให้ถูกต้อง*/ }
    const { vID } = route.params;
    const [vId] = useState(vID)

    //ตัวแปรรับเข้าจาก VehicleSelect
    const { userRenterEmail } = route.params
    const [uRenterEmail] = useState(userRenterEmail)

    const { userRentalEmail } = route.params
    const [uRentalEmail] = useState(userRentalEmail)

    useEffect((id) => {
        getDocs(query(collection(db, "location-time"), where('renterEmail', '==', userRenterEmail)))
            .then(docSnap => {
                let users = [];
                docSnap.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id })
                });

                onChangecountDate(parseInt(users[0].dateDrop.slice(8, 10)) - parseInt(users[0].datePick.slice(8, 10)))
                console.log(parseInt(users[0].dateDrop.slice(8, 10)) - parseInt(users[0].datePick.slice(8, 10)))
                console.log("Doc:", users[0].datePick);
                console.log("Doc:", users[0].id);
            }).catch((error) => {
                // The write failed...
                alert(error);
            });

    }, [])
    // ฟังก์ชันโหลดข้อมูล createtwo
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        getDoc(doc(db, "vehicleDetails", vId))
            .then(docData => {
                if (docData.exists()) {
                    // console.log(docData.data());
                    setVBrand(docData.data().brand.toUpperCase());
                    setVSeats(docData.data().seats);
                    setVOS(docData.data().os.toUpperCase());
                    setVModel(docData.data().model);
                    setIsReserve(docData.data().usedStatus);
                    setVOtherInfo(docData.data().otherInfo);
                    setVSize(docData.data().size.toUpperCase());
                    setVPrice(docData.data().vehicle);
                    setVType(docData.data().VehicleType.toUpperCase());
                    setVNumber(docData.data().number);
                    setVInsurance(docData.data().insurance)

                    setDeposit(docData.data().deposit)
                    setBeforeTax(docData.data().beforeTax)
                    setFine(docData.data().fine)
                    setOther(docData.data().other)
                    setVehicles(docData.data().vehicle)
                    setIsLoading(true)

                    if (docData.data().usedStatus) {
                        setStatus(true)
                        setIsReserve(true)
                    } else {
                        setStatus(false)
                        setIsReserve(false)
                    }
                }
            }).catch((error) => {
                // The write failed...
                alert(error);
            });
    }, []);

    useEffect((id) => {
        getDocs(query(collection(db, "signup"), where('email', '==', uRentalEmail)))
            .then(docSnap => {
                let users = [];
                docSnap.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id })
                });
                setId(users[0].id)
                setFirstName(users[0].firstname);
                setLastName(users[0].lastname);
                setTel(users[0].tel);
            }).catch((error) => {
                // The write failed...
                alert(error);
            });
    }, [])

    // ชื่อ Logo
    const [logoName1, setLogoName1] = useState("down")
    const [logoName2, setLogoName2] = useState("down")
    const [logoName3, setLogoName3] = useState("down")

    const dropText = (number) => {
        if (number == 1) {
            if (shouldShowRule1Detail == false) {
                setShouldShowRule1Detail(true)
                setShouldShowRule2(false)
                setShouldShowRule3(false)
            }
            else if (shouldShowRule1Detail == true) {
                setShouldShowRule1Detail(false)
                setShouldShowRule2(true)
                setShouldShowRule3(true)
            }
            if (logoName1 == "down") {
                setLogoName1("up")
            } else {
                setLogoName1("down")
            }
        }
        else if (number == 2) {
            if (shouldShowRule2Detail == false) {
                setShouldShowRule2Detail(true)
                setShouldShowRule1(false)
                setShouldShowRule3(false)
            }
            else if (shouldShowRule2Detail == true) {
                setShouldShowRule2Detail(false)
                setShouldShowRule1(true)
                setShouldShowRule3(true)
            }
            if (logoName2 == "down") {
                setLogoName2("up")
            } else {
                setLogoName2("down")
            }
        }
        else {
            if (shouldShowRule3Detail == false) {
                setShouldShowRule3Detail(true)
                setShouldShowRule1(false)
                setShouldShowRule2(false)
            }
            else if (shouldShowRule3Detail == true) {
                setShouldShowRule3Detail(false)
                setShouldShowRule1(true)
                setShouldShowRule2(true)
            }
            if (logoName3 == "down") {
                setLogoName3("up")
            } else {
                setLogoName3("down")
            }
        }
    }

    // ตั้งค่า DropText
    const [shouldShowRule1, setShouldShowRule1] = useState(true)
    const [shouldShowRule2, setShouldShowRule2] = useState(true)
    const [shouldShowRule3, setShouldShowRule3] = useState(true)

    const [shouldShowRule1Detail, setShouldShowRule1Detail] = useState(false)
    const [shouldShowRule2Detail, setShouldShowRule2Detail] = useState(false)
    const [shouldShowRule3Detail, setShouldShowRule3Detail] = useState(false)

    {/**โซน Pop up การจอง */ }
    const [reserveVisible, setReserveVisible] = useState(false)
    {/**ตัวส่งค่าว่าจองแบบ พรีเมียมไหม */ }
    const [reservePremium, setReservePremium] = useState()
    const setPurchaseStatus = (status) => {
        if (status) {
            createReservation(true)
        } else {
            createReservation(false)
        }
        setReserveVisible(false)
    }

    //ฟังก์ชันการจอง create ขึ้น fireBase
    const [isReserve, setIsReserve] = useState()
    const [ispaid, setIsPaid] = useState(false)

    const createReservation = (isPremium) => {
        if (isReserve) {
            if (isPremium) {
                addDoc(collection(db, "vehicleReservation"), {
                    paid: false,
                    rentalEmail: uRentalEmail,
                    renterEmail: uRenterEmail,
                    reservationPremium: isPremium,
                    reservationStatus: true,
                    reservationType: 'premium',
                    vehicleID: vId
                })

                 updateDoc(doc(db, "vehicleDetails", vId), {
                     usedStatus: true,
                     number: vNumber - 1})

                 addDoc(collection(db, "MakeInvoice"), {
                     rentalEmail: uRentalEmail,
                     Rentermail: userRenterEmail,
                     beforeTax: (parseInt(deposit) + parseInt(fine) + parseInt(insurance) + parseInt(other) + (parseInt(vehicles) * parseInt(countDate))).toFixed(2),
                     tax: ((parseInt(deposit) + parseInt(fine) + parseInt(insurance) + parseInt(other) + (parseInt(vehicles) * parseInt(countDate))) * 0.07).toFixed(2),
                     deposit: deposit,
                     fine: fine,
                     insurance: vInsurance,
                     other: other,
                     total: ((parseInt(deposit) + parseInt(fine) + parseInt(insurance) + parseInt(other) + (parseInt(vehicles) * parseInt(countDate))) * 0.07 + (parseInt(deposit) + parseInt(fine) + parseInt(insurance) + parseInt(other) + (parseInt(vehicles) * parseInt(countDate)))),
                     vehicle: (parseInt(vehicles) * parseInt(countDate)),
                     confirm: true,
                     editBtn: true,
                 }).then(() => {
                     console.log("reserve success")
                 }).catch((error) => {
                     alert(error);
                 })
            }
        }
        else {
            addDoc(collection(db, "vehicleReservation"), {
                paid: false,
                rentalEmail: uRentalEmail,
                renterEmail: uRenterEmail,
                reservationPremium: isPremium,
                reservationStatus: true,
                reservationType: 'free',
                vehicleID: vId
            }).then(() => {
                
            })
            updateDoc(doc(db, "vehicleDetails", vId), {
                usedStatus: true,
                number: vNumber - 1
            }).then(() => {
            })

            addDoc(collection(db, "MakeInvoice"), {
                rentalEmail: uRentalEmail,
                Rentermail: userRenterEmail,
                beforeTax: (parseInt(deposit) + parseInt(fine) + parseInt(insurance) + parseInt(other) + (parseInt(vehicles) * parseInt(countDate))).toFixed(2),
                tax: ((parseInt(deposit) + parseInt(fine) + parseInt(insurance) + parseInt(other) + (parseInt(vehicles) * parseInt(countDate))) * 0.07).toFixed(2),
                deposit: deposit,
                fine: fine,
                insurance: vInsurance,
                other: other,
                total: ((((parseInt(deposit) + parseInt(fine) + parseInt(insurance) + parseInt(other) + (parseInt(vehicles) * parseInt(countDate))) * 0.07) + (parseInt(deposit) + parseInt(fine) + parseInt(insurance) + parseInt(other) + (parseInt(vehicles) * parseInt(countDate)))).toFixed(2)),
                vehicle: ((parseInt(vehicles) * parseInt(countDate)).toFixed(2)),
                confirm: true,
                editBtn: true,
            }).then(() => {
                console.log("reserve success")
            }).catch((error) => {
                alert(error);
            })
        }
    }


    // More Info Pop up
    const [moreInfoVisible, setMoreInfoVisible] = useState(false)
    return (
        <ScrollView style={styles.container}>
            <Modal
                transparent={true}
                visible={reserveVisible}>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#000000aa' }}>
                    <SafeAreaView style={styles.outBorder}>
                        <SafeAreaView style={{ flex: 1, margin: 10 }}>
                            <View style={{ flex: 0.5, alignItems: 'flex-end', justifyContent: 'center' }}>
                                <AntDesign onPress={() => setReserveVisible(false)} name="close" size={30} color="black" />
                            </View>
                            <View style={{ flex: 4, justifyContent: 'space-evenly' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center',marginTop:10 }}>ทำประกันเพื่อรับสิทธิพิเศษ</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 2 }}></View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <Text style={{ fontSize: 16, fontWeight: '500' }}>ฟรี</Text>
                                        <Text style={{ fontSize: 16, fontWeight: '500' }}>พรีเมียม</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 2 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>1. ยานพาหนะถูกโจรกรรม</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <AntDesign name="close" size={20} color="grey" />
                                        <AntDesign name="check" size={20} color="green" />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 2 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>2. ครอบคลุมภายนอก</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <AntDesign name="close" size={20} color="grey" />
                                        <AntDesign name="check" size={20} color="green" />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 2 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>3. ยานพาหนะขัดข้อง</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <AntDesign name="close" size={20} color="grey" />
                                        <AntDesign name="check" size={20} color="green" />
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                                <TouchableOpacity onPress={() => { setPurchaseStatus(false); setReservePremium(false); navigation.navigate("Make Contract", { vehicleIds: vID, userRenterEmail: uRenterEmail, userRentalEmail: uRentalEmail }) }} style={[styles.touchableOpacity, { backgroundColor: '#fff', borderWidth: 1 }]}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>ฟรี</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setPurchaseStatus(true); setReservePremium(true); navigation.navigate("Make Contract", { vehicleIds: vID, userRenterEmail: uRenterEmail, userRentalEmail: uRentalEmail }) }} style={[styles.touchableOpacity, { backgroundColor: '#33DB18' }]}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>พรีเมียม</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </SafeAreaView>
                </SafeAreaView>
            </Modal>

            {moreInfoVisible ? (
                <Modal transparent={true} visible={moreInfoVisible}>
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000aa' }}>
                        <View style={{ margin: '10%', backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, flex: 1, marginTop: '+30%', marginBottom: '+30%' }}>
                            <View style={{ margin: 10, flex: 1 }}>
                                <View style={{ flex: 0.2, alignItems: 'flex-end' }}><AntDesign onPress={() => setMoreInfoVisible(false)} name="close" size={26} color="black" /></View>
                                <View style={{ flex: 2 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.modalHeadText, { alignSelf: 'center' }]}>{vBrand}</Text>
                                    </View>
                                    <View style={{ flex: 5, alignItems: 'center' }}>
                                        <View style={{ flex: 4, justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={[styles.modalText, {}]}>ราคา : {vPrice}</Text>
                                            <Text style={[styles.modalText, {}]}>ราคาค่าประกัน : {vInsurance}</Text>
                                            <Text style={[styles.modalText, {}]}>จำนวนสินค้า : {vNumber}</Text>
                                            {/* {status ? (
                                                <Text style={[styles.modalText, { color: 'green' }]}>สถานะ : พร้อมจอง</Text>
                                            ) : (
                                                <Text style={[styles.modalText, { color: 'red' }]}>สถานะ : พาหนะหมดจำนวน</Text>
                                            )} */}
                                            <Text style={[styles.modalText, {}]}>ชนิดยานพาหนะ : {vType}</Text>

                                        </View>
                                        <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center' }}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={[styles.modalText, { marginTop: '3%' }]}>ข้อมูลอื่นๆ:</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.modelOhterText}>{vOtherInfo}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.modalHeadText, { alignSelf: 'center' }]}>ข้อมูลผู้ให้เช่า</Text>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <Text style={[styles.modalText, { marginTop: '3%' }]}>Email : {uRentalEmail}</Text>
                                        <Text style={[styles.modalText, { marginTop: '3%' }]}>ชื่อ : {firstName}  นามสกุล : {lastName}</Text>
                                        <Text style={[styles.modalText, { marginTop: '3%' }]}>เบอร์โทรติดต่อ : {tel}</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </SafeAreaView>
                </Modal>
            ) : null}
            {/** ส่วน 1 ชื่อหัวข้อ */}
            <SafeAreaView style={[styles.headerTextZone, { flex: 0.5, alignItems: 'flex-start', justifyContent: 'center' }]}>
                {/* <AntDesign name="bars" size={35} color="#fff" style={{ marginLeft: '3%' }} /> */}
            </SafeAreaView>

            {/** ส่วน 2 Box ข้อมูล */}
            <SafeAreaView style={{ Width: '100%', flex: 4 }}>
                <SafeAreaView style={[styles.detailBox, { backgroundColor: '#F3C623' }]}>
                    <SafeAreaView style={{ flex: 3, flexDirection: 'row', flexWrap: 'wrap' }}>
                        <SafeAreaView style={{ flex: 1.5 }}>
                            <View style={{ flex: 1, margin: 10, backgroundColor: '#FBE0AB', borderRadius: 10 }}>
                                <Image source={{ uri: "file:///data/user/0/host.exp.exponent/cache/ImagePicker/f34a353f-9fe0-4b90-81b2-93783ae41676.jpeg" }} style={{ margin: '5%', flex: 1 }} />
                            </View>
                        </SafeAreaView>
                        <SafeAreaView style={{ flex: 1, width: '100%',padding:10  }}>
                            {isLoading ? (
                                <View style={{ flex: 1, margin: '5%', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={styles.bigText}>{vBrand}</Text>
                                    <Text style={styles.text}><AntDesign name="caretright" size={16} color="black" /> {vSeats} seats</Text>
                                    <Text style={styles.text}><AntDesign name="caretright" size={16} color="black" /> {vOS}</Text>
                                    <Text style={styles.text}><AntDesign name="caretright" size={16} color="black" /> {vModel}</Text>
                                </View>
                            ) : (
                                <View style={{ flex: 1, margin: '5%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={styles.text}><FontAwesome5 name="truck-loading" size={30} color="black" />  Loading...</Text>
                                </View>
                            )}
                        </SafeAreaView>
                    </SafeAreaView>
                    <SafeAreaView style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center',marginBottom:10 }}>
                        <TouchableOpacity onPress={() => setMoreInfoVisible(true)} style={[styles.touchableOpacity, { marginRight: '2%', backgroundColor: '#FBE0AB', flexDirection: 'row',width:120,height:50 }]}>
                            <Text style={{ fontSize: 18, fontWeight: '500' }}>More Info</Text>
                            <AntDesign name="caretright" size={18} style={{ marginLeft: '2%', marginRight: '2%' }} />
                        </TouchableOpacity>
                    </SafeAreaView>
                </SafeAreaView>
            </SafeAreaView>

            {/** ส่วน 3 ชื่อหัวข้อ */}
            <SafeAreaView style={[styles.headerTextZone, { flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end' }]}>
                <Text style={[styles.headText, { color: '#fff' }]}>ประกันยานพาหนะ</Text>
            </SafeAreaView>

            {/** ส่วน 4 เอกสารชี้แจง ฯลฯ */}
            <SafeAreaView style={{ flex:10 }}>
                <SafeAreaView style={[styles.detailBox, { backgroundColor: '#FBE0AB' }]}>
                    <SafeAreaView style={{ flex: 1.5, margin: 10, justifyContent: 'space-evenly' }}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Text style={styles.text}><Text style={{ fontSize: 18, fontWeight: 'bold' }}>รายละเอียด: </Text>{protectText}</Text>
                        </View>
                        <Text style={{ fontSize: 16, color: 'red' }}>{redProtectText}</Text>
                    </SafeAreaView>
                    <SafeAreaView style={{ flex: 2, margin: 10, justifyContent: 'space-around' }}>
                        <Text style={styles.headerText}>สิ่งที่คุ้มครอง</Text>
                        {shouldShowRule1 ? (
                            <View style={styles.textBoxLayout}>
                                <Text style={[styles.text, { fontWeight: '400' }]}>1. ยานพาหนะถูกโจรกรรม <AntDesign name={logoName1} size={15} color="black" onPress={() => dropText(1)} /></Text>
                            </View>
                        ) : null}

                        {shouldShowRule1Detail ? (
                            <View style={styles.textBoxLayout}>
                                <Text style={[styles.litleText]}>{ruleDetail1}</Text>
                            </View>
                        ) : null}

                        {shouldShowRule2 ? (
                            <View style={styles.textBoxLayout}>
                                <Text style={[styles.text, { fontWeight: '400' }]}>2. ครอบคลุมภายนอก และชิ้นส่วนของยานพาหนะ เช่น ล้อ ตัวเครื่อง กระจกหลัง เบาะ เป็นต้น <AntDesign name={logoName2} size={15} color="black" onPress={() => dropText(2)} /></Text>
                            </View>
                        ) : null}
                        {shouldShowRule2Detail ? (
                            <View style={styles.textBoxLayout}>
                                <Text style={[styles.litleText]}>{ruleDetail2}</Text>
                            </View>
                        ) : null}

                        {shouldShowRule3 ? (
                            <View style={styles.textBoxLayout}>
                                <Text style={[styles.text, { fontWeight: '400' }]}>3. ยานพาหนะไม่สามารถใช้การได้ เช่น ลืมกุญแจ หรือ สูญหาย <AntDesign name={logoName3} size={15} color="black" onPress={() => dropText(3)} /></Text>
                            </View>
                        ) : null}
                        {shouldShowRule3Detail ? (
                            <View style={styles.textBoxLayout}>
                                <Text style={[styles.litleText]}>{ruleDetail3}</Text>
                            </View>
                        ) : null}
                    </SafeAreaView>
                </SafeAreaView>
            </SafeAreaView>

            {/** ส่วน 5 ปุ่มจอง */}
            <SafeAreaView style={[styles.headerTextZone, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
                <TouchableOpacity onPress={() => setReserveVisible(true)} style={[styles.touchableOpacity, { backgroundColor: '#F3C623',marginBottom:20 }]}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>จอง</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#2D2B29',
    },
    headText: {
        fontSize: 25,
        fontWeight: '500',
        margin: '3%'
    },
    touchableOpacity: {
        marginTop:20,
        width: 90,
        height: 40,
        borderRadius: 8,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTextZone: {
        width: '100%'
    },
    detailBox: {
        flex: 1,
        borderRadius: 15,
        margin: 10
    },
    text: {
        fontSize: 18,
        fontWeight: '300'
    },
    bigText: {
        fontSize: 25,
        fontWeight: '500'
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    outBorder: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        margin: '10%',
        marginTop: '+60%',
        marginBottom: '+60%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '0000'
    },
    textBoxLayout: {
        marginLeft: '7%'
    },
    litleText: {
        fontSize: 16,
        fontWeight: '300'
    },
    modalHeadText: {
        fontSize: 20,
        fontWeight: '500'
    },
    modalText: {
        fontSize: 16,
        fontWeight: '300'
    },
    modelOhterText: {
        fontSize: 14,
        fontWeight: '300'
    }
})

export default VehicleDetail