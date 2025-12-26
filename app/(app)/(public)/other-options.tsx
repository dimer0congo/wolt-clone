import EmailAuthButton from '@/components/auth/EmailAuthButton';
import FacebookAuthButton from '@/components/auth/FacebookAuthButton';
import { Fonts } from '@/constants/theme';
import useUserStore from '@/hooks/use-userstore';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
const OtherOptionScreen = () => {
   const router = useRouter();
   const { setIsGuest } = useUserStore();
   const continueAsGuest = () => {
      setIsGuest(true)
   }
   return (
      <View style={styles.container}>
         <View style={styles.iconWrapper}>
            <AntDesign
               name="line"
               size={40}
               style={styles.iconDesign}
            />
         </View>
         <Animated.View style={styles.titleWrapper} entering={FadeInDown.delay(100)}>
            <Text style={styles.title}>Other Options</Text>
         </Animated.View>
         <Animated.View style={styles.buttonsWrapper} entering={FadeInDown.delay(200)}>
            {/* <AppleAuthButton /> */}
            <FacebookAuthButton />
            <EmailAuthButton />
            <View style={styles.exploreNearbyTextWrapper}>
               <TouchableOpacity onPress={continueAsGuest}>
                  <Text style={styles.exploreNearbyText}>Continue as guest</Text>
               </TouchableOpacity>
            </View>
         </Animated.View>


      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: 16,
      justifyContent: 'flex-start',
   },
   iconWrapper: {
      alignItems: 'center',
   },
   titleWrapper: {
      marginBottom: 10
   },
   title: {
      fontFamily: Fonts.brandBlack,
      fontSize: 30,
   },
   iconDesign: {
      marginTop: 0,
      color: '#535151ff',
   },
   buttonsWrapper: {
      flexDirection: "column",
      gap: 8
   },

   exploreNearbyTextWrapper: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10

   },
   exploreNearbyText: {
      fontFamily: Fonts.brandBlack,
      fontSize: 16,
      color: "#3b82c5ff"
   }
});

export default OtherOptionScreen;
