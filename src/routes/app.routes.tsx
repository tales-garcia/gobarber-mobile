import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';

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
            <AppNavigation.Screen name="Dashboard" component={Dashboard} />
        </AppNavigation.Navigator>
    );
}

export default AppRoutes;