import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteIntake} from '../../../api/functions';
import Error from '../../error/Error';

type Props = {
  rightActionModal: boolean;
  setRightActionModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: number | string | undefined | null;
};

const DeleteModal = ({id, rightActionModal, setRightActionModal}: Props) => {
  const queryClient = useQueryClient();
  const {error, mutate, isLoading} = useMutation({
    mutationFn: deleteIntake,
    onSuccess: () => queryClient.refetchQueries({queryKey: ['intakes']}),
  });
  const closeDeleteModal = () => setRightActionModal(false);
  const handleDeleteIntake = () => {
    mutate(id);
    if (!error) setRightActionModal(false);
  };

  return (
    <>
      {error ? (
        <Error error={error.toString()} />
      ) : (
        <View
          style={{
            flex: 1,
          }}>
          <Modal
            animationType="slide"
            visible={rightActionModal}
            transparent={true}>
            <View style={styles.Container}>
              <TouchableOpacity
                onPress={closeDeleteModal}
                style={styles.CloseContainer}>
                <Image
                  source={require('../../../../assets/fonts/icons/close.png')}
                  style={styles.Image}
                />
              </TouchableOpacity>
              <View style={styles.InnerContainer}>
                <Text style={styles.Text}>
                  Are you sure you want to delete?
                </Text>
              </View>
              <TouchableOpacity
                style={styles.Button}
                onPress={handleDeleteIntake}>
                <Text style={styles.ButtonText}>
                  {isLoading ? 'Deleting...' : 'Delete'}
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
};

export default DeleteModal;
