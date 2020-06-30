import { createAppContainer, createSwitchNavigator } from "react-navigation";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ubuntu_700Bold, useFonts } from "@expo-google-fonts/ubuntu";
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";

import Main from "./pages/Main/main";
import Home from "./pages/Home";
import Chamada from "./pages/Chamada";
import Comunicados from "./pages/Comunicados";
import CriarComunicado from "./pages/CriarComunicado";
import Atividades from "./pages/Atividades/index";
import CriarAtividade from "./pages/CriarAtividade";
import Turmas from "./pages/Turmas";
import Provas from "./pages/Provas";

const appStack = createStackNavigator();

const Routes = () => {
  const [fontsloaded] = useFonts({
    Ubuntu_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsloaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <appStack.Navigator
        headerMode="none"
        headerTintColor="#000000"
        screenOptions={{
          cardStyle: {
            backgroundColor: "#f0f0f5",
          },
        }}
      >
        <appStack.Screen name="login" component={Main} />
        <appStack.Screen name="Home" component={Home} />
        <appStack.Screen name="Chamada" component={Chamada} />
        <appStack.Screen name="Comunicados" component={Comunicados} />
        <appStack.Screen name="CriarComunicado" component={CriarComunicado} />
        <appStack.Screen name="CriarAtividade" component={CriarAtividade} />
        <appStack.Screen name="Atividades" component={Atividades} />
        <appStack.Screen name="Turmas" component={Turmas} />
        <appStack.Screen name="Provas" component={Provas} />
      </appStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
