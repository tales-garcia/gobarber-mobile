import React, { useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Container, BackToSignIn, BackToSignInText, Title } from './styles';
import logo from '../../assets/images/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

interface RefProps {
    focus(): void;
}

const SignUp: React.FC = () => {
    const { goBack } = useNavigation();
    const emailRef = useRef<RefProps>(null);
    const passwordRef = useRef<RefProps>(null);

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

                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={console.log}
                        >
                            {({ handleSubmit }) => (
                                <>
                                    <Input
                                        name="name"
                                        icon="user"
                                        placeholder="Nome"
                                        returnKeyType="next"
                                        onSubmitEditing={() => emailRef.current?.focus()}
                                    />
                                    <Input
                                        ref={emailRef}
                                        name="email"
                                        icon="mail"
                                        placeholder="E-mail"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType="email-address"
                                        returnKeyType="next"
                                        onSubmitEditing={() => passwordRef.current?.focus()}
                                    />
                                    <Input
                                        ref={passwordRef}
                                        name="password"
                                        icon="lock"
                                        placeholder="Senha"
                                        secureTextEntry={true}
                                        returnKeyType="send"
                                        onSubmitEditing={handleSubmit}
                                    />

                                    <Button onPress={() => handleSubmit()}>Cadastrar</Button>
                                </>
                            )}
                        </Formik>

                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <BackToSignIn onPress={goBack}>
                <Icon color="#fff" size={20} name="arrow-left" />
                <BackToSignInText>
                    Voltar para logon
                </BackToSignInText>
            </BackToSignIn>
        </>
    );
}

export default SignUp;