import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";

const Subscribe = () => {
  const { authToken } = useContext(AuthContext);
  const [source, setSource] = useState("");
  const [url, setUrl] = useState("");

  const handleSubscribe = async () => {
    console.log('authToken -> ', authToken);
    const response = await fetch("/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({ url, source, username: localStorage.getItem("username")}),
    });
    console.log('response in subscribe ->', response)
    const data = await response.json();
    if (response.ok) {
      console.log('new subscribed -> ', data.subscription)
      alert("Subscription successful!");
    } else {
      alert("Failed to subscribe.");
    }
  };

  return (
    <div>
      <h2>Subscribe to a Webhook</h2>
      <input
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <input
        type="text"
        placeholder="Callback URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  );
};

export default Subscribe;
