import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import { FontAwesome5, Feather, Ionicons } from "@expo/vector-icons";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import lockConfig from "../../services/locales.json";
import Input from "../../components/globalComponents/inputMaterialDesign";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";

const Provas = () => {
  const navigate = useNavigation();

  function handleNavigateback() {
    navigate.goBack();
  }

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [markedDate, setMarkdedDate] = useState({});

  //Configs de calendario
  LocaleConfig.locales["br"] = lockConfig;

  LocaleConfig.defaultLocale = "br";

  return (
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
              width: "75%",
              alignSelf: "flex-start",
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
              }}
            />
          </View>
          <View style={{ marginTop: 15, backgroundColor: "white" }}>
            <Input label="Conteudos" height={60} />
            <Input label="Peso da prova" keyboardType="phone-pad" height={60} />
            <Input label="Atividades para estudar" height={60} />
          </View>
          <Button title="Show modal" onPress={toggleModal} />

          <Modal isVisible={isModalVisible}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  backgroundColor: "white",
                  height: 240,
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  borderRadius: 10,
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
              <Button title="Hide modal" onPress={toggleModal} />
            </View>
          </Modal>
          <TouchableOpacity style={styles.enviarProva}>
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
