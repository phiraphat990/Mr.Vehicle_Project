import React, { useState, useRef } from "react";
import { Animated, Easing, SafeAreaView, StyleSheet, TextInput, View, Text, Button, TouchableOpacity, Image, ScrollView, FlatList } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const UselessTextInput = ({ route, navigation }) => {
    const animVal = useRef(new Animated.Value(0)).current;
    const animVal1 = useRef(new Animated.Value(0)).current;
    const animVal2 = useRef(new Animated.Value(0)).current;
    const animVal3 = useRef(new Animated.Value(0)).current;

    const rotateX = animVal.interpolate({
        inputRange: [0, 0.25, 0.5, 0.75, 1],
        outputRange: ["0deg", "-3deg", "0deg", "-3deg", "0deg"],
    });
    const rotatelg = animVal.interpolate({
        inputRange: [0, 0.25, 0.5, 0.75, 1],
        outputRange: ["0deg", "-2deg", "0deg", "-2deg", "0deg"],
    });
    const opacity = animVal.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.4, 1, 0.4],
    });
    const movingMargin = animVal.interpolate({
        inputRange: [0, 0.25, 0.5, 0.75, 1],
        outputRange: [0, -40, 0, 40, 0],
    });
    const moving = animVal1.interpolate({
        inputRange: [0, 1],
        outputRange: [-400, 400],
    });
    const moving2 = animVal2.interpolate({
        inputRange: [0, 0.25, 0.5, 0.75, 1],
        outputRange: [0, -30, 0, 30, 0],
    });
    const moving3 = animVal3.interpolate({
        inputRange: [0, 0.25, 0.5, 1],
        outputRange: [0, -30, 30, 0],
    });
    Animated.loop(
        Animated.parallel([
            Animated.timing(animVal, {
                toValue: 1,
                duration: 9000,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(animVal1, {
                toValue: 1,
                duration: 9000,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(animVal2, {
                toValue: 1,
                duration: 6000,
                easing: Easing.linear,
                useNativeDriver: true,
            }), Animated.timing(animVal3, {
                toValue: 1,
                duration: 9000,
                easing: Easing.linear,
                useNativeDriver: true,
            })

        ])).start(() => {
            animVal.setValue(0);
            animVal1.setValue(0);
            animVal2.setValue(0);
            animVal3.setValue(0);
        });


    return (
        <ScrollView style={styles.container}>
            <Animated.Image style={[styles.pic10, { transform: [{ rotate: rotatelg }] }]}
                source={require("../assets/logo.png")}

            />
            <Animated.Image style={{ translateX: movingMargin, width: 480, height: 600, zIndex: 2, position: "absolute", left: -40, top: 0 }}
                source={require("../assets/fpcar.png")}

            />
            <Animated.Image style={[styles.pic8, { translateX: moving, opacity: opacity }]}
                source={require("../assets/fpcloud1.png")}

            />
            <Animated.Image style={[styles.pic6, { translateX: moving, opacity: opacity }]}
                source={require("../assets/fpcloud2.png")}

            />
            <Animated.Image style={styles.pic9}
                source={require("../assets/fphill.png")}

            />
            <Animated.Image style={[styles.pic7, { translateX: moving, opacity: opacity }]}
                source={require("../assets/fpcloud3.png")}

            />
            <Animated.Image style={[styles.pic4, { translateX: moving2, transform: [{ rotate: rotateX }] }]}
                source={require("../assets/fpbike.png")}

            />
            <Animated.Image style={[styles.pic5, { translateX: moving3, transform: [{ rotate: rotateX }] }]}
                source={require("../assets/fpbycicle.png")}

            />
            <Animated.Image style={styles.pic2}
                source={require("../assets/fpbg.png")}

            />

            <Animated.Image style={styles.pic3}
                source={require("../assets/fpstreet.png")}

            />
            <TouchableOpacity
                style={{ textAlign: "center", zIndex: 20, padding: 10, borderRadius: 10, width: 100, backgroundColor: "#027DCA", position: "absolute", top: 160, left: 200 }}

                onPress={() => {
                    navigation.navigate("LOG-IN");
                    // onCheck(false)
                }}
            >
                <Text style={styles.but}>Go ~</Text>
            </TouchableOpacity>
        </ScrollView >

    );
};

const styles = StyleSheet.create({
    container: {
        // height: "100%",
        // marginTop:60


    },
    pic1: { width: 480, height: 600, zIndex: 2, position: "absolute", left: -40, top: 0 },
    pic4: { width: 550, height: 700, zIndex: 2, position: "absolute", left: -40, top: -20 },
    pic5: { width: 500, height: 700, zIndex: 4, position: "absolute", top: -50, left: -20 },
    pic6: { width: 500, height: 700, zIndex: 2, position: "absolute", top: -50, left: 0 },
    pic7: { width: 400, height: 600, zIndex: 2, position: "absolute", top: -10, left: 20 },
    pic8: { width: 400, height: 600, zIndex: 2, position: "absolute", top: -40, left: -50 },
    pic9: { width: 400, height: 600, zIndex: 1, position: "absolute", top: -20, left: 0 },
    pic10: { width: 480, height: 680, zIndex: 10, position: "absolute", left: 0, top: -60 },

    pic2: { width: 500, height: 760, zIndex: -1 },
    pic3: { width: 500, height: 700, zIndex: 1, position: "absolute", bottom: 0, left: 0 },
    box: {
        width: 380, height: 250,
        backgroundColor: "rgba(255,255,255,0.75)", margin: 15, padding: 30, justifyContent: "center"
        , borderRadius: 20,
    },
    dropdown: {
        margin: 10,
        borderWidth: 1,
        padding: 5,
        borderRadius: 20
        , backgroundColor: "white", width: 390

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
        , backgroundColor: "white", width: 200
    },
    timePicker: {
        margin: 8, height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
        , backgroundColor: "white", width: 180
    },
    but: { justifyContent: "center", zIndex: 10, textAlign: "center", color: "white", fontSize: 18, fontWeight: "900" },
    head: {
        fontSize: 33,
        fontWeight: "600", textAlign: "center", paddingTop: 30
    },
    txt: { fontSize: 16, fontWeight: "500", textAlign: "center", color: "white" },
    txt2: { fontSize: 14, fontWeight: "500" },
    txt3: { fontSize: 16, fontWeight: "500", marginLeft: 45 },
    bt1: {
        marginTop: 30,
        margin: 14,
        borderWidth: 1,
        //padding: 5,
        borderRadius: 20
        , backgroundColor: "white", width: 110, height: 110
    }
});

export default UselessTextInput;