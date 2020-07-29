import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const SucessAtividadePage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Atividades");
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignSelf: "center",
        width: "100%",
        height: "50%",
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LottieView
        autoPlay
        resizeMode="contain"
        // autoSize
        loop
        source={require("./send.json")}
      />
    </View>
  );
};

export default SucessAtividadePage;
