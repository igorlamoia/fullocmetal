import { eachDayOfInterval, format } from 'date-fns';
import theme from '../../styles/theme';
import { addOneDay } from '../../utils/format';

export const generateInterval = (start, end) => {
	let interval = {};
	eachDayOfInterval({
		start: addOneDay(start.timestamp),
		end: addOneDay(end.timestamp),
	}).forEach((day) => {
		const date = format(day, 'yyyy-MM-dd');
		interval = {
			...interval,
			[date]: {
				color: start.dateString === date || end.dateString === date ? theme.colors.main : theme.colors.main_light,
				textColor: start.dateString === date || end.dateString === date ? theme.colors.main_light : theme.colors.main,
			},
		};
	});
	return interval;
};

// Ficará asim o intervalo:
// const interval = {
//   "2022-04-15": {
//     "color": "#dc1637",
//     "textColor": "#fdedef",
//   },
//   "2022-04-16": {
//     "color": "#fdedef",
//     "textColor": "#dc1637",
//   },
//   "2022-04-17": {
//     "color": "#dc1637",
//     "textColor": "#fdedef",
//   },
// }
