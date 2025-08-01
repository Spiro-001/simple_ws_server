import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { ocean } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const Terminal = ({ events }: { events: any[] }) => {
  return (
    <section className="flex-1 flex flex-col overflow-hidden">
      <h2>Terminal</h2>
      <div className="overflow-x-auto border border-neutral-200 rounded flex-1 bg-[rgb(43,48,59)] overflow-y-scroll custom-scroll">
        <div className="w-full p-4 whitespace-pre-wrap flex-1 flex flex-col gap-0.5">
          {events.map((event, idx) => (
            <TerminalEvent idx={idx + 1} event={event} key={event.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TerminalEvent = ({ idx, event }: { idx: number; event: any }) => {
  return (
    <div className="flex gap-2 hover:bg-[rgb(56,67,76)] [&_pre]:!bg-transparent rounded px-2">
      <p className="w-12 text-purple-400 opacity-30 font-bold p-2">{idx}</p>
      <p className="w-64 text-purple-500 font-bold p-2">
        [ {event.timestamp} ]
      </p>
      <p className="w-64 text-green-500 font-bold p-2">{`<${event.type}>`}</p>
      <SyntaxHighlighter language="json" style={ocean}>
        {JSON.stringify(event.data, null)}
      </SyntaxHighlighter>
    </div>
  );
};
