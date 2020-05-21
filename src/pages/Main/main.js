import React from 'react'
import {Text, View, KeyboardAvoidingView,StyleSheet } from 'react-native';
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
        style={{flex:1}}
        behavior="padding">
                    <FundoHeader>
                        <Logo source={logo}/>
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
                    <Botao>
                        <TextBottao>
                            Log in
                        </TextBottao>
                    </Botao>
        </KeyboardAvoidingView>
    );
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner:{
        flex:1,
        justifyContent:'flex-end'
    }
  })