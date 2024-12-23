import React, { useState, useEffect } from "react";
import { EventForm } from "../models/event-form";
import { formatDate } from "@fullcalendar/core/index.js";

interface Props {
    events: EventForm[];
}

export default function ListEvents({events}: Props) {
    const [ filteredEvents, setFilteredEvents ] = useState<EventForm>(events);
    const [ keyword, setKeyword ] = useState<string>("");

    useEffect(() => {
        search(keyword);
    }, [keyword, events]);

    const search = (val: string) => {
        setKeyword(val);
        const newEvents = events.filter(e => e.name.indexOf(keyword) >= 0 || e.description.indexOf(keyword) >= 0);
        setFilteredEvents(newEvents);
    };

    return (
        <div className="mt-3">
            <h1 key="events" className="font-bold text-xl underline mb-2">Events</h1>

            <label>Search</label>
            <input
                title="Search"
                className="ml-2 mt-2"
                value={keyword}
                onChange={(e: any) => search(e.target.value)} />
            
            <ul className="mt-2">
            {!filteredEvents.length ? <></> :
                filteredEvents.map((event, i) => (
                    <li key={i} className="list-none">
                        <b>{formatDate(event.date!, {year: 'numeric', month: 'short', day: 'numeric'})}:</b>
                        &nbsp;
                        <i>{event.name} ({event.description})</i>
                    </li>
                ))
            }
            </ul>
        </div>
    )
}