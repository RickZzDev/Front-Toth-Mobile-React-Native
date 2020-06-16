import React,{useState,useEffect} from 'react'
import {View, Text, StyleSheet, ScrollView, Animated, Easing} from 'react-native'
import MenuCard from "../../components/HomeComponents/menuCard"
import RoutineHours from '../../components/HomeComponents/routineHours'
import {useRoute, useNavigation} from '@react-navigation/native'


const Home = () =>{

    const routes = useRoute()
    const routeParams = routes.params

    const [translateAnim] = useState(new Animated.Value(150))
    const [fadeAnim] = useState(new Animated.Value(0))

    React.useEffect(()=>{

        Animated.timing(fadeAnim,{
            toValue:1,
            duration:1000,
            useNativeDriver: true,
        }).start()

        Animated.timing(translateAnim,{
            toValue:0,
            duration:1000,
            easing:Easing.bounce,
            useNativeDriver: true
        }).start()

       
    },[])

    const [user,setUser] = useState([])
    useEffect(()=>{
        setUser(routeParams.data)
    },[])

    const transfomrStyleX = {
        transform:[{
            translateX:translateAnim
        }]
    }


    return(
        <Animated.View style={{...styles.container}}>
            <Animated.Text style={{...styles.helloText,...transfomrStyleX,opacity:fadeAnim }}>
                Olá, {user.nome}
            </Animated.Text>
            <Animated.Text style={{...styles.welcomText,...transfomrStyleX, opacity:fadeAnim }}>
                Seja bem vindo ao Toth
            </Animated.Text>
            <Animated.View  style={{...styles.dayliCardContainer,...transfomrStyleX,opacity:fadeAnim}}>
                <ScrollView
                 horizontal
                 showsHorizontalScrollIndicator={false}
                 > 
                    <View style={styles.dayliCards}>
                        <Text style={styles.dayliCardTitle}>
                            Aulas do dia
                        </Text>

                        <View style={styles.routineContainer}>
                            <RoutineHours/>
                            <RoutineHours/>
                            <RoutineHours/>
                            <RoutineHours/>
                            <RoutineHours/>
                        </View>
             
                    </View>

                    <View style={styles.dayliCards}>
                        <Text>
                            Hello
                        </Text>
                    </View>

                    <View style={styles.dayliCards}>
                        <Text>
                            Hello
                        </Text>
                    </View>
                </ScrollView>
            </Animated.View>
            <View style={styles.menuCardsContainer}>
                <ScrollView
                 horizontal
                 showsHorizontalScrollIndicator={false}
                 > 
                    <MenuCard text="Atividades" materialIconName="assignment"/>
                    <MenuCard text="Turmas" materialIconName="school"/>
                    <MenuCard text="Comunicados" materialIconName="sms"/>
                    <MenuCard text="Chamada" materialIconName="recent-actors"/>
                    <MenuCard text="Notas" materialIconName="graphic-eq"/>
                    <MenuCard text="Provas" materialIconName="event"/>

                </ScrollView>
            </View>

        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#378CE4",
        justifyContent:'center',
        paddingLeft:16,
        paddingTop:32,
        paddingBottom:16
    },

    helloText:{
        fontFamily:'Roboto_400Regular',
        color:'#C4C4C4',
        fontSize:18
    },

    welcomText:{
        fontFamily:'Ubuntu_700Bold',
        color:'white',
        fontSize:25
    },

    dayliCardContainer:{
        flex:5,
        marginTop:30,
        flexDirection:'row',
    
    },

    dayliCards:{
        backgroundColor:"#75B7FB",
        flex:1,
        minWidth:346,
        maxWidth:346,
        marginRight:15,
        padding:32,
        alignItems:"center"
    },

    menuCardsContainer:{
        flex:1,
        marginTop:35,
    },

    dayliCardTitle:{
        color:'white',
        fontFamily:"Ubuntu_700Bold",
        fontSize:18
    },

    routineContainer:{
        flex:1,
        width:'100%',
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:"wrap"
    }
})

export default Home