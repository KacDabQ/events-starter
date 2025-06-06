"use client";

import { FormEvent, useEffect, useRef } from "react";
import axios from "axios";
import EventI from "@/types/event";

interface Props {
  isAdmin: boolean;
  editedEvent: EventI | null;
  togglePopup: Function;
  eventDeleted?: Function;
  eventEdited?: Function;
  eventAdded?: Function;
}

export default function Form({
  isAdmin,
  editedEvent,
  togglePopup,
  eventDeleted,
  eventAdded,
  eventEdited,
}: Props) {
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);

  const input_styles =
    "p-2 border border-white text-white outline-none mb-2 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500";

  console.log("editedEvent", editedEvent);
  console.log("isAdmin", isAdmin);

  const deleteEvent = async () => {
    if (editedEvent) {
      await axios.post("/api/dashboard/delete-event/" + editedEvent._id);
      if (eventDeleted) {
        eventDeleted(editedEvent._id);
      }

      togglePopup();
    }
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEditing = editedEvent !== null;

    const event = {
      name: "",
      desc: "",
      date: "",
      url: "",
      price: "",
      city: "",
    };

    if (nameRef.current) {
      event.name = nameRef.current.value;
    }

    if (descRef.current) {
      event.desc = descRef.current.value;
    }

    if (dateRef.current) {
      event.date = dateRef.current.value;
    }

    if (urlRef.current) {
      event.url = urlRef.current.value;
    }

    if (priceRef.current) {
      event.price = priceRef.current.value;
    }

    if (cityRef.current) {
      event.city = cityRef.current.value;
    }

    if (isEditing) {
      await axios.post("/api/dashboard/edit-event/" + editedEvent._id, {
        event,
      });

      if (eventEdited) {
        eventEdited(event);
      }
    } else {
      await axios.post("/api/dashboard/add-event", { event });
      if (eventAdded) {
        eventAdded(event);
      }
    }

    togglePopup();
  };

  useEffect(() => {
    if (editedEvent) {
      if (nameRef.current) {
        nameRef.current.value = editedEvent.name;
      }

      if (descRef.current) {
        descRef.current.value = editedEvent.desc;
      }

      if (dateRef.current) {
        dateRef.current.value = editedEvent.date;
      }

      if (urlRef.current) {
        urlRef.current.value = editedEvent.url;
      }

      if (priceRef.current) {
        priceRef.current.value = editedEvent.price.toString();
      }

      if (cityRef.current) {
        cityRef.current.value = editedEvent.city || "";
      }
    }
  });

  return (
    <div className="sticky bg-black top-0 left-0 w-full h-full flex justify-center pt-20">
      <button
        className="absolute right-10 top-10 cursor-pointer"
        onClick={() => togglePopup()}
      >
        Zamknij
      </button>
      <form className="flex flex-col max-w-[400px] mt-2" onSubmit={submit}>
        <input
          className={input_styles}
          type="text"
          placeholder="Nazwa wydarzenia"
          ref={nameRef}
        />
        <textarea className={input_styles} placeholder="Opis" ref={descRef} />
        <input
          className={input_styles}
          type="date"
          placeholder="Data wydarzenia"
          ref={dateRef}
        />
        <input
          className={input_styles}
          type="text"
          placeholder="Link do wydarzenia"
          ref={urlRef}
        />
        <input
          className={input_styles}
          type="text"
          placeholder="Cena"
          ref={priceRef}
        />
        <input
          className={input_styles}
          type="text"
          placeholder="Miasto"
          ref={cityRef}
        />

        <button
          type="submit"
          className="cursor-pointer p-2 bg-gray-900 hover:bg-gray-800"
        >
          {editedEvent ? "Zapisz" : "Dodaj"}
        </button>
        {editedEvent && isAdmin && (
          <button
            type="button"
            className="cursor-pointer p-2 bg-red-900 hover:bg-red-800"
            onClick={deleteEvent}
          >
            Usun
          </button>
        )}
      </form>
    </div>
  );
}
