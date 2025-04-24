"use client";

import Item from "@/components/event/item";
import Image from "next/image";
import Plus from "@/public/plus.svg";
import Form from "@/components/event/form";
import { useEffect, useState } from "react";
import axios from "axios";
import EventI from "@/types/event";

interface Props {
  isAdmin: boolean;
}

export default function Dashboard({ isAdmin }: Props) {
  const [events, setEvents] = useState([]);
  const [popup, setPopup] = useState(false);
  const [editedEvent, setEditedEvent] = useState<EventI | null>(null);

  const getEvents = async () => {
    const res = await axios.get("/api/dashboard/get-events");

    console.log(res.data.events);

    setEvents(res.data.events);
  };

  const handleEventClicked = (event: EventI) => {
    setEditedEvent(event);
    setPopup(true);
  };

  const handleAddEventClicked = () => {
    setEditedEvent(null);
    togglePopup();
  };

  useEffect(() => {
    getEvents();
  }, []);

  const togglePopup = () => {
    setPopup(!popup);
  };

  return (
    <div>
      <div
        id="add-event"
        className="bg-white border-4 cursor-pointer border-[#b32e2e] rounded-full p-4 w-fit m-4"
        onClick={handleAddEventClicked}
      >
        <Image src={Plus} alt="add icon" width={40} height={40} />
      </div>
      {popup && (
        <Form
          isAdmin={isAdmin}
          togglePopup={togglePopup}
          editedEvent={editedEvent}
          eventAdded={getEvents}
          eventDeleted={getEvents}
          eventEdited={getEvents}
        />
      )}
      {events.map((event: EventI) => (
        <Item
          key={event._id}
          event={event}
          onEventClicked={handleEventClicked}
        />
      ))}
    </div>
  );
}
