import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Container, ForgotPassword, ForgotPasswordText, NewAccount, NewAccountText, Title } from './styles';
import logo from '../../assets/images/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

const SignIn: React.FC = () => {
    const { navigate } = useNavigation();

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
                            <Title>Faça seu logon</Title>
                        </View>

                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={console.log}
                        >
                            {({ handleSubmit }) => (
                                <>
                                    <Input name="email" icon="mail" placeholder="E-mail" />
                                    <Input name="password" icon="lock" placeholder="Senha" />

                                    <Button onPress={() => handleSubmit()}>Entrar</Button>
                                </>
                            )}
                        </Formik>

                        <ForgotPassword>
                            <ForgotPasswordText>
                                Esqueci minha senha
                            </ForgotPasswordText>
                        </ForgotPassword>

                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <NewAccount onPress={() => navigate('SignUp')}>
                <Icon color="#ff9000" size={20} name="log-in" />
                <NewAccountText>
                    Criar conta
                </NewAccountText>
            </NewAccount>
        </>
    );
}

export default SignIn;