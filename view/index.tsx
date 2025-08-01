import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { WSC } from "../client/wsclient";

import { EventsTable } from "./components/EventsTable";
import { Terminal } from "./components/Terminal";

import "./index.css";

const HOST = location.hostname;
const PORT = 8003;

const App = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  const onClientAdd = useCallback((event: any) => {
    setClients((prev) => [...prev, event.data]);
  }, []);

  const onClientRemove = useCallback((event: any) => {
    setClients((prev) => prev.filter((c) => c.id !== event.data.id));
  }, []);

  const onEvent = useCallback((event: any) => {
    console.log(event);
    setEvents((prev) => [...prev, event]);
  }, []);

  useEffect(() => {
    const ws = new WSC({ url: `ws://${HOST}:${PORT}` });
    ws.on("init", (event) => {
      console.log(event);
      setClients(event.data);
    });
    ws.on("client::add", onClientAdd);
    ws.on("client::remove", onClientRemove);
    ws.on("*", onEvent);
    return () => {
      ws.close();
    };
  }, []);

  return (
    <main className="p-4 font-natasans h-screen flex flex-col">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex justify-between flex-1 gap-4 min-h-0">
        {/* <EventsTable events={events} /> */}
        <Terminal events={events} />
        <section>
          <h2 className="whitespace-nowrap">Connected Clients</h2>
          <div className="overflow-x-auto border border-neutral-200 rounded w-full">
            <table className="border-collapse w-full p-4">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="p-2 text-left border-b border-neutral-200 align-top">
                    ID
                  </th>
                  <th className="p-2 text-left border-b border-neutral-200 align-top">
                    IP
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    className="border-b border-neutral-200 last:border-b-0"
                  >
                    <td className="p-2 text-left align-top">
                      {client.id.slice(0, 13)}...
                    </td>
                    <td className="p-2 text-left align-top">{client.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
