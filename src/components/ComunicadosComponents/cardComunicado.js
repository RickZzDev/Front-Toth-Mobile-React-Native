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
import { interpolate } from "react-native-reanimated";

const cardComunicado = ({
  title,
  description,
  color,
  icon,
  important = false,
}) => {
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
          // alignSelf: "center",
          // borderTopEndRadius: 12,
          // borderTopLeftRadius: 12,

          borderRadius: 12,
          borderWidth: 1,
          minHeight: 85,
          padding: 8,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.imgComunicador}>
          <Image
            source={foto}
            style={{ width: 50, height: 50, alignSelf: "center" }}
          ></Image>
        </View>
        <View style={styles.txtComunciados}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{title} </Text>
            {important == true ? (
              <Animated.View style={animatedStyle}>
                <Feather name="info" size={18} color="#d10300" />
              </Animated.View>
            ) : null}
          </View>
          <Text>{description}</Text>
        </View>
        <View style={styles.infoComunicados}>
          <Text style={{ fontSize: 15, color: "black" }}>12:00</Text>
          <Feather name="star" color="black" size={20}></Feather>
        </View>
      </View>

      <View style={{ ...styles.barraImportancia, backgroundColor: color }}>
        <Text style={{ color: "white" }}>
          <FontAwesome5 name={icon} size={20} />
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
    borderBottomEndRadius: 12,
    borderBottomLeftRadius: 12,
    paddingVertical: 2,
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
    width: "15%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default cardComunicado;
