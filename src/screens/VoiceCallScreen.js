import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import TwilioVoice from 'react-native-twilio-programmable-voice'

export const VoiceCallScreen = () => {
    const accountSid = 'ACbf84e4d1e42d42f4802adff8e41b8d37'
    const testAccountSid =  'ACbcd573059d7aa07afd93a6cf8b85b526'

    const authtoken = 'e0ac30a2b0f95ab7ad148347a12d026c';
    const testAuthToken = '50c0c8a83067d4338f22b6dcbb2021fb'
    const authTokenNew = 'e0ac30a2b0f95ab7ad148347a12d026c'
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzdlYTY1MzE0OWFlZjIxMzExYjg2ZDFlYjQ3ZmIwOGVhLTE2MjM4NDE1OTYiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyIiwidm9pY2UiOnsiaW5jb21pbmciOnsiYWxsb3ciOnRydWV9LCJvdXRnb2luZyI6eyJhcHBsaWNhdGlvbl9zaWQiOiJBUDI5Y2NmMThjNTJmMGEyODAzNzU5YmYxZGU3OWVmYTM3In19fSwiaWF0IjoxNjIzODQxNTk2LCJleHAiOjE2MjM4NDUxOTYsImlzcyI6IlNLN2VhNjUzMTQ5YWVmMjEzMTFiODZkMWViNDdmYjA4ZWEiLCJzdWIiOiJBQ2JmODRlNGQxZTQyZDQyZjQ4MDJhZGZmOGU0MWI4ZDM3In0.D5Pg_mxYMK57hS25NRl3SVqrXZmSL_CamYLpFmlRj7M'

    TwilioVoice.initWithToken(accessToken).then(initRes => {
        console.log('initres:', initRes)
    })
    //TwilioVoice.initWithAccessToken(accessToken)
    //console.log('initRes', initRes)

    TwilioVoice.addEventListener('deviceReady', function() {
        console.log('Device is Ready')
    })
    TwilioVoice.addEventListener('deviceNotReady', function(data) {
        console.log('Device not ready data: ', data)
        console.log('device is not ready')
    })
    TwilioVoice.addEventListener('connectionDidConnect', function(data) {
        // {
        //     call_sid: string,  // Twilio call sid
        //     call_state: 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' | 'RINGING' | 'DISCONNECTED' | 'CANCELLED',
        //     call_from: string, // "+441234567890"
        //     call_to: string,   // "client:bob"
        // }
        console.log('Connection did connect data: ', data)
        console.log('ConnectionDidConnect callback')
    })
    TwilioVoice.addEventListener('connectionIsReconnecting', function(data) {
        // {
        //     call_sid: string,  // Twilio call sid
        //     call_from: string, // "+441234567890"
        //     call_to: string,   // "client:bob"
        // }
        console.log('reconnecting')
    })
    TwilioVoice.addEventListener('connectionDidReconnect', function(data) {
        // {
        //     call_sid: string,  // Twilio call sid
        //     call_from: string, // "+441234567890"
        //     call_to: string,   // "client:bob"
        // }
        
        console.log('Reconnected')
    })
    TwilioVoice.addEventListener('connectionDidDisconnect', function(data: mixed) {
        //   | null
        //   | {
        //       err: string
        //     }
        //   | {
        //         call_sid: string,  // Twilio call sid
        //         call_state: 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' | 'RINGING' | 'DISCONNECTED' | 'CANCELLED',
        //         call_from: string, // "+441234567890"
        //         call_to: string,   // "client:bob"
        //         err?: string,
        //     }
        console.log('Disconnected Data: ', data)
        console.log('Disconnected')
    })
    TwilioVoice.addEventListener('callStateRinging', function(data: mixed) {
        //   {
        //       call_sid: string,  // Twilio call sid
        //       call_state: 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' | 'RINGING' | 'DISCONNECTED' | 'CANCELLED',
        //       call_from: string, // "+441234567890"
        //       call_to: string,   // "client:bob"
        //   }
        console.log('Ringing')
    })
    TwilioVoice.addEventListener('callInviteCancelled', function(data: mixed) {
        //   {
        //       call_sid: string,  // Twilio call sid
        //       call_from: string, // "+441234567890"
        //       call_to: string,   // "client:bob"
        //   }
        console.log('Call invite cancelled')
    })
    

    const connectCall = () => {
        console.log('inside connect call')
        TwilioVoice.connect({To: '+919041597749', From: '+19313981012'})
        //console.log('res', res)
        // const client = require('twilio')();
        // client.calls.create({
        //     from: '+19313981012',
        //     to: '+917862999499',
        //     url: ''
        // })
    }

    return (
        <View style = {{flex: 1, alignItems:'center', justifyContent: 'center' }}>
            <Text>Voice Call Screen</Text>
            <TouchableOpacity style = {{backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 20}}
                onPress={() => {connectCall()}}>
                <Text style = {{color: 'white'}}>Call</Text>
            </TouchableOpacity>
        </View>
    )
}