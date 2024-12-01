import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext";

const WebhookList = () => {
  const { authToken } = useContext(AuthContext);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const fetchSubscriptions = async () => {
      const response = await fetch(`/subscriptions?username=${encodeURIComponent(username)}`, {
        method: "GET",
        headers: { Authorization: authToken },
      });
      const data = await response.json();
      console.log(data.subscriptions)
      setSubscriptions(data.subscriptions);
    };

    fetchSubscriptions();
  }, [authToken]);

  const handleUnsubscribe = async (id) => {
    try {
      const response = await fetch(`/unsubscribe/${id}`, {
        method: "DELETE",
        headers: { Authorization: authToken },
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setSubscriptions((prev) => prev.filter((sub) => sub._id !== id));
      } else {
        alert(data.message || "Failed to unsubscribe");
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
      alert("An error occurred. Please try again.");
    }
  };


  return (
    <div>
      <h2>Your Subscriptions</h2>
      <ul>
        {subscriptions.length != 0 && subscriptions.map((sub) => (
          <li key={sub._id}>
            {sub.source} → {sub.url}
            <button onClick={() => handleUnsubscribe(sub._id)}>Unsubscribe</button>
          </li>
        ))}
      </ul>
      {subscriptions.length === 0 && <p>No subscriptions found.</p>}
    </div>
  );
};

export default WebhookList;
