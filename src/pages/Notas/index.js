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
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../services/api";
import { ProgressCircle } from "react-native-svg-charts";
import LottieView from "lottie-react-native";

const Notas = () => {
  const navigate = useNavigation();
  const routes = useRoute();
  const routeParams = routes.params;
  const screenWidth = Dimensions.get("window").width - 100;
  const [notas, setNotas] = useState([]);
  const [data, setData] = useState([]);

  async function getProvas() {
    var obj = [];
    const token = await AsyncStorage.getItem("jwt_key");

    const headers = { Authorization: "Bearer " + token };
    await api
      .get(`notas/aluno/${routeParams.data.id}`, {
        headers: headers,
      })
      .then((response) => {
        setNotas(response.data);
        // var arrayData = data;
        // var newObj = data;
        // setData(newObj);
        // console.log(data[0].data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // // const [provas, setProvas] = useNavigation([]);

  function handleNavigateback() {
    navigate.goBack();
  }

  useEffect(() => {
    // console.log(routeParams.data.id);
    getProvas();
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
            {notas.length == 0 ? (
              <View style={{ flex: 1, height: 450 }}>
                <LottieView
                  autoPlay
                  loop
                  source={require("../Chamada/rocket.json")}
                />
              </View>
            ) : (
              notas.map((nota, index) => (
                <View
                  key={index}
                  style={{
                    borderColor: "rgba(55, 140, 228,1)",
                    borderBottomWidth: 3,
                    borderRightWidth: 5,
                    width: "100%",
                    flexWrap: "wrap",
                    marginTop: 15,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                    }}
                  >
                    {nota.nomeProva}
                  </Text>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "35%" }}>
                      <ProgressCircle
                        style={{ height: 200 }}
                        progress={nota.nota / 10}
                        progressColor={"rgba(55, 140, 228,1)"}
                      />
                    </View>
                    <View style={{ width: "30%" }}>
                      <ProgressCircle
                        style={{ height: 200 }}
                        progress={nota.notaGeral / 10}
                        progressColor={"rgba(55, 140, 228,0.5)"}
                      />
                    </View>
                    <View
                      style={{
                        width: "30%",
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          // justifyContent: "space-evenly",
                          // alignContent: "center",
                          alignItems: "center",
                          marginBottom: 15,
                        }}
                      >
                        <View
                          style={{
                            height: 10,
                            width: 10,
                            backgroundColor: "rgba(55, 140, 228,1)",
                            marginRight: 5,
                          }}
                        ></View>
                        <Text>Sua nota: </Text>
                        <Text>{nota.nota}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          // justifyContent: "space-evenly",
                          // alignContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            height: 10,
                            width: 10,
                            backgroundColor: "rgba(55, 140, 228,0.6)",
                            marginRight: 5,
                          }}
                        ></View>
                        <Text>Média geral: </Text>
                        <Text>{nota.notaGeral}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            )}
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
