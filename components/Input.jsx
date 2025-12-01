// components/Input.jsx
import { StyleSheet, TextInput, View } from "react-native";
import { theme } from "../constants/theme";
import { hp } from "../helpers/common";

const Input = (props) => {
  return (
    <View style={[styles.container, props.containerStyles]}>
      {props.icon && props.icon}
      <TextInput
        style={styles.textInput}
        placeholderTextColor={theme.colors.textLight}
        ref={props.inputRef}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: hp(7.2),
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1.4,
    borderColor: "#E2E8F0",
    borderRadius: theme.radius.xxl || 28,
    borderCurve: "continuous",
    paddingHorizontal: 18,
    gap: 12,
  },
  textInput: {
    flex: 1,
    fontSize: hp(2),
    color: theme.colors.text,
  },
});

export default Input;
