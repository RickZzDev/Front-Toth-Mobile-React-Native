import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import aluno from "../../assets/aluno.jpeg";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../../components/globalComponents/inputMaterialDesign";

const Notas = () => {
  const navigate = useNavigation();

  function handleNavigateback() {
    navigate.goBack();
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={[styles.divBackOptions]}>
          <TouchableOpacity onPress={handleNavigateback}>
            <FontAwesome5 name="chevron-left" color="#378CE4" size={18} />
          </TouchableOpacity>
          <Text style={[styles.nomeTurma]}>Lançar notas</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              height: 170,
            }}
          >
            <LinearGradient
              colors={["#378CE4", "black"]}
              style={{ width: "49%", borderRadius: 10 }}
            >
              <View style={styles.cardAluno}>
                <View style={{ flexDirection: "row" }}>
                  <ImageBackground
                    source={aluno}
                    imageStyle={{ borderRadius: 50 }}
                    style={{
                      width: 80,
                      height: 80,
                      resizeMode: "cover",
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      width: 85,
                      justifyContent: "flex-end",
                      paddingRight: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "white",
                        fontSize: 24,
                        marginRight: 8,
                      }}
                    >
                      8
                    </Text>
                    <Feather
                      name="smile"
                      style={{ marginTop: 2 }}
                      color="white"
                      size={28}
                    ></Feather>
                  </View>
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 2,
                    fontWeight: "bold",
                    color: "white",
                    alignSelf: "center",
                    marginBottom: 15,
                  }}
                >
                  Schwazenegger da silva
                </Text>
                <View style={{ width: 140 }}>
                  <Input
                    label="Nota obtida"
                    baseColor="white"
                    tintColor="white"
                    textColor="white"
                    keyboardType="phone-pad"
                    maxLength={1}
                    height={40}
                  />
                </View>

                <View
                  style={{
                    width: "70%",
                    alignSelf: "center",
                  }}
                ></View>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={["red", "black"]}
              style={{ width: "49%", borderRadius: 10 }}
            >
              <View style={styles.cardAluno}>
                <View style={{ flexDirection: "row" }}>
                  <ImageBackground
                    source={aluno}
                    imageStyle={{ borderRadius: 50 }}
                    style={{
                      width: 80,
                      height: 80,
                      resizeMode: "cover",
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      width: 85,
                      justifyContent: "flex-end",
                      paddingRight: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "white",
                        fontSize: 24,
                        marginRight: 8,
                      }}
                    >
                      5
                    </Text>
                    <Feather
                      name="frown"
                      style={{ marginTop: 2 }}
                      color="white"
                      size={28}
                    ></Feather>
                  </View>
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 2,
                    fontWeight: "bold",
                    color: "white",
                    alignSelf: "center",
                    marginBottom: 15,
                  }}
                >
                  Schwazenegger da silva
                </Text>
                <View style={{ width: 140 }}>
                  <Input
                    label="Nota obtido"
                    baseColor="white"
                    tintColor="white"
                    textColor="white"
                    keyboardType="phone-pad"
                    maxLength={1}
                    height={40}
                  />
                </View>

                <View
                  style={{
                    width: "70%",
                    alignSelf: "center",
                  }}
                ></View>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },

  image: {
    resizeMode: "cover",
    justifyContent: "center",
    width: "45%",
    alignSelf: "center",
    height: "50%",
    borderRadius: 50,
  },

  divBackOptions: {
    paddingHorizontal: 10,
    flexDirection: "row",
    marginBottom: 15,
  },

  nomeTurma: {
    color: "#378CE4",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "30%",
  },
  cardAluno: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});

export default Notas;
