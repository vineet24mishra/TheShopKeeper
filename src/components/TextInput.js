import React from "react";
import {TextInput, StyleSheet, View} from "react-native";
import TextSize from "../styles/TextSize";
import colors from "../utils/Colors";
import * as Fonts from "../assets/fonts/Fonts";

const Input = ({value, onChangeText, placeholder, secureTextEntry, softKeyBoardType, autoCapitalize, 
  maxLength, extraStyle, editable, defaultValue}) => {
  const {inputStyle} = styles;
  
  return (
    <View style={[styles.inputViewStyle, extraStyle]}>
     <TextInput
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      keyboardType={softKeyBoardType ? softKeyBoardType : "default"}
      autoCorrect={false}
      style={inputStyle}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize ={autoCapitalize}
      maxLength = {maxLength}
      placeholderTextColor={colors.GRAY_COLOR}
      editable={editable}
      defaultValue={defaultValue}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  inputViewStyle: {
    height: 60,
    width: "80%",
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: colors.GRAY_COLOR,
    borderWidth: 1,
    margin: 10, 
    justifyContent:"center"

  },
  inputStyle: {
    height: 50,
    width: "90%",
    backgroundColor: "white",
    fontSize: TextSize.INPUT_LABEL, marginStart: 20
  }
});

export default Input;
