import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Share from 'react-native-share';
import React from 'react';
import {styles} from './styles';

type Props = {};

const ShareButton = (props: Props) => {
  const shareOptions = {
    title: 'Share via',
    message: 'some message',
    url: 'https://www.youtube.com/watch?v=k1frgt0D_f4',
    social: Share.Social.WHATSAPP,
    whatsAppNumber: '905435789202', // country code + phone number
  };
  const handleShare = async () => {
    try {
      await Share.shareSingle(shareOptions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={handleShare} style={styles.Container}>
      <Text style={styles.Text}>Share</Text>
    </TouchableOpacity>
  );
};

export default ShareButton;
