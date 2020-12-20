import React from 'react';
import { useAuth } from '../../hooks/auth';
import { SignOutButton, Container } from './styles';

const Dashboard: React.FC = () => {
    const { signOut } = useAuth();

    return (
        <Container>
            <SignOutButton title="Said" onPress={signOut} />
        </Container>
    );
}

export default Dashboard;