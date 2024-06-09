import { useState } from "react";
import { StyleSheet, View, TextInput, TextInputProps } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type CustomTextInputProps = TextInputProps & {
  iconName?: keyof typeof Ionicons.glyphMap;
};

export default function CustomTextInput({
  iconName,
  ...rest
}: CustomTextInputProps) {
  return (
    <View style={styles.searchSection}>
      <Ionicons
        style={styles.searchIcon}
        name={iconName}
        size={30}
        color="blue"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        underlineColorAndroid="transparent"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    paddingHorizontal: 20,
    position: "absolute",
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 60,
    paddingLeft: 60,
    borderWidth: 2,
    borderColor: "blue",
    borderRadius: 20,
    fontSize: 18,
    color: "blue",
  },
});
