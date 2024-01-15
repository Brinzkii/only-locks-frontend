import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function GamesCalendar({ games, eventPropGetter = undefined }) {
	const localizer = momentLocalizer(Moment);
	const navigate = useNavigate();
	return (
		<Calendar
			startAccessor="start"
			endAccessor="end"
			localizer={localizer}
			events={games}
			views={['month', 'agenda']}
			onSelectEvent={(evt) => navigate(`/games/${evt.resource.game.id}`)}
			eventPropGetter={eventPropGetter ? eventPropGetter : null}
		/>
	);
}

export default GamesCalendar;
