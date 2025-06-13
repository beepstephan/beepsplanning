import { getAxiosInstance } from "../../../shared/api";

const api = getAxiosInstance();

export const createEvent = (event: {
  title: string;
  start: string;
  end: string;
  description: string;
  importance: "normal" | "important" | "critical";
}) => api.post("/events", event);

export const getEvents = () => api.get("/events");

export const updateEvent = (
  id: number,
  event: {
    title?: string;
    start?: string;
    end?: string;
    description?: string;
    importance?: "normal" | "important" | "critical";
  }
) => api.put(`/events/${id}`, event);

export const deleteEvent = (id: number) => api.delete(`/events/${id}`);
