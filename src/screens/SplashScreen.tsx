import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { OnBoardingParamList } from '../routes/OnBoardingRoutes'

type SplashScreenProps = NativeStackScreenProps<OnBoardingParamList, 'SplashScreen'>

export default function SplashScreen({navigation}: SplashScreenProps) {
   useEffect(() => {
    setTimeout(() => {
        navigation.replace('OnBoarding')
    }, 2000)
   } , [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>SplashScreen</Text>
      <Image style={styles.image} source={require('../assets/icons/smile.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#669bbc',
        justifyContent : 'center',
        alignItems : 'center',
        gap : 20
    },
    text : {
        color : 'white',
        fontSize : 50,
        fontWeight : 'bold'
    },
    image : {
        width : 200,
        height : 200
    }
})