import { Image, Text, View } from "react-native";
import {
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Index() {
  const [searchText, setSearchText] = useState("Varanasi");
  const [loading, setLoading] = useState(false);
  const [wdata, setWdata] = useState();
  const [currentData, setCurrentData] = useState();
  const [locdata, setLocData] = useState();

  useEffect(() => {
    handleSearch();
    console.log(process.env.api_key)
  }, []);

  const handleSearch = () => {
    setLoading(true);
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=7ecb5607daf4497983e221844241810&q=${searchText}&aqi=no`
      )
      .then((response) => {
        setWdata(response);
        console.log("u", response.data);
        setCurrentData(response.data.current);
        setLocData(response.data.location);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1666036812132-b211e011a15e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fG5hdHVyYWwlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww",
      }} // Use URI for remote image
      style={styles.background}
    >
      {wdata ? (
        <SafeAreaView style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Enter City Name"
            
            onChangeText={setSearchText} // Update the state as user types

          />
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Button title="Search" onPress={handleSearch} style={styles.btn} />
          )}

          <View style={styles.result}>
            <Text
              style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}
            >
              {" "}
              {`${currentData && currentData.feelslike_c} ℃`}{" "}
            </Text>
            <Text style={styles.cityName}>{`${locdata && locdata.name} ,${
              locdata && locdata.country
            },${locdata && locdata.region}  `}</Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 15 }}>
                {`Cloud: ${currentData && currentData.condition.text}`}
              </Text>
              {currentData && currentData.condition.icon && (
                <Image
                  source={{ uri: currentData.condition.icon }} // Correct usage
                  style={{ width: 100, height: 100 }} // Adjust as needed
                />
              )}
            </View>
            <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Text style={styles.text}>
                {" "}
                {`Wind: ${currentData && currentData.wind_kph} Km/h`}{" "}
              </Text>
              <Text style={styles.text}>
                {" "}
                {`Wind Direction: ${currentData && currentData.wind_dir}`}{" "}
              </Text>
              <Text style={styles.text}>
                {" "}
                {`Humidity: ${currentData && currentData.humidity} `}{" "}
              </Text>
              <Text style={styles.text}>
                {" "}
                {`Latitude: ${locdata && locdata.lat} `}{" "}
              </Text>
              <Text style={styles.text}>
                {" "}
                {`Longitude: ${locdata && locdata.lon} `}{" "}
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  marginTop: 50,
                  fontSize: 16,
                  color: "#cacdb6",
                  fontWeight: "bold",
                }}
              >
                {" "}
                {`Last Update: ${
                  currentData && currentData.last_updated
                } `}{" "}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <Text
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Loading.....
        </Text>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center", // Center the content vertically
    opacity: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "90%",
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 20,
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "#95512f",
  },
  btn: {
    width: 50,
  },
  cityName: {
    marginTop: 10,
    fontSize: 25,
    color: "#22231c",
    fontWeight: "bold",
    textAlign: "center",
  },
  result: {
    padding: 20,
  },
  text: {
    color: "#22231c",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
