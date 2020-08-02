import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  View,
  Image,
  ScrollView,
  Button,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import aluno from "../../assets/TOTH.png";
// import {MaterialIcons} from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";

import api from "../../services/api";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import LottieView from "lottie-react-native";

const Chamada = () => {
  const navigate = useNavigation();
  const firstSize = 40;
  const [sizeIconX, setSizeX] = useState(new Animated.Value(40));
  const [sizeIconC, setSizeC] = useState(40);
  const [turmas, setTurmas] = useState([]);
  const [presente, setPresente] = useState([true]);
  const [items, setItems] = useState([]);
  const [faltas, setFaltas] = useState([]);
  const [loadingTurmas, setLoadingTurmas] = useState(true);
  const [alunos, setAlunos] = useState([]);
  const [searching, setSearching] = useState(false);
  const navigation = useNavigation();

  const itemsArray = [
    {
      name: "Turmas",
      id: 0,
      // these are the children or 'sub items'
      children: turmas,
    },
  ];

  async function getAlunos(id) {
    var obj = [];
    const token = await AsyncStorage.getItem("jwt_key");
    const headers = { Authorization: "Bearer " + token };

    await api
      .get(`alunos/turma/${id}/lazy`, { headers: headers })
      .then((response) => {
        setAlunos(response.data);
        setSearching(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  async function getTurmas() {
    var obj = [];
    const token = await AsyncStorage.getItem("jwt_key");
    const headers = { Authorization: "Bearer " + token };
    await api
      .get("turmas/lazy", { headers: headers })
      .then((response) => {
        response.data.map((i, index) => {
          obj.push({ name: i.ano + i.identificador, id: i.id });
          setTurmas(obj);
          setLoadingTurmas(false);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getTurmas();
  }, []);

  function onSelectedItemsChange(item) {
    setItems(item);
    setSearching(true);
    getAlunos(item[0]);
  }

  function selectIcon(icon, index, idAluno) {
    let newArray = [...presente];
    // console.log(newArray[index]);
    newArray[index] = newArray[index] == undefined ? false : !newArray[index];
    // console.log(newArray);

    setPresente(newArray);
    newArray[index] == false
      ? putFaltas(idAluno)
      : removeFaltas(faltas.indexOf(idAluno));
  }

  function putFaltas(idAuno) {
    // console.log(idAuno);
    var array = faltas;
    // console.log(faltas);
    array.push(idAuno);
    setFaltas(array);
    // console.log(array);
  }

  function removeFaltas(index) {
    // console.log(index);
    index == 0 ? faltas.shift() : faltas.splice(0, index);
    setFaltas(faltas);
    // console.log(faltas);
  }

  function handleNavigateback() {
    navigate.goBack();
  }

  function getCurrentDate() {
    var date = new Date();
    var month = date.getMonth();
    var day = date.getDate();
    parseInt(month) < 10 ? (month = `0${month}`) : (month = month);
    parseInt(day) < 10 ? (day = `0${day}`) : (day = day);
    return date.getFullYear() + "-" + month + "-" + day;
  }

  async function enviarChamada() {
    const token = await AsyncStorage.getItem("jwt_key");
    const headers = { Authorization: "Bearer " + token };

    var obj = {
      diaChamada: getCurrentDate(),
      idTurma: turmas[0].id,
      idAlunos: faltas,
    };
    console.log(obj);

    setSearching("sending");

    api
      .post("chamadas/cadastro", obj, { headers: headers })
      .then((response) => {
        navigation.navigate("SucessPage");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <View style={styles.container}>
      {/* <LottieView autoPlay loop source={require("./rocket.json")} /> */}
      <View style={{ flex: 1 }}>
        {searching == "sending" ? null : (
          <View>
            <View style={styles.divBackOptions}>
              <TouchableOpacity onPress={handleNavigateback}>
                <FontAwesome5
                  name="chevron-left"
                  style={{ alignSelf: "center" }}
                  color="#378CE4"
                  size={18}
                />
              </TouchableOpacity>
              <Text style={styles.nomeTurma}>Faça sua Chamada :)</Text>
            </View>
            <SectionedMultiSelect
              items={itemsArray}
              uniqueKey="id"
              subKey="children"
              selectText="Selecione as turmas"
              showDropDowns={false}
              readOnlyHeadings={true}
              hideSearch={true}
              single
              confirmText="Confirmar"
              onConfirm={() => {}}
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={items}
              loading={loadingTurmas}
              loadingComponent={
                <ActivityIndicator style={{ marginTop: 150 }} size="large" />
              }
            />
          </View>
        )}

        {searching == true ? (
          <LottieView autoPlay loop source={require("./rocket.json")} key={1} />
        ) : searching == "sending" ? (
          <View style={{ flex: 1 }}>
            <LottieView autoPlay loop source={require("./send.json")} key={2} />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {alunos.map((item, index) => (
              <View style={styles.caixaChamada} key={item.id}>
                <View style={styles.cardChamada}>
                  <View style={styles.alunoImg}>
                    <Image
                      source={aluno}
                      style={{ width: 50, height: 50, alignSelf: "center" }}
                    />
                  </View>
                  <View style={styles.infoAluno}>
                    <Text style={styles.nomeAluno}>{item.nome}</Text>
                    <Text style={styles.anoAluno}>Turma {turmas[0].name}</Text>
                  </View>
                  <View style={styles.boxAcoes}>
                    <View style={styles.boxIcons}>
                      <TouchableOpacity
                        onPress={() => selectIcon("x", index, item.id)}
                        style={styles.iconX}
                      >
                        <FontAwesome5
                          name="times"
                          color={
                            presente[index] == undefined ||
                            presente[index] == true
                              ? "gray"
                              : "red"
                          }
                          size={
                            presente[index] == undefined ||
                            presente[index] == true
                              ? 20
                              : firstSize
                          }
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.boxIcons}>
                      <TouchableOpacity
                        onPress={() => selectIcon("c", index, item.id)}
                        style={styles.iconCorrect}
                      >
                        <FontAwesome5
                          name="check-circle"
                          color={
                            presente[index] == undefined ||
                            presente[index] == true
                              ? "green"
                              : "gray"
                          }
                          size={
                            presente[index] == undefined ||
                            presente[index] == true
                              ? firstSize
                              : 20
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
        {alunos.length == 0 || searching == "sending" ? null : (
          <TouchableOpacity
            style={styles.enviarChamadaBtn}
            onPress={enviarChamada}
          >
            <Text style={styles.btnTxt}>Enviar chamada</Text>
            <Feather name="send" color="white" size={20} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 20,
  },
  caixaChamada: {
    flex: 1,
    padding: 10,
    width: 370,
    flexDirection: "row",
  },
  cardChamada: {
    backgroundColor: "#378CE4",
    flex: 1,
    borderRadius: 20,
    flexDirection: "row",
    padding: 10,
    alignContent: "center",
  },
  boxAcoes: {
    flex: 1,
    flexDirection: "row",
    height: "60%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-around",
    // backgroundColor: "blue",
  },
  boxIcons: {
    marginVertical: 10,
  },
  alunoImg: {
    backgroundColor: "white",
    width: "20%",
    borderRadius: 100,
    height: "100%",
    alignSelf: "center",
    justifyContent: "center",
  },
  infoAluno: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  nomeAluno: {
    color: "white",
    fontSize: 14,
  },
  anoAluno: {
    color: "white",
    fontSize: 13,
  },
  nomeEscola: {
    color: "white",
    fontSize: 13,
  },
  divBackOptions: {
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  nomeTurma: {
    color: "white",
    color: "#378CE4",
    // backgroundColor: "#378CE4",

    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "15%",
  },
  enviarChamadaBtn: {
    alignItems: "center",
    padding: 12,
    flexDirection: "row",
    backgroundColor: "#378ce4",
    justifyContent: "center",
    elevation: 10,
    borderRadius: 5,
  },

  btnTxt: {
    color: "white",
    fontSize: 17,
    marginRight: 15,
  },
});

export default Chamada;
