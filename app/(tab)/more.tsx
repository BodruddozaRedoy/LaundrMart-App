import PrimaryButton from '@/components/shared/PrimaryButton'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const MoreScreen = () => {
    return (
        <SafeAreaView>
            <View>
                <Text>MoreScreen</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/(auth)/welcome")}>
                <PrimaryButton text="Welcome Screen" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default MoreScreen