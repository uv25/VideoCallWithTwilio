import React, { Component, useRef, useState, useEffect, useContext, createContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, TextInput, Button, TouchableOpacity, Dimensions
} from 'react-native';

import {
  TwilioVideo,
  TwilioVideoLocalView,
  TwilioVideoParticipantView
} from 'react-native-twilio-video-webrtc'

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './src/screens/HomeScreen'
import {VideoCall} from './src/screens/VideoCallScreen'
import {RejisterScreen} from './src/screens/RejisterScreen'

const initialState = {
  isAudioEnabled: true,
  status: 'disconnected',
  participants: new Map(),
  videoTracks: new Map(),
  userName: 'uditvohra',
  roomName: 'p2pRoom',
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2ExNzMzZmEyYjVkY2U4NzM1M2U1OGE5Y2RjODk5NTcwLTE2MjM2NDI2ODIiLCJpc3MiOiJTS2ExNzMzZmEyYjVkY2U4NzM1M2U1OGE5Y2RjODk5NTcwIiwic3ViIjoiQUNiZjg0ZTRkMWU0MmQ0MmY0ODAyYWRmZjhlNDFiOGQzNyIsImV4cCI6MTYyMzY0NjI4MiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiU2FuY2hpdCIsInZpZGVvIjp7InJvb20iOiJTZXNzaW9uV2l0aFVWIn19fQ.IcDCQaMDzPbY0Kk0bi9r9vMHAaJnyd-eY_RTR_CZkVM',
};

export const AppContext = createContext(initialState);
const dimensions = Dimensions.get('window');


const App = () => {

  const Stack = createStackNavigator();

  

  const [props, setProps] = useState(initialState);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppContext.Provider value={{props, setProps}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Video Call" component={VideoCall} />
            <Stack.Screen name="RejisterScreen" component={RejisterScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1
  }
})
export default App;
