"use client";

import UserForm from "@/components/user/form";
import List from "@/components/users/list";
import { useState } from "react";
import Form from "@/components/event/form";

enum PAGE {
  USERS = "USERS",
  EVENTS = "EVENTS",
}

export default function Admin() {
  const [view, setView] = useState(PAGE.USERS);

  return (
    <div>
      <div className="mt-4 flex mb-10">
        <button
          className={
            "p-2 border border-white cursor-pointer " +
            (view === PAGE.USERS ? " bg-gray-900" : " bg-gray-700")
          }
          onClick={() => setView(PAGE.USERS)}
        >
          Użytkownicy
        </button>
        <button
          className={
            "p-2 border border-white cursor-pointer " +
            (view === PAGE.EVENTS ? " bg-gray-900" : " bg-gray-700")
          }
          onClick={() => setView(PAGE.EVENTS)}
        >
          Wydarzenia
        </button>
      </div>
      {view === PAGE.USERS && (
        <div>
          <UserForm />
          <List />
        </div>
      )}
      {view === PAGE.EVENTS && (
        <div>
          <Form togglePopup={() => {}} />
        </div>
      )}
    </div>
  );
}
