import React,{useState,useEffect} from "react";
import {Text,StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";
import {MaterialIcons} from '@expo/vector-icons'
import {useNavigation, useRoute} from '@react-navigation/native'

const MenuCard = ({text,materialIconName}) => {
  const navigation = useNavigation()

  const [translateAnimY] = useState(new Animated.Value(150))


  const transformStyleY = { 
    transform:[{
        translateY:translateAnimY
    }]
  }

  React.useEffect(()=>{
    Animated.timing(translateAnimY,{
      toValue:0,
      duration:1000,
      easing:Easing.bounce,
      useNativeDriver: true
    }).start()
  })

  function handleNavigateTo(pagina){
    navigation.navigate(pagina)
  }

  return (
    <TouchableOpacity onPress={()=>handleNavigateTo(text)} activeOpacity={0.6} style={{...styles.menuCards, ...transformStyleY}}>
      <MaterialIcons name={materialIconName} color='white' size={28}>

      </MaterialIcons>

      <Text style={styles.textMenuCards}>
          {text}
      </Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  menuCards:{
    flex:1,
    backgroundColor:"#75B7FB",
    width:100,
    marginRight:15,
    padding:6,
    justifyContent:"space-between",
    alignItems:'center'
  },

  textMenuCards:{
    color:'white',
    fontSize:14
  }
})

export default MenuCard;