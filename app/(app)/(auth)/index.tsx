import useUserStore from '@/hooks/use-userstore'
import React from 'react'
import { Button, Text, View } from 'react-native'

const AuthScreen = () => {
   const { setIsGuest } = useUserStore()
   return (
      <View>
         <Text>AuthScreen</Text>
         <Button title='Go Login' onPress={() => setIsGuest(false)} />
      </View>
   )
}

export default AuthScreen