import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  ScrollView,
} from "react-native";
import { TextField, OutlinedTextField } from "react-native-material-textfield";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Input } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import { CheckBox } from "react-native-elements";
import { color } from "react-native-reanimated";

const criarAtividade = () => {
  const navigate = useNavigation();
  const [animatedHeight, setAnimated] = useState(new Animated.Value(1));
  const [animatedTranslate, setAnimatedTranslate] = useState(
    new Animated.Value(100)
  );
  const [tipoAtividade, setTipoAtividade] = useState("");
  const [animatedOpacity, setAnimatedOpacity] = useState(new Animated.Value(0));
  const [atividadesVf, setAtividadesVf] = useState([]);
  const [atividadesMultE, setAtividadesMultE] = useState(["teste"]);
  const [atividadesDiss, setAtividadesDiss] = useState(["Teste"]);

  const [animatedStyle, setAnimatedStyle] = useState({
    transform: [
      {
        scale: animatedHeight,
      },
    ],
  });

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

  // function slide() {
  //   Animated.timing(animatedTranslate, {
  //     toValue: 1,
  //     duration: 500,
  //     easing: Easing.elastic(),
  //     useNativeDriver: true,
  //   }).start(console.log(animatedTranslate));
  // }

  function acrescentarQuestao(tipoAtividade) {
    alert(tipoAtividade);
    switch (tipoAtividade) {
      case "Dissertativa":
        setAtividadesDiss([...atividadesDiss, "TESTEEE"]);
        break;
      case "MultiEscolha":
        setAtividadesMultE([...atividadesMultE, "TESTEEEE"]);
        break;
      case "vf":
        setAtividadesVf([...atividadesVf, "TESRS"]);
        break;
    }
    // setAtividadesMultE([...atividadesMultE, "TESTANDOOOO"]);
  }

  function show(tipoAtividade) {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
    // if (tipoAtividade == "vf") {
    //   setAtividadesVf([...atividadesVf, { id: 1, teste: "teste" }]);
    // }
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

  return (
    <View style={styles.container}>
      <View style={styles.divBackOptions}>
        <TouchableOpacity onPress={handleNavigateback}>
          <FontAwesome5
            name="chevron-left"
            style={{ alignSelf: "center" }}
            color="gray"
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
            scaleX: animatedHeight,
            scaleY: animatedHeight,
          }}
        >
          <Animated.View style={animatedStyle}>
            <Feather name="send" size={18} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <RNPickerSelect
        placeholder={{ label: "Escolha a matéria" }}
        onValueChange={(value) => {
          setTipoAtividade(value);
        }}
        items={[
          { label: "Matemática", value: "mat", key: 1 },
          { label: "Fśicia", value: "fisic", key: 2 },
          { label: "Química", value: "quim", key: 3 },
          { label: "Biologia", value: "bio", key: 4 },
          { label: "História", value: "hist", key: 5 },
        ]}
      />

      <RNPickerSelect
        placeholder={{ label: "Tipo de atividade" }}
        onValueChange={(value) => {
          setTipoAtividade(value);
          show(value);
        }}
        items={[
          { label: "Multipla escolha", value: "MultiEscolha", key: 1 },
          { label: "Dissertativa", value: "Dissertativa", key: 2 },
          { label: "Verdadeiro e Falso", value: "vf", key: 3 },
        ]}
      />
      {tipoAtividade == "MultiEscolha" && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {atividadesMultE.map((item) => (
            <Animated.View
              style={{
                opacity: animatedOpacity,
                paddingHorizontal: 10,
              }}
            >
              <TextField
                placeholder="Pergunta"
                placeholderTextColor="black"
                style={{ marginBottom: 5 }}
              ></TextField>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <Text style={{ fontSize: 20 }}>A.</Text>
                <CheckBox containerStyle={{ width: "10%" }} />
                <Input
                  inputContainerStyle={{
                    width: "70%",
                    marginBottom: -20,
                  }}
                ></Input>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <Text style={{ fontSize: 20 }}>A.</Text>
                <CheckBox containerStyle={{ width: "10%" }} />
                <Input
                  inputContainerStyle={{
                    width: "70%",
                    marginBottom: -20,
                  }}
                ></Input>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <Text style={{ fontSize: 20 }}>A.</Text>
                <CheckBox containerStyle={{ width: "10%" }} />
                <Input
                  inputContainerStyle={{
                    width: "70%",
                    marginBottom: -20,
                  }}
                ></Input>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20 }}>A.</Text>
                <CheckBox containerStyle={{ width: "10%" }} />
                <Input
                  inputContainerStyle={{
                    width: "70%",
                    marginBottom: -20,
                  }}
                ></Input>
              </View>

              {/* <Input label="Resposta" style={{ martinTop: 5 }} /> */}
            </Animated.View>
          ))}
        </ScrollView>
      )}

      {tipoAtividade == "vf" &&
        atividadesVf.map((item) => (
          <Animated.View key={item.id + 1} style={{ opacity: animatedOpacity }}>
            <Text>VF</Text>
          </Animated.View>
        ))}

      {tipoAtividade == "Dissertativa" && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {atividadesDiss.map((item) => (
            <Animated.View
              style={{ opacity: animatedOpacity, paddingHorizontal: 10 }}
            >
              <TextField
                placeholder="Pergunta"
                placeholderTextColor="black"
                style={{ fontSize: 18, fontWeight: "bold" }}
              ></TextField>
              <TextField
                placeholder="Resposta"
                style={{ marginBottom: 5, paddingLeft: 10 }}
              ></TextField>
            </Animated.View>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        onPress={() => acrescentarQuestao(tipoAtividade)}
        style={{
          marginTop: -20,
          alignSelf: "flex-end",
          marginRight: 40,
          backgroundColor: "#378CE4",
          borderRadius: 50,
          marginTop: "auto",
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
