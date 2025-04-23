"use client";

import { FormEvent } from "react";
import UserI from "@/types/user";
import axios from "axios";

export default function Form() {
  const input_styles =
    "p-2 border border-white outline-none mb-2 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500";

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: UserI = {
      name: "",
      email: "",
      password: "",
    };

    const form = e.target as HTMLFormElement;
    user.name = (form[0] as HTMLInputElement).value;
    user.email = (form[1] as HTMLInputElement).value;
    user.password = (form[2] as HTMLInputElement).value;

    await axios.post("/api/admin/add-user", { user });

    window.location.reload();
  };

  return (
    <div className="mt-4">
      <h2>Formularz użytkownika</h2>
      <form className="flex flex-col max-w-[400px] mt-2" onSubmit={submit}>
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          className={input_styles}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className={input_styles}
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          className={input_styles}
          required
        />
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
