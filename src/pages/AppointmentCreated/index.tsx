import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import React from 'react';
import ptBr from 'date-fns/locale/pt-BR';
import { Icon } from 'react-native-vector-icons/Icon';
import {
    Container,
    Title,
    Description,
    OkButton,
    OkButtonText
} from './styles';

const AppointmentCreated: React.FC = () => {
    const { date } = useRoute().params as { date: number };
    const { reset } = useNavigation();

    const handleOkPressed = React.useCallback(() => {
        reset({
            routes: [
                {
                    name: 'Dashboard'
                }
            ],
            index: 0
        });
    }, [reset]);

    const formattedDate = React.useMemo(() => 
        format(date, "EEEE', dia 'dd' de 'MMMM' de 'yyyy' às 'HH:mm'h'", {
            locale: ptBr
        })
    , [date]);

    return (
        <Container>
            <Icon name="check" size={80} color="#04d361" />

            <Title>Agendamento cadastrado!</Title>
            <Description>{formattedDate}</Description>

            <OkButton onPress={handleOkPressed}>
                <OkButtonText>Ok</OkButtonText>
            </OkButton>
        </Container>
    );
}

export default AppointmentCreated;