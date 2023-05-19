import React, {useState} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {Intakes} from 'interface/types';
import moment from 'moment';
import DeleteModal from '../../modal/deleteModal/DeleteModal';
import EditModal from '../../modal/editModal/EditModal';
const Card = ({id, amount, unit, createdAt}: Intakes) => {
  const [leftActionModal, setLeftActionModal] = useState<boolean>(false);
  const [rightActionModal, setRightActionModal] = useState<boolean>(false);
  const handleRightAction = () => {
    setRightActionModal(true);
  };
  const handleLeftAction = () => {
    setLeftActionModal(true);
  };
  const leftAction = () => {
    return (
      <>
        <TouchableOpacity
          style={styles.LeftActionContainer}
          onPress={handleLeftAction}>
          <Image
            source={require('../../../../assets/fonts/icons/edit.png')}
            style={styles.ActionImages}
          />
        </TouchableOpacity>
        {leftActionModal && (
          <EditModal
            leftActionModal={leftActionModal}
            setLeftActionModal={setLeftActionModal}
            id={id}
          />
        )}
      </>
    );
  };
  const rightAction = () => {
    return (
      <>
        <TouchableOpacity
          style={styles.RightActionContainer}
          onPress={handleRightAction}>
          <Image
            source={require('../../../../assets/fonts/icons/trash.png')}
            style={styles.ActionImages}
          />
        </TouchableOpacity>

        {rightActionModal && (
          <DeleteModal
            rightActionModal={rightActionModal}
            setRightActionModal={setRightActionModal}
            id={id}
          />
        )}
      </>
    );
  };

  return (
    <Swipeable
      key={id}
      renderLeftActions={leftAction}
      renderRightActions={rightAction}
      dragOffsetFromLeftEdge={2}
      dragOffsetFromRightEdge={2}
      useNativeAnimations={true}
      containerStyle={{marginBottom: 5}}>
      <View style={styles.SwipeableContainer}>
        <Text style={styles.SwipeableAmountText}>
          {amount} {unit}
        </Text>
        <Text style={styles.SwipeableDateText}>
          {moment(createdAt).format('MM/DD , HH:mm')}
        </Text>
        <Image
          source={require('../../../../assets/fonts/icons/chevronRight.png')}
          style={styles.SwipeableArrowIcon}
        />
      </View>
    </Swipeable>
  );
};

export default Card;
