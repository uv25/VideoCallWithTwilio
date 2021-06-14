import React, {useRef, useState, useContext, useEffect} from 'react'
import { View, Text, StyleSheet, Alert} from 'react-native'
import {AppContext} from '../../App'
import {
    TwilioVideo,
    TwilioVideoLocalView,
    TwilioVideoParticipantView
  } from 'react-native-twilio-video-webrtc'

export const VideoCall = ({navigation}) => {

    const twilioVideo = useRef(null);
    const {props, setProps} = useContext(AppContext);

    useEffect(() => {
        twilioVideo.current.connect({
          roomName: props.roomName,
          accessToken: props.token,
        });
        setProps({...props, status: 'connecting'});
        return () => {
          _onEndButtonPress();
        };
    }, []);

    const _onEndButtonPress = () => {
        twilioVideo.current.disconnect();
        //setProps(initialState);
      };
    
      const _onMuteButtonPress = () => {
        twilioVideo.current
          .setLocalAudioEnabled(!props.isAudioEnabled)
          .then((isEnabled) => setProps({...props, isAudioEnabled: isEnabled}));
      };
    
      const _onFlipButtonPress = () => {
        twilioVideo.current.flipCamera();
      };

    return(
        <View style={{borderColor: 'red', borderWidth: 1, flex: 1}}>
            {(props.status === 'connected' || props.status === 'connecting') && (
            <View style={styles.callWrapper}>
                {props.status === 'connected' && (
                <View style={styles.grid}>
                {Array.from(props.videoTracks, ([trackSid, trackIdentifier]) => (
                    <TwilioVideoParticipantView
                        style={styles.remoteVideo}
                        key={trackSid}
                        trackIdentifier={trackIdentifier}
                    />
                ))}
            </View>
            )}
        </View>
        )}


        <TwilioVideo
        ref={twilioVideo}
        onRoomDidConnect={() => {
          setProps({...props, status: 'connected'});
        }}
        onRoomDidDisconnect={() => {
          setProps({...props, status: 'disconnected'});
          navigation.goBack();
        }}
        onRoomDidFailToConnect={(error) => {
          Alert.alert('Error', error.error);
          setProps({...props, status: 'disconnected'});
          navigation.goBack();
        }}
        onParticipantAddedVideoTrack={({participant, track}) => {
          if (track.enabled) {
            setProps({
              ...props,
              videoTracks: new Map([
                ...props.videoTracks,
                [
                  track.trackSid,
                  {
                    participantSid: participant.sid,
                    videoTrackSid: track.trackSid,
                  },
                ],
              ]),
            });
          }
        }}
        onParticipantRemovedVideoTrack={({track}) => {
          const videoTracks = props.videoTracks;
          videoTracks.delete(track.trackSid);
          setProps({...props, videoTracks});
        }}
      />
        </View>
    )
}

const styles = StyleSheet.create({
    callWrapper: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'yellow'
    },

    remoteVideo: {
        //flex: 1,
        height: 100,
        width: 100,
        borderColor: 'green',
        borderWidth: 10,
    },

    grid: {
      flex: 1,
      borderColor: 'black',
      borderWidth: 2,
    }
})