import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './routes/index.routes';
import { NavigationContainer } from '@react-navigation/native';

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#312e38" />
            <Routes />
        </NavigationContainer>
    );
};

export default App;