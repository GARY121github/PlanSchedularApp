import SplashScreen from '../screens/SplashScreen';
import Home from '../screens/Main/Home';
import Onboarding from '../screens/Onboarding/Onboarding';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type OnBoardingParamList = {
    OnBoarding: undefined;
    SplashScreen: undefined;
    Home: undefined;
}

const Stack = createNativeStackNavigator<OnBoardingParamList>();

export default function OnBoardingRoutes() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="OnBoarding" component={Onboarding} />
        <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  )
}