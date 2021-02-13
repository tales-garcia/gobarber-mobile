import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useAuth } from '../../hooks/auth';
import { Container, Header, HeaderTitle, UserName, ProfileButton, Avatar } from './styles';

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth();
    const { navigate } = useNavigation();

    const navigateToProfile = useCallback(() => {
        navigate('Profile');
    }, [navigate]);

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
        </Container>
    );
}

export default Dashboard;