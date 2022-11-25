import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, Image, FlatList, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import Filter from '../component/Filter'

import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, authentication } from '../database/configdb';
const VehicleStatus = ({ route, navigation }) => {
    const [vData] = useState([])
    const [contractData] = useState([])
    const { Emails } = route.params
    const [rentalEmail] = useState(Emails)
    const [filteredData, setFilteredData] = useState([])
    useEffect(() => {
        getDocs(query(collection(db, "vehicleDetails"), where('rentalEmail', '==', rentalEmail)))
            .then(docSnap => {
                docSnap.forEach((doc) => {
                    vData.push({ ...doc.data(), id: doc.id })
                });
            }).catch((error) => {
                alert(error);
            });
        setFilteredData(vData)
        console.log('vData suscess')
    }, []);

    useEffect(() => {
        getDocs(query(collection(db, "contract"), where('rentalEmail', '==', rentalEmail)))
            .then(docSnap => {
                docSnap.forEach((doc) => {
                    vData.map(dataDoc => {
                        if (dataDoc.id == doc.data().vId && dataDoc.rentalEmail == doc.data().rentalEmail) {
                            contractData.push({ renterEmail: doc.data().renterEmail, renterId: doc.data().renterId, vehicleId: doc.data().vId, rentalEmail: doc.data().rentalEmail, })
                        }
                    })
                });
            }).catch((error) => {
                alert(error);
            });

        console.log('Contract suscess')
    }, []);

    const saveCheckBoxValue = (type1, type2, type3, os1, os2, size1, size2, size3) => {
        if (type1) {
            setCheckBoxType(true)
            setIsType('car')
        } else if (type2) {
            setCheckBoxType(true)
            setIsType('motor')
        } else if (type3) {
            setCheckBoxType(true)
            setIsType('bicycle')
        } else if (!(type1, type2, type3)) {
            console.log('all type false')
            setCheckBoxType(false)
            setIsType('')
        }

        if (os1) {
            setCheckBoxOS(true)
            setIsOS('auto')
        } else if (os2) {
            setCheckBoxOS(true)
            setIsOS('manual')
        } else if (!(os1, os2)) {
            console.log('all os false')
            setCheckBoxOS(false)
            setIsOS('')
        }

        if (size1) {
            setCheckBoxSize(true)
            setIsSize('small')
        } else if (size2) {
            setCheckBoxSize(true)
            setIsSize('medium')
        } else if (size3) {
            setCheckBoxSize(true)
            setIsSize('big')
        } else if (!(size1, size2, size3)) {
            console.log('all size false')
            setCheckBoxSize(false)
            setIsSize('')
        }
    }

    const [filterVisible, setFilterVisible] = useState(false)
    const handleFilter = (status, type1, type2, type3, os1, os2, size1, size2, size3) => {
        if (status || !status) {
            setFilterVisible(status)
        } else {
            setFilterVisible(false)
        }

        if (!status) {
            console.log('click from Filter')
            if (type3) {
                saveCheckBoxValue(type1, type2, type3, false, false, size1, size2, size3)
            } else if (!type3) {
                saveCheckBoxValue(type1, type2, type3, os1, os2, size1, size2, size3)
            }
        } else if (status == 'close') {
            console.log('User Pass X')
        }
        else if (status) {
            console.log('click from VehicleSelect')
        }
    }

    {/**ตัวแปร VehicleBox */ }

    const goToNextPage = (rentalEmail, vehicleId, numberCase) => {
        console.log('รับเข้า', rentalEmail, 'รับเข้า', vehicleId, 'รับเข้าเลข', numberCase)
        contractData.map(data => {
            if (rentalEmail == data.rentalEmail && vehicleId == data.vehicleId) {
                console.log('ยืนยัน section ข้อมูลถูกต้อง')
                if (numberCase == 1) {
                    //เปลี่ยนจุดหมายเป็น MANAGE ACCOUNT
                    navigation.navigate("MANAGE ACCOUNT", { userRenterEmail: data.renterEmail })
                } else if (numberCase == 2) {
                    navigation.navigate("RENTER INVOICE", { RentalEmail: data.rentalEmail, userRenterEmail: data.renterEmail, uID: data.renterId, vehicleId: data.vehicleId })
                } else if (numberCase == 3) {
                    navigation.navigate("Contract page 1", { userRenterEmail: data.renterEmail, uID: data.renterId, vehicleId: data.vehicleId })
                }
            } else {
                console.log('ข้อมูลไม่ตรงกัน')
            }
        })
    }

    const test = () => {
        console.log(contractData)
    }

    {/**การค้นหา*/ }
    const [brandInput, setBrandInput] = useState("");
    //ค้นหาตามชื่อแบรนด์
    const searchByBrand = (text) => {
        setBrandInput(text)
        if (text) {
            const newData = vData.filter(item => {
                const itemData = item.brand.toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1
            })
            setFilteredData(newData);
            console.log('Test text:', text)
        } else {
            setFilteredData(vData);
        }
    }
    const [checkBoxType, setCheckBoxType] = useState(false)
    const [isType, setIsType] = useState('')
    const [checkBoxOS, setCheckBoxOS] = useState(false)
    const [isOS, setIsOS] = useState('')
    const [checkBoxSize, setCheckBoxSize] = useState(false)
    const [isSize, setIsSize] = useState('')
    const filterAll = () => {
        console.log("สิ่งที่หา:", "ชื่อแบรนด์ขึ้นด้วย", brandInput, "ประเภทยานพาหนะ", isType, "รูปแบบของ เกียร์", isOS, "ที่ขนาด", isSize)
        const newData = vData.filter(item => {
            const itemData = item.brand.toUpperCase()
            const textData = brandInput.toUpperCase()
            const itemTypeData = item.VehicleType
            const tpyeData = isType
            const itemOSData = item.os
            const osData = isOS
            const itemSize = item.size
            const sizeData = isSize

            const checkType = (itemTypeData == tpyeData)
            const checkOS = (itemOSData == osData)
            const checkSize = (itemSize == sizeData)
            const checkTextInputNotNull = (brandInput != '')
            const checkTextInputIsNull = (brandInput == '')

            if (checkType && checkOS && checkSize && checkTextInputNotNull) {
                console.log('case', 1, 'หาทุกอย่าง') //ok
                return (itemTypeData && itemOSData && itemSize && itemData.indexOf(textData) > -1)
            } else if (checkType && checkOS && checkSize && checkTextInputIsNull) {
                console.log('case', 2, '') //ok
                return (itemTypeData && itemOSData && itemSize)
            } else if (checkType && checkOS && checkTextInputIsNull && sizeData == '') {
                console.log('case', 3, '') //ok
                return (itemTypeData && itemOSData)
            } else if (checkType && checkSize && checkTextInputIsNull) {
                console.log('case', 4, '') //ok
                return (itemTypeData && itemSize)
            } else if (checkOS && checkSize && checkTextInputIsNull) {
                console.log('case', 5, '') //ok
                return (itemOSData && itemSize)
            } else if (checkType && checkTextInputIsNull && osData == '' && sizeData == '') {
                console.log('case', 6, '') //ok
                return (itemTypeData)
            } else if (checkOS && checkTextInputIsNull && tpyeData == '' && sizeData == '') {
                console.log('case', 7, '') //ok
                return (itemOSData)
            } else if (checkSize && checkTextInputIsNull) {
                console.log('case', 8, '') //ok
                return (itemSize)
            } else if (checkType && checkOS && checkTextInputNotNull && sizeData == '') {
                console.log('case', 9, '') //ok
                return (itemTypeData && itemOSData && itemData.indexOf(textData) > -1)
            } else if (checkType && checkSize && checkTextInputNotNull && osData == '') {
                console.log('case', 10, '') //ok
                return (itemTypeData && itemSize && itemData.indexOf(textData) > -1)
            } else if (checkOS && checkSize && checkTextInputNotNull) {
                console.log('case', 11, '') //ok
                return (itemOSData && itemSize && itemData.indexOf(textData) > -1)
            } else if (checkType && checkTextInputNotNull && osData == '' && sizeData == '') {
                console.log('case', 12, '') //ok
                return (itemTypeData && itemData.indexOf(textData) > -1)
            } else if (checkOS && checkTextInputNotNull && tpyeData == '' && sizeData == '') {
                console.log('case', 13, '') //ok
                return (itemOSData && itemData.indexOf(textData) > -1)
            } else if (checkSize && checkTextInputNotNull) {
                console.log('case', 14, '') //ok
                return (itemSize && itemData.indexOf(textData) > -1)
            }
        })
        setFilteredData(newData)
    }

    const listItem = filteredData.map(data =>
        <View key={data.id}>
            {data.usedStatus
                ? (
                    //เคสโดนจอง
                    <SafeAreaView style={styles.isInUseds}>
                        <SafeAreaView style={[styles.boxLayout]}>
                            <SafeAreaView style={styles.viewVehicleImage}>
                                <Image source={{ uri: data.Image }} style={[styles.vehicleImage, { backgroundColor: '#FEC7C7', }]} />
                            </SafeAreaView>
                            <SafeAreaView style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                                <Text style={styles.boxHeadText}>{data.brand.toUpperCase()}</Text>
                                <Text style={styles.text}><AntDesign name="caretright" size={16} color="black" /> {data.seats} Seats</Text>
                                <Text style={styles.text}><AntDesign name="caretright" size={16} color="black" /> {data.os.toUpperCase()}</Text>
                                <Text style={styles.text}><AntDesign name="caretright" size={16} color="black" /> {data.model}</Text>
                            </SafeAreaView>
                        </SafeAreaView>

                        <SafeAreaView style={[styles.boxLayout, { marginTop: '-2%', }]}>
                            <SafeAreaView style={[styles.Layout, { alignItems: 'center' }]}>
                                <View style={styles.viewBoxUn}>
                                    {data.usedStatus ? (
                                        <Text style={styles.text}>Unavailiable</Text>
                                    ) : (
                                        <Text style={styles.text}>Availiable</Text>
                                    )}
                                </View>
                            </SafeAreaView>
                            <SafeAreaView style={[styles.Layout, { alignItems: 'flex-end', marginRight: '5%' }]}>
                                {data.usedStatus ? (
                                    <View style={[styles.viewBoxUn]}>
                                        <Text style={styles.text}>Paid</Text>
                                    </View>
                                ) : null}
                            </SafeAreaView>
                        </SafeAreaView>

                        <SafeAreaView style={[styles.boxLayout, { padding: 10 }]}>
                            <SafeAreaView style={[styles.Layout, { alignItems: 'center' }]}>
                                <TouchableOpacity onPress={() => goToNextPage(data.rentalEmail, data.id, 1)} style={[styles.touchableOpacityInBox]}>
                                    <Text style={{ fontSize: 12, fontWeight: '300' }}>View Renter</Text>
                                    <AntDesign name="user" size={14} color="black" style={styles.miniLogo} />
                                </TouchableOpacity>
                            </SafeAreaView>
                            <SafeAreaView style={[styles.Layout, { alignItems: 'center' }]}>
                                <TouchableOpacity onPress={() => goToNextPage(data.rentalEmail, data.id, 2)} style={[styles.touchableOpacityInBox]}>
                                    <Text style={{ fontSize: 12, fontWeight: '300' }}>View Invoice</Text>
                                    <Entypo name="text-document" size={14} color="black" style={styles.miniLogo} />
                                </TouchableOpacity>
                            </SafeAreaView>
                            <SafeAreaView style={[styles.Layout, { alignItems: 'center' }]}>
                                <TouchableOpacity onPress={() => goToNextPage(data.rentalEmail, data.id, 3)} style={[styles.touchableOpacityInBox]}>
                                    <Text style={{ fontSize: 12, fontWeight: '300' }}>View Contract</Text>
                                    <FontAwesome5 name="file-contract" size={14} color="black" style={styles.miniLogo} />
                                </TouchableOpacity>
                            </SafeAreaView>
                        </SafeAreaView>
                    </SafeAreaView>
                )
                : (
                    //เคสยังไม่โดนจอง
                    <SafeAreaView style={styles.isNotInUseds}>
                        <SafeAreaView style={[styles.boxLayout]}>
                            <SafeAreaView style={styles.viewVehicleImage}>
                                <Image source={{ uri: data.Image }} style={[styles.vehicleImage, { backgroundColor: '#C9FFCC' }]} />
                            </SafeAreaView>
                            <SafeAreaView style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                                <Text style={styles.boxHeadText}>{data.brand.toUpperCase()}</Text>
                                <Text style={styles.text}><AntDesign name="caretright" size={16} color="black" /> {data.seats} Seats</Text>
                                <Text style={styles.text}><AntDesign name="caretright" size={16} color="black" /> {data.os.toUpperCase()}</Text>
                                <Text style={styles.text}><AntDesign name="caretright" size={16} color="black" /> {data.model}</Text>
                            </SafeAreaView>
                        </SafeAreaView>

                        <SafeAreaView style={[styles.boxLayout, { marginTop: '-2%', }]}>
                            <SafeAreaView style={[styles.Layout, { alignItems: 'center' }]}>
                                <View style={{ padding: 5, backgroundColor: '#C9FFCC', borderRadius: 10, }}>
                                    {data.usedStatus ? (
                                        <Text style={styles.text}>Unavailiable</Text>
                                    ) : (
                                        <Text style={styles.text}>Availiable</Text>
                                    )}
                                </View>
                            </SafeAreaView>
                            <SafeAreaView style={[styles.Layout, { alignItems: 'flex-end', marginRight: '5%' }]}>

                            </SafeAreaView>
                        </SafeAreaView>

                        <SafeAreaView style={[styles.boxLayout, { padding: 10 }]}>
                            <SafeAreaView style={[styles.Layout, { alignItems: 'center' }]}>
                                <TouchableOpacity disabled={true} style={[styles.touchableOpacityInBoxDisabled]}>
                                    <Text style={{ fontSize: 12, fontWeight: '300', color: 'white' }}>View Renter</Text>
                                    <AntDesign name="user" size={14} color="white" style={styles.miniLogo} />
                                </TouchableOpacity>
                            </SafeAreaView>
                            <SafeAreaView style={[styles.Layout, { alignItems: 'center' }]}>
                                <TouchableOpacity disabled={true} onPress={() => goToNextPage(data.rentalEmail, data.id, 2)} style={[styles.touchableOpacityInBoxDisabled]}>
                                    <Text style={{ fontSize: 12, fontWeight: '300', color: 'white' }}>View Invoice</Text>
                                    <Entypo name="text-document" size={14} color="white" style={styles.miniLogo} />
                                </TouchableOpacity>
                            </SafeAreaView>
                            <SafeAreaView style={[styles.Layout, { alignItems: 'center' }]}>
                                <TouchableOpacity disabled={true} onPress={() => goToNextPage(data.rentalEmail, data.id, 3)} style={[styles.touchableOpacityInBoxDisabled]}>
                                    <Text style={{ fontSize: 12, fontWeight: '300', color: 'white' }}>View Contract</Text>
                                    <FontAwesome5 name="file-contract" size={14} color="white" style={styles.miniLogo} />
                                </TouchableOpacity>
                            </SafeAreaView>
                        </SafeAreaView>
                    </SafeAreaView>
                )
            }
        </View>
    )

    return (
        <ScrollView style={styles.container}>
            {/**Pop up*/}
            {filterVisible ? (
                <Modal transparent={true} visible={filterVisible}>
                    <Filter setFilter={handleFilter} />
                </Modal>
            ) : null}
            {/**Top Zone*/}
            <SafeAreaView style={{ flex: 2, backgroundColor: '#F3C623', width: '100%', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, alignItems: 'center' }}>
                <SafeAreaView style={{ flex: 1, width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '1%' }}>
                    {/* <AntDesign onPress={() => test()} name="bars" size={35} color="black" style={{ marginRight: '3%' }} /> */}
                    <View style={{ flexDirection: 'row', width: 300, borderRadius: 10, backgroundColor: '#fff' }}>
                        <TextInput
                            placeholder='ยี่ห้อยานพาหนะ'
                            style={{ width: 300, height: 50, backgroundColor: '#fff', borderRadius: 10, padding: 10, fontSize: 16, }} />
                        <AntDesign onPress={() => filterAll()} name="search1" size={30} color="black" style={{ position: 'absolute', alignSelf: 'center', right: 0, marginRight: '2%' }} />
                    </View>
                </SafeAreaView>

                <SafeAreaView style={{ flex: 2, width: '90%', alignItems: 'center', marginTop: '3%', marginBottom: '3%' }}>
                    <Text style={[styles.headText,]}>Filter</Text>
                    <TouchableOpacity
                        style={styles.touchableOpacity}
                        onPress={() => handleFilter(true)}>
                        <AntDesign name="filter" size={24} color="black" />
                        <Text style={{ fontSize: 20, marginLeft: '2%' }}>ประเภท</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView>

            {/**Mid Zone*/}
            <SafeAreaView style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'flex-start', marginTop: '3%', marginLeft: '3%' }}>
                <Text style={[styles.headText, { color: '#fff' }]}>Search Result</Text>
            </SafeAreaView>

            {/**Last Zone ส่วนใส่ component VehicleStatusDetails */}
            <SafeAreaView style={{ flex: 6, width: '100%', flexDirection: 'column', }}>
                <View style={{ flex: 1, width: '100%', padding: 10 }}>
                    {listItem}
                    {/* <VehicleBox brand="TOYOTA" seats="4" os="Auto" status={true} paidStatus={true} periodUsed="750" />
                    <VehicleBox brand="YAMAHA" seats="2" os="Auto" status={false} paidStatus={false} periodUsed="0" /> */}
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#2D2B29'
    },
    headText: {
        fontSize: 25,
        fontWeight: '500'
    },
    touchableOpacity: {
        marginTop: '3%',
        flexDirection: 'row',
        width: 300,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black'
    },
    vehicleImage: {
        width: 180,
        height: 120,
        borderRadius: 15,
    },
    boxLayout: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 10,
        margin: 10
    },
    text: {
        fontSize: 16,
        fontWeight: '300'
    },
    boxHeadText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    Layout: {
        flex: 1,
        width: '100%'
    },
    touchableOpacityInBox: {
        padding: 5,
        backgroundColor: '#FFD051',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    touchableOpacityInBoxDisabled: {
        padding: 5,
        backgroundColor: '#505050',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    miniLogo: {
        marginLeft: '3%'
    },
    viewBoxUn: {
        padding: 5,
        backgroundColor: '#FEC7C7',
        borderRadius: 10,
    },
    viewBoxAva: {
        padding: 5,
        backgroundColor: '#ADFFBA',
        borderRadius: 10,
    },
    viewVehicleImage: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    isInUseds: {
        flex: 1,
        backgroundColor: '#ED6161',
        width: '100%',
        borderRadius: 15,
        flexWrap: 'wrap',
        marginTop: '2%'
    },
    isNotInUseds: {
        flex: 1,
        backgroundColor: '#76FA7C',
        width: '100%',
        borderRadius: 15,
        flexWrap: 'wrap',
        marginTop: '2%'
    }

})

export default VehicleStatus