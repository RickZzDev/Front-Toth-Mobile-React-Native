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
import SectionedMultiSelect from "react-native-sectioned-multi-select";

const Notas = () => {
  const navigate = useNavigation();

  const [notas, setNotas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [provas, setProvas] = useState([]);
  const [itemsTurmas, setItemsTurmas] = useState([]);
  const [itemsProvas, setItemsProvas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [searching, setSearching] = useState(false);

  const [loadingTurmas, setLoadingTurmas] = useState(false);

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
        console.log(response.data);
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

  function setArrayNotas() {
    console.log("A");
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

  useEffect(() => {
    async function getProvas() {
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
          // console.log(obj);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    getProvas();

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
          // console.log(obj);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    getTurmas();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View style={[styles.divBackOptions]}>
          <TouchableOpacity onPress={handleNavigateback}>
            <FontAwesome5 name="chevron-left" color="#378CE4" size={18} />
          </TouchableOpacity>
          <Text style={[styles.nomeTurma]}>Lançar notas</Text>
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
          // loading={loadingTurmas}
          loadingComponent={
            <ActivityIndicator style={{ marginTop: 150 }} size="large" />
          }
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          {alunos.length == 0 ? (
            <View>
              <Text>AA</Text>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
                height: 200,
                backgroundColor: "red",
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
                      keyboardType="number-pad"
                      maxLength={1}
                      height={40}
                      onChangeFunciton={() => setArrayNotas()}
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

              {/* <LinearGradient
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
                    keyboardType="number-pad"
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
            </LinearGradient> */}
            </View>
          )}
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
