import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  AsyncStorage,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import aluno from "../../assets/aluno.jpeg";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../../components/globalComponents/inputMaterialDesign";
import RNPickerSelect from "react-native-picker-select";
import api from "../../services/api";
import { TextField, OutlinedTextField } from "react-native-material-textfield";
import LottieView from "lottie-react-native";

import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { not } from "react-native-reanimated";

const Notas = () => {
  const navigate = useNavigation();

  const [notas, setNotas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [provas, setProvas] = useState([]);
  const [itemsTurmas, setItemsTurmas] = useState([]);
  const [itemsProvas, setItemsProvas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [searching, setSearching] = useState(false);
  const [cores, setCores] = useState([]);
  const [teste, setTeste] = useState([]);

  const [loadingTurmas, setLoadingTurmas] = useState(false);
  const [loadingProvas, setLoadingProvas] = useState(false);
  const [sendingNota, setSendingNota] = useState(false);

  const itemsArrayTurmas = [
    {
      name: "Turmas",
      id: 0,
      // these are the children or 'sub items'
      children: turmas,
    },
  ];

  const itemsArrayProvas = [
    {
      name: "Provas",
      id: 0,
      // these are the children or 'sub items'
      children: provas,
    },
  ];

  function handleNavigateback() {
    navigate.goBack();
  }

  function onSelectedItemsChange(item) {
    getAlunos(item[0]);
    setItemsTurmas(item);
    // setSearching(true);
  }

  async function getAlunos(id) {
    var obj = [];
    const token = await AsyncStorage.getItem("jwt_key");
    const headers = { Authorization: "Bearer " + token };

    await api
      .get(`alunos/turma/${id}/lazy`, { headers: headers })
      .then((response) => {
        // console.log(response.data);
        setAlunos(response.data);
        setSearching(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function onSelectedItemsChangeProva(item) {
    setItemsProvas(item);
    // setSearching(true);
  }

  function setArrayNotas(alunoDTO, index, nota) {
    var newArray = [...cores];
    newArray[index] = nota >= 6 ? "blue" : "red";

    var obj = notas;
    var coresArray = cores;
    obj[index] = {
      alunoDTO: alunoDTO,
      valor: parseInt(nota),
      idProva: provas[0].id,
    };

    setNotas(obj);
    setCores(newArray);
  }

  const itemsProva = [
    // this is the parent or 'item'
    {
      name: "Provas",
      id: 0,
      // these are the children or 'sub items'
      children: provas,
    },
  ];

  async function getTurmas() {
    setLoadingTurmas(true);
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
        // console.log(obj);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function getProvas() {
    setLoadingProvas(true);
    var obj = [];
    const token = await AsyncStorage.getItem("jwt_key");

    const headers = { Authorization: "Bearer " + token };
    await api
      .get(`provas`, {
        headers: headers,
      })
      .then((response) => {
        response.data.map((i, index) => {
          obj.push({ name: i.nome != null ? i.nome : "semNome", id: i.id });

          setProvas(obj);
        });
        setLoadingProvas(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function postNotas(obj) {}

  async function lancarNotas() {
    setSendingNota(true);
    const token = await AsyncStorage.getItem("jwt_key");

    const headers = { Authorization: "Bearer " + token };
    await api
      .post(`notas/cadastro`, notas, {
        headers: headers,
      })
      .then(() => {
        navigate.navigate("Home");
      });
  }

  useEffect(() => {
    getProvas();

    getTurmas();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {sendingNota == true ? (
          <View style={{ flex: 1 }}>
            <LottieView
              duration={4000}
              loop={false}
              autoPlay
              source={require("./3.json")}
              key={2}
            />
          </View>
        ) : (
          <View>
            <View style={[styles.divBackOptions]}>
              <TouchableOpacity onPress={handleNavigateback}>
                <FontAwesome5 name="chevron-left" color="#378CE4" size={18} />
              </TouchableOpacity>
              <Text style={[styles.nomeTurma]}>Lançar notas</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#378ce4",
                  width: 35,
                  borderRadius: 50,
                  height: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather
                  name="send"
                  size={18}
                  color="white"
                  onPress={() => lancarNotas()}
                />
              </TouchableOpacity>
            </View>

            <SectionedMultiSelect
              items={itemsArrayTurmas}
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
              selectedItems={itemsTurmas}
              loading={loadingTurmas}
              loadingComponent={
                <ActivityIndicator style={{ marginTop: 150 }} size="large" />
              }
            />

            <SectionedMultiSelect
              items={itemsProva}
              uniqueKey="id"
              subKey="children"
              selectText="Selecione a prova "
              showDropDowns={false}
              readOnlyHeadings={true}
              hideSearch={true}
              single
              confirmText="Confirmar"
              onConfirm={() => {}}
              onSelectedItemsChange={onSelectedItemsChangeProva}
              selectedItems={itemsProvas}
              loading={loadingProvas}
              loadingComponent={
                <ActivityIndicator style={{ marginTop: 150 }} size="large" />
              }
            />

            <ScrollView showsVerticalScrollIndicator={false}>
              {alunos.length == 0 ? (
                <View style={{ height: 200 }}>
                  <LottieView
                    autoPlay
                    source={require("../Chamada/rocket.json")}
                  />
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    height: 200,
                    // backgroundColor: "red",
                    // newArray,
                  }}
                >
                  {alunos.map((i, index) => (
                    <LinearGradient
                      colors={[
                        cores[index] == undefined ? "grey" : cores[index],
                        "black",
                      ]}
                      style={{
                        // backgroundColor:
                        // cores[index] == undefined ? "grey" : cores[index],
                        width: "49%",
                        borderRadius: 20,
                      }}
                      key={index}
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
                              {/* {notas[index].valor == undefined
                            ? ""
                            : notas[index].valor} */}
                            </Text>
                            <Feather
                              name={
                                notas[index] == undefined
                                  ? "alert-circle"
                                  : notas[index].valor >= 6
                                  ? "smile"
                                  : "frown"
                              }
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
                          {i.nome}
                        </Text>
                        <View style={{ width: 140 }}>
                          <OutlinedTextField
                            label="Nota obtida"
                            tintColor="white"
                            textColor="white"
                            keyboardType="number-pad"
                            label="Nota obtida"
                            selectionColor="red"
                            baseColor="white"
                            keyboardType="number-pad"
                            maxLength={2}
                            height={20}
                            onChange={(e) => {
                              setArrayNotas(i, index, e.nativeEvent.text);
                            }}
                            multiline
                            inputContainerStyle={{
                              height: 55,
                            }}
                          />
                          {/* <Input
                        keyboardType="number-pad"
                        maxLength={1}
                        height={40}
                      /> */}
                        </View>

                        <View
                          style={{
                            width: "70%",
                            alignSelf: "center",
                          }}
                        ></View>
                      </View>
                    </LinearGradient>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        )}
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

  btnTxt: {
    color: "white",
    fontSize: 17,
    marginRight: 15,
  },

  image: {
    resizeMode: "cover",
    justifyContent: "center",
    width: "45%",
    alignSelf: "center",
    height: "50%",
    borderRadius: 50,
  },

  enviarChamadaBtn: {
    alignItems: "center",
    padding: 12,
    flexDirection: "row",
    backgroundColor: "#378ce4",
    justifyContent: "center",
    elevation: 10,
    borderRadius: 5,
    marginTop: "auto",
  },

  divBackOptions: {
    paddingHorizontal: 10,
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "space-between",
  },

  nomeTurma: {
    color: "#378CE4",
    fontSize: 18,
    fontWeight: "bold",
    // marginLeft: "30%",
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
