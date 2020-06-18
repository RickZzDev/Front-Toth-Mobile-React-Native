import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {Ubuntu_700Bold, useFonts} from '@expo-google-fonts/ubuntu'
import {Roboto_400Regular,Roboto_500Medium } from '@expo-google-fonts/roboto'


import Main from './pages/Main/main';
import Home from './pages/Home'
import Chamada from './pages/Chamada'

const appStack = createStackNavigator()

const Routes = () =>{


    const [fontsloaded] = useFonts({
        Ubuntu_700Bold,
        Roboto_400Regular,
        Roboto_500Medium
    })

    if (!fontsloaded){
        return null
    }

    return(
        <NavigationContainer>
            <appStack.Navigator  headerMode="none"
                headerTintColor="#000000"
                screenOptions={{
                    cardStyle:{
                        backgroundColor:"#f0f0f5"
                    }
                }}>

                    <appStack.Screen name="login" component={Main} />
                    <appStack.Screen name="Home" component={Home} />
                    <appStack.Screen name="Chamada" component={Chamada} />
            </appStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;