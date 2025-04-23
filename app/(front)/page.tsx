"use client";

import Item from "@/components/event/item";
import axios from "axios";
import { useEffect, useState } from "react";
import EventI from "@/types/event";

export default function Front() {
  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    const res = await axios.get("/api/dashboard/get-events");

    console.log(res.data.events);

    setEvents(res.data.events);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="mt-2">
      {events.map((event: EventI) => (
        <Item key={event._id} event={event} />
      ))}
    </div>
  );
}
