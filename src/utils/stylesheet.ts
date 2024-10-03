import { StyleSheet } from "react-native";

const Margin = StyleSheet.create({
   MV16: { marginVertical: 16 },
   MV32: { marginVertical: 32 },
   MT16: { marginTop: 16 },
   MB16: { marginBottom: 16 },
   MR12: { marginRight: 12 },
   ML12: { marginLeft: 12 }
});

const Padding = StyleSheet.create({
   P12: { padding: 12 },
   PV4: { paddingVertical: 4 },
   PV8: { paddingVertical: 8 },
   PV12: { paddingVertical: 12 },
   PV32: { paddingVertical: 32 },
   PH8: { paddingHorizontal: 8 },
   PH12: { paddingHorizontal: 12 },
   PH32: { paddingHorizontal: 32 },
   PT16: { paddingTop: 16 },
   PB16: { paddingBottom: 16 },
   PR12: { paddingRight: 12 },
   PL12: { paddingLeft: 12 }
});

const Font = StyleSheet.create({
   HB: {
      fontWeight: 'bold',
      fontSize: 16
   },
   ICON: {
      fontWeight: 'bold',
      fontSize: 18
   },
   SHB: { fontWeight: 'bold', },
   CW: { color: 'white' },
   CWB: {
      color: 'white',
      fontWeight: 'bold',
   },
   TAC: { textAlign: 'center' },
});

const Flex = StyleSheet.create({
   F1: { flex: 1 },
   FG: { flexGrow: 1 },
   FDR: { flexDirection: 'row' },
   JCSBAIC: {
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   JCCAIC: {
      justifyContent: 'center',
      alignItems: 'center'
   },
   AIC: {
      alignItems: 'center'
   },
   JCC: {
      justifyContent: 'center'
   }
});

const Border = StyleSheet.create({
   BW4BCB: {
      borderWidth: 4,
      borderColor: 'black',
   },
   BW1BCB: {
      borderWidth: 1,
      borderColor: 'black',
   },
   BR4: { borderRadius: 4 },
   BR2: { borderRadius: 2 }
});

const Background = StyleSheet.create({
   BGR: { backgroundColor: 'red' },
   BGB: { backgroundColor: 'black' },
   BGW: { backgroundColor: 'white' }
});

export const GlobalStyles = {
   ...Margin,
   ...Padding,
   ...Font,
   ...Flex,
   ...Border,
   ...Background
};