import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  ImageBackground,
  AsyncStorage,
  Dimensions,
} from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ProgressChart } from "react-native-chart-kit";
import aluno from "../../assets/aluno.jpeg";
import api from "../../services/api";

const Notas = () => {
  const navigate = useNavigation();
  const screenWidth = Dimensions.get("window").width - 100;

  // const [provas, setProvas] = useNavigation([]);
  const data = {
    labels: ["Swim", "Bike"], // optional
    data: [0.4, 0.6],
  };

  const chartConfig = {
    backgroundGradientFrom: "#000000",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(55, 140, 228, ${opacity})`,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    // optional
  };

  function handleNavigateback() {
    navigate.goBack();
  }

  // async function getProvas() {
  //   setLoadingProvas(true);
  //   var obj = [];
  //   const token = await AsyncStorage.getItem("jwt_key");

  //   const headers = { Authorization: "Bearer " + token };
  //   await api
  //     .get(`provas`, {
  //       headers: headers,
  //     })
  //     .then((response) => {
  //       // response.data.map((i, index) => {
  //       //   obj.push({ name: i.nome != null ? i.nome : "semNome", id: i.id });
  //       //   setProvas(obj);
  //       // });
  //       // setLoadingProvas(false);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  useEffect(() => {
    // getProvas();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View style={[styles.divBackOptions]}>
          <TouchableOpacity onPress={handleNavigateback}>
            <FontAwesome5 name="chevron-left" color="#378CE4" size={18} />
          </TouchableOpacity>
          <Text style={[styles.nomeTurma]}>Minhas notas</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              // justifyContent: "center",
              // alignContent: "center",
            }}
          >
            <View
              style={{
                borderColor: "#dbdbdb",
                borderBottomWidth: 5,
                borderRightWidth: 5,
                width: "100%",
              }}
            >
              <Text style={{ marginLeft: 25, fontSize: 14 }}>PROVA TAL</Text>
              <ProgressChart
                data={data}
                width={screenWidth}
                height={220}
                strokeWidth={16}
                radius={32}
                chartConfig={chartConfig}
                hideLegend={false}
                style={{ borderRadius: 50 }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },

  image: {
    resizeMode: "cover",
    justifyContent: "center",
    width: "45%",
    alignSelf: "center",
    height: "50%",
    borderRadius: 50,
  },

  divBackOptions: {
    paddingHorizontal: 10,
    flexDirection: "row",
    marginBottom: 15,
  },

  nomeTurma: {
    color: "#378CE4",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "30%",
  },
  cardAluno: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});

export default Notas;
