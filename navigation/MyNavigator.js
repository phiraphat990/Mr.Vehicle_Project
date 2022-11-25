import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";

import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import { collection, doc, setDoc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
//import { db, authentication } from './database/firebaseDB';

// import screen ที่เกี่ยวข้อง
import Chat from "../page/chatAlert";
import ChatRenter from "../page/chatRenter";
import MakeContract from "../screens/MakeContract";
import MakeContract_2 from "../screens/MakeContract_2";
import MakeContract_3 from "../screens/MakeContract_3";
import ViewContract_1 from "../screens/ViewContract1";
import ViewContract_2 from "../screens/ViewContract2";
import ViewContract_3 from "../screens/ViewContract3";
import MakeInvoice from "../screens/MakeInvoice";
import CancelContract from "../screens/CancelContract";
import CheckContract from "../screens/CheckContract";
import CheckInvoice from "../screens/CheckInvoice";
import addCarInfo from "../screens/addCarInfo";
import SignInPage from "../page/signIn";
import LogInPage from "../page/logIn";
import forgetpwPage from "../page/forgetpw";
import newpwPage from "../page/newpw";
import mainPageRenter from "../page/mainrenter";
import manage_account from "../page/manage_account";
import check_manage_account from "../page/check_manageac";
import firstPage from "../page/firstPage";
import FbPage from "../page/fb";
import mainPageRental from "../page/mainrental";
import RentalLookPage from '../page/VehicleStatus'
import RenterLookPage from '../page/VehicleSelect'
import DetailPage from '../page/VehicleDetail'
import PerUserInvoice from "../page/rentalinvoice";
import RenterContractall from "../page/allcontract";
import RenterInvoiceall from "../page/allinvoice";

import AllChat from "../page/allChat";


// สร้าง navigator ตามโจทย์กำหนด
const StackMealsNavigator = createDrawerNavigator();
const StackFavNavigator = createNativeStackNavigator();
const MealsFavTabNavigator = createDrawerNavigator();
const StackFiltersNavigator = createNativeStackNavigator();
const DrawerMainNavigator = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// สร้าง function สำหรับการกำหนด Navigator แต่ละตัว เช่น
const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MR.DRIVER"
      screenOptions={{

        headerShown: false
      }}
    >
      <Stack.Screen name="MAIN" options={{
        headerShown: true,
        headerStyle: { backgroundColor: "#F3C623", },
        headerTintColor: "#2D2B29", title: "MAIN"
      }} component={mainPageRenter} />
      <Stack.Screen name="fb" component={FbPage} />
      <Stack.Screen name="LOG-IN" component={LogInPage} 
       options={({ route }) => ({
        // title: route.params.categoryTitle.toString(),
        headerStyle: { backgroundColor: "#F3C623" }, headerTintColor: "#2D2B29",
      })}
      
      />
      <Stack.Screen name="SIGN-UP" component={SignInPage}
        options={({ route }) => ({
          // title: route.params.categoryTitle.toString(),  
           headerShown: true,
          headerStyle: { backgroundColor: "#F3C623" }, headerTintColor: "#2D2B29",
        })} />
      <Stack.Screen name="FORGOT PASSWORD"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#F3C623", },
          headerTintColor: "#2D2B29", title: "FORGET PASSWORD"
        }} component={forgetpwPage} />
      <Stack.Screen name="NEW PASSWORD"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#F3C623", },
          headerTintColor: "#2D2B29", title: "NEW PASSWORD"
        }} component={newpwPage} />
      <Stack.Screen name="MR.DRIVER"
        component={firstPage} />
      <Stack.Screen name="MANAGE ACCOUNT" options={{
        headerShown: true,
        headerStyle: { backgroundColor: "#F3C623", },
        headerTintColor: "#2D2B29", title: "MANAGE ACCOUNT"
      }} component={manage_account} />
      <Stack.Screen name="CONFIRM CHANGE"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#F3C623", },
          headerTintColor: "#2D2B29", title: "CONFIRM CHANGE"
        }} component={check_manage_account} />
      <Stack.Screen name="Drawer"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#F3C623", },
          headerTintColor: "#2D2B29", title: "MAIN"
        }} component={MyMainNavigator} />
      <Stack.Screen name="Make Invoice"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#F3C623", },
          headerTintColor: "#2D2B29", title: "MAKE INVOICE"
        }} component={MakeInvoice} />
      <Stack.Screen name="MAINRENTAL" options={{

        headerStyle: { backgroundColor: "#F3C623", },
        headerTintColor: "#2D2B29", title: "MAINRENTAL"
      }} component={mainPageRental} />
      <Stack.Screen name="ADD CAR INFO" options={{
        headerShown: true,
        headerStyle: { backgroundColor: "#F3C623", },
        headerTintColor: "#2D2B29", title: "ADD CAR INFO"
      }} component={addCarInfo} />
      <Stack.Screen name="RENTER LOOKING"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#F3C623", },
          headerTintColor: "#2D2B29", title: "RENTAL LOOKING"
        }} component={RenterLookPage} />
      <Stack.Screen name="RENTAL LOOKING" options={{
        headerShown: true,
        headerStyle: { backgroundColor: "#F3C623", },
        headerTintColor: "#2D2B29", title: "RENTAL LOOKING"
      }} component={RentalLookPage} />
      <Stack.Screen name="VEHICLE DETAIL" options={{
        headerShown: true,
        headerStyle: { backgroundColor: "#F3C623", },
        headerTintColor: "#2D2B29", title: "VEHICLE DETAIL"
      }} component={DetailPage} />
      <Stack.Screen name="Make Contract" options={{
        headerShown: true,
        headerStyle: { backgroundColor: "#F3C623", },
        headerTintColor: "#2D2B29", title: "MAKE CONTRACT"
      }} component={MakeContract} />
      <Stack.Screen name="Make Contract Page 2"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#F3C623", },
          headerTintColor: "#2D2B29", title: "MAKE CONTRACT PAGE"
        }} component={MakeContract_2} />
      <Stack.Screen name="Make Contract Page 3"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#F3C623", },
          headerTintColor: "#2D2B29", title: "MAKE CONTRACT PAGE 3"
        }} component={MakeContract_3} />
      <Stack.Screen name="Contract page 1"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#F3C623", },
          headerTintColor: "#2D2B29", title: "CONTRACT PAGE 1"
        }} component={ViewContract_1} />
      <Stack.Screen name="Contract page 2"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#F3C623", },
          headerTintColor: "#2D2B29", title: "CONTRACT PAGE 2"
        }} component={ViewContract_2} />
      <Stack.Screen name="Contract page 3"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#F3C623", },
          headerTintColor: "#2D2B29", title: "CONTRACT PAGE 3"
        }} component={ViewContract_3} />
      <Stack.Screen name="All INVOICE"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#F3C623", },
          headerTintColor: "#2D2B29", title: "ALL INVOICE"
        }} component={RenterInvoiceall} />
      <Stack.Screen name="All CONTRACT"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#F3C623", },
          headerTintColor: "#2D2B29", title: "ALL CONTRACT"
        }} component={RenterContractall} />
      <Stack.Screen name="RENTER INVOICE"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#F3C623", },
          headerTintColor: "#2D2B29", title: "RENTER INVOICE"
        }} component={PerUserInvoice} />
      <Stack.Screen name="Chats"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#F3C623", },
          headerTintColor: "#2D2B29", title: "CHATS"
        }} component={Chat} />
      <Stack.Screen name="Chat"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#F3C623", },
          headerTintColor: "#2D2B29", title: "CHAT"
        }}
        component={ChatRenter} />

      <Stack.Screen name="All Chats"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#F3C623", },
          headerTintColor: "#2D2B29", title: "CHAT"
        }}
        component={AllChat} />

    </Stack.Navigator>

  )
}
/*
const Contract = () => {
  return (
    <StackMealsNavigator.Navigator
      initialRouteName="Make Contract"
      screenOptions={{
        headerStyle: { backgroundColor: "#2A528A", },
        headerTintColor: "white",
      }}
    >
      <StackMealsNavigator.Screen
        name="Make Contract"
        component={MakeContract}
     
        options={
          ({ navigation }) => ({
            headerLeft: () => (
              <Ionicons name="list" size={24} color="white"
                onPress={() => navigation.openDrawer()}
              />
            ),
          })
        } 
      
      />
      <StackMealsNavigator.Screen
        name="Make Contract Page 2"
        component={MakeContract_2} options={
          ({ navigation }) => ({
            headerLeft: () => (
              <Ionicons name="list" size={24} color="white"
                onPress={() => navigation.openDrawer()}
              />
            ),
          })
        } 
      />
      <StackMealsNavigator.Screen
        name="Make Contract Page 3"
        component={MakeContract_3} options={
          ({ navigation }) => ({
            headerLeft: () => (
              <Ionicons name="list" size={24} color="white"
                onPress={() => navigation.openDrawer()}
              />
            ),
          })
        } 
      />
    
    </StackMealsNavigator.Navigator>
  )
}*/

