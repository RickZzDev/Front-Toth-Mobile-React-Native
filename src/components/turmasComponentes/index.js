import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import aluno from "../../assets/TOTH.png";
// import {MaterialIcons} from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";

const CardTurma = ({ turno, nome_sala, numero_sala, materia }) => {
  var icon = "";
  var color = "";
  const navigate = useNavigation();

  switch (materia) {
    case "Matemática":
      icon = "calculator";
      color = "#c71400";
      break;
    case "Fisica":
      icon = "athom";
      break;
    case "Química":
      icon = "flask";
      color = "#00e6d2";
      break;
    case "Geografia":
      icon = "globe-africa";
      color = "#f2b600";
      break;
    case "Biologia":
      icon = "biohazard";
      color = "#98c414";
      break;
    case "Historia":
      icon = "hourglass";
      color = "#007bff";
      break;
  }

  function handleNavigateback() {
    navigate.goBack();
  }

  return (
    <View style={[styles.boxTurma, { backgroundColor: color }]}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.turno_icon}>
          <Text style={{ color: "white", marginLeft: 16, fontSize: 18 }}>
            {turno}
          </Text>
          <View style={styles.div_icon}>
            <FontAwesome5 name={icon} size={30} color="white" />
          </View>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 28, fontWeight: "bold" }}>
          {nome_sala}
        </Text>
      </View>
      <Text style={styles.txt_sala}>Sala {numero_sala}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  turno_icon: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 5,
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  div_icon: {
    backgroundColor: "rgba(255,255,255,0.35)",
    height: 60,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 0,
    borderRadius: 50,
    marginRight: -5,
  },

  txt_sala: {
    alignSelf: "flex-end",
    marginTop: "auto",
    marginRight: 16,
    color: "white",
    fontSize: 18,
  },

  boxTurma: {
    width: "45%",
    height: 150,
    paddingBottom: 10,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 2,
  },
});

export default CardTurma;
