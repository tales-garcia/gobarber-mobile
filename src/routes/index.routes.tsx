import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const AuthNavigation = createStackNavigator();

const AuthRoutes: React.FC = () => {

    return (
        <AuthNavigation.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#312e38'
                }
            }}
        >
            <AuthNavigation.Screen name="SignIn" component={SignIn} />
            <AuthNavigation.Screen name="SignUp" component={SignUp} />
        </AuthNavigation.Navigator>
    );
}

export default AuthRoutes;