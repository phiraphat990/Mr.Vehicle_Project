import * as React from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



const MapAPI = ({ route, navigation }) => {

    const [Province, setProvince] = useState("");
    const [itemLocationC, setitemLocationC] = useState("");
    const [itemLocationKa, setitemLocationKa] = useState("");
    const [itemLocationP, setitemLocationP] = useState("");
    const [itemLocationKo, setitemLocationKo] = useState("");

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


    return (
        <View style={styles.container}>

            {/* <MapView style={styles.map} initialRegion={{
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
      </MapView> */}

            {
                Province == "Chiangmai" && itemLocationC == "P.Neay Car Rental" ?
                    <View>
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
                Province == "Kanchanaburi" && itemLocationKa == "Por Car Rental" ?
                    <View>
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
                Province == "Prachuap Khiri Khan" && itemLocationP == "พิเพลง คาร์เร้นท์" ?
                    <View>
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
                Province == "Korat" && itemLocationKo == "S&K Service" ?
                    <View>
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


        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: "60%",
        height: "30%",
    },
});
export default MapAPI;