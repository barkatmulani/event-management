import React, { useEffect, useRef } from 'react';
import { EventClickArg, EventContentArg, CalendarApi } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { formatDate } from "@fullcalendar/core/index.js";
import { Tooltip } from 'react-tooltip';
import { EventForm } from '../models/event-form.ts';
import 'react-tooltip/dist/react-tooltip.css'

interface Props {
  events: EventForm[],
  onEventClick?: (id: string) => void
}

export default function Calendar({ events, onEventClick}: Props) {
	const calendarRef = useRef(null);

	useEffect(() => {
		setTimeout(() => {
			addEvents(events);
		});
	}, [events]);

  	const addEvents = (events: EventForm[]) => {
		const calendarApi = calendarRef.current.getApi() as CalendarApi;
		
		calendarApi.removeAllEvents();
		
		events.forEach(event => {
			calendarApi.addEvent({
				id: event.id,
				title: formatDate(event.date!, {month: 'short', day: 'numeric'}) + ': ' + event.name,
				display: event.description,
				start: event.date,
				end: event.date,
				allDay: true
			});
		});
  	};

	const handleEventClick = (clickInfo: EventClickArg) => {
		if (onEventClick) onEventClick(clickInfo.event.id);
	};

	const renderEventContent = (eventContent: EventContentArg) => {
		return (
			<div>
				<div id={`tooltip-${eventContent.event.id}`} className="">
					{eventContent.event.title}
				</div>

				<Tooltip anchorSelect={`#tooltip-${eventContent.event.id}`} place="top">
					{eventContent.event.display}
				</Tooltip>
			</div>
		);
	};

	return (
    	<div>
			<FullCalendar
				ref={calendarRef}
				plugins={[dayGridPlugin, interactionPlugin]}
				headerToolbar={{
					left: 'prev,next',
					center: 'title',
					right: ''
				}}
				initialView='dayGridMonth'
				editable={true}
				selectable={true}
				selectMirror={true}
				dayMaxEvents={true}
				weekends={true}
				initialEvents={events} // alternatively, use the `events` setting to fetch from a feed
				eventContent={renderEventContent} // custom render function
				eventClick={handleEventClick}
			/>
		</div>
	)
}