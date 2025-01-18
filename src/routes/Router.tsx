import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import AppRoutes from './AppRoutes'
import OnBoardingRoutes from './OnBoardingRoutes'
import { useSelector } from 'react-redux'

export default function Router() {
    const hasLaunched = useSelector((state: { onboarding: { hasLaunched: boolean } }) => state.onboarding.hasLaunched);

  return (
    <NavigationContainer>
        {
            hasLaunched ? <AppRoutes /> : <OnBoardingRoutes />
        }
    </NavigationContainer>
  )
}
