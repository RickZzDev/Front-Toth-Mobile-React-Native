import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { TextField, OutlinedTextField } from "react-native-material-textfield";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/globalComponents/inputMaterialDesign";

const CriarComunicado = () => {
  const [animatedHeight, setAnimated] = useState(new Animated.Value(1));
  const [animatedWidth, setAnimatedWidth] = useState(new Animated.Value(25));

  function desc() {
    Animated.timing(animatedHeight, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start(() => grow());
  }

  function grow() {
    Animated.timing(animatedHeight, {
      toValue: 1.2,
      duration: 1200,
      useNativeDriver: true,
    }).start(() => desc());
  }

  useEffect(() => {
    grow();
  }, []);

  const navigate = useNavigation();

  function handleNavigateback() {
    navigate.goBack();
  }

  const animatedStyle = {
    transform: [
      {
        scale: animatedHeight,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.divBackOptions}>
        <TouchableOpacity onPress={handleNavigateback}>
          <FontAwesome5
            name="chevron-left"
            style={{ alignSelf: "center" }}
            color="gray"
            size={20}
          />
        </TouchableOpacity>
        <Text style={{ ...styles.titleEscrever, color: "#378ce4" }}>
          Escrever
        </Text>
        <TouchableOpacity
          style={{
            marginLeft: "auto",
            marginRight: 10,
            backgroundColor: "#378ce4",
            width: 35,
            borderRadius: 50,
            height: 35,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather name="paperclip" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#378ce4",
            width: 35,
            borderRadius: 50,
            height: 35,
            alignItems: "center",
            justifyContent: "center",
            scaleX: animatedHeight,
            scaleY: animatedHeight,
          }}
        >
          <Animated.View style={animatedStyle}>
            <Feather name="send" size={18} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </View>
      <Input label="De" />
      <Input label="Para" />
      <Input label="Assunto" />
      <Input label="Comunicado" height={105} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    padding: 20,
  },

  divBackOptions: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 35,
  },
  titleEscrever: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "5%",
  },
});

export default CriarComunicado;
