import { useField } from 'formik';
import React, { forwardRef, MutableRefObject } from 'react';
import { TextInputProps } from 'react-native';
import { TextInput as OriginalTextInput } from 'react-native';
import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface RefProps {
    focus(): void;
}

const Input: React.ForwardRefRenderFunction<RefProps, InputProps> = ({ name, icon, ...rest }, ref) => {
    const [{ onBlur, onChange, value }] = useField(name);
    return (
        <Container>
            <Icon name={icon} size={20} color="#666360" />
            <TextInput
                ref={ref as MutableRefObject<OriginalTextInput>}
                keyboardAppearance="dark"
                placeholderTextColor="#666360"
                {...rest}
                onChangeText={onChange(name)}
                onBlur={onBlur(name)}
                value={value}
            />
        </Container>
    );
}

export default forwardRef(Input);