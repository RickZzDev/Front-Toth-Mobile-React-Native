import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  AsyncStorage,
} from "react-native";
import { FontAwesome5, Feather, Ionicons } from "@expo/vector-icons";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useNavigation, useRoute } from "@react-navigation/native";
import lockConfig from "../../services/locales.json";
import Input from "../../components/globalComponents/inputMaterialDesign";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";

import api from "../../services/api";

const Provas = () => {
  const navigate = useNavigation();

  const route = useRoute();
  const [idAula, setIdAula] = useState();

  useEffect(() => {
    async function getAulas() {
      const token = await AsyncStorage.getItem("jwt_key");

      const headers = { Authorization: "Bearer " + token };
      await api
        .get(`aulas/professores/${route.params.data.id}`, {
          headers: headers,
        })
        .then((response) => {
          setIdAula(response.data.id);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    getAulas();
  });

  function handleNavigateback() {
    navigate.goBack();
  }

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [markedDate, setMarkdedDate] = useState({});
  const [conteudo, setConteudos] = useState("");
  const [pesoProva, setPesoProva] = useState("");
  const [diaProva, setDiaProva] = useState("");
  const [nomeProva, setNomeProva] = useState("");
  const [atividadesParaEstudar, setAtividadesParaEstudar] = useState({});
  const [sending, setSending] = useState("");

  async function enviarProva() {
    setSending("sending");
    const token = await AsyncStorage.getItem("jwt_key");

    const headers = { Authorization: "Bearer " + token };

    var obj = {
      nome: nomeProva,
      conteudo: conteudo,
      pesoProva: pesoProva,
      atividadesParaEstudar: atividadesParaEstudar,
      id_aula: idAula,
      diaProva: diaProva,
    };

    await api
      .post("provas/cadastro", obj, {
        headers: headers,
      })
      .then((response) => {
        navigate.navigate("SucessPage");
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(obj);
  }

  function setData(text, label) {
    switch (label) {
      case "Conteudos":
        setConteudos(text);
        break;
      case "Peso da prova":
        setPesoProva(text);
        break;
      case "Atividades para estudar":
        setAtividadesParaEstudar(text);
        break;
      case "Nome da prova":
        setNomeProva(text);
        break;
    }
    // setProva({
    //   ...prova,
    //   label: value
    // });
  }

  //Configs de calendario
  LocaleConfig.locales["br"] = lockConfig;

  LocaleConfig.defaultLocale = "br";

  return sending == "sending" ? (
    <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
      <LottieView autoPlay loop key={1} source={require("./4.json")} />
    </View>
  ) : (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <TouchableOpacity onPress={() => handleNavigateback()}>
              <FontAwesome5
                name="chevron-left"
                style={{ alignSelf: "center" }}
                color="#378ce4"
                size={20}
              />
            </TouchableOpacity>

            <Text style={styles.title}>Marcar datas avaliativas</Text>
            <TouchableOpacity
              title="Show modal"
              style={{
                width: 26,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={toggleModal}
            >
              <Feather name="help-circle" color="#378ce4" size={20} />
            </TouchableOpacity>
          </View>
          <View>
            <Calendar
              markedDates={markedDate}
              theme={{
                backgroundColor: "#ffffff",

                // calendarBackground: "#d6d4d4",
                textSectionTitleColor: "black",
                selectedDayTextColor: "#ffffff",
                dayTextColor: "#2d4150",
                textDisabledColor: "gray",
                dotColor: "#378CE4",
                selectedDotColor: "#ffffff",
                arrowColor: "gray",
                disabledArrowColor: "#d9e1e8",
                monthTextColor: "#378CE4",
                indicatorColor: "blue",
                textDayFontWeight: "300",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "300",
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
              }}
              onDayPress={(day) => {
                var key = day.dateString;

                markedDate[key] == undefined
                  ? (markedDate[key] = {
                      marked: true,
                      selected: true,
                      selectedColor: "blue",
                    })
                  : delete markedDate[key];

                setMarkdedDate({
                  ...markedDate,
                });

                setDiaProva(day.dateString);
              }}
            />
          </View>
          <View style={{ marginTop: 15, backgroundColor: "white" }}>
            <Input
              label="Nome da prova"
              onChangeFunciton={setData}
              keyboardType="default"
              height={60}
            />
            <Input label="Conteudos" onChangeFunciton={setData} height={60} />
            <Input
              label="Peso da prova"
              onChangeFunciton={setData}
              keyboardType="phone-pad"
              height={60}
            />
            <Input
              label="Atividades para estudar"
              onChangeFunciton={setData}
              height={60}
            />
          </View>

          <Modal isVisible={isModalVisible}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  backgroundColor: "white",
                  height: 240,
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  borderRadius: 10,
                  borderBottomRightRadius: 0,
                  paddingLeft: 30,
                  paddingVertical: 40,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Olá professor{" "}
                  <FontAwesome5 name="hand-peace" color="#378CE4" size={22} />
                </Text>
                <Text style={{ fontSize: 18 }}>
                  1) Escolha uma data para sua prova{" "}
                  <Feather name="calendar" color="#378ce4" size={20} />
                </Text>
                <Text style={{ fontSize: 18 }}>
                  2) Depois escolhas os conteúdos{" "}
                  <Feather name="archive" color="#378ce4" size={20} />
                </Text>
                <Text style={{ fontSize: 18 }}>
                  3)Escolha o peso da avaliação{" "}
                  <Feather name="anchor" color="#378ce4" size={20} />
                </Text>
                <Text style={{ fontSize: 18 }}>
                  4)Indique atividades para estudo{" "}
                  <Feather name="book-open" color="#378ce4" size={20} />
                </Text>

                <Text style={{ fontSize: 18 }}>
                  5)Agora é so enviar !{" "}
                  <Feather name="smile" color="#378ce4" size={22} />
                </Text>
              </View>
              <TouchableOpacity
                title="Hide modal"
                style={{
                  backgroundColor: "white",
                  width: "10%",
                  height: 30,
                  alignSelf: "flex-end",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
                onPress={toggleModal}
              >
                <Feather name="x-circle" color="#378ce4" size={20} />
              </TouchableOpacity>
            </View>
          </Modal>
          <TouchableOpacity style={styles.enviarProva} onPress={enviarProva}>
            <Text style={styles.btnTxt}>Enviar prova</Text>
            <Feather name="send" color="white" size={20} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#378CE4",
  },
  btnTxt: {
    color: "white",
    fontSize: 17,
    marginRight: 15,
  },

  enviarProva: {
    alignItems: "center",
    padding: 12,
    flexDirection: "row",
    backgroundColor: "#378ce4",
    justifyContent: "center",
    elevation: 10,
    borderRadius: 5,
  },
});

export default Provas;
