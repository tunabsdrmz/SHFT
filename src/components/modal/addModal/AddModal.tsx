import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import Error from '../../error/Error';
import {postIntake} from '../../../api/functions';
import {styles} from './styles';

type Props = {
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddModal = ({showAddModal, setShowAddModal}: Props) => {
  const [value, setValue] = useState<string>('');
  let numberVersion = parseInt(value, 10);
  const queryClient = useQueryClient();
  const {error, isLoading, mutate} = useMutation({
    mutationFn: postIntake,
    onSuccess: () => queryClient.refetchQueries({queryKey: ['intakes']}),
  });

  const closeAddModal = () => setShowAddModal(false);
  const handlePostIntake = () => {
    mutate(numberVersion);
    if (!error) setShowAddModal(false);
  };
  return (
    <>
      {error ? (
        <Error error={error.toString()} />
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.Container}>
            <Modal
              animationType="fade"
              visible={showAddModal}
              transparent={true}>
              <View style={styles.Container}>
                <TouchableOpacity
                  style={styles.CloseContainer}
                  onPress={closeAddModal}>
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
                  onPress={handlePostIntake}>
                  <Text style={styles.ButtonText}>
                    {isLoading ? 'Adding..' : 'Add'}
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

export default AddModal;
