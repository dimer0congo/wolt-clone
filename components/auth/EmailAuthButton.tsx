import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const EmailAuthButton = () => {
   return (
      <TouchableOpacity style={styles.appleButton}>
         <Ionicons name='mail' size={20} color={"#3b82c5ff"} />
         <Text style={styles.appleButtonText}>Continue with email</Text>
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   appleButton: {
      backgroundColor: "#badafaff",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 17,
      borderRadius: 12,
      gap: 4
   },
   appleButtonText: {
      color: "#3b82c5ff",
      fontSize: 16,
      fontWeight: "600"
   }
})
export default EmailAuthButton