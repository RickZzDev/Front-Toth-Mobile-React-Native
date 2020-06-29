import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import CardAtividades from "../../components/atividadesComponentes/index";
import { useNavigation } from "@react-navigation/native";

const Atividades = () => {
  const navigate = useNavigation();

  function handleNavigateback() {
    navigate.goBack();
  }

  function handleNavigateToCreate() {
    navigate.navigate("CriarAtividade");
  }

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
        <CardAtividades
          icon="flask"
          nomeMateria="Física"
          important={true}
          color="#00e6d2"
        />
        <CardAtividades icon="atom" nomeMateria="Quimica" color="#7519ff" />
        <CardAtividades
          icon="globe-africa"
          nomeMateria="Geografia"
          color="#76de00"
        />
        <CardAtividades
          icon="language"
          nomeMateria="Português"
          color="#f2b600"
        />
        <CardAtividades
          icon="hourglass"
          nomeMateria="História"
          color="#007bff"
        />
        <CardAtividades
          icon="calculator"
          nomeMateria="Matematica"
          color="#c71400"
        />
        <CardAtividades
          icon="biohazard"
          nomeMateria="Biologia"
          color="#98c414"
        />
        <CardAtividades icon="brain" nomeMateria="Filosofia" color="#cf00cf" />
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
    color: "black",
  },
});

export default Atividades;
