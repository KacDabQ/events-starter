"use client";

import { FormEvent } from "react";
import { signIn } from "next-auth/react";

export default function Form() {
  const input_styles =
    "p-2 border border-white outline-none mb-2 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500";

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      email: "",
      password: "",
      redirect: false,
    };

    const form = e.target as HTMLFormElement;
    user.email = (form[0] as HTMLInputElement).value;
    user.password = (form[1] as HTMLInputElement).value;

    await signIn("credentials", user);

    window.location.href = window.location.origin;
  };

  return (
    <div className="flex flex-col items-center">
      <h2>Formularz logowania</h2>
      <form
        className="flex m-auto w-full flex-col max-w-[400px] mt-2"
        onSubmit={submit}
      >
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
