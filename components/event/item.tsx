import EventI from "@/types/event";

interface Props {
  event: EventI;
  onEventClicked?: Function;
}

export default function Item({ event, onEventClicked }: Props) {
  return (
    <div
      className="px-4 py-2 rounded-2xl border-white border mb-4 cursor-pointer"
      onClick={() => {
        if (onEventClicked) {
          onEventClicked(event);
        }
      }}
    >
      <h2 className="text-xl mb-2 font-bold">{event.name}</h2>
      <h3 className="text-base">{event.date}</h3>
      <h3 className="text-base">{event.city}</h3>
    </div>
  );
}
