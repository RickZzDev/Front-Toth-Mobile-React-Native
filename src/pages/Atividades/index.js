import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import CardAtividades from "../../components/atividadesComponentes/index";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../services/api";
import LottieView from "lottie-react-native";

const Atividades = () => {
  const navigate = useNavigation();

  const routes = useRoute();
  const routeParams = routes.params;
  const [atividades, setAtividades] = useState([0]);

  function handleNavigateback() {
    navigate.goBack();
  }

  function handleNavigateToCreate() {
    navigate.navigate("CriarAtividade", { id: routeParams.data });
  }

  useEffect(() => {
    async function getAtividades() {
      const token = await AsyncStorage.getItem("jwt_key");

      const headers = { Authorization: "Bearer " + token };
      await api
        .get(`atividades/professor/${routeParams.data}`, {
          headers: headers,
        })
        .then((response) => {
          setAtividades(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    getAtividades();
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          width: "70%",
          alignSelf: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => handleNavigateback()}>
          <FontAwesome5
            name="chevron-left"
            style={{ alignSelf: "center" }}
            color="#378CE4"
            size={20}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Atividades do dia</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          // backgroundColor: "blue",
          width: "100%",
          // flexDirection: "row",
        }}
      >
        {atividades[0] == 0 ? (
          <View style={{ backgroundColor: "white", height: 450 }}>
            <LottieView autoPlay loop source={require("./loading.json")} />
          </View>
        ) : (
          atividades.map((i, index) => (
            <CardAtividades
              turma={
                i.turmas[0] == null
                  ? "Todas"
                  : i.turmas[0].ano.ano + "-" + i.turmas[0].identificador
              }
              nome={i.nome}
              key={index}
              nomeMateria={i.aulas.materia.nome}
              dataEntrega={i.dataEntrega}
            />
          ))
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={handleNavigateToCreate}
        style={{
          marginTop: -20,
          alignSelf: "flex-end",
          marginRight: 40,
          backgroundColor: "#378CE4",
          borderRadius: 50,
        }}
      >
        <Feather name="plus" color="white" size={40}></Feather>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: "white",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#378CE4",
  },

  searchBox: {
    backgroundColor: "#999898",
    opacity: 0.5,
    marginTop: 15,
    width: "90%",
    borderRadius: 5,
    marginBottom: 15,
    minHeight: "6%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  textFilter: {
    width: "80%",
    minHeight: "6%",
    color: "#000000",
  },
});

export default Atividades;
