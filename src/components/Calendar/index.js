import React from 'react';
import { Calendar as CustomCalendar, LocaleConfig } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { ptBR } from './localeConfig';

LocaleConfig.locales['pt-BR'] = ptBR;
LocaleConfig.defaultLocale = 'pt-BR';

export const Calendar = ({ markedDates, onDayPress }) => {
	const theme = useTheme();
	return (
		<CustomCalendar
			renderArrow={(direction) => (
				<Feather size={24} color={theme.colors.text} name={direction === 'right' ? 'chevron-right' : 'chevron-left'} />
			)}
			headerStyle={{
				backgroundColor: theme.colors.background_secondary,
				borderBottomWidth: 0.5,
				borderBottomColor: theme.colors.text_detail,
				marginBottom: 10,
			}}
			theme={{
				textDayFontFamily: theme.fonts.primary_400,
				textDayHeaderFontFamily: theme.fonts.primary_500,
				textDayHeaderFontSize: 10,
				textMonthFontFamily: theme.fonts.secondary_600,
				textMonthFontSize: 20,
				monthTextColor: theme.colors.title,
				arrowStyle: {
					marginHorizontal: -15,
				},
			}}
			firstDay={1}
			minDate={new Date().toString()}
			markingType="period"
			markedDates={markedDates}
			onDayPress={onDayPress}
		/>
	);
};
