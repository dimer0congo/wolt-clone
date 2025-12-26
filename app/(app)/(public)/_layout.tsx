import { Stack } from 'expo-router'
import React from 'react'

const Layout = () => {
   return (
      <Stack>
         <Stack.Screen
            name='index'
            options={{ headerShown: false, contentStyle: { backgroundColor: "#fff" } }} />
         <Stack.Screen
            name='other-options'
            options={{
               headerShown: false,
               presentation: "formSheet",
               title: "",
               sheetAllowedDetents: [0.4],
               sheetCornerRadius: 14,
               headerShadowVisible: false
            }} />
      </Stack>
   )
}

export default Layout