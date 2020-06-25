import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import foto from "../../assets/TOTH.png";
import { useNavigation } from "@react-navigation/native";

const cardAtividades = ({ color, icon, important = false, nomeMateria }) => {
  const [animatedHeight, setAnimated] = useState(new Animated.Value(1));

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

  const animatedStyle = {
    transform: [
      {
        scale: animatedHeight,
      },
    ],
  };

  return (
    <View style={styles.cardComunicado}>
      <View
        style={{
          flex: 1,
          borderTopEndRadius: 12,
          borderTopLeftRadius: 12,
          minHeight: 85,
          padding: 8,
          elevation: 0.8,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.txtComunciados}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Atividade </Text>
            {important == true ? (
              <Animated.View style={{ ...animatedStyle, marginTop: 4 }}>
                <Feather name="info" size={18} color="#d10300" />
              </Animated.View>
            ) : null}
          </View>
          <Text style={{ fontWeight: "bold" }}>Sala: 8A</Text>
          <Text>Tipo:</Text>
          <Text>Alunos: 1,5,8,15</Text>
        </View>
        <View style={styles.infoComunicados}>
          <FontAwesome5 name={icon} color={color} size={70}></FontAwesome5>
        </View>
      </View>

      <View style={{ ...styles.barraImportancia, backgroundColor: color }}>
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          {nomeMateria}
          {/* <FontAwesome5 name={icon} size={20} /> */}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardComunicado: {
    flex: 1,
    width: "100%",
    // backgroundColor: "blue",
    // alignSelf: "center",
    height: 130,
    padding: 8,
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  barraImportancia: {
    // backgroundColor: "#00e6d2",
    height: 25,
    borderBottomEndRadius: 12,
    borderBottomLeftRadius: 12,
    marginTop: 2,
    alignItems: "center",
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
    flexDirection: "column",
    // alignItems: "center",
  },

  infoComunicados: {
    width: "25%",
    // backgroundColor: "red",
    // justifyContent: "center",
    alignItems: "center",
    // justifyContent: "space-between"
  },
});

export default cardAtividades;
