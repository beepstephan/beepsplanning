import { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import type { View } from "react-big-calendar";
import moment from "../../../shared/lib/moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAuthStore, useEventStore } from "../../../features";
import { EventForm, EventListModal } from "../../../features/events/ui";
import { Button } from "../../../shared/ui";

const localizer = momentLocalizer(moment);

export default function Events() {
  const { events, filter, search, setFilter, setSearch } = useEventStore();
  const { clearAuth } = useAuthStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMoreEventsOpen, setIsMoreEventsOpen] = useState(false);
  const [moreEvents, setMoreEvents] = useState<{
    events: any[];
    date: Date;
  } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<{
    id: number | null;
    title: string;
    start: string;
    end: string;
    description: string;
    importance: "normal" | "important" | "critical";
  } | null>(null);
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [calendarView, setCalendarView] = useState<View>(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());

  const filteredEvents = events
    .filter((event) => filter === "all" || event.importance === filter)
    .filter(
      (event) =>
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase())
    );

  console.log("Events.tsx: filteredEvents:", filteredEvents);
  console.log("Events.tsx: currentDate:", currentDate);
  console.log("Events.tsx: calendarView:", calendarView);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    console.log("handleSelectSlot called:", {
      start,
      end,
      typeStart: typeof start,
      isFormOpen,
    });
    if (!isFormOpen) {
      setSelectedEvent({
        id: null,
        title: "",
        start: moment(start).toISOString(),
        end: moment(end).toISOString(),
        description: "",
        importance: "normal",
      });
      setIsFormOpen(true);
    }
  };

  const handleSelectEvent = (event: any) => {
    console.log("handleSelectEvent called:", {
      event,
      typeStart: typeof event.start,
      start: event.start,
      isFormOpen,
    });
    if (!isFormOpen) {
      setSelectedEvent({
        id: event.id,
        title: event.title,
        start:
          event.start instanceof Date
            ? moment(event.start).toISOString()
            : event.start,
        end:
          event.end instanceof Date
            ? moment(event.end).toISOString()
            : event.end,
        description: event.description,
        importance: event.importance,
      });
      setIsFormOpen(true);
    }
  };

  const handleNavigate = (newDate: Date, view: string, action: string) => {
    console.log("handleNavigate called:", { newDate, view, action });
    setCurrentDate(newDate);
  };

  const handleViewChange = (newView: View) => {
    console.log("handleViewChange called:", { newView });
    setCalendarView(newView);
  };

  const handleCloseForm = () => {
    console.log("handleCloseForm called");
    setIsFormOpen(false);
    setSelectedEvent(null);
  };

  const handleShowMore = (events: any[], date: Date) => {
    console.log("handleShowMore called:", { events, date });
    setMoreEvents({ events, date });
    setIsMoreEventsOpen(true);
  };

  const handleCloseMoreEvents = () => {
    setIsMoreEventsOpen(false);
    setMoreEvents(null);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Planning</h1>
        <Button
          onClick={() => {
            clearAuth();
            window.location.href = "/login";
          }}
          className="bg-red-500 hover:bg-red-600"
        >
          Logout
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Button
          onClick={() => setView("calendar")}
          className={
            view === "calendar" ? "bg-blue-500 text-white" : "bg-gray-200"
          }
        >
          Calendar
        </Button>
        <Button
          onClick={() => setView("list")}
          className={view === "list" ? "bg-blue-500 text-white" : "bg-gray-200"}
        >
          List
        </Button>
        {view === "calendar" && (
          <>
            <Button
              onClick={() => handleViewChange(Views.MONTH)}
              className={
                calendarView === Views.MONTH
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }
            >
              Month
            </Button>
            <Button
              onClick={() => handleViewChange(Views.WEEK)}
              className={
                calendarView === Views.WEEK
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }
            >
              Week
            </Button>
            <Button
              onClick={() => handleViewChange(Views.DAY)}
              className={
                calendarView === Views.DAY
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }
            >
              Day
            </Button>
            <Button
              onClick={() => handleViewChange(Views.AGENDA)}
              className={
                calendarView === Views.AGENDA
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }
            >
              Agenda
            </Button>
          </>
        )}
        <select
          className="p-2 border rounded w-full sm:w-auto"
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value as "all" | "normal" | "important" | "critical"
            )
          }
        >
          <option value="all">All</option>
          <option value="normal">Normal</option>
          <option value="important">Important</option>
          <option value="critical">Critical</option>
        </select>
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full sm:flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {view === "calendar" ? (
        <div className="relative">
          <Calendar
            localizer={localizer}
            events={filteredEvents.map((event) => ({
              ...event,
              start: moment(event.start).toDate(),
              end: moment(event.end).toDate(),
            }))}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "500px" }}
            selectable
            date={currentDate}
            view={calendarView}
            views={{ month: true, week: true, day: true, agenda: true }}
            onNavigate={handleNavigate}
            onView={handleViewChange}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            onShowMore={handleShowMore}
            eventPropGetter={(event) => ({
              className:
                event.importance === "critical"
                  ? "bg-red-500"
                  : event.importance === "important"
                  ? "bg-yellow-500"
                  : "bg-blue-500",
            })}
          />
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="p-4 border rounded flex justify-between items-center cursor-pointer"
              onClick={() => handleSelectEvent(event)}
            >
              <div>
                <h3 className="font-bold">{event.title}</h3>
                <p>
                  {moment(event.start).format("MMM D, YYYY, h:mm A")} -{" "}
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
            </div>
          ))}
          {filteredEvents.length === 0 && (
            <p className="text-center">No events found</p>
          )}
        </div>
      )}
      {isFormOpen && selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseForm();
            }
          }}
        >
          <EventForm event={selectedEvent} onClose={handleCloseForm} />
        </div>
      )}
      {isMoreEventsOpen && moreEvents && (
        <EventListModal
          events={moreEvents.events}
          date={moreEvents.date}
          onClose={handleCloseMoreEvents}
          onSelectEvent={handleSelectEvent}
        />
      )}
    </div>
  );
}
