import Ionicons from "@expo/vector-icons/Ionicons"
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const FacebookAuthButton = () => {
   return (
      <TouchableOpacity style={styles.googleButton}>
         <Ionicons name="logo-facebook" size={20} color={"#fff"} />
         <Text style={styles.googleButtonText}>Continuer with facebook</Text>
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
export default FacebookAuthButton