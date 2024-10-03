import { Dimensions } from "react-native";

export const numberIntoCurrency = (ammount: number): string => {
   const formattedAmount = ammount.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
   });

   return formattedAmount;
};

export const { width, height } = Dimensions.get('window');