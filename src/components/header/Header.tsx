import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Reminder from './reminder/Reminder';
import notifee, {
  IntervalTrigger,
  TriggerType,
  TimeUnit,
  AndroidNotificationSetting,
} from '@notifee/react-native';
type Props = {};

const Header = (props: Props) => {
  const [enabled, setEnabled] = useState<boolean>(true);
  const displayNotification = async () => {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    const trigger: IntervalTrigger = {
      type: TriggerType.INTERVAL,
      interval: 15,
      timeUnit: TimeUnit.MINUTES,
    };
    try {
      await notifee.createTriggerNotification(
        {
          title: 'Dont forget to drink water regularly!',
          body: 'You must drink water..',
          android: {
            channelId: channelId,
          },
        },
        trigger,
      );
    } catch (error) {
      console.log(error);
    }

    const settings = notifee.getNotificationSettings();
    if ((await settings).android.alarm == AndroidNotificationSetting.ENABLED) {
      //Create timestamp trigger
    } else {
      // Show some user information to educate them on what exact alarm permission is,
      // and why it is necessary for your app functionality, then send them to system preferences:
      await notifee.openAlarmPermissionSettings();
    }
  };
  const cancelNotifications = async () => {
    notifee.cancelTriggerNotifications();
  };
  useEffect(() => {
    enabled ? displayNotification() : cancelNotifications();
  }, []);
  return (
    <View style={styles.Container}>
      <Reminder enabled={enabled} setEnabled={setEnabled} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
});
