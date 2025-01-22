import AddPlan from '../screens/Main/AddPlan';
import Home from '../screens/Main/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export type AppTabParamList = {
    Home: undefined;
    Add : undefined
}

const Tab = createBottomTabNavigator<AppTabParamList>();

export default function AppRoutes() {
  return (
    <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Add' options={
            {
                title: 'Add Plan'
            }
        } component={AddPlan} />
    </Tab.Navigator>
  )
}
