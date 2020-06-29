import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
} from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import CardComunicado from "../../components/ComunicadosComponents/cardComunicado";
import { useNavigation } from "@react-navigation/native";

const Comunicados = () => {
  const navigate = useNavigation();

  function handleNavigateback() {
    navigate.goBack();
  }

  function handleNavigateToCreate() {
    navigate.navigate("CriarComunicado");
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
            color="#378ce4"
            size={20}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Comunicaos Gerais</Text>
      </View>

      <View style={styles.searchBox}>
        <Feather
          name="filter"
          color="black"
          size={25}
          style={{ width: "10%" }}
        />
        <TextInput
          placeholderTextColor="black"
          style={styles.textFilter}
          placeholder="Pesquisar nos comunicados"
        ></TextInput>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          // backgroundColor: "blue",
          width: "100%",
          // flexDirection: "row",
        }}
      >
        <CardComunicado icon="flask" important={true} color="#00e6d2" />
        <CardComunicado icon="atom" color="#7519ff" />
        <CardComunicado icon="globe-africa" color="#76de00" />
        <CardComunicado icon="language" color="#f2b600" />
        <CardComunicado icon="hourglass" color="#007bff" />
        <CardComunicado icon="calculator" color="#c71400" />
        <CardComunicado icon="biohazard" color="#98c414" />
        <CardComunicado icon="brain" color="#cf00cf" />
      </ScrollView>
      <TouchableOpacity
        onPress={handleNavigateToCreate}
        style={{
          backgroundColor: "red",
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
    padding: 20,
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

export default Comunicados;
