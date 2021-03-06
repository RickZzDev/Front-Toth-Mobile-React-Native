import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import MenuCard from "../../components/HomeComponents/menuCard";
import BoxRetangular from "../../components/HomeComponents/boxRetangular";
import { useRoute, useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import LottieView from "lottie-react-native";

const Home = () => {
  const routes = useRoute();
  const routeParams = routes.params;

  const [translateAnim] = useState(new Animated.Value(150));
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, []);

  const [user, setUser] = useState({});
  const [turmas, setTurmas] = useState(null);

  useEffect(() => {
    setUser(routeParams.data.professor);
    async function getTurmas() {
      const token = await AsyncStorage.getItem("jwt_key");
      const headers = { Authorization: "Bearer " + token };
      await api
        .get(`turmas/professores/${routeParams.data.professor.id}`, {
          headers: headers,
        })
        .then((response) => {
          setTurmas(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    getTurmas();
  }, []);

  const transfomrStyleX = {
    transform: [
      {
        translateX: translateAnim,
      },
    ],
  };

  return (
    <View style={{ flex: 1 }}>
      {turmas != null ? (
        <Animated.View style={{ ...styles.container }}>
          <StatusBar backgroundColor="white"></StatusBar>
          <Animated.Text
            style={{
              ...styles.helloText,
              ...transfomrStyleX,
              opacity: fadeAnim,
            }}
          >
            Olá, {user.nome}
          </Animated.Text>
          <Animated.Text
            style={{
              ...styles.welcomText,
              ...transfomrStyleX,
              opacity: fadeAnim,
            }}
          >
            Seja bem vindo ao Toth
          </Animated.Text>
          <Animated.View
            style={{
              ...styles.dayliCardContainer,
              ...transfomrStyleX,
              opacity: fadeAnim,
            }}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.dayliCards}>
                <Text style={styles.dayliCardTitle}>Aulas do dia</Text>

                <View style={styles.routineContainer}>
                  <BoxRetangular text="6A 07:00" width={135} />
                  <BoxRetangular text="6B 08:00" width={135} />
                  <BoxRetangular text="6F 09:00" width={135} />
                  <BoxRetangular text="6C 10:00" width={135} />
                  <BoxRetangular text="6H 11:00" width={135} />
                </View>
              </View>

              {/* <View style={styles.dayliCards}>
                <Text style={{ ...styles.dayliCardTitle }}>Comunicados</Text>
                <BoxRetangular text="Comunicados Gerais" width={185} />
                <BoxRetangular text="Relatório de dúvidas" width={185} />
                <BoxRetangular text="Infromações extras" width={185} />
                <BoxRetangular text="Turmas" width={185} />
              </View> */}

              <View style={styles.dayliCards}>
                <Text style={styles.dayliCardTitle}>Atividades do dia</Text>

                <View style={styles.routineContainer}>
                  <BoxRetangular text="6A" width={135} />
                  <BoxRetangular text="6B" width={135} />
                  <BoxRetangular text="6F" width={135} />
                  {/* <BoxRetangular text="3D" width={135} />
                  <BoxRetangular text="3E" width={135} /> */}
                </View>
              </View>
            </ScrollView>
          </Animated.View>
          <View style={styles.menuCardsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <MenuCard
                idProfessor={routeParams.data.professor.id}
                text="Atividades"
                materialIconName="assignment"
              />
              <MenuCard
                dataTurmas={turmas}
                text="Turmas"
                materialIconName="school"
              />
              <MenuCard text="Comunicados" materialIconName="sms" data={user} />
              <MenuCard
                text="Chamada"
                materialIconName="recent-actors"
                data={user}
              />
              <MenuCard
                text="Notas"
                materialIconName="graphic-eq"
                data={user}
              />
              <MenuCard
                text="Provas"
                materialIconName="event"
                idProfessor={routeParams.data.professor}
              />
            </ScrollView>
          </View>
        </Animated.View>
      ) : (
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <LottieView autoPlay loop source={require("./urson2.json")} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#378CE4",
    backgroundColor: "white",
    // backgroundColor: "white",
    justifyContent: "center",
    paddingLeft: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },

  helloText: {
    fontFamily: "Roboto_400Regular",
    // color: "#C4C4C4",
    color: "#378CE4",
    fontSize: 18,
  },

  welcomText: {
    fontFamily: "Ubuntu_700Bold",
    // color: "white",
    color: "#378CE4",

    fontSize: 25,
  },

  dayliCardContainer: {
    flex: 5,
    marginTop: 30,
    flexDirection: "row",
  },

  dayliCards: {
    // backgroundColor: "#75B7FB",

    backgroundColor: "#378CE4",
    flex: 1,
    minWidth: 346,
    maxWidth: 346,
    marginRight: 15,
    padding: 15,
    alignItems: "center",
  },

  menuCardsContainer: {
    flex: 1,
    marginTop: 35,
  },

  dayliCardTitle: {
    color: "#ffffff",
    fontFamily: "Ubuntu_700Bold",
    fontSize: 18,
    marginBottom: 15,
  },

  routineContainer: {
    flex: 1,
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});

export default Home;
