import Ionicons from "@expo/vector-icons/Ionicons"
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const GoogleAuthButton = () => {
   return (
      <TouchableOpacity style={styles.googleButton}>
         <Ionicons name="logo-google" size={20} color={"#fff"} />
         <Text style={styles.googleButtonText}>Continuer with google</Text>
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   googleButton: {
      backgroundColor: "#4285F4",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 17,
      borderRadius: 12,
      gap: 4
   },
   googleButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600"
   }
})
export default GoogleAuthButton