import React from 'react';
import {Image, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './src/screens/HomeScreen';
import GoalScreen from './src/screens/GoalScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {QueryClient} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

function App(): JSX.Element {
  const Tab = createMaterialTopTabNavigator();
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{persister: asyncStoragePersister}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            tabBarPosition="bottom"
            backBehavior="history"
            screenOptions={{
              tabBarStyle: {
                backgroundColor: '#AAE5FF',
                borderColor: 'powderblue',
                borderTopWidth: 0.2,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              },
            }}>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: tabInfo => (
                  <Text
                    style={
                      tabInfo.focused
                        ? {
                            fontSize: 16,
                            fontFamily: 'roboto',
                            fontWeight: '700',
                            color: '#45B8DE',
                          }
                        : {
                            fontSize: 16,
                            fontFamily: 'roboto',
                            fontWeight: '700',
                            color: '#FFF',
                          }
                    }>
                    Home
                  </Text>
                ),
                tabBarIcon: tabInfo => (
                  <Image
                    source={
                      tabInfo.focused
                        ? require('./assets/fonts/icons/homeActive.png')
                        : require('./assets/fonts/icons/homeInactive.png')
                    }
                    style={
                      tabInfo.focused
                        ? {width: 28, height: 28}
                        : {width: 24, height: 24}
                    }
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Goal"
              component={GoalScreen}
              options={{
                tabBarLabel: tabInfo => (
                  <Text
                    style={
                      tabInfo.focused
                        ? {
                            fontSize: 16,
                            fontFamily: 'roboto',
                            fontWeight: '700',
                            color: '#45B8DE',
                          }
                        : {
                            fontSize: 16,
                            fontFamily: 'roboto',
                            fontWeight: '700',
                            color: '#FFF',
                          }
                    }>
                    Goal
                  </Text>
                ),
                tabBarIcon: tabInfo => (
                  <Image
                    source={
                      tabInfo.focused
                        ? require('./assets/fonts/icons/goalActive.png')
                        : require('./assets/fonts/icons/goalInactive.png')
                    }
                    style={
                      tabInfo.focused
                        ? {width: 26, height: 26}
                        : {width: 24, height: 24}
                    }
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </PersistQueryClientProvider>
  );
}

export default App;
