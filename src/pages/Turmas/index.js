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
          {routeParams.turmas.map((turma, index) => (
            // <Text>{aula.aulas[0].materia.nome}</Text>
            <CardTurma
              turno={turma.turno}
              // icon="atom"
              nome_sala={"6" + turma.identificador}
              numero_sala={turma.numero_sala}
              materia={turma.cronograma.diasLetivos[0].aulas[0].materia.nome}
              key={index}
            />
          ))}
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
