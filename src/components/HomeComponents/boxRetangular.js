import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const BoxRetangular = ({ text, width }) => {
  return (
    <TouchableOpacity activeOpacity={0.6}>
      <View style={{ ...styles.routineCards, width: width }}>
        <Text style={styles.textRoutine}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textRoutine: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#378CE4",
  },

  routineCards: {
    backgroundColor: "white",
    // width: 155,
    borderRadius: 5,
    padding: 4,
    marginBottom: 17,
    alignItems: "center",
    elevation: 5,
  },
});

export default BoxRetangular;
