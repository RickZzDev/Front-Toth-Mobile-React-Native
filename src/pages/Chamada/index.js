import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  View,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import aluno from "../../assets/TOTH.png";
// import {MaterialIcons} from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";

const Chamada = () => {
  const navigate = useNavigation();
  const firstSize = 40;
  const [sizeIconX, setSizeX] = useState(new Animated.Value(40));
  const [sizeIconC, setSizeC] = useState(40);
  const [presente, setPresente] = useState([]);

  var array = [
    { aluno: "fulando", id: 1 },
    {
      aluno2: "siclano",
      id: 2,
    },
    {
      aluno3: "beltrano",
      id: 3,
    },
    {
      aluno4: "orlando",
      id: 4,
    },
  ];

  //   const [translateAnimY] = useState(new Animated.Value(150))

  //   const transformStyleY = {
  //     transform:[{
  //         translateY:translateAnimY
  //     }]
  //   }

  // React.useEffect(()=>{
  //   Animated.timing(translateAnimY,{
  //     toValue:0,
  //     duration:1000,
  //     easing:Easing.bounce,
  //     useNativeDriver: true
  //   }).start()
  // })

  useEffect(() => {
    var i = 0;
    for (i = 0; i <= array.length; i++) {
      setPresente((presente) => [...presente, true]);
    }
  }, []);

  function selectIcon(icon, id) {
    let newArray = [...presente];
    newArray[id] = !newArray[id];
    setPresente(newArray);
  }

  function handleNavigateback() {
    navigate.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.divBackOptions}>
          <TouchableOpacity onPress={handleNavigateback}>
            <FontAwesome5
              name="chevron-left"
              style={{ alignSelf: "center" }}
              color="white"
              size={18}
            />
          </TouchableOpacity>
          <Text style={styles.nomeTurma}>Turma 8 ano A - Chamada</Text>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {array.map((item, index) => (
            <View style={styles.caixaChamada} key={item.id}>
              <View style={styles.cardChamada}>
                <View style={styles.alunoImg}>
                  <Image
                    source={aluno}
                    style={{ width: 50, height: 50, alignSelf: "center" }}
                  />
                </View>
                <View style={styles.infoAluno}>
                  <Text style={styles.nomeAluno}>Matheus Borges da Silva</Text>
                  <Text style={styles.anoAluno}>8 ano A</Text>
                </View>
                <View style={styles.boxAcoes}>
                  <View style={styles.boxIcons}>
                    <TouchableOpacity
                      onPress={() => selectIcon("x", index)}
                      style={styles.iconX}
                    >
                      <FontAwesome5
                        name="times"
                        color={
                          presente[index] == undefined ||
                          presente[index] == true
                            ? "gray"
                            : "red"
                        }
                        size={
                          presente[index] == undefined ||
                          presente[index] == true
                            ? 20
                            : firstSize
                        }
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.boxIcons}>
                    <TouchableOpacity
                      onPress={() => selectIcon("c", index)}
                      style={styles.iconCorrect}
                    >
                      <FontAwesome5
                        name="check-circle"
                        color={
                          presente[index] == undefined ||
                          presente[index] == true
                            ? "green"
                            : "gray"
                        }
                        size={
                          presente[index] == undefined ||
                          presente[index] == true
                            ? firstSize
                            : 20
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.enviarChamadaBtn}>
          <Text style={styles.btnTxt}>Enviar chamada</Text>
          <Feather name="send" color="white" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#378ce4",
    justifyContent: "center",
    padding: 20,
  },
  caixaChamada: {
    flex: 1,
    padding: 10,
    width: 370,
    flexDirection: "row",
  },
  cardChamada: {
    backgroundColor: "#75B7FB",
    flex: 1,
    borderRadius: 20,
    flexDirection: "row",
    padding: 10,
    alignContent: "center",
  },
  boxAcoes: {
    flex: 1,
    flexDirection: "row",
    height: "60%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-around",
    // backgroundColor: "blue",
  },
  boxIcons: {
    marginVertical: 10,
  },
  alunoImg: {
    backgroundColor: "white",
    width: "20%",
    borderRadius: 100,
    height: "100%",
    alignSelf: "center",
    justifyContent: "center",
  },
  infoAluno: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  nomeAluno: {
    color: "white",
    fontSize: 14,
  },
  anoAluno: {
    color: "white",
    fontSize: 13,
  },
  nomeEscola: {
    color: "white",
    fontSize: 13,
  },
  divBackOptions: {
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  nomeTurma: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "15%",
  },
  enviarChamadaBtn: {
    alignItems: "center",
    padding: 12,
    flexDirection: "row",
    backgroundColor: "#378ce4",
    justifyContent: "center",
    elevation: 10,
    borderRadius: 5,
  },

  btnTxt: {
    color: "white",
    fontSize: 17,
    marginRight: 15,
  },
});

export default Chamada;
