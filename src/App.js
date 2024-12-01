import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Auth from "./components/Auth";
import Subscribe from "./components/Subscribe";
import WebhookList from "./components/WebhookList";
import EventLog from "./components/EventLog";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={< Auth />} />
          <Route path="/subscribe" element={< Subscribe />} />
          <Route path="/subscriptions" element={< WebhookList />} />
          <Route path="/events" element={< EventLog />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
