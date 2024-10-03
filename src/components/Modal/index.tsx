import { View, Modal } from 'react-native';
import React from 'react';
import { IModalProps } from '../../Types';
import { styles } from './ModalStyles';
import { GlobalStyles } from '../../utils/stylesheet';

const Modals: React.FC<IModalProps> = ({
   isVisible,
   children
}) => {
   return (
      <View>
         <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
         >
            <View style={[styles.modalContainer, GlobalStyles.F1, GlobalStyles.JCCAIC]}>
               <View style={styles.modalContent}>
                  {children}
               </View>
            </View>
         </Modal>
      </View>
   );
};

export default Modals;