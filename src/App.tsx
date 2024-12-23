import React, { useState } from 'react';
import { FieldValues, useForm } from "react-hook-form";
import Calendar from './components/Calendar.tsx';
import { EventForm } from './models/event-form.ts';
import ListEvents from './components/ListEvents.tsx';

import './App.css';

export default function App() {
    const { register, handleSubmit, reset } = useForm();
    const [ events, setEvents ] = useState<EventForm[]>([]);
    const [ lastEventId, setLastEventId ] = useState(0);

    const newEventId = (): string => {
        const id = lastEventId + 1;
        setLastEventId(id);
        return String(id);
    }

    const onSubmit = (val: FieldValues) => {
        let event = val as EventForm;
        event.id = newEventId();
        const newEvents = [...events, event];
        setEvents(newEvents);
        reset();
    };

    const clearForm = () => {
        reset();
    };

    const handleEventClick = (id: string) => {
        const i = events.findIndex(e => e.id === id);
        const event = events[i];
		// eslint-disable-next-line no-restricted-globals
		const res = confirm(`Are you sure you want to delete the event '${event.name}'`);
		if (res) {
            const newEvents = [...events];
            newEvents.splice(i, 1);
            setEvents(newEvents);
		}
    };

    return (
        <div className="app flex flex-row m-8">
            <div className="w-[calc(25%)] flex flex-col">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="form-control">
                            <label>Event Name</label>
                            <input {...register("name", { required: true })} />
                        </div>

                        <div className="form-control">
                            <label>Description</label>
                            <input {...register("description", { required: true })} />
                        </div>

                        <div className="form-control">
                            <label>Date</label>
                            <input {...register("date", { required: true })} type="Date" />
                        </div>
                    </div>

                    <button type="submit">Add Event</button>
                    <button className="clear ml-2" onClick={clearForm}>Clear</button>
                </form>

                <ListEvents events={events} />
            </div>

            <div className="ml-3 w-[calc(70%)]">
                <Calendar events={events} onEventClick={handleEventClick} />
            </div>
        </div>
    )
}