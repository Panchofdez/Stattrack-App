import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Spacer from "./Spacer";

const NavLink = ({ navigation, text, route }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(route)}>
      <Spacer>
        <Text style={styles.link}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "#02a1e6",
    fontSize: 20,
    marginLeft: 15,
  },
});

export default NavLink;
