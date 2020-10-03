import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  Text,
  Button,
  Overlay,
  CheckBox,
  SearchBar,
} from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { NavigationEvents } from "react-navigation";
import Loading from "../components/Loading";
import Spacer from "../components/Spacer";
import { createPlayerProfile } from "../store/actions/players";
import { clearErrorMessage } from "../store/actions/errors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const checkedState = {
  Forward: true,
  Midfielder: false,
  Defender: false,
  Goalkeeper: false,
};

const CreatePlayerProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.errors.error);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("Forward");
  const [sport, setSport] = useState("Soccer");
  const [checked, setChecked] = useState(checkedState);
  const [loading, setLoading] = useState(false);
  const choosePosition = async (pos) => {
    let newState;
    await setChecked((prevState) => {
      newState = { ...prevState };
      Object.keys(newState).forEach((key) => {
        if (newState[key] == true) {
          newState[key] = !newState[key];
        } else if (key == pos) {
          newState[key] = true;
        }
      });
      return newState;
    });
    if (newState[pos] === true) {
      setPosition(pos);
    } else {
      setPosition(null);
    }
  };
  if (loading) {
    return <Loading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <NavigationEvents onWillFocus={() => dispatch(clearErrorMessage())} />
        <ScrollView>
          <Text style={styles.label}>Name</Text>

          <SearchBar
            placeholder="Player Name"
            onChangeText={setName}
            lightTheme
            autoCorrect={false}
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.inputContainer}
            searchIcon={
              <MaterialCommunityIcons name="pencil" size={20} color="#949494" />
            }
            clearIcon={false}
            value={name}
          />

          <Text style={styles.label}>Choose Sport</Text>
          <CheckBox
            title="Soccer"
            checked={true}
            textStyle={{ fontSize: 16 }}
            checkedColor="#02a1e6"
            containerStyle={styles.checkContainer}
          />

          <Text style={styles.label}>Choose Position</Text>
          <CheckBox
            title="Forward"
            checked={checked["Forward"]}
            textStyle={{ fontSize: 16 }}
            checkedColor="#02a1e6"
            containerStyle={styles.checkContainer}
            onPress={() => choosePosition("Forward")}
          />
          <CheckBox
            title="Midfielder"
            checked={checked["Midfielder"]}
            checkedColor="#02a1e6"
            textStyle={{ fontSize: 16 }}
            containerStyle={styles.checkContainer}
            onPress={() => choosePosition("Midfielder")}
          />
          <CheckBox
            title="Defender"
            checked={checked["Defender"]}
            checkedColor="#02a1e6"
            textStyle={{ fontSize: 16 }}
            containerStyle={styles.checkContainer}
            onPress={() => choosePosition("Defender")}
          />

          <CheckBox
            title="Goalkeeper"
            checked={checked["Goalkeeper"]}
            checkedColor="#02a1e6"
            textStyle={{ fontSize: 16 }}
            containerStyle={styles.checkContainer}
            onPress={() => choosePosition("Goalkeeper")}
          />
          {error ? (
            <Spacer>
              <Text style={styles.errorMessage}>{error}</Text>
            </Spacer>
          ) : null}
        </ScrollView>

        <Button
          title="Create Player Profile"
          buttonStyle={styles.btnStyle}
          containerStyle={{ marginHorizontal: 3, marginBottom: 20 }}
          raised
          onPress={async () => {
            try {
              setLoading(true);
              console.log(position);
              await dispatch(createPlayerProfile({ name, position, sport }));
              setLoading(false);
              navigation.goBack();
            } catch (err) {
              setLoading(false);
              return;
            }
          }}
        />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: "#f9f9f9",
  },
  checkContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 5,
    marginHorizontal: 8,
    backgroundColor: "#fff",
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 2, // Android
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  btnStyle: {
    borderRadius: 50,
    backgroundColor: "#02a1e6",
    height: height * 0.06,
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
  inputContainer: {
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  searchContainer: {
    borderRadius: 50,
    marginHorizontal: 8,
    marginTop: 5,
    marginBottom: 2,
    paddingVertical: 2,
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 2, // Android
  },
});

export default CreatePlayerProfileScreen;