const Contract = () => {
  return (
    <StackMealsNavigator.Navigator
      initialRouteName="Make Contract"
      screenOptions={{
        headerStyle: { backgroundColor: "#2A528A", },
        headerTintColor: "white",
      }}
    >
      <StackMealsNavigator.Screen
        name="Make Contract"
        component={MakeContract}

        options={
          ({ navigation }) => ({
            headerLeft: () => (
              <Ionicons name="list" size={24} color="white"

              />
            ),
          })
        }

      />
      <StackMealsNavigator.Screen
        name="CheckContract"
        component={CheckContract} options={
          ({ navigation }) => ({
            headerLeft: () => (
              <Ionicons name="list" size={24} color="white"

              />
            ),
          })
        }
      />
      <StackMealsNavigator.Screen
        name="CancelContract"
        component={CancelContract} options={
          ({ navigation }) => ({
            headerLeft: () => (
              <Ionicons name="list" size={24} color="white"

              />
            ),
          })
        }
      />

    </StackMealsNavigator.Navigator>
  )
}

// const Main = () => {
//   return (
//     <MealsFavTabNavigator.Navigator initialRouteName="Meals" screenOptions={{ headerShown: false }}>
//       <MealsFavTabNavigator.Screen name="Make Contract." component={Contract}
//         options={{
//           tabBarIcon: ({ color, focused }) => {
//             return <Ionicons name="ios-restaurant" size={24} color={focused ? "green" : "gray"} />
//           }
//         }} />

