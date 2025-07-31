import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1>Simple WebSocket Server Dashboard</h1>
      <p>Open the browser console to see the server events.</p>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
