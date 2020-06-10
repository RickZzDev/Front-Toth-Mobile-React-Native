import React from 'react'
import { showMessage, hideMessage } from "react-native-flash-message";



const errorMessage = (message, description, type,icon) =>{
    return(
        showMessage({
            message: message,
            description:description,
            type: type,
            icon:icon,
            floating:true,
            style:{alignItems:'center',marginTop:-30}
        })
    )
}

export default errorMessage