import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Icon } from 'react-native-vector-icons/Icon';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    Container,
    Header,
    BackButton,
    HeaderTitle,
    Avatar,
    ProvidersList,
    ProviderContainer,
    PoviderAvatar,
    ProviderName,
    Calendar,
    Title,
    ShowDatePickerButton,
    ShowDatePickerButtonText,
    Section,
    SectionTitle,
    SectionContent,
    Hour,
    HourText,
    Schedule
} from './styles';
import { Platform, ScrollView } from 'react-native';
import { format } from 'date-fns';

export interface IProvider {
    name: string;
    avatarUrl: string;
    _id: string;
}

type DatePickerFromOS = {
    [key in typeof Platform.OS]: any;
};

interface IDayAvailability {
    hour: number;
    available: boolean;
}

const CreateAppointment: React.FC = () => {
    const [providers, setProviders] = useState<IProvider[]>([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dayAvailability, setDayAvailability] = useState<IDayAvailability[]>([]);
    const [selectedHour, setSelectedHour] = useState(0);

    const { user } = useAuth();
    const { providerId } = useRoute().params as { providerId: string; };
    const { goBack } = useNavigation();

    const [selectedProviderId, setSelectedProviderId] = useState(providerId);

    React.useEffect(() => {
        api.get('providers').then(res => res.data).then(setProviders);
    }, []);

    React.useEffect(() => {
        api.get(`providers/${selectedProviderId}/availability/day`, {
            params: {
                year: selectedDate.getFullYear,
                day: selectedDate.getDate(),
                month: selectedDate.getMonth() + 1
            }
        }).then(res => res.data).then(setDayAvailability);
    }, [selectedDate, selectedProviderId]);

    const handleSelectProvider = React.useCallback((id: string) => {
        setSelectedProviderId(id);
    }, []);

    const handleSelectHour = React.useCallback((hour: number) => setSelectedHour(hour), []);

    const handleToggleDatePicker = React.useCallback(() => {
        setShowDatePicker(previousState => !previousState);
    }, []);

    const handleDateChange = React.useCallback((_: Event, date?: Date) => {
        setSelectedDate(date!);
    }, []);

    const defaultDateTimePickerProps = React.useMemo(() => ({
        mode: 'date',
        onChange: handleDateChange,
        value: selectedDate
    }), []);

    const datePicker = React.useMemo<DatePickerFromOS>(() => ({
        ios: (
            <DateTimePicker
                {...defaultDateTimePickerProps}
                textColor="#f4ede8"
            />
        ),
        android: (
            <>
                <ShowDatePickerButton onPress={handleToggleDatePicker}>
                    <ShowDatePickerButtonText>Selecionar outra data</ShowDatePickerButtonText>
                </ShowDatePickerButton>
                {showDatePicker && (
                    <DateTimePicker
                        {...defaultDateTimePickerProps}
                        display="calendar"
                    />
                )}
            </>
        ),
        windows: '',
        macos: '',
        web: ''
    }), [showDatePicker, handleToggleDatePicker]);

    const morningAvailability = React.useMemo(() => dayAvailability
        .filter(({ hour }) => hour < 12)
        .map(availability => ({ ...availability, formattedHour: format(new Date().setHours(availability.hour), "HH':'mm") })) as any as (IDayAvailability & { formattedHour: string })[]
    , [dayAvailability]);
    const afternoonAvailability = React.useMemo(() => dayAvailability
        .filter(({ hour }) => hour >= 12)
        .map(availability => ({ ...availability, formattedHour: format(new Date().setHours(availability.hour), "HH':'mm") })) as any as (IDayAvailability & { formattedHour: string })[]
    , [dayAvailability]);

    return (
        <Container>
            <Header>
                <BackButton onPress={goBack}>
                    <Icon name="chevron-left" size={24} color="#999591" />
                </BackButton>

                <HeaderTitle>Cabeleireiros</HeaderTitle>

                <Avatar source={{ uri: user.avatarUrl }} />
            </Header>

            <ScrollView>
                <ProvidersList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={providers}
                    keyExtractor={provider => provider._id}
                    renderItem={({ item }) => (
                        <ProviderContainer
                            selected={item._id === selectedProviderId}
                            onPress={() => handleSelectProvider(item._id)}
                        >
                            <PoviderAvatar source={{ uri: item.avatarUrl }} />
                            <ProviderName
                                selected={item._id === selectedProviderId}
                            >{item.name}</ProviderName>
                        </ProviderContainer>
                    )}
                />


                <Calendar>
                    <Title>Escolha a data</Title>
                    {datePicker[Platform.OS]}
                </Calendar>

                <Schedule>
                    <Section>
                        <SectionTitle>Manhã</SectionTitle>

                        <SectionContent>
                            {morningAvailability.map(({ formattedHour, available, hour }) => (
                                <Hour
                                    enabled={available}
                                    selected={hour === selectedHour}
                                    available={available}
                                    key={formattedHour}
                                    onPress={() => handleSelectHour(hour)}
                                >
                                    <HourText selected={hour === selectedHour}>{formattedHour}</HourText>
                                </Hour>
                            ))}
                        </SectionContent>
                    </Section>
                    <Section>
                        <SectionTitle>Tarde</SectionTitle>

                        <SectionContent>
                            {afternoonAvailability.map(({ formattedHour, hour, available }) => (
                                <Hour
                                    enabled={available}
                                    selected={hour === selectedHour}
                                    available={available}
                                    key={formattedHour}
                                    onPress={() => handleSelectHour(hour)}
                                >
                                    <HourText selected={hour === selectedHour}>{formattedHour}</HourText>
                                </Hour>
                            ))}
                        </SectionContent>
                    </Section>
                </Schedule>
            </ScrollView>
        </Container>
    );
}

export default CreateAppointment;