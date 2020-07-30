import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  ScrollView,
  AsyncStorage,
} from "react-native";
import { TextField } from "react-native-material-textfield";
import Modal from "react-native-modal";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Input as Input2 } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import CheckBox from "@react-native-community/checkbox";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import api from "../../services/api";
import LottieView from "lottie-react-native";

const responderAtividade = () => {
  const routes = useRoute();
  const navigation = useNavigation();
  const routeParams = routes.params;
  const navigate = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [animatedHeight, setAnimated] = useState(new Animated.Value(1));
  const [animatedTranslate, setAnimatedTranslate] = useState(
    new Animated.Value(100)
  );
  const [tipoQuestao, setTipoQuestao] = useState("");
  const [animatedOpacity, setAnimatedOpacity] = useState(new Animated.Value(0));
  const [questoes, setQuestoes] = useState([]);
  const [items, setItems] = useState([]);
  const [cont, setCont] = useState([0]);
  const [nomeAtividade, setNomeAtividade] = useState("");
  const [idTurmas, setIdTurmas] = useState([]);
  const [dataEntrega, setDataEntrega] = useState("");
  const [turmas, setTurmas] = useState([{ turma: "turma" }]);
  const [aulas, setAulas] = useState("");
  const [sending, setSending] = useState(false);
  const [arrayAnswers, setAnswers] = useState([]);
  const [acertos, setAcertos] = useState(0);
  const [animatedStyle, setAnimatedStyle] = useState({
    transform: [
      {
        scale: animatedHeight,
      },
    ],
  });
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    var obj = [];
    async function getAtividades() {
      const token = await AsyncStorage.getItem("jwt_key");
      const headers = { Authorization: "Bearer " + token };
      await api
        .get(`atividades/${routeParams.id}`, { headers: headers })
        .then((response) => {
          setQuestoes(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    getAtividades();

    // async function getAulas() {
    //   const token = await AsyncStorage.getItem("jwt_key");

    //   const headers = { Authorization: "Bearer " + token };
    //   await api
    //     .get(`aulas/professores/${routeParams.id}`, {
    //       headers: headers,
    //     })
    //     .then((response) => {
    //       setAulas(response.data[0].id);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // }

    // getAulas();
  }, []);

  const itemsArray = [
    {
      name: "Turmas",
      id: 0,
      // these are the children or 'sub items'
      children: turmas,
    },
  ];

  useEffect(() => {
    grow();
  }, []);

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

  function acrescentarQuestao(tipoQuestao) {
    tipoQuestao == undefined
      ? alert("Favor escolher um tipo de atividade")
      : tipoQuestao != "DISSERTATIVA"
      ? setQuestoes([
          ...questoes,
          {
            tipo: tipoQuestao,
            alternativasQuestao: [
              { alternativa: null, enunciadoAlternativa: null, correto: false },
              { alternativa: null, enunciadoAlternativa: null, correto: false },
              { alternativa: null, enunciadoAlternativa: null, correto: false },
              { alternativa: null, enunciadoAlternativa: null, correto: false },
            ],
          },
        ])
      : setQuestoes([
          ...questoes,
          {
            tipo: tipoQuestao,
            alternativasQuestao: [
              { alternativa: null, enunciadoAlternativa: null, correto: null },
            ],
          },
        ]);
  }

  function setDissertativa(enunciado, index) {
    // console.log(index);
    var obj = questoes;
    obj[index].enunciado = enunciado;

    setQuestoes(obj);
  }

  // function setMultiEscolha(event, index, item) {
  //   var obj = questoes;

  //   switch (item) {
  //     case "enunciado":
  //       obj[index].enunciado = event;
  //       break;
  //     case "A":
  //       obj[index].alternativasQuestao[0].alternativa = "A";
  //       obj[index].alternativasQuestao[0].enunciadoAlternativa = event;
  //       break;
  //     case "B":
  //       obj[index].alternativasQuestao[1].alternativa = "B";
  //       obj[index].alternativasQuestao[1].enunciadoAlternativa = event;
  //       break;
  //     case "C":
  //       obj[index].alternativasQuestao[2].alternativa = "C";
  //       obj[index].alternativasQuestao[2].enunciadoAlternativa = event;
  //       break;
  //     case "D":
  //       obj[index].alternativasQuestao[3].alternativa = "D";
  //       obj[index].alternativasQuestao[3].enunciadoAlternativa = event;
  //       break;
  //   }

  //   setQuestoes(obj);
  // }

  function setCorrectAnswer(index, letraQuestao, tipo) {
    var array = arrayAnswers;

    array.push(letraQuestao);

    setAnswers(array);
    console.log(arrayAnswers);
    // var obj = questoes;
    // switch (letraQuestao) {
    //   case "A":
    //     obj[index].alternativasQuestao[0].correto = !obj[index]
    //       .alternativasQuestao[0].correto;
    //     break;
    //   case "B":
    //     obj[index].alternativasQuestao[1].correto = !obj[index]
    //       .alternativasQuestao[1].correto;
    //     break;
    //   case "C":
    //     obj[index].alternativasQuestao[2].correto = !obj[index]
    //       .alternativasQuestao[2].correto;
    //     break;
    //   case "D":
    //     obj[index].alternativasQuestao[3].correto = !obj[index]
    //       .alternativasQuestao[3].correto;
    //     break;
    // }
    // setQuestoes(obj);
  }

  var teste = () => {
    return questoes.questoes.map((item, index) =>
      item.tipo == "Múltipla escolha" ? (
        <Animated.View
          key={index}
          style={{
            opacity: animatedOpacity,
            paddingHorizontal: 10,
            paddingVertical: 10,
            elevation: 1,
            borderRadius: 1,
            borderRadius: 20,
            backgroundColor: "white",
            marginBottom: 10,
          }}
        >
          <TextField
            placeholder="Qual a pergunta para essa questão?"
            placeholderTextColor="black"
            // onChangeText={(event) => setMultiEscolha(event, index, "enunciado")}
            style={{ marginBottom: 5 }}
          ></TextField>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
              paddingLeft: 20,
            }}
          >
            <Text style={{ fontSize: 20 }}>A.</Text>
            <Input2
              inputContainerStyle={{
                width: "70%",
                marginBottom: -20,
              }}
              // onChangeText={(event) => {
              //   setMultiEscolha(event, index, "A");
              // }}
            ></Input2>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
              paddingLeft: 20,
            }}
          >
            <Text style={{ fontSize: 20 }}>B.</Text>
            <Input2
              inputContainerStyle={{
                width: "70%",
                marginBottom: -20,
              }}
              // onChangeText={(event) => {
              //   setMultiEscolha(event, index, "B");
              // }}
            ></Input2>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
              paddingLeft: 20,
            }}
          >
            <Text style={{ fontSize: 20 }}>C.</Text>
            <Input2
              inputContainerStyle={{
                width: "70%",
                marginBottom: -20,
              }}
              // onChangeText={(event) => {
              //   setMultiEscolha(event, index, "C");
              // }}
            ></Input2>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 20,
              // justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 20 }}>D.</Text>
            <Input2
              inputContainerStyle={{
                width: "70%",
                marginBottom: -20,
              }}
              // onChangeText={(event) => {
              //   setMultiEscolha(event, index, "D");
              // }}
            ></Input2>
          </View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            Qual a resposta certa?
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              justifyContent: "space-between",
            }}
          >
            <Text>A</Text>
            <CheckBox
              value="A"
              // checked={item.alternativasQuestao[0].correto}
            />
            <Text>B</Text>
            <CheckBox value="A" />
            <Text>C</Text>
            <CheckBox value="A" />
            <Text>D</Text>
            <CheckBox value="A" />
          </View>
          {/* <Input label="Resposta" style={{ martinTop: 5 }} /> */}
        </Animated.View>
      ) : item.tipo == "DISSERTATIVA" ? (
        <Animated.View
          key={index}
          style={{
            opacity: animatedOpacity,
            paddingHorizontal: 10,
            marginBottom: 10,
            elevation: 1,
            borderRadius: 1,
            borderRadius: 20,
            backgroundColor: "white",
          }}
        >
          <TextField
            placeholder="Qual a pergunta da questão?"
            placeholderTextColor="black"
            style={{ marginBottom: 5 }}
            onChangeText={(event) => setDissertativa(event, index)}
            // value={item.alternativasQuestão[0].enunciadoAlternativa}
          ></TextField>
          <TextField
            placeholder="E a resposta para essa questão?"
            style={{ marginBottom: 5, paddingLeft: 10 }}
          ></TextField>
        </Animated.View>
      ) : null
    );
  };

  function show(tipoQuestao) {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }

  function handleNavigateback() {
    navigate.goBack();
  }

  const translateAnim = {
    transform: [
      {
        translateX:
          animatedTranslate == 1 ? animatedTranslate2 : animatedTranslate,
      },
    ],
  };

  function onConfirmedTurmas() {
    setIdTurmas(items);
  }

  function onSelectedItemsChange(item) {
    setItems(item);
  }

  async function sendAtividade() {
    setSending(true);

    const token = await AsyncStorage.getItem("jwt_key");
    const headers = { Authorization: "Bearer " + token };

    var obj = {
      alternativas: arrayAnswers,
      idAtividade: routeParams.id,
    };
    console.log(obj);
    await api
      .post("atividades/pontos", obj, {
        headers: headers,
      })
      .then((response) => {
        toggleModal();
        setAcertos(response.data.acertos);
        setTimeout(() => {
          navigation.navigate("Atividade");
        }, 5000);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return sending ? (
    <View style={{ flex: 1 }}>
      <Modal isVisible={isModalVisible}>
        <View
          style={{
            height: 180,
            width: "70%",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 50,
          }}
        >
          <FontAwesome5 name="check-circle" color="green" size={70} />
          <Text style={{ fontWeight: "bold", marginTop: 10 }}>
            Você acertou:{" "}
            <Text style={{ fontWeight: "normal" }}>5 questoes</Text>
          </Text>
        </View>
      </Modal>
      <LottieView autoPlay loop source={require("../Chamada/send.json")} />
    </View>
  ) : (
    <View style={styles.container}>
      {/* <LottieView autoPlay loop source={require("./loading.json")} /> */}
      <View style={styles.divBackOptions}>
        <TouchableOpacity onPress={handleNavigateback}>
          <FontAwesome5
            name="chevron-left"
            style={{ alignSelf: "center" }}
            color="#378ce4"
            size={20}
          />
        </TouchableOpacity>
        <Text style={{ ...styles.titleEscrever, color: "#378ce4" }}>
          Responder Atividade
        </Text>
        {/* <TouchableOpacity
          style={{
            marginLeft: "auto",
            marginRight: 10,
            backgroundColor: "#378ce4",
            width: 35,
            borderRadius: 50,
            height: 35,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather name="paperclip" size={20} color="white" />
        </TouchableOpacity> */}
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
          <Animated.View>
            <Feather
              name="send"
              size={18}
              color="white"
              onPress={() => sendAtividade()}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
      {/* <Input2
        placeholder="Nome da atividade"
        value={nomeAtividade}
        onChange={(event) => setNomeAtividade(event.nativeEvent.text)}
      />
      <Input2
        placeholder="yyyy/mm/dd"
        value={dataEntrega}
        onChange={(event) => setDataEntrega(event.nativeEvent.text)}
      /> */}
      {/* <View>
        <SectionedMultiSelect
          items={itemsArray}
          uniqueKey="id"
          subKey="children"
          selectText="Selecione as turmas"
          showDropDowns={false}
          readOnlyHeadings={true}
          hideSearch={true}
          confirmText="Confirmar"
          onConfirm={onConfirmedTurmas}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={items}
        />
      </View> */}

      {/* <RNPickerSelect
        placeholder={{ label: "Tipo de atividade" }}
        onValueChange={(value) => {
          setTipoQuestao(value);
          show(value);
        }}
        items={[
          { label: "Multipla escolha", value: "MULTIPLA_ESCOLHA", key: 1 },
          { label: "Dissertativa", value: "DISSERTATIVA", key: 2 },
        ]}
      /> */}

      {questoes.length == 0 ? (
        <View
          style={{
            paddingHorizontal: 40,
            paddingVertical: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Escolha um tipo de atividade
          </Text>
          <Text style={{ fontSize: 16 }}>
            E clique no botão abaixo para adicionar uma questão :)
          </Text>
        </View>
      ) : (
        questoes.questoes.map((item, index) =>
          item.tipo != "Dissertativa" ? (
            <View key={index}>
              <TextField
                placeholder={item.enunciado}
                placeholderTextColor="black"
                disabled={true}
                onChangeText={() => {}}
                style={{ marginBottom: 5 }}
              ></TextField>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                  paddingLeft: 20,
                }}
              >
                <Text style={{ fontSize: 20 }}>A.</Text>
                <Input2
                  inputContainerStyle={{
                    width: "70%",
                    marginBottom: -20,
                  }}
                  disabled={true}
                  placeholderTextColor="#000000"
                  placeholder={item.alternativasQuestao[0].enunciadoAlternativa}
                  // onChangeText={(event) => {
                  //   setMultiEscolha(event, index, "A");
                  // }}
                ></Input2>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                  paddingLeft: 20,
                }}
              >
                <Text style={{ fontSize: 20 }}>B.</Text>
                <Input2
                  placeholder={item.alternativasQuestao[1].enunciadoAlternativa}
                  inputContainerStyle={{
                    width: "70%",
                    marginBottom: -20,
                  }}
                  disabled={true}
                  placeholderTextColor="#000000"
                  // onChangeText={(event) => {
                  //   setMultiEscolha(event, index, "B");
                  // }}
                ></Input2>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                  paddingLeft: 20,
                }}
              >
                <Text style={{ fontSize: 20 }}>C.</Text>
                <Input2
                  inputContainerStyle={{
                    width: "70%",
                    marginBottom: -20,
                  }}
                  disabled={true}
                  placeholderTextColor="#000000"
                  placeholder={item.alternativasQuestao[2].enunciadoAlternativa}
                  // onChangeText={(event) => {
                  //   setMultiEscolha(event, index, "C");
                  // }}
                ></Input2>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 20,
                  // justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 20 }}>D.</Text>
                <Input2
                  inputContainerStyle={{
                    width: "70%",
                    marginBottom: -20,
                  }}
                  disabled={true}
                  placeholder={item.alternativasQuestao[3].enunciadoAlternativa}
                  placeholderTextColor="#000000"
                  // onChangeText={(event) => {
                  //   setMultiEscolha(event, index, "D");
                  // }}
                ></Input2>
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                Qual a resposta certa?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  justifyContent: "space-between",
                }}
              >
                <Text>A</Text>
                <CheckBox
                  value={item.alternativasQuestao[0].correto}
                  checked={item.alternativasQuestao[0].correto}
                  onValueChange={() => {
                    setCorrectAnswer(index, "A", item.tipo);
                  }}
                />
                <Text>B</Text>
                <CheckBox
                  onValueChange={() => setCorrectAnswer(index, "B", item.tipo)}
                />
                <Text>C</Text>
                <CheckBox
                  onValueChange={() => setCorrectAnswer(index, "C", item.tipo)}
                />
                <Text>D</Text>
                <CheckBox
                  onValueChange={() => setCorrectAnswer(index, "D", item.tipo)}
                />
              </View>
            </View>
          ) : (
            <View
              key={index}
              style={{
                paddingHorizontal: 10,
                marginBottom: 10,
                elevation: 1,
                borderRadius: 1,
                borderRadius: 20,
                backgroundColor: "white",
              }}
            >
              <TextField
                placeholder={item.enunciado}
                placeholderTextColor="black"
                style={{ marginBottom: 5 }}
                disabled={true}
                onChangeText={() => {}}
                // value={item.alternativasQuestão[0].enunciadoAlternativa}
              ></TextField>
              <TextField
                // disabled={true}
                placeholder="E a resposta para essa questão?"
                style={{ marginBottom: 5, paddingLeft: 10 }}
              ></TextField>
            </View>
          )
        )
      )}

      {/* <TouchableOpacity
        onPress={() => acrescentarQuestao(tipoQuestao)}
        style={{
          marginTop: -20,
          alignSelf: "flex-end",
          marginRight: 40,
          backgroundColor: "#378CE4",
          borderRadius: 50,
          marginTop: "auto",
          scaleX: animatedHeight,
          scaleY: animatedHeight,
        }}
      >
        <Feather name="plus" color="white" size={40}></Feather>
      </TouchableOpacity> */}
    </View>
  );
  // : (
  //   <View style={{ flex: 1, backgroundColor: "green" }}>
  //     <LottieView autoPlay loop source={require("./teste.json")} />
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: "white",
  },

  divBackOptions: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 35,
  },
  titleEscrever: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "5%",
  },
});

export default responderAtividade;
