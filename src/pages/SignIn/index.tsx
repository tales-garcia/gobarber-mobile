import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Container, ForgotPassword, ForgotPasswordText, NewAccount, NewAccountText, Title } from './styles';
import logo from '../../assets/images/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/Feather';

const SignIn: React.FC = () => {
    return (
        <>
            <Container>
                <Image source={logo} />

                <View>
                    <Title>Faça seu logon</Title>
                </View>

                <Input name="email" icon="mail" placeholder="E-mail" />
                <Input name="password" icon="lock" placeholder="Senha" />

                <Button>Entrar</Button>

                <ForgotPassword>
                    <ForgotPasswordText>
                        Esqueci minha senha
                    </ForgotPasswordText>
                </ForgotPassword>

            </Container>

            <NewAccount>
                <Icon color="#ff9000" size={20} name="log-in" />
                <NewAccountText>
                    Criar conta
                </NewAccountText>
            </NewAccount>
        </>
    );
}

export default SignIn;