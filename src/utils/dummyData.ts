import { IDataItems } from "../Types";
import { images } from "./resource";

export const dataItems: IDataItems[] = [
   {
      id: 1,
      name: 'Biskuit',
      qty: 5,
      price: 6000,
      picture: images.biscuit
   },
   {
      id: 2,
      name: 'Chips',
      qty: 3,
      price: 8000,
      picture: images.chips
   },
   {
      id: 3,
      name: 'Oreo',
      qty: 4,
      price: 10000,
      picture: images.oreo
   },
   {
      id: 4,
      name: 'Tango',
      qty: 5,
      price: 12000,
      picture: images.tango
   },
   {
      id: 5,
      name: 'Cokelat',
      qty: 2,
      price: 15000,
      picture: images.chocolate
   },
];

export const listMoney: IDataItems[] = [
   {
      id: 1,
      picture: images.duaRibu,
      price: 2000
   },
   {
      id: 2,
      picture: images.limaRibu,
      price: 5000
   },
   {
      id: 3,
      picture: images.sePuluhRibu,
      price: 10000
   },
   {
      id: 4,
      picture: images.duaPuluhRibu,
      price: 20000
   },
   {
      id: 5,
      picture: images.limaPuluhRibu,
      price: 50000
   }
]