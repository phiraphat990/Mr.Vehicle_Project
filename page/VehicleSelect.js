import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Filter from '../component/Filter'

import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, authentication } from '../database/configdb';

const VehicleSelect = ({ route, navigation }) => {
    const [priceInput, setPriceInput] = useState();
    const [brandInput, setBrandInput] = useState("");
    const [vId] = useState([]);

    //ค่า user Renter นำเข้า
    const { uID } = route.params
    const [uId] = useState(uID)
    const { userRenterEmail } = route.params
    const [uRenterEmail] = useState(userRenterEmail)

    {/** ตั้งค่าตอนเปิดหน้า */ }
    useEffect(() => {
        if (filterVisible == undefined) { setFilterOpen(false) }
        if (priceInput == undefined) { setPriceInput(10) }
        getDocs(collection(db, "vehicleDetails"))
            .then(docSnap => {
                docSnap.forEach((doc) => {
                    vId.push({ ...doc.data(), id: doc.id })
                });
                // console.log("vID:", vId)
                // console.log("uId:", uId)
                // console.log("user renter email:", uRenterEmail)
                // console.log(vehicleID)
                setFilteredData(vId)
                console.log(vId)
            }).catch((error) => {
                // The write failed...
                alert(error);
            });
    }, []);

    {/**ฟังก์ชันการค้นหา*/ }
    const [filteredData, setFilteredData] = useState([])
    //ค้นหาตามชื่อแบรนด์
    const searchByBrand = (text) => {
        setBrandInput(text)
        if (text) {
            const newData = vId.filter(item => {
                const itemData = item.brand.toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1
            })
            setFilteredData(newData);
            console.log('Test text:', text)
        } else {
            setFilteredData(vId);
        }
    }
    //เก็บค่าราคา
    const savePriceInput = (price) => {
        if (price) {
            setPriceInput(price)
            if (price >= 1000) {
                console.log(price)
            }
        } else if (price <= 10) {
            setPriceInput(null)
        }
    }
    //กดปุ่มแว่นขยายเพื่อหาราคากับชื่อพร้อมกัน
    const allSearch = () => {
        console.log("สิ่งที่หา:", "ชื่อแบรนด์ขึ้นด้วย", brandInput, "ที่ราคามากสุด", priceInput)
        // console.log(filteredData)
        if (priceInput == undefined) { setPriceInput(null) }

        if ((priceInput == null || priceInput <= 10) && (brandInput == "" || brandInput == undefined)) {
            setFilteredData(vId)
        } else {
            const newData = vId.filter(item => {
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
                const checkPriceInputIsNull = (priceInput <= 10)
                const checkPriceInputIsNotNull = (priceInput > 10)

                const itemPriceData = item.vehicle

                if (checkType && checkOS && checkSize && checkTextInputNotNull && checkPriceInputIsNotNull) {
                    console.log('case', 1, 'หาทุกอย่าง') //ok
                    return (itemTypeData && itemOSData && itemSize && itemData.indexOf(textData) > -1 && itemPriceData == priceInput)
                } else if (checkType && checkOS && checkSize && checkTextInputIsNull && checkPriceInputIsNull) {
                    console.log('case', 2, '') //ok
                    return (itemTypeData && itemOSData && itemSize)
                } else if (checkType && checkOS && checkTextInputIsNull && sizeData == '' && checkPriceInputIsNull) {
                    console.log('case', 3, '') //ok
                    return (itemTypeData && itemOSData)
                } else if (checkType && checkSize && checkTextInputIsNull && checkPriceInputIsNull) {
                    console.log('case', 4, '') //ok
                    return (itemTypeData && itemSize)
                } else if (checkOS && checkSize && checkTextInputIsNull && checkPriceInputIsNull) {
                    console.log('case', 5, '') //ok
                    return (itemOSData && itemSize)
                } else if (checkType && checkTextInputIsNull && osData == '' && sizeData == '' && checkPriceInputIsNull) {
                    console.log('case', 6, '') //ok
                    return (itemTypeData)
                } else if (checkOS && checkTextInputIsNull && tpyeData == '' && sizeData == '' && checkPriceInputIsNull) {
                    console.log('case', 7, '') //ok
                    return (itemOSData)
                } else if (checkSize && checkTextInputIsNull && checkPriceInputIsNull) {
                    console.log('case', 8, '') //ok
                    return (itemSize)
                } else if (checkType && checkOS && checkTextInputNotNull && sizeData == '' && checkPriceInputIsNotNull) {
                    console.log('case', 9, '') //ok
                    return (itemTypeData && itemOSData && itemData.indexOf(textData) > -1 && itemPriceData == priceInput)
                } else if (checkType && checkSize && checkTextInputNotNull && osData == '' && checkPriceInputIsNotNull) {
                    console.log('case', 10, '') //ok
                    return (itemTypeData && itemSize && itemData.indexOf(textData) > -1 && itemPriceData == priceInput)
                } else if (checkOS && checkSize && checkTextInputNotNull && checkPriceInputIsNotNull) {
                    console.log('case', 11, '') //ok
                    return (itemOSData && itemSize && itemData.indexOf(textData) > -1 && itemPriceData == priceInput)
                } else if (checkType && checkTextInputNotNull && osData == '' && sizeData == '' && checkPriceInputIsNotNull) {
                    console.log('case', 12, '') //ok
                    return (itemTypeData && itemData.indexOf(textData) > -1 && itemPriceData == priceInput)
                } else if (checkOS && checkTextInputNotNull && tpyeData == '' && sizeData == '' && checkPriceInputIsNotNull) {
                    console.log('case', 13, '') //ok
                    return (itemOSData && itemData.indexOf(textData) > -1 && itemPriceData == priceInput)
                } else if (checkSize && checkTextInputNotNull && checkPriceInputIsNotNull) {
                    console.log('case', 14, '') //ok
                    return (itemSize && itemData.indexOf(textData) > -1 && itemPriceData == priceInput)
                } else if (checkPriceInputIsNotNull && tpyeData == '' && osData == '' && sizeData == '' && checkTextInputIsNull) {
                    return (itemPriceData == priceInput)
                } else if (checkTextInputNotNull && checkPriceInputIsNull && tpyeData == '' && osData == '' && sizeData == '') {
                    return (itemData.indexOf(textData) > -1)
                }
            })
            setFilteredData(newData)
        }
    }
    {/**จบส่วนการค้นหา */ }

    {/**ส่วนที่ทำงานกับ Filter*/ }
    //ฟังก์ชันรับค่าจาก Filter
    const [checkBoxType, setCheckBoxType] = useState(false)
    const [isType, setIsType] = useState('')
    const [checkBoxOS, setCheckBoxOS] = useState(false)
    const [isOS, setIsOS] = useState('')
    const [checkBoxSize, setCheckBoxSize] = useState(false)
    const [isSize, setIsSize] = useState('')
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
    //ฟังก์ชันสั่งการเปิด Filter
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
    {/**จบส่วนที่ทำงานกับ Filter*/ }

    {/**ส่วนการ List Box Item จาก Data*/ }
    const ListItem = filteredData.map(Data =>


        <SafeAreaView key={Data.id} style={{ flex: 1, backgroundColor: '#F3C623', borderRadius: 10, width: '100%', flexWrap: 'wrap', marginTop: '2%' }}>
       
       {Data.usedStatus?"":[
        <SafeAreaView style={{ flexDirection: 'row', flex: 1, margin: 10 }}>
        <SafeAreaView style={styles.viewVehicleImage}>
            <Image source={{ uri: Data.Image }} style={{ width: 180, height: 120, borderRadius: 15, margin: 10 }} />
        </SafeAreaView>
        <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.headText}>{Data.brand.toUpperCase()}</Text>
            <Text style={styles.text}><AntDesign name="caretright" size={16} color="black" /> {Data.seats} Seats</Text>
            <Text style={styles.text}><AntDesign name="caretright" size={16} color="black" /> {Data.model}</Text>
            <Text style={styles.text}><AntDesign name="caretright" size={16} color="black" /> {Data.os.toUpperCase()}</Text>
            <Text style={styles.text}><AntDesign name="caretright" size={16} color="black" /> {Data.size.toUpperCase()}</Text>
        </SafeAreaView>
    </SafeAreaView>,
            <SafeAreaView style={[styles.boxLayout, { marginTop: '-2%', flexDirection: 'row' }]}>
                <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <SafeAreaView style={[styles.Layout]}>
                        <View style={styles.viewBoxUn}>
                            <Text style={styles.text}>Price for 1 Days</Text>
                        </View>
                    </SafeAreaView>
                    <SafeAreaView style={[styles.Layout]}>
                        <View style={[styles.viewBoxUn]}>
                            <Text style={styles.text}>THB {Data.vehicle}</Text>
                        </View>
                    </SafeAreaView>
                </SafeAreaView>
                <SafeAreaView style={{ flex: 1 }}></SafeAreaView>
            </SafeAreaView>,<SafeAreaView style={[styles.boxLayout, { padding: 10, marginRight: '6%' }]}>
                <SafeAreaView style={[styles.Layout, { alignItems: 'flex-end' }]}>
                    <TouchableOpacity
                        style={{ padding: 10, backgroundColor: '#FBE0AB', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => navigation.navigate("VEHICLE DETAIL", { vID: Data.id, userRenterEmail: uRenterEmail, userRentalEmail: Data.rentalEmail })} >
                        <Text style={styles.headText}>View Details</Text>
                        <AntDesign name="caretright" size={20} color="black" />
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView>
]}
           

            
        </SafeAreaView>
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
                <SafeAreaView style={{ flex: 1, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '5%' }}>
                    {/* <AntDesign name="bars" size={35} color="black" style={{ marginRight: '3%' }} /> */}
                    <View style={{ flexDirection: 'row', borderRadius: 10, width: 300, backgroundColor: '#fff' }}>
                        <TextInput
                            placeholder="ชื่อของแบรนด์"
                            style={{ width: 300, height: 50, backgroundColor: '#fff', padding: 10, fontSize: 18, borderRadius: 10 }}
                            onChangeText={(text) => searchByBrand(text)} />
                        <AntDesign onPress={() => allSearch()} name="search1" size={30} color="black" style={{ position: 'absolute', alignSelf: 'center', right: 0, marginRight: '5%' }} />
                    </View>
                </SafeAreaView>

                <SafeAreaView style={{ flex: 2, width: '100%', alignItems: 'flex-start', marginTop: '3%', marginBottom: '3%', }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={[styles.headText]}>Filter</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                        </View>
                    </View>
                    <SafeAreaView style={{ flex: 1, width: '100%', marginTop: '3%', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity
                            style={styles.touchableOpacity}
                            onPress={() => handleFilter(true)}
                        >
                            <AntDesign name="filter" size={24} color="black" />
                            <Text style={{ fontSize: 20, marginLeft: '2%' }}>ประเภท</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={{ width: 120, height: 50, backgroundColor: '#fff', borderColor: 'black', borderRadius: 8, borderWidth: 1, padding: 10, fontSize: 20, }}
                            placeholder="พrราคาที่ต้องการ"
                            onChangeText={(price) => savePriceInput(price)}
                        />
                    </SafeAreaView>
                </SafeAreaView>
            </SafeAreaView>

            {/**Mid Zone*/}
            <SafeAreaView style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'flex-start', marginTop: '3%', marginLeft: '3%' }}>
                <Text style={[styles.headText, { color: '#fff' }]}>Search Result</Text>
            </SafeAreaView>

            {/**Last Zone ส่วนใส่ component VehicleStatusDetails */}
            <SafeAreaView style={{ flex: 6, width: '100%', flexDirection: 'column', }}>
                <View style={{ flex: 1, width: '100%', padding: 10 }}>
                    {ListItem}
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
        backgroundColor: '#2D2B29',
    },
    headText: {
        fontSize: 30,
        fontWeight: '500'
    },
    touchableOpacity: {
        flexDirection: 'row',
        width: 120,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        flexWrap: 'wrap'
    },
    text: {
        fontSize: 18,
        fontWeight: '300'
    },
    headText: {
        fontSize: 20,
        fontWeight: '600'
    },
    viewVehicleImage: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        margin: 10
    }, boxLayout: {
        flex: 1,
        margin: '3%'
    }, Layout: {
        flex: 1,
        width: 'auto'
    }, viewBoxUn: {
        borderRadius: 10,
    },
})

export default VehicleSelect