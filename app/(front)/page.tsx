"use client";

import Item from "@/components/event/item";
import axios from "axios";
import { useEffect, useState } from "react";
import EventI from "@/types/event";
import { set } from "mongoose";

export default function Front() {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    const res = await axios.get("/api/dashboard/get-events");

    console.log(res.data.events);

    setEvents(res.data.events);
    setFilteredEvents(res.data.events);
  };

  const cities = [
    "Warszawa",
    "Kraków",
    "Wrocław",
    "Poznań",
    "Gdańsk",
    "Szczecin",
    "Lublin",
    "Katowice",
  ];

  const filterEventsByCity = (city: string) => {
    if (city === "all") {
      setFilteredEvents(events);
      return;
    }
    setFilteredEvents(events.filter((event: EventI) => event.city === city));
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="mt-2">
      <div>
        <select
          name="city-filter"
          id="city-filter"
          className="p-5"
          onChange={(e) => {
            const selectedCity = e.target.value;
            filterEventsByCity(selectedCity);
          }}
        >
          <option value="all">Wszystkie</option>
          {cities.map((city) => (
            <option key={city} value={city} className="text-black">
              {city}
            </option>
          ))}
        </select>
      </div>
      {filteredEvents.map((event: EventI) => (
        <Item key={event._id} event={event} />
      ))}
    </div>
  );
}
