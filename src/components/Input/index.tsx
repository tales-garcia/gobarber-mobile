import { useField } from 'formik';
import React, { forwardRef, MutableRefObject, useCallback, useState } from 'react';
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { TextInput as OriginalTextInput } from 'react-native';
import { Container, TextInput, Icon, Error } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
    containerStyle?: StyleProp<ViewStyle>;
}

interface RefProps {
    focus(): void;
}

const Input: React.ForwardRefRenderFunction<RefProps, InputProps> = ({ name, icon, containerStyle, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const [{ onBlur, onChange, value }, { error }] = useField(name);
    
    return (
        <Container style={containerStyle} isFocused={isFocused} hasError={!!error}>
            <Icon name={icon} size={20} color={useCallback((() => {
                if (error) return '#c53030';

                return (isFilled || isFocused) ? '#ff9000' : '#666360';
            }), [error, isFilled, isFocused])()} />
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
            {error && <Error>{error}</Error>}
        </Container>
    );
}

export default forwardRef(Input);