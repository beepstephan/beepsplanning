import { RouterProvider } from "react-router-dom";
import { router } from "../routes/AllRoutes";
import { useAuthStore, useEventStore } from "../features";
import { getEvents } from "../features/events/api";
import { useEffect } from "react";

function App() {
  const { token } = useAuthStore();
  const { setEvents } = useEventStore();

  useEffect(() => {
    if (token) {
      getEvents()
        .then((response) => setEvents(response.data))
        .catch((error) => console.error(error));
    }
  }, [token, setEvents]);

  return <RouterProvider router={router} />;
}

export default App;
