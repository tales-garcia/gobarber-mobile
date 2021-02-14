import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Icon } from 'react-native-vector-icons/Icon';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import {
    Container,
    Header,
    BackButton,
    HeaderTitle,
    Avatar,
    ProvidersList,
    ProviderContainer,
    PoviderAvatar,
    ProviderName
} from './styles';

export interface IProvider {
    name: string;
    avatarUrl: string;
    _id: string;
}

const CreateAppointment: React.FC = () => {
    const [providers, setProviders] = useState<IProvider[]>([]);

    const { user } = useAuth();
    const { providerId } = useRoute().params as { providerId: string; };
    const { goBack } = useNavigation();

    const [selectedProviderId, setSelectedProviderId] = useState(providerId);

    React.useEffect(() => {
        api.get('providers').then(res => res.data).then(setProviders);
    }, []);

    const handleSelectProvider = React.useCallback((id: string) => {
        setSelectedProviderId(id);
    }, []);

    return (
        <Container>
            <Header>
                <BackButton onPress={goBack}>
                    <Icon name="chevron-left" size={24} color="#999591" />
                </BackButton>

                <HeaderTitle>Cabeleireiros</HeaderTitle>

                <Avatar source={{ uri: user.avatarUrl }} />
            </Header>

            <ProvidersList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={providers}
                keyExtractor={provider => provider._id}
                renderItem={({ item }) => (
                    <ProviderContainer
                        selected={item._id === selectedProviderId}
                        onPress={() => handleSelectProvider(item._id)}
                    >
                        <PoviderAvatar source={{ uri: item.avatarUrl }} />
                        <ProviderName
                            selected={item._id === selectedProviderId}
                        >{item.name}</ProviderName>
                    </ProviderContainer>
                )}
            />
        </Container>
    );
}

export default CreateAppointment;