import React from "react";
import { TextField, OutlinedTextField } from "react-native-material-textfield";

const inputMaterialDesign = ({ label, height = 55, keyboardType = "text" }) => {
  return (
    <OutlinedTextField
      keyboardType={keyboardType}
      label={label}
      multiline
      labelFontSize={16}
      inputContainerStyle={{
        marginBottom: 15,
        height: height,
        alignContent: "flex-start",
        justifyContent: "flex-start",
      }}
    ></OutlinedTextField>
  );
};

export default inputMaterialDesign;
