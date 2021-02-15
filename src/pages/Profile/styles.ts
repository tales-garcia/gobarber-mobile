import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    padding: 0 30px ${Platform.OS === 'android' ? 120 : 40}px;
`;

export const Title = styled.Text`
    color: #f4ede8;
    font-size: 20px;
    font-family: 'RobotoSlab-Medium';
    margin: 24px 0;
`;

export const ForgotPassword = styled.TouchableOpacity`
    margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
    color: #f4ede8;
    font-size: 16px;
    font-family: 'RobotoSlab-Regular';
`;

export const UserAvatarButton = styled.TouchableOpacity`
    margin-top: 32px;

`;

export const UserAvatar = styled.Image`
    width: 186px;
    height: 186px;
    border-radius: 98px;
    align-self: center;
`;

export const BackButton = styled.TouchableOpacity`
    margin-top: 40px;
`;