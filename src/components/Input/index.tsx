import { useField } from 'formik';
import React, { forwardRef, MutableRefObject, useCallback, useState } from 'react';
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
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const [{ onBlur, onChange, value }] = useField(name);

    return (
        <Container isFocused={isFocused}>
            <Icon name={icon} size={20} color={(isFilled || isFocused) ? '#ff9000' : '#666360'} />
            <TextInput
                ref={ref as MutableRefObject<OriginalTextInput>}
                keyboardAppearance="dark"
                placeholderTextColor="#666360"
                {...rest}
                onChangeText={onChange(name)}
                onBlur={useCallback(() => {
                    onBlur(name);

                    setIsFocused(false);
                    setIsFilled(!!value);
                }, [value])}
                value={value}
                onFocus={useCallback(() => {
                    setIsFocused(true);
                }, [])}
            />
        </Container>
    );
}

export default forwardRef(Input);