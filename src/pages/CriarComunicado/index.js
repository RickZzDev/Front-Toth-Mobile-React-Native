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
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from "react-native-material-textfield";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import CardComunicado from "../../components/ComunicadosComponents/cardComunicado";
import { useNavigation } from "@react-navigation/native";

const CriarComunicado = () => {
  const navigate = useNavigation();

  function handleNavigateback() {
    navigate.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.divBackOptions}>
        <TouchableOpacity onPress={handleNavigateback}>
          <FontAwesome5
            name="chevron-left"
            style={{ alignSelf: "center" }}
            color="black"
            size={20}
          />
        </TouchableOpacity>
        <Text style={{ ...styles.titleEscrever, color: "#378ce4" }}>
          Escrever
        </Text>
        <TouchableOpacity style={{ marginLeft: "auto", marginRight: 10 }}>
          <Feather name="paperclip" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="send" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <TextField
        label="Phone number"
        placeholder="asdasd"
        placeholderTextColor="black"
        keyboardType="phone-pad"
      />
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
  divBackOptions: {
    paddingHorizontal: 10,
    flexDirection: "row",
    // backgroundColor: "blue",
    justifyContent: "space-between",
    width: "100%",
  },
  titleEscrever: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "5%",
  },
});

export default CriarComunicado;
