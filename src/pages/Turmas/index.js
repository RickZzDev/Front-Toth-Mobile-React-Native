import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import CardTurma from "../../components/turmasComponentes";
import { useRoute, useNavigation } from "@react-navigation/native";

const Turma = () => {
  const navigate = useNavigation();
  const routes = useRoute();

  const routeParams = routes.params;

  const [turmas, setTurmas] = useState([]);

  function handleNavigateback() {
    navigate.goBack();
  }

  useEffect(() => {
    setTurmas(routeParams.turmas);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View style={[styles.divBackOptions]}>
          <TouchableOpacity onPress={handleNavigateback}>
            <FontAwesome5 name="chevron-left" color="#378CE4" size={18} />
          </TouchableOpacity>
          <Text style={[styles.nomeTurma]}>Minhas turmas</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {turmas.map((turma) => (
            <CardTurma
              turno={turma.turno}
              icon="atom"
              nome_sala={turma.ano.ano + " " + turma.identificador}
              numero_sala="13"
              bg_color="#7519ff"
            />
          ))}

          {/* <CardTurma
            turno="Manhã"
            icon="flask"
            nome_sala="3 B"
            numero_sala="19"
            bg_color="#00e6d2"
          />

          <CardTurma
            turno="Manhã"
            icon="globe-africa"
            nome_sala="3 A"
            numero_sala="10"
            bg_color="#76de00"
          />

          <CardTurma
            turno="Manhã"
            icon="globe-africa"
            nome_sala="3 D"
            numero_sala="16"
            bg_color="#f2b600"
          />

          <CardTurma
            turno="Manhã"
            icon="hourglass"
            nome_sala="3 F"
            numero_sala="12"
            bg_color="#007bff"
          />

          <CardTurma
            turno="Manhã"
            icon="calculator"
            nome_sala="3 F"
            numero_sala="12"
            bg_color="#c71400"
          />
          <CardTurma
            turno="Manhã"
            icon="biohazard"
            nome_sala="3 F"
            numero_sala="14"
            bg_color="#98c414"
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
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
});

export default Turma;
