import moment from "moment";
import type { Event } from "../../../entities/event/types";
import { Button } from "../../../shared/ui/Button";

interface EventListModalProps {
  events: Event[];
  date: Date;
  onClose: () => void;
  onSelectEvent: (event: Event) => void;
}

export function EventListModal({
  events,
  date,
  onClose,
  onSelectEvent,
}: EventListModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          Events for {moment(date).format("MMM D, YYYY")}
        </h2>
        <div className="grid gap-4 max-h-96 overflow-y-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-4 border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => onSelectEvent(event)}
            >
              <h3 className="font-bold">{event.title}</h3>
              <p>
                {moment(event.start).format("h:mm A")} -{" "}
                {moment(event.end).format("h:mm A")}
              </p>
              <p>{event.description}</p>
              <span
                className={`px-2 py-1 rounded text-white ${
                  event.importance === "critical"
                    ? "bg-red-500"
                    : event.importance === "important"
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                }`}
              >
                {event.importance}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button
            onClick={onClose}
            className="w-full bg-gray-500 hover:bg-gray-600"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
