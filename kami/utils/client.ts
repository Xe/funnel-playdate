export interface Client {
  name: string;
  url: string;
  status: string;
}

export const getClients = async (): Promise<Client[]> => {
  return await getJson("./var/clients.json");
};

export const addClient = async (cli: Client): Promise<void> => {
  const clients = await getClients();
  let found = false;

  clients.forEach((dbCli: Client, i: number) => {
    if (dbCli.url === cli.url) {
      clients[i] = cli;
      found = true;
    }
  });

  if (!found) {
    clients.push(cli);
  }

  await Deno.writeTextFile("./var/clients.json", JSON.stringify(clients));
};

async function getJson(filePath: string) {
  return JSON.parse(await Deno.readTextFile(filePath));
}
