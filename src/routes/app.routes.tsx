import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';
import AppointmentCreated from '../pages/AppointmentCreated';
import CreateAppointment from '../pages/CreateAppointment';
import Profile from '../pages/Profile';

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
            <AppNavigation.Screen name="AppointmentCreated" component={AppointmentCreated} />
            <AppNavigation.Screen name="CreateAppointment" component={CreateAppointment} />
            <AppNavigation.Screen name="Profile" component={Profile} />
        </AppNavigation.Navigator>
    );
}

export default AppRoutes;