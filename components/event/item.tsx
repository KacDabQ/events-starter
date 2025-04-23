import EventI from "@/types/event";
export default function Item(props: { event: EventI }) {
  return (
    <div className="px-4 py-2 rounded-2xl border-white border mb-4 cursor-pointer">
      <h2 className="text-xl mb-2 font-bold">{props.event.name}</h2>
      <h3 className="text-base">{props.event.date}</h3>
    </div>
  );
}
