import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const EventLog = () => {
  const [events, setEvents] = useState([]);
  const socket = io("http://localhost:3001/webhook");

  useEffect(() => {
    socket.on("webhook", (event) => {
      setEvents((prev) => [event, ...prev]);
    });

    return () => socket.disconnect();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>Real-Time Webhook Events</h2>
      <ul>
        {events && events.map((event, index) => (
          <li key={index}>
            {event.eventType}: {JSON.stringify(event.payload)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventLog;
