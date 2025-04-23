"use client";

import { FormEvent } from "react";
import axios from "axios";

export default function Form(props: { togglePopup: Function }) {
  const input_styles =
    "p-2 border border-white text-white outline-none mb-2 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500";

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const event = {
      name: "",
      desc: "",
      date: "",
      url: "",
      price: "",
    };

    const form = e.target as HTMLFormElement;

    event.name = (form[0] as HTMLInputElement).value;
    event.desc = (form[1] as HTMLInputElement).value;
    event.date = (form[2] as HTMLInputElement).value;
    event.url = (form[3] as HTMLInputElement).value;
    event.price = (form[4] as HTMLInputElement).value;

    await axios.post("/api/dashboard/add-event", { event });
  };

  return (
    <div className="absolute bg-black top-0 left-0 w-full h-full flex justify-center pt-20">
      <button
        className="absolute right-10 top-10 cursor-pointer"
        onClick={() => props.togglePopup()}
      >
        Zamknij
      </button>
      <form className="flex flex-col max-w-[400px] mt-2" onSubmit={submit}>
        <input
          className={input_styles}
          type="text"
          placeholder="Nazwa wydarzenia"
        />
        <textarea className={input_styles} placeholder="Opis" />
        <input
          className={input_styles}
          type="date"
          placeholder="Data wydarzenia"
        />
        <input
          className={input_styles}
          type="text"
          placeholder="Link do wydarzenia"
        />
        <input className={input_styles} type="text" placeholder="Cena" />

        <button
          type="submit"
          className="cursor-pointer p-2 bg-gray-900 hover:bg-gray-800"
        >
          Dodaj
        </button>
      </form>
    </div>
  );
}
