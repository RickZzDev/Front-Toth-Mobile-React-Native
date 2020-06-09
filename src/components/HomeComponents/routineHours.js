import React from 'react'
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native'



const RoutineHours =()=>{
    return(
        <TouchableOpacity activeOpacity={0.6}> 
            <View style={styles.routineCards}>
                <Text style={styles.textRoutine}>3C   7:15</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({



    textRoutine:{
        fontSize:15,
        fontWeight:'bold',
        color:"#378CE4"
    },


    routineCards:{
        backgroundColor:"white",
        width:105,
        borderRadius:10,
        padding:4,
        marginBottom:10,
        alignItems:'center',
        elevation:5
    },


})

export default RoutineHours
