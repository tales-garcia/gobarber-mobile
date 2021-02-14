import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Icon } from 'react-native-vector-icons/Icon';
import { useAuth } from '../../hooks/auth';
import {
    Container,
    Header,
    BackButton,
    HeaderTitle,
    Avatar
} from './styles';

const CreateAppointment: React.FC = () => {
    const { user } = useAuth();
    const { goBack } = useNavigation();

    return (
        <Container>
            <Header>
                <BackButton onPress={goBack}>
                    <Icon name="chevron-left" size={24} color="#999591" />
                </BackButton>

                <HeaderTitle>Cabeleireiros</HeaderTitle>

                <Avatar source={{ uri: user.avatarUrl }} />
            </Header>
        </Container>
    );
}

export default CreateAppointment;