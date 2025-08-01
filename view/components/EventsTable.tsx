export const EventsTable = ({ events }: { events: any[] }) => {
  return (
    <section>
      <h2 className="whitespace-nowrap">Events</h2>
      <div className="overflow-x-auto border border-neutral-200 rounded w-full">
        <table className="border-collapse w-full p-4">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="p-2 text-left border-b border-neutral-200 align-top">
                ID
              </th>
              <th className="p-2 text-left border-b border-neutral-200 align-top">
                Timestamp
              </th>
              <th className="p-2 text-left border-b border-neutral-200 align-top">
                Type
              </th>
              <th className="p-2 text-left border-b border-neutral-200 align-top">
                Data
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="border-b border-neutral-200 last:border-b-0"
              >
                <td className="p-2 text-left align-top">{event.id}</td>
                <td className="p-2 text-left align-top">{event.timestamp}</td>
                <td className="p-2 text-left align-top">{event.type}</td>
                <td className="p-2 text-left align-top">
                  {JSON.stringify(event.data)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
