import React from 'react';
import { Image } from 'react-native';
import { Container, Title } from './styles';
import logo from '../../assets/images/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
    return (
        <Container>
            <Image source={logo} />
            <Title>Faça seu logon</Title>

            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button>Entrar</Button>
        </Container>
    );
}

export default SignIn;