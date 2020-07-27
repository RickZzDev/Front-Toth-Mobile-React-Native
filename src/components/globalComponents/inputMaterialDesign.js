import React from "react";
import { TextField, OutlinedTextField } from "react-native-material-textfield";
import { Value } from "react-native-reanimated";

const inputMaterialDesign = ({
  label,
  height = 55,
  keyboardType = "text",
  baseColor = "#378CE4",
  tintColor = "#378CE4",
  textColor = "#378CE4",
  maxLength = 150,
  onChangeFunciton = () => {},
}) => {
  return (
    <OutlinedTextField
      tintColor={tintColor}
      textColor={textColor}
      keyboardType={keyboardType}
      label={label}
      selectionColor="red"
      baseColor={baseColor}
      maxLength={maxLength}
      multiline
      onChange={(e) => {
        onChangeFunciton(e.nativeEvent.text, label);
      }}
      // labelFontSize={16}
      inputContainerStyle={{
        height: height,
      }}
    ></OutlinedTextField>
  );
};

export default inputMaterialDesign;
