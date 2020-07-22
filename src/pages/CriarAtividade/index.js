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
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Input as Input2 } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import CheckBox from "@react-native-community/checkbox";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import api from "../../services/api";

const criarAtividade = () => {
  const navigate = useNavigation();
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
  const [animatedStyle, setAnimatedStyle] = useState({
    transform: [
      {
        scale: animatedHeight,
      },
    ],
  });

  useEffect(() => {
    var obj = [];
    async function getTurmas() {
      const token = await AsyncStorage.getItem("jwt_key");
      const headers = { Authorization: "Bearer " + token };
      await api
        .get("turmas/lazy", { headers: headers })
        .then((response) => {
          response.data.map((i, index) => {
            obj.push({ name: i.ano + i.identificador, id: i.id });
            setTurmas(obj);
          });
          // console.log(turmas);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    getTurmas();
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
      : tipoQuestao != "Dissertativa"
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
    console.log(questoes);
  }

  function setMultiEscolha(event, index, item) {
    var obj = questoes;

    switch (item) {
      case "enunciado":
        obj[index].enunciado = event;
        break;
      case "A":
        obj[index].alternativasQuestao[0].alternativa = "A";
        obj[index].alternativasQuestao[0].enunciadoAlternativa = event;
        break;
      case "B":
        obj[index].alternativasQuestao[1].alternativa = "B";
        obj[index].alternativasQuestao[1].enunciadoAlternativa = event;
        break;
      case "C":
        obj[index].alternativasQuestao[2].alternativa = "C";
        obj[index].alternativasQuestao[2].enunciadoAlternativa = event;
        break;
      case "D":
        obj[index].alternativasQuestao[3].alternativa = "D";
        obj[index].alternativasQuestao[3].enunciadoAlternativa = event;
        break;
    }

    setQuestoes(obj);

    console.log(questoes);
  }

  function setCorrectAnswer(index, letraQuestao) {
    console.log("chamou");
    var obj = questoes;
    switch (letraQuestao) {
      case "A":
        obj[index].alternativasQuestao[0].correto = !obj[index]
          .alternativasQuestao[0].correto;
        break;
      case "B":
        obj[index].alternativasQuestao[1].correto = !obj[index]
          .alternativasQuestao[1].correto;
        break;
      case "C":
        obj[index].alternativasQuestao[2].correto = !obj[index]
          .alternativasQuestao[2].correto;
        break;
      case "D":
        obj[index].alternativasQuestao[3].correto = !obj[index]
          .alternativasQuestao[3].correto;
        break;
    }

    setQuestoes(obj);
    console.log(questoes);
  }

  var teste = () => {
    return questoes.map((item, index) =>
      item.tipo == "MultiEscolha" ? (
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
            onChangeText={(event) => setMultiEscolha(event, index, "enunciado")}
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
              onChangeText={(event) => {
                setMultiEscolha(event, index, "A");
              }}
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
              onChangeText={(event) => {
                setMultiEscolha(event, index, "B");
              }}
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
              onChangeText={(event) => {
                setMultiEscolha(event, index, "C");
              }}
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
              onChangeText={(event) => {
                setMultiEscolha(event, index, "D");
              }}
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
                setCorrectAnswer(index, "A");
              }}
            />
            <Text>B</Text>
            <CheckBox onPress={() => setCorrectAnswer(index, "B")} />
            <Text>C</Text>
            <CheckBox onPress={() => setCorrectAnswer(index, "C")} />
            <Text>D</Text>
            <CheckBox onPress={() => setCorrectAnswer(index, "D")} />
          </View>

          {/* <Input label="Resposta" style={{ martinTop: 5 }} /> */}
        </Animated.View>
      ) : item.tipo == "Dissertativa" ? (
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

  return (
    <View style={styles.container}>
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
          Criar Atividade
        </Text>
        <TouchableOpacity
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
        </TouchableOpacity>
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
              onPress={() => console.log(questoes)}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
      <Input2
        placeholder="Nome da atividade"
        value={nomeAtividade}
        onChange={(event) => setNomeAtividade(event)}
      />
      <Input2
        placeholder="yyyy/mm/dd"
        value={dataEntrega}
        onChange={(event) => setDataEntrega(event)}
      />
      <View>
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
      </View>

      <RNPickerSelect
        placeholder={{ label: "Tipo de atividade" }}
        onValueChange={(value) => {
          setTipoQuestao(value);
          show(value);
        }}
        items={[
          { label: "Multipla escolha", value: "MultiEscolha", key: 1 },
          { label: "Dissertativa", value: "Dissertativa", key: 2 },
        ]}
      />
      {questoes.length == 0 && (
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
      )}
      {questoes.length >= 1 && (
        <ScrollView showsVerticalScrollIndicator={false}>{teste()}</ScrollView>
      )}

      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  );
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

export default criarAtividade;
