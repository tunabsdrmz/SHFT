import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import AddModal from '../modal/addModal/AddModal';

type Props = {};

const AddButton = (props: Props) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const handleShowAddModal = () => setShowAddModal(true);
  return (
    <>
      {showAddModal && (
        <AddModal
          showAddModal={showAddModal}
          setShowAddModal={setShowAddModal}
        />
      )}
      <TouchableOpacity style={styles.Container} onPress={handleShowAddModal}>
        <Image
          style={styles.Image}
          source={require('../../../assets/fonts/icons/add.png')}
        />
      </TouchableOpacity>
    </>
  );
};

export default AddButton;
