import { Slot } from 'expo-router'
import React from 'react'

const AuthLayout = () => {
  return <Slot screenOptions={{headerShown: true}}/>
}

export default AuthLayout