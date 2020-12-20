import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';

const AppNavigation = createStackNavigator();

const AppRoutes: React.FC = () => {

    return (
        <AppNavigation.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#312e38'
                }
            }}
        >
            <AppNavigation.Screen name="SignIn" component={View} />
        </AppNavigation.Navigator>
    );
}

export default AppRoutes;