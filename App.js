import React from "react";
import Routes from "./src/routes";
import { StyleSheet, Text, View, StatusBar } from "react-native";

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#e5e5e5" />
      <Routes />
    </>
  );
}
