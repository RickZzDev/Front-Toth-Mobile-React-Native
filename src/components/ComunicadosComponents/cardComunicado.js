import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import foto from "../../assets/TOTH.png";
import { useNavigation } from "@react-navigation/native";

const cardComunicado = () => {
  return (
    <View style={styles.cardComunicado}>
      <View style={styles.imgComunicador}>
        <Image
          source={foto}
          style={{ width: 50, height: 50, alignSelf: "center" }}
        ></Image>
      </View>
      <View style={styles.txtComunciados}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Assunto</Text>
        <Text>Comunidado</Text>
      </View>
      <View style={styles.infoComunicados}>
        <Text style={{ fontSize: 15, color: "black" }}>12:00</Text>
        <Feather name="star" color="black" size={20}></Feather>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardComunicado: {
    flex: 1,
    elevation: 3,
    borderRadius: 12,
    backgroundColor: "white",
    width: "86%",
    marginBottom: 15,
    alignSelf: "center",
    height: 85,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  imgComunicador: {
    width: "20%",
    justifyContent: "center",
    borderRadius: 50,
    borderStyle: "solid",
    borderWidth: 0.5,
  },

  txtComunciados: {
    // backgroundColor: "green",
    width: "60%",
    justifyContent: "flex-start",
    paddingLeft: 8,
    // alignItems: "center",
  },

  infoComunicados: {
    width: "15%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default cardComunicado;
