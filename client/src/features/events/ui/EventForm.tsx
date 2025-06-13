import { useState } from "react";
import type { Event } from "../../../entities/event/types";
import { createEvent, updateEvent, deleteEvent } from "../api";
import { useEventStore } from "../model/store";
import { Button, ConfirmDialog } from "../../../shared/ui";
import moment from "../../../shared/lib/moment";

interface EventFormProps {
  event: Event;
  onClose: () => void;
}

export function EventForm({ event, onClose }: EventFormProps) {
  const [form, setForm] = useState<Event>({
    ...event,
    id: event.id ?? null,
    start:
      typeof event.start === "string"
        ? event.start
        : moment(event.start).toISOString(),
    end:
      typeof event.end === "string"
        ? event.end
        : moment(event.end).toISOString(),
  });
  const {
    addEvent,
    updateEvent: updateStoreEvent,
    deleteEvent: deleteStoreEvent,
  } = useEventStore();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  console.log("EventForm rendered:", {
    form,
    start: form.start,
    end: form.end,
    localStart: moment(form.start).format("YYYY-MM-DDTHH:mm"),
    localEnd: moment(form.end).format("YYYY-MM-DDTHH:mm"),
    formId: form.id,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleSubmit called:", { form });
    try {
      if (form.id) {
        const response = await updateEvent(form.id, {
          title: form.title,
          start: form.start,
          end: form.end,
          description: form.description,
          importance: form.importance,
        });
        updateStoreEvent(response.data);
      } else {
        const response = await createEvent({
          title: form.title,
          start: form.start,
          end: form.end,
          description: form.description,
          importance: form.importance,
        });
        addEvent(response.data);
      }
      onClose();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  const handleDelete = async () => {
    console.log("handleDelete confirmed:", { id: form.id });
    if (form.id) {
      try {
        await deleteEvent(form.id);
        deleteStoreEvent(form.id);
        onClose();
      } catch (error) {
        console.error("Error in handleDelete:", error);
      }
    }
    setIsConfirmOpen(false);
  };

  const handleOpenConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("handleOpenConfirm called");
    setIsConfirmOpen(true);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("handleCancel called");
    onClose();
  };

  const handleConfirmCancel = () => {
    console.log("handleConfirmCancel called");
    setIsConfirmOpen(false);
  };

  const formatDateTimeLocal = (isoString: string) => {
    return moment(isoString).format("YYYY-MM-DDTHH:mm");
  };

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-bold mb-4">
        {form.id ? "Edit Event" : "Create Event"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Start</label>
          <input
            type="datetime-local"
            value={formatDateTimeLocal(form.start)}
            onChange={(e) => {
              const newStart = moment(e.target.value).toISOString();
              console.log("Start changed:", {
                input: e.target.value,
                newStart,
              });
              setForm({ ...form, start: newStart });
            }}
            className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">End</label>
          <input
            type="datetime-local"
            value={formatDateTimeLocal(form.end)}
            onChange={(e) => {
              const newEnd = moment(e.target.value).toISOString();
              console.log("End changed:", { input: e.target.value, newEnd });
              setForm({ ...form, end: newEnd });
            }}
            className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Importance</label>
          <select
            value={form.importance}
            onChange={(e) =>
              setForm({
                ...form,
                importance: e.target.value as
                  | "normal"
                  | "important"
                  | "critical",
              })
            }
            className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="normal">Normal</option>
            <option value="important">Important</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div className="flex gap-2">
          <Button
            type="submit"
            className="flex-1 bg-blue-500 hover:bg-blue-600"
          >
            {form.id ? "Update" : "Create"}
          </Button>
          {form.id ? (
            <Button
              type="button"
              onClick={handleOpenConfirm}
              className="flex-1 bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
          ) : null}
          <Button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-500 hover:bg-gray-600"
          >
            Cancel
          </Button>
        </div>
      </form>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onConfirm={handleDelete}
        onCancel={handleConfirmCancel}
        message="Are you sure you want to delete this event?"
      />
    </div>
  );
}
