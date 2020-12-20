import React, { useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Container, ForgotPassword, ForgotPasswordText, NewAccount, NewAccountText, Title } from './styles';
import logo from '../../assets/images/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

interface PasswordRefProps {
    focus(): void;
}

const signInShape = Yup.object().shape({
    email: Yup.string().email('Digite um Email válido').required('Email obrigatório'),
    password: Yup.string().min(5, 'Mínimo de 5 caracteres').required('Senha obrigatório')
});

const SignIn: React.FC = () => {
    const { navigate } = useNavigation();
    const passwordInputRef = useRef<PasswordRefProps>(null);

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
                            validationSchema={signInShape}
                            onSubmit={console.log}
                        >
                            {({ handleSubmit }) => (
                                <>
                                    <Input
                                        name="email"
                                        icon="mail"
                                        placeholder="E-mail"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType="email-address"
                                        returnKeyType="next"
                                        onSubmitEditing={() => passwordInputRef.current?.focus()}
                                    />
                                    <Input
                                        ref={passwordInputRef}
                                        name="password"
                                        icon="lock"
                                        placeholder="Senha"
                                        secureTextEntry={true}
                                        returnKeyType="send"
                                        onSubmitEditing={handleSubmit}
                                    />

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