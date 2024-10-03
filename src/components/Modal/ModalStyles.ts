import { StyleSheet } from "react-native";
import { width } from "../../utils/function";

export const styles = StyleSheet.create({
   modalContainer: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
   modalContent: {
      width: width / 1.3,
      backgroundColor: 'white',
      borderRadius: 10,
      shadowColor: 'black',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
   }
});