import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Icon } from 'react-native-vector-icons/Icon';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import {
    Container,
    Header,
    ProviderContainer,
    HeaderTitle,
    ProviderAvatar,
    UserName,
    ProviderInfo,
    ProfileButton,
    ProviderName,
    Avatar,
    ProviderMeta,
    ProvidersList,
    ProviderMetaText,
    ProvidersListTitle
} from './styles';

export interface IProvider {
    name: string;
    avatarUrl: string;
    _id: string;
}

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const { navigate } = useNavigation();
    const [providers, setProviders] = useState<IProvider[]>([]);

    const navigateToProfile = useCallback(() => {
        navigate('Profile');
    }, [navigate]);

    const navigateToCreateAppointment = useCallback((providerId: string) => {
        navigate('CreateAppointment', { providerId });
    }, [navigate]);

    React.useEffect(() => {
        api.get('providers').then(res => res.data).then(setProviders);
    }, []);

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    Bem vindo, {'\n'}
                    <UserName>{user.name}</UserName>
                </HeaderTitle>

                <ProfileButton onPress={navigateToProfile}>
                    <Avatar source={{
                        uri: user.avatarUrl
                    }} />
                </ProfileButton>
            </Header>

            <ProvidersList
                data={providers}
                keyExtractor={provider => provider._id}
                ListHeaderComponent={<ProvidersListTitle>Cabeleireiros</ProvidersListTitle>}
                renderItem={({ item }) => (
                    <ProviderContainer onPress={() => navigateToCreateAppointment(item._id)}>
                        <ProviderAvatar source={{ uri: item.avatarUrl }} />

                        <ProviderInfo>
                            <ProviderName>{item.name}</ProviderName>

                            <ProviderMeta>
                                <Icon name="calendar" size={14} color="#ff9000" />
                                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
                            </ProviderMeta>
                            <ProviderMeta>
                                <Icon name="clock" size={14} color="#ff9000" />
                                <ProviderMetaText>8h às 18h</ProviderMetaText>
                            </ProviderMeta>
                        </ProviderInfo>
                    </ProviderContainer>
                )}
            />
        </Container>
    );
}

export default Dashboard;