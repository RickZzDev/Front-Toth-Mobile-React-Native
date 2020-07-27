import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import api from "../../services/api";
import Modal from "react-native-modal";
import Lottie from "lottie-react-native";
import check from "../../animations/checkAnim.json";
import Input from "../../components/globalComponents/inputMaterialDesign";

const CriarComunicado = () => {
  const [animatedHeight, setAnimated] = useState(new Animated.Value(1));
  const [animatedWidth, setAnimatedWidth] = useState(new Animated.Value(25));
  const [geral, setGeral] = useState(false);
  const [publicoAlvo, setPublicoAlvo] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const routes = useRoute();
  const routeParams = routes.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleSend, setModalVisibleSend] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [idAula, setIdAula] = useState(0);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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

    async function getAula() {
      const token = await AsyncStorage.getItem("jwt_key");

      const headers = { Authorization: "Bearer " + token };
      await api
        .get(`aulas/professores/${routeParams.data.id}`, {
          headers: headers,
        })
        .then((response) => {
          setIdAula(response.data[0].id);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    getAula();
  }, []);

  const navigate = useNavigation();

  function handleNavigateback() {
    navigate.goBack();
  }

  function cleanUpFunction() {
    setTitle("");
    setDescription("");
    setPublicoAlvo("");
  }

  async function enviarComunicado() {
    setModalVisible(true);
    var obj = {
      title: title,
      description: description,
      publico_alvo: publicoAlvo,
      idAula: idAula,
    };

    const token = await AsyncStorage.getItem("jwt_key");
    const headers = { Authorization: "Bearer " + token };
    await api
      .post("comunicados/cadastro", obj, {
        headers: headers,
      })
      .then((response) => {
        setEnviado(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 3000);
        setTimeout(() => {
          navigate.navigate("Home");
        }, 3000);

        cleanUpFunction();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const animatedStyle = {
    transform: [
      {
        scale: animatedHeight,
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
            color="#378ce4"
            size={20}
          />
        </TouchableOpacity>
        <Text style={{ ...styles.titleEscrever, color: "#378ce4" }}>
          Escrever
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
          onPress={enviarComunicado}
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
      {/* <Input label="Para" /> */}
      <Input
        keyboardType="text"
        label="Assunto"
        value={title}
        onChangeFunciton={setTitle}
      />
      <Input
        label="Comunicado"
        keyboardType="text"
        onChangeFunciton={setDescription}
        height={105}
        value={description}
      />
      <RNPickerSelect
        placeholder={{ label: "Escolha o publico alvo" }}
        onValueChange={(value) => {
          setPublicoAlvo(value);
        }}
        items={[
          { label: "Para todos", value: "Todos", key: 1 },
          { label: "Somente alunos", value: "Alunos", key: 2 },
          { label: "Somente professores", value: "Professores", key: 3 },
        ]}
      />

      <Modal isVisible={isModalVisible}>
        <View
          style={{
            height: 180,
            width: "70%",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {enviado == false ? (
            <ActivityIndicator size="large" />
          ) : (
            <Lottie
              resizeMode="contain"
              autoSize
              source={check}
              autoPlay
              loop
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },

  divCheck: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    fontSize: 55,
    color: "#378CE4",
    justifyContent: "space-between",
  },

  divCheckTxt: {
    fontSize: 18,
    color: "#378CE4",
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

export default CriarComunicado;
