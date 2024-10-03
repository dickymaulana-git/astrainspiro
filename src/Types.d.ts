import { ImageProps } from "react-native";

export interface IDataItems {
   id: number;
   name?: string;
   qty?: number;
   price?: number;
   picture?: ImageProps;
}

export interface IModalProps {
   isVisible: boolean;
   children: React.ReactNode | React.ReactNode[];
}

export interface ISelectedItem {
   name: string | undefined;
   price: number | undefined,
   qty?: number | undefined
}