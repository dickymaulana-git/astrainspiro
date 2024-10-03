import { StatusBar, StyleSheet } from "react-native";
import { height, width } from "./utils/function";

export const styles = StyleSheet.create({
   container: {
      marginTop: StatusBar.currentHeight
   },
   itemSize: {
      width: width / 3,
      height: height / 10
   },
   moneyItems: {
      flexGrow: 1,
      justifyContent: "space-between",
      alignItems: 'center',
      paddingVertical: 5
   },
   moneySize: {
      width: width / 3,
      height: height / 15
   }
});