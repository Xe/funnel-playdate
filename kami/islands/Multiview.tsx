import { useEffect, useState } from "preact/hooks";
import { Client } from "../utils/client.ts";

export default function Multiview() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  let n = 0;
  useEffect(() => {
    const timer = setInterval(async () => {
      const resp = await fetch("/api/clients");
      if (resp.status !== 200) {
        setError(`${resp.status}: ${await resp.text()}`);
        return;
      }
      const json = await resp.json();
      console.log(json, n++);
      setClients(json.clients);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div class="text-2xl font-bold">Clients</div>
      {error ? <div class="text-red-500">{error}</div> : null}
      <table class="w-full">
        <tr>
          <td class="font-bold px-4">Name</td>
          <td class="font-bold px-4">URL</td>
          <td class="font-bold px-4">Status</td>
        </tr>
        {clients.map((client: Client) => (
          <tr>
            <td class="px-4">{client.name}</td>
            <td class="px-4">
              <a
                class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                href={client.url}
                target="_blank"
              >
                {client.url}
              </a>
            </td>
            <td class="px-4">{client.status}</td>
          </tr>
        ))}
      </table>
    </>
  );
}
