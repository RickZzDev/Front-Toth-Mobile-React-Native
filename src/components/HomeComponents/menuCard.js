import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const MenuCard = ({
  text,
  materialIconName = "calculator",
  dataTurmas = null,
  idProfessor = null,
  data = null,
}) => {
  const navigation = useNavigation();

  const [translateAnimY] = useState(new Animated.Value(150));

  const transformStyleY = {
    transform: [
      {
        translateY: translateAnimY,
      },
    ],
  };

  React.useEffect(() => {
    Animated.timing(translateAnimY, {
      toValue: 0,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  });

  function handleNavigateTo(pagina, data) {
    navigation.navigate(pagina, { data: data });
  }

  return (
    <TouchableOpacity
      onPress={() => {
        handleNavigateTo(
          text,
          dataTurmas != null ? dataTurmas : data != null ? data : idProfessor
        );
      }}
      activeOpacity={0.6}
      style={{ ...styles.menuCards, ...transformStyleY }}
    >
      <MaterialIcons
        name={materialIconName}
        color="white"
        size={28}
      ></MaterialIcons>

      <Text style={styles.textMenuCards}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuCards: {
    flex: 1,
    // backgroundColor:"#75B7FB",
    backgroundColor: "#378CE4",

    width: 100,
    marginRight: 15,
    padding: 6,
    justifyContent: "space-between",
    alignItems: "center",
  },

  textMenuCards: {
    color: "white",
    fontSize: 14,
  },
});

export default MenuCard;
