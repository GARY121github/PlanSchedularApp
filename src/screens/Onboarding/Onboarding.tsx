import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setHasLaunched } from '../../store/slices/onBoardingSlice'


import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { OnBoardingParamList } from '../../routes/OnBoardingRoutes'

type OnBoardingScreenProps = NativeStackScreenProps<OnBoardingParamList, 'OnBoarding'>

export default function Onboarding({navigation} : OnBoardingScreenProps) {

    const dispatch = useDispatch();

    const onPressHandler = () => {
        navigation.replace('Home')
        dispatch(setHasLaunched(true));
    }
    
  return (
    <View style={styles.container}>
      <Text>Create your plans</Text>
      <Button title='Home' onPress={onPressHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  }
})