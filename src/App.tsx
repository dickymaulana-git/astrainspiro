import { View, Text, StatusBar, SafeAreaView, FlatList, Image, TouchableOpacity, FlatListProps, Touchable, Pressable, Alert, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './Styles';
import { IDataItems, ISelectedItem } from './Types';
import { numberIntoCurrency } from './utils/function';
import Modals from './components/Modal';
import { dataItems, listMoney } from './utils/dummyData';
import { GlobalStyles } from './utils/stylesheet';

const App = () => {
   const [renderData, setRenderData] = useState<IDataItems[]>(dataItems);
   const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
   const [totalCash, setTotalCash] = useState<number>(0);
   const [cash, setCash] = useState<number>(0);
   const [selectedItems, setSelectedItems] = useState<ISelectedItem[]>([]);
   const [selectedItemName, setSelectedItemName] = useState<ISelectedItem['name'][]>([]);
   const [cashBack, setCashBack] = useState<number>(0);
   const [isSelectedItems, setIsSelectedItems] = useState(false);
   const [itemChoosed, setItemChoosed] = useState<IDataItems>();
   const [qty, setQty] = useState<number>(0);

   useEffect(() => {
      dataGridHandler();
   }, []);

   useEffect(() => {
      totalPrice();
      cashbackHandler();
   }, [selectedItems]);

   const dataGridHandler = () => {
      const extraData = {
         id: dataItems.length + 1
      };
      if (dataItems.length % 2 !== 0) {
         return setRenderData([...dataItems, extraData]);
      }
      return dataItems;
   };

   const renderListItems = ({ item }: { item: IDataItems; }) => {
      return (
         <TouchableOpacity disabled={item.qty === 0} onPress={() => itemPressHandler(item)} style={[GlobalStyles.BW4BCB, GlobalStyles.JCSBAIC, GlobalStyles.FG, GlobalStyles.PV12]}>
            <Text>{item.qty === 0 && 'Item Unavailable'}</Text>
            {item.picture ? (
               <Image
                  source={item.picture}
                  style={styles.itemSize}
                  resizeMode='contain'
               />
            ) : (
               <View style={styles.itemSize} />
            )}
            <Text style={GlobalStyles.HB}>{item?.name}</Text>
            <Text style={GlobalStyles.HB}>
               {item.price && numberIntoCurrency(item?.price)}
            </Text>
         </TouchableOpacity>
      );
   };

   const itemPressHandler = async (item: IDataItems) => {
      if (item.price === undefined) return;
      if (totalCash === 0) {
         return Alert.alert(
            "No Cash Has Been Entered!",
            "Please enter your cash for the transaction.",
            [
               { text: "OK", onPress: () => { } }
            ],
         );
      }
      await setQty(0);
      await setItemChoosed(item);
      await setIsSelectedItems(true);
      setIsModalVisible(true);
   };

   const renderListMoney = ({ item }: { item: IDataItems; }) => {
      return (
         <TouchableOpacity
            style={[GlobalStyles.FG, GlobalStyles.JCSBAIC, GlobalStyles.PV8]}
            activeOpacity={0.5}
            onPress={() => moneyHandler(item)}
         >
            <Image
               source={item.picture}
               style={styles.moneySize}
               resizeMode='contain'
            />
         </TouchableOpacity>
      );
   };

   const moneyHandler = (item: IDataItems) => (
      setCash(cash + item.price!)
   );

   const renderModal = () => {
      return (
         <View style={GlobalStyles.P12}>
            <Text style={[GlobalStyles.HB, GlobalStyles.TAC]}>Choose Your Cash Below!</Text>
            <FlatList
               data={listMoney}
               keyExtractor={item => item.id.toString()}
               renderItem={renderListMoney}
               numColumns={2}
            />
            <View style={GlobalStyles.MV16}>
               <Text style={GlobalStyles.HB}>{`Total Cash : ${numberIntoCurrency(cash)}`}</Text>
            </View>
            <View style={[GlobalStyles.JCSBAIC, GlobalStyles.FDR]}>
               <Pressable
                  onPress={() => {
                     setIsModalVisible(false);
                  }}
                  style={[GlobalStyles.BGR, GlobalStyles.FG, GlobalStyles.BR2, GlobalStyles.MR12]}
               >
                  <Text style={[GlobalStyles.TAC, GlobalStyles.CW, GlobalStyles.PV8]}>Cancel</Text>
               </Pressable>
               <Pressable
                  onPress={() => {
                     setTotalCash(cash + totalCash);
                     setIsModalVisible(false);
                  }}
                  style={[GlobalStyles.FG, GlobalStyles.BR2]}
               >
                  <Text style={[GlobalStyles.TAC, GlobalStyles.BW1BCB, GlobalStyles.BR2, GlobalStyles.PV8]}>Insert</Text>
               </Pressable>
            </View>
         </View>
      );
   };

   const buttonConfirmHandler = () => {
      if (selectedItems.length === 0) {
         return Alert.alert(
            "No Item Selected!",
            "Please select an item to proceed with the transaction.",
            [
               { text: "OK", onPress: () => { } }
            ],
         );
      }
      setSelectedItems([]);
      setTotalCash(0);
      setSelectedItemName([]);
      return Alert.alert(
         "Thank You for your Transaction",
         "Don't forget your CashBack.",
         [
            { text: "OK", onPress: () => { } }
         ],
      );
   };

   const totalPrice = () => {
      const price = selectedItems.reduce((acc, item) => {
         return acc + (item?.price! * item?.qty!);
      }, 0);

      return price;
   };

   const cashbackHandler = () => {
      setCashBack(totalCash - totalPrice());
   };

   const resetHandler = () => {
      Alert.alert('Warning!', 'You sure want to reset all items ?', [
         {
            text: 'Cancel',
            onPress: () => { },
            style: 'cancel',
         },
         {
            text: 'OK', onPress: () => {
               setSelectedItemName([]);
               setSelectedItems([]);
            }
         },
      ]);
   };

   const decreaseQtyHandler = () => {
      if (qty === 0) return;
      setQty(qty - 1);
   };

   const increaseQtyHandler = (stock: IDataItems['qty']) => {
      if (qty >= stock!) {
         return Alert.alert(
            "No Qty Available",
            "Please Choose another Item.",
            [
               { text: "OK", onPress: () => { } }
            ],
         );
      }
      setQty(qty + 1);
   };

   const renderSelectedItems = () => {
      return (
         <View style={GlobalStyles.P12}>
            <View style={[GlobalStyles.JCSBAIC, GlobalStyles.FDR]}>
               <View style={GlobalStyles.AIC}>
                  <Image
                     source={itemChoosed?.picture}
                     style={styles.itemSize}
                     resizeMode='contain'
                  />
                  <Text style={GlobalStyles.HB}>{itemChoosed?.name}</Text>
               </View>
               <View>
                  <Text style={GlobalStyles.SHB}>
                     {`Qty Available: ${itemChoosed?.qty}`}
                  </Text>
                  <View style={[GlobalStyles.FDR, GlobalStyles.MT16]}>
                     <TouchableOpacity
                        style={[GlobalStyles.BW1BCB, GlobalStyles.PH12, GlobalStyles.BR2, GlobalStyles.PV4]}
                        onPress={() => decreaseQtyHandler()}
                     >
                        <Text style={GlobalStyles.ICON}>-</Text>
                     </TouchableOpacity>
                     <View style={[GlobalStyles.JCCAIC, GlobalStyles.PH8]}>
                        <Text style={GlobalStyles.ICON}>{qty}</Text>
                     </View>
                     <TouchableOpacity
                        onPress={() => increaseQtyHandler(itemChoosed?.qty)}
                        style={[GlobalStyles.BW1BCB, GlobalStyles.PH12, GlobalStyles.BR2, GlobalStyles.PV4]}
                     >
                        <Text style={GlobalStyles.ICON}>+</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
            <View style={[GlobalStyles.JCSBAIC, GlobalStyles.FDR, GlobalStyles.MT16]}>
               <Pressable
                  onPress={() => {
                     setIsModalVisible(false);
                     setIsSelectedItems(false)
                  }}
                  style={[GlobalStyles.FG, GlobalStyles.BR2, GlobalStyles.BGR]}
               >
                  <Text style={[GlobalStyles.TAC, GlobalStyles.BW1BCB, GlobalStyles.BR2, GlobalStyles.PV8, GlobalStyles.CW]}>Cancel</Text>
               </Pressable>
               <Pressable
                  onPress={async () => {
                     setIsModalVisible(false);
                     setIsSelectedItems(false)
                     onPressHandler();
                  }}
                  style={[GlobalStyles.FG, GlobalStyles.BR2]}
               >
                  <Text style={[GlobalStyles.TAC, GlobalStyles.BW1BCB, GlobalStyles.BR2, GlobalStyles.PV8]}>Confirm</Text>
               </Pressable>
            </View>
         </View>
      );
   };

   const onPressHandler = async () => {
      const totalPriceTemp = totalPrice() + (itemChoosed?.price! * itemChoosed?.qty!);
      if (totalCash < totalPriceTemp) {
         return Alert.alert(
            "Need More Cash To Proceed!",
            "Please enter your cash for the transaction.",
            [
               { text: "OK", onPress: () => { } }
            ],
         );
      }
      const newList = {
         name: `${itemChoosed?.name} ${qty > 1 ? `(x${qty}), ` : ''}`,
         price: itemChoosed?.price,
         qty: qty
      }

      await decreaseQtyByName(itemChoosed?.name, qty);
      await setSelectedItems([...selectedItems, newList]);
      await setSelectedItemName([...selectedItemName, newList.name]);
   };

   const decreaseQtyByName = (itemName: ISelectedItem['name'], qty: ISelectedItem['qty']) => {
      const item = renderData.find(item => item.name === itemName);
      if (item) {
         item.qty = Math.max(0, item?.qty! - qty!);
      }
   };

   return (
      <SafeAreaView style={[styles.container, GlobalStyles.F1]}>
         <StatusBar translucent backgroundColor='transparent' barStyle='dark-content' />
         <View>
            <FlatList
               data={renderData}
               keyExtractor={item => item.id.toString()}
               numColumns={2}
               renderItem={renderListItems}
            />
         </View>
         <View style={[GlobalStyles.PH12, GlobalStyles.PV8, GlobalStyles.FDR, GlobalStyles.JCSBAIC]}>
            <Text style={GlobalStyles.HB}>Total Cash : {numberIntoCurrency(totalCash)}</Text>
            {selectedItems.length > 0 && (
               <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => resetHandler()}
                  style={[GlobalStyles.BW1BCB, GlobalStyles.BR2]}
               >
                  <Text style={[GlobalStyles.PV8, GlobalStyles.PH8]}>RESET</Text>
               </TouchableOpacity>
            )}
         </View>
         <View style={[GlobalStyles.P12, GlobalStyles.F1]}>
            <Text>Selected Item : {selectedItemName} </Text>
            <Text>Total Payment : {numberIntoCurrency(totalPrice())}</Text>
            <Text>CashBack : {numberIntoCurrency(selectedItems.length > 0 ? cashBack : 0)}</Text>
         </View>
         <View style={[GlobalStyles.JCCAIC, GlobalStyles.BGR]}>
            <TouchableOpacity
               onPress={() => {
                  setIsModalVisible(!isModalVisible);
                  setCash(0);
               }}
               activeOpacity={0.8}
            >
               <Text style={[GlobalStyles.PV12, GlobalStyles.CWB]}>
                  PRESS TO ENTER CASH
               </Text>
            </TouchableOpacity>
         </View>
         <View style={[GlobalStyles.JCCAIC]}>
            <TouchableOpacity
               onPress={() => buttonConfirmHandler()}
               activeOpacity={0.8}
            >
               <Text style={[GlobalStyles.PV12, GlobalStyles.HB]}>
                  CONFIRM TRANSACTION!
               </Text>
            </TouchableOpacity>
         </View>
         <Modals
            isVisible={isModalVisible}
            children={isSelectedItems ? renderSelectedItems() : renderModal()}
         />
      </SafeAreaView>
   );
};

export default App;
