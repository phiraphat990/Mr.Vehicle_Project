import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from '../database/configdb';
const MakeContract_2 = ({ route, navigation }) => {

    return (
        <ScrollView style={styles.container}>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2D2B29",
        padding: 15,
    },
    view: {
        width: 350,
        // height:1490,
        borderRadius: 20,

        backgroundColor: "#ffffff",
        alignSelf: "center",
        padding: 30, marginBottom: 20
    },
    textinput: {
        borderRadius: 4,
        borderColor: "black",
        borderWidth: 1,
        height: 17,
        width: 80,
        alignSelf: "center",
    },
    btn1: {
        color: "black",
        fontWeight: "bold",
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 70,
        paddingBottom: 50,
        paddingTop: 30
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
        borderRadius: 4,
        padding: 10
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
});

export default MakeContract_2;
