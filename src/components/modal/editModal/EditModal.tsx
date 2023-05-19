import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateIntake} from '../../../api/functions';
import Error from '../../error/Error';
import {styles} from './styles';

type Props = {
  leftActionModal: boolean;
  setLeftActionModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: number | string | undefined | null;
};

const EditModal = ({leftActionModal, setLeftActionModal, id}: Props) => {
  const [value, setValue] = useState<string>('');
  let numberVersion = parseInt(value, 10);
  const queryClient = useQueryClient();
  const {error, isLoading, mutate} = useMutation({
    mutationFn: updateIntake,
    onSuccess: () => queryClient.refetchQueries({queryKey: ['intakes']}),
  });
  const closeEditModal = () => setLeftActionModal(false);
  const handleUpdateIntake = () => {
    mutate({
      id: id,
      amount: numberVersion,
    });
    if (!error) setLeftActionModal(false);
  };
  return (
    <>
      {error ? (
        <Error error={error.toString()} />
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.Container}>
            <Modal
              animationType="slide"
              visible={leftActionModal}
              transparent={true}>
              <View style={styles.Container}>
                <TouchableOpacity
                  style={styles.CloseContainer}
                  onPress={closeEditModal}>
                  <Image
                    source={require('../../../../assets/fonts/icons/close.png')}
                    style={styles.Image}
                  />
                </TouchableOpacity>
                <View style={styles.InnerContainer}>
                  <Text style={styles.Text}>Intake</Text>
                  <TextInput
                    style={styles.Input}
                    placeholder="100 ml"
                    value={value}
                    onChangeText={setValue}
                    keyboardType="number-pad"
                  />
                </View>
                <TouchableOpacity
                  style={styles.Button}
                  onPress={handleUpdateIntake}>
                  <Text style={styles.ButtonText}>
                    {isLoading ? 'Editing...' : 'Edit'}
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </View>
      )}
    </>
  );
};

export default EditModal;
