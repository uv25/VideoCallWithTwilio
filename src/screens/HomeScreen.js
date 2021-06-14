import React from 'react'
import { View, Text, Button, TouchableOpacity, } from 'react-native'
import {RejisterScreen} from './RejisterScreen'

export const Home = ({navigation}) => {

    return(
        <View style= {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity style = {{backgroundColor: 'blue', padding: 10, borderRadius: 5}}
                onPress={() => {navigation.navigate('RejisterScreen')}}>
                <Text style = {{color: 'white'}}>Rejister</Text>
            </TouchableOpacity>
        </View>
    )
}
