import React from "react";
import {Text,StyleSheet, TouchableOpacity } from "react-native";
import {MaterialIcons} from '@expo/vector-icons'


const MenuCard = ({text,materialIconName}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.menuCards}>
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