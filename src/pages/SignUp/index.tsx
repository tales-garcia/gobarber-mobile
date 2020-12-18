import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Container, ForgotPassword, ForgotPasswordText, BackToSignIn, BackToSignInText, Title } from './styles';
import logo from '../../assets/images/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/Feather';

const SignUp: React.FC = () => {
    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}
                >
                    <Container>
                        <Image source={logo} />

                        <View>
                            <Title>Crie sua conta</Title>
                        </View>

                        <Input name="name" icon="user" placeholder="Nome" />
                        <Input name="email" icon="mail" placeholder="E-mail" />
                        <Input name="password" icon="lock" placeholder="Senha" />

                        <Button>Cadastrar</Button>

                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <BackToSignIn>
                <Icon color="#fff" size={20} name="arrow-left" />
                <BackToSignInText>
                    Voltar para logon
                </BackToSignInText>
            </BackToSignIn>
        </>
    );
}

export default SignUp;