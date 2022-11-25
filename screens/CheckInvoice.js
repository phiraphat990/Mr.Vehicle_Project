import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { ScrollView, } from "react-native-gesture-handler";
import { DataTable } from 'react-native-paper';

const MakeInvoice = ({ navigation }) => {

    const [itemsc, setItemsc] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

    return (
        <ScrollView style={styles.container}>
            <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", padding: 20 }}>ใบแจ้งหนี้</Text>

            <DataTable style={styles.view}>
                <Text>ชื่อ 
                    นามสกุล 
                    {"\n"}การเช่ายานพาหนะกำหนดระยะเวลา  วัน
                    {"\n"}  นับตั้งแต่วันที่
                    เดือน
                    พ.ศ.
                    {"\n"}ถึงวันที่
                    เดือน
                    พ.ศ.
                </Text>

                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell style={{ paddingLeft: 42 }}>รายการ</DataTable.Cell>
                    <DataTable.Cell style={{ borderLeftWidth: 2, justifyContent: "flex-end" }}>จำนวนเงิน (บาท)</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell>ค่ามัดจำ</DataTable.Cell>
                    <DataTable.Cell style={{ borderLeftWidth: 2, justifyContent: "flex-end" }} >
                    <View>
                            {/* รอ get */}
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell>ค่าเช่ายานพาหนะ</DataTable.Cell>
                    <DataTable.Cell style={{ borderLeftWidth: 2, justifyContent: "flex-end" }} >
                    <View>
                            {/* รอ get */}
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell>ค่าประกัน</DataTable.Cell>
                    <DataTable.Cell style={{ borderLeftWidth: 2, justifyContent: "flex-end" }} >
                    <View>
                            {/* รอ get */}
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell>ค่าปรับ ค่าเสียหาย</DataTable.Cell>
                    <DataTable.Cell style={{ borderLeftWidth: 2, justifyContent: "flex-end" }} >
                    <View>
                            {/* รอ get */}
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell>อื่นๆ</DataTable.Cell>
                    <DataTable.Cell style={{ borderLeftWidth: 2, justifyContent: "flex-end" }} >
                    <View>
                            {/* รอ get */}
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={[styles.tableHeader,]}>
                    <DataTable.Cell style={{ borderRightWidth: 2, paddingRight: 42.5 }}>เงินรวมก่อนภาษี</DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: "flex-end" }} >
                        <View>
                            {/* รอ get */}
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader}>
                    <DataTable.Cell style={{ borderRightWidth: 2, paddingRight: 42.5 }}>ภาษีมูลค่าเพิ่ม 7 %</DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: "flex-end" }}>
                        <View>
                            {/* รอ get */}
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableHeader2}>
                    <DataTable.Cell style={{ borderRightWidth: 2, paddingRight: 42.5 }}>รวมสุทธิ</DataTable.Cell>
                    <DataTable.Cell style={{ justifyContent: "flex-end" }}>
                        <View>
                            {/* รอ get */}
                        </View>
                    </DataTable.Cell>
                </DataTable.Row>


                {/* <Picker>
                    <Picker.Item label="samad" value ="จ่ายเงินแล้ว"/>
                    <Picker.Item label="samad" value ="ยังไม่ได้จ่ายเงิน"/>
                </Picker> */}

            </DataTable>

            <View style={styles.btn1}>
                <TouchableOpacity >
                    <Text style={styles.text} >Back</Text>
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
        borderRadius: 15,
        backgroundColor: "#ffffff",
        alignSelf: "center",
        padding: 10
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
    tableHeader: {
        borderWidth: 2,
    },
    tableHeader2: {
        borderWidth: 2,
        borderBottomColor: "black",
        borderBottomWidth: 2,
    }
});

export default MakeInvoice;
