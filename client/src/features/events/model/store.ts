import { create } from "zustand";
import type { Event } from "../../../entities/event/types";

interface EventState {
  events: Event[];
  filter: "all" | "normal" | "important" | "critical";
  search: string;
  setEvents: (events: Event[]) => void;
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: number) => void;
  setFilter: (filter: "all" | "normal" | "important" | "critical") => void;
  setSearch: (search: string) => void;
}

export const useEventStore = create<EventState>((set) => ({
  events: [],
  filter: "all",
  search: "",
  setEvents: (events) => set({ events }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (event) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === event.id ? event : e)),
    })),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),
  setFilter: (filter) => set({ filter }),
  setSearch: (search) => set({ search }),
}));
