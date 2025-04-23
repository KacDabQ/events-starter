"use client";

import Item from "@/components/event/item";
import Image from "next/image";
import Plus from "@/public/plus.svg";
import Form from "@/components/event/form";
import { useEffect, useState } from "react";
import axios from "axios";
import EventI from "@/types/event";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [popup, setPopup] = useState(false);

  const getEvents = async () => {
    const res = await axios.get("/api/dashboard/get-events");

    console.log(res.data.events);

    setEvents(res.data.events);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const togglePopup = () => {
    setPopup(!popup);
  };

  return (
    <div>
      {events.map((event: EventI) => (
        <Item key={event._id} event={event} />
      ))}
      <div
        className="bg-white border-4 cursor-pointer border-[#b32e2e] rounded-full p-4 w-fit"
        onClick={togglePopup}
      >
        <Image src={Plus} alt="add icon" width={40} height={40} />
      </div>
      {popup && <Form togglePopup={togglePopup} />}
    </div>
  );
}
