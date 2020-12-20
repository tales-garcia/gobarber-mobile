import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './routes';
import { NavigationContainer } from '@react-navigation/native';
import AppProvider from './hooks';

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#312e38" />
            <AppProvider>
                <Routes />
            </AppProvider>
        </NavigationContainer>
    );
};

export default App;