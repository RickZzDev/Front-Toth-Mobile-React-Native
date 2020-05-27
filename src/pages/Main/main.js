import React from 'react'
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

export default function Main() {
    

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
                        <InputEmail placeholder="Digite seu email"></InputEmail>
                    </CaixaEmail>
                    <CaixaSenha>
                        <Icon name="security" color="gray" size={25}/>
                        <InputEmail placeholder="Digite sua senha"/>
                    </CaixaSenha>
                    <Botao onPress={()=>{alert('a')}}>
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