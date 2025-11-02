import React from 'react'
import { Text, View } from 'react-native'

const PrimaryButton = ({ text, icon }: { text: string, icon?: string }) => {
    return (
        <View className='bg-primary w-full items-center justify-center p-4 rounded-lg'>
            <Text className='text-white text-xl'>{text}</Text>
        </View>
    )
}

export default PrimaryButton