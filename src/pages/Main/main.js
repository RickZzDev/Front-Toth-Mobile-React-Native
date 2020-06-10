import React,{useState} from 'react'
import {Text,Image,View,TouchableOpacity, KeyboardAvoidingView,StyleSheet,Platform, TextInput } from 'react-native';
import logo from '../../assets/TOTH.png'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {useNavigation, useRoute} from '@react-navigation/native'
import {Feather} from '@expo/vector-icons'


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
                    <View style={styles.FundoHeader}>
                        <Image style={styles.logo} source={logo} resizeMode="contain"/>
                        <Text style={styles.textBemVindo}>
                            Bem vindo de volta!
                        </Text>
                    </View>

                    <View style={styles.caixaEmail}> 
                        <Feather name="user" color="gray" size={25}/>
                        <TextInput style={styles.inputEmail} placeholder="Digite seu email"  value={email} onChangeText={email => setEmail(email)}/>
                    </View>
                    <View style={styles.caixaSenha}>
                        <Feather name="lock" color="gray" size={25}/>
                        <TextInput  style={styles.inputSenha} value={senha} onChangeText={senha => setSenha(senha)} placeholder="Digite sua senha"/>
                    </View>
                    <TouchableOpacity
                     style={styles.botao}
                     onPress={handleNavigateToHome}
                     activeOpacity={0.6}>
                        <Feather name="arrow-right" size={20} color="white"/>
                        <Text style={styles.textBottao}>
                            Log in
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
    );
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,        
        backgroundColor:"#378ce4"
    },


    botao:{
        backgroundColor:'#75B7FB',
        alignSelf:'center',
        marginTop:25,
        borderRadius:10,
        paddingTop:20,
        paddingLeft:15,
        paddingBottom:20,
        width:'80%',
        alignItems:'center',
        height:15,
        elevation:5,
        flexDirection:'row',
    },

    FundoHeader:{
        borderBottomLeftRadius:120,
        justifyContent:"center",
        alignItems:"center",
        flex:1,
        maxHeight:320,
    },

    textBemVindo:{
        color:"white",
        fontSize:20,
        marginLeft:"auto",
        marginRight:25,
        marginBottom:25,
        fontFamily:'Ubuntu_700Bold'
    },

    caixaEmail:{
        alignSelf:"center",
        marginTop:50,
        height: 45,
        width:'80%',
        borderRadius:10,
        alignItems:"center",
        // padding:20,
        paddingLeft:10,
        flexDirection:"row",
        elevation:1,
        backgroundColor:"white"
    },

    logo:{
        flex:1,
        height:250,
        width:250
    },

    caixaSenha:{
        alignSelf:"center",
        marginTop:30,
        borderRadius:10,
        height: 45,
        width:'80%',
        backgroundColor:"white",
        alignItems:"center",
        flexDirection:"row",
        elevation:1,
        paddingLeft:10,
    },

    inputEmail:{
        flex:1,
        marginLeft:10
    },

    inputSenha:{
        flex:1,
        marginLeft:10
    },

    textBottao:{
        color:"white",
        fontSize:17,
        marginLeft:100
    }

    
  })