//       <MealsFavTabNavigator.Screen name="Make Invoice." component={Invoice}
//         options={{
//           tabBarIcon: ({ color, focused }) => {
//             return <Ionicons name="ios-star" size={24} color={focused ? "green" : "gray"} />
//           }
//         }} />
//     </MealsFavTabNavigator.Navigator>
//   )
// }
/*
const Invoice = () => {
  return (
    <StackFavNavigator.Navigator screenOptions={{
      headerStyle: { backgroundColor: "#2A528A", },
      headerTintColor: "white",
    }} options={
      ({ navigation }) => ({
        headerLeft: () => (
          <Ionicons name="list" size={24} color="white"

          />
        ),
      })
    } >
      <StackFavNavigator.Screen
        name="Make Invoice"
        component={MakeInvoice} options={
          ({ navigation }) => ({
            headerLeft: () => (
              <Ionicons name="list" size={24} color="white"

              />
            ),
          })
        }
      />
      <StackFavNavigator.Screen
        name="Check Invoice"
        component={CheckInvoice}
        options={
          ({ navigation }) => ({
            headerLeft: () => (
              <Ionicons name="list" size={24} color="white"

              />
            ),
          })
        } />
    </StackFavNavigator.Navigator>
  )
}*/

// const MyStackFiltersNavigator = () => {
//   return (
//     <StackFiltersNavigator.Navigator
//       screenOptions={{
//         headerStyle: { backgroundColor: "#4a148c", },
//         headerTintColor: "white",
//       }}>
//       <StackFiltersNavigator.Screen
//         name="Filter Meals"
//         component={CheckContract}
//         options={
//           ({ navigation }) => ({
//             headerLeft: () => (
//               <Ionicons name="list" size={24} color="white"
//               
//               />
//             ),
//           })
//         } />
//     </StackFiltersNavigator.Navigator>
//   )
// }

const MyMainNavigator = () => {
  return (
    <DrawerMainNavigator.Navigator screenOptions={{
      headerShown: false, headerStyle: { backgroundColor: "#4a148c", },
      headerTintColor: "white",
    }}>
      <DrawerMainNavigator.Screen name="contractgroup" component={Contract}
      />
      <DrawerMainNavigator.Screen name="Filters" component={Invoice} />
    </DrawerMainNavigator.Navigator>
  )
}
// สร้าง Navigator หลัก
export default function MyNavigator() {
  return (
    <NavigationContainer>
      < MainStack />


    </NavigationContainer>
  );
}
