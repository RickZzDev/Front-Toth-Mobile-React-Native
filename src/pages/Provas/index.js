import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import aluno from "../../assets/TOTH.png";
// import {MaterialIcons} from '@expo/vector-icons'
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

const Provas = () => {
  const navigate = useNavigation();

  function handleNavigateback() {
    navigate.goBack();
  }
  LocaleConfig.locales["br"] = {
    monthNames: [
      "Janerio",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Junho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan.",
      "Fev.",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul.",
      "Ago",
      "Set.",
      "Out.",
      "Nov.",
      "Dez.",
    ],
    dayNames: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ],
    dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Quin.", "Sex.", "Sab."],
    today: "Hoje",
  };
  LocaleConfig.defaultLocale = "br";

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
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
          markedDates={{
            "2020-06-18": {
              selected: true,
              marked: true,
              selectedColor: "blue",
            },
            "2012-05-17": { marked: true },
            "2012-05-18": { marked: true, dotColor: "red", activeOpacity: 0 },
            "2012-05-19": { disabled: true, disableTouchEvent: true },
          }}
        />
      </View>
      <Text>ASDASD</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#378CE4",
  },
});

export default Provas;
