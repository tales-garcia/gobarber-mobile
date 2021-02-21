import React, { useCallback, useRef } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Container, Title, UserAvatar, UserAvatarButton, BackButton } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import ImagePicker from 'react-native-image-picker';
import { useAuth } from '../../hooks/auth';
import { Icon } from 'react-native-vector-icons';

interface RefProps {
    focus(): void;
}

const ProfileValidation = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email('Email inválido'),
    password: Yup.string().test({
        message: 'Nova senha obrigatória para resetar senha',
        test: function () {
            return !((!!this.parent.oldPassword || !!this.parent.passwordConfirmation) && !this.parent[this.path]);
        }
    }).min(5, 'Mínimo de 5 caracteres'),
    passwordConfirmation: Yup.string().test({
        message: 'Confirmação de senha obrigatória para resetar senha',
        test: function () {
            return !((!!this.parent.oldPassword || !!this.parent.password) && !this.parent[this.path]);
        }
    }).min(5, 'Mínimo de 5 caracteres').when("password", {
        is: (value: string) => !!value,
        then: Yup.string().oneOf([Yup.ref('password')], 'As senhas não correspondem')
    }),
    oldPassword: Yup.string().test({
        message: 'Senha atual obrigatória para resetar senha',
        test: function () {
            return !((!!this.parent.password || !!this.parent.passwordConfirmation) && !this.parent[this.path]);
        }
    }).min(5, 'Mínimo de 5 caracteres')
});

const Profile: React.FC = () => {
    const { goBack } = useNavigation();
    const { user, updateUser } = useAuth();
    const emailRef = useRef<RefProps>(null);
    const oldPasswordRef = useRef<RefProps>(null);
    const passwordRef = useRef<RefProps>(null);
    const passwordConfirmationRef = useRef<RefProps>(null);
    const formRef = useRef<FormikProps<{}>>(null);

    const handleSubmit = useCallback(async values => {
        try {
            const filteredData = Object.keys(values).reduce((total, key) => {
                if (values[key] && key !== 'passwordConfirmation') {
                    total[key] = values[key]
                }

                return total;
            }, {} as any);

            const { data } = await api.put('profile', filteredData);

            updateUser(data);

            Alert.alert('Perfil atualizado com sucesso!');

            goBack();
        } catch (e) {
            if (e.response) {
                switch (e.response.status) {
                    case 400:
                        formRef.current?.setErrors({ email: 'Email já usado' });
                        break;
                }
            }
        }
    }, []);

    const handleAvatarUpdate = useCallback(() => {
        ImagePicker.launchImageLibrary({
            mediaType: 'photo'
        }, response => {
            if (response.didCancel) {
                return;
            }

            if (response.errorCode) {
                Alert.alert('Ocorreu um erro.', 'Não foi possível alterar seu avatar, tente novamente');
                return;
            }

            const data = new FormData();

            data.append('avatar', {
                uri: response.uri,
                type: 'image/jpeg',
                name: `${user._id}.jpg`
            });

            api.patch('users/avatar', data).then(res => res.data).then(updateUser);

        });
    }, [ImagePicker]);

    return (
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
                    <BackButton onPress={goBack}>
                        <Icon name="chevron-left" size={24} color="#999591" />
                    </BackButton>

                    <UserAvatarButton onPress={handleAvatarUpdate}>
                        <UserAvatar source={{ uri: user.avatarUrl }} />
                    </UserAvatarButton>

                    <View>
                        <Title>Meu perfil</Title>
                    </View>

                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            passwordConfirmation: '',
                            oldPassword: ''
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={ProfileValidation}
                        innerRef={formRef}
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
                                    onSubmitEditing={() => oldPasswordRef.current?.focus()}
                                />
                                <Input
                                    ref={oldPasswordRef}
                                    name="oldPassword"
                                    icon="lock"
                                    containerStyle={{ marginTop: 16 }}
                                    placeholder="Senha atual"
                                    secureTextEntry={true}
                                    returnKeyType="next"
                                    onSubmitEditing={() => passwordRef.current?.focus()}
                                />

                                <Input
                                    ref={passwordRef}
                                    name="password"
                                    icon="lock"
                                    placeholder="Nova senha"
                                    secureTextEntry={true}
                                    returnKeyType="next"
                                    onSubmitEditing={() => passwordConfirmationRef.current?.focus()}
                                />

                                <Input
                                    ref={passwordConfirmationRef}
                                    name="passwordConfirmation"
                                    icon="lock"
                                    placeholder="Confirmar senha"
                                    secureTextEntry={true}
                                    returnKeyType="send"
                                    onSubmitEditing={handleSubmit}
                                />

                                <Button onPress={() => handleSubmit()}>Confirmar mudanças</Button>
                            </>
                        )}
                    </Formik>

                </Container>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Profile;