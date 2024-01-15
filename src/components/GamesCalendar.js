import { Calendar, momentLocalizer } from 'react-big-calendar';
import Moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(Moment);

function GamesCalendar({ games, componen }) {
	return (
		<Calendar
			startAccessor="start"
			endAccessor="end"
			localizer={localizer}
			events={games}
			views={['month', 'agenda']}
			onSelectEvent={(evt) => console.log(evt)}
		/>
	);
}

export default GamesCalendar;
