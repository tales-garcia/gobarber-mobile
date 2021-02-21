import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './routes';
import { NavigationContainer } from '@react-navigation/native';
import AppProvider from './hooks';
import SplashScreen from 'react-native-splash-screen';
import codePush from 'react-native-code-push';

const App: React.FC = () => {
    React.useEffect(() => {
        SplashScreen.hide();
    }, []);
    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#312e38" />
            <AppProvider>
                <Routes />
            </AppProvider>
        </NavigationContainer>
    );
};

export default codePush({
    checkFrequency: codePush.CheckFrequency.ON_APP_START
})(App);