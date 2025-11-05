import { Slot } from 'expo-router'
import React from 'react'
import { StatusBar, View } from 'react-native'

const MoreLayout = () => {
    return (
        <View className='flex-1 bg-white'>
            <StatusBar barStyle={"dark-content"} />
            <Slot />
        </View>
    )
}

export default MoreLayout