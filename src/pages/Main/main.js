import React,{useState} from 'react'
import {Text, View, KeyboardAvoidingView,StyleSheet,Platform } from 'react-native';
import {
    FundoHeader,
    Container,
    Logo,
    TextBemVindo,
    CaixaEmail,
    CaixaSenha,
    InputEmail,
    InputSenha,
    Botao,
    TextBottao
    } from './style'
import logo from '../../assets/TOTH.png'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SafeAreaView } from 'react-navigation';
import {useNavigation, useRoute} from '@react-navigation/native'

export default function Main() {
    var [email,setEmail] = useState('')
    var [senha,setSenha] = useState('')

    const navigation = useNavigation()

    function handleNavigateToHome(){
        navigation.navigate('Home')
    }

    return (
            <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 + 64 : 18 + 10}
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled>
                <View style={styles.container}>
                    <FundoHeader>
                        <Logo source={logo} resizeMode="contain"/>
                        <TextBemVindo>
                            Bem vindo de volta!
                        </TextBemVindo>
                    </FundoHeader>

                    <CaixaEmail>
                        <Icon name="account-circle" color="gray" size={25}/>
                        <InputEmail  value={email} onChangeText={email => setEmail(email)} placeholder="Digite seu email"></InputEmail>
                    </CaixaEmail>
                    <CaixaSenha>
                        <Icon name="security" color="gray" size={25}/>
                        <InputSenha  value={senha} onChangeText={senha => setSenha(senha)} placeholder="Digite sua senha"/>
                    </CaixaSenha>
                    <Botao onPress={handleNavigateToHome}>
                        <TextBottao>
                            Log in
                        </TextBottao>
                    </Botao>
                </View>
            </KeyboardAvoidingView>
    );
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#e8e8e8'
    }
  })