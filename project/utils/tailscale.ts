// deno-lint-ignore-file

const runCommandScrapeJSON = async (command: string, args: string[]): Promise<any> => {
    const cmd = new Deno.Command(command, {
        args,
    })
    
    const result = await cmd.output();
    return JSON.parse(new TextDecoder().decode(result.stdout));
};

const tailscaleName = Deno.build.os == "darwin" ? "/Applications/Tailscale.app/Contents/MacOS/Tailscale" : "tailscale";

export const getStatus = async (): Promise<any> => {
    return await runCommandScrapeJSON(tailscaleName, ["status", "--json"]);
}

export const getServeStatus = async (): Promise<any> => {
    return await runCommandScrapeJSON(tailscaleName, ["serve", "status", "--json"]);
}

export const XeURL = "https://natalia.orca-kokanue.ts.net/api/registerClient";

export interface Client {
    name: string;
    url: string;
    status: string;
}

export const fetchNodeInfo = async (): Promise<Client> => {
    const status = await getStatus();
    const serveStatus = await getServeStatus();
    const nodeName = `${status.Self.HostName}.${status.MagicDNSSuffix}`;
    const client: Client = {
        name: status.User[`${status.Self.UserID}`].DisplayName,
        url: `https://${nodeName}`,
        status: "no status",
    };

    if (serveStatus === null) {
        client.status = "need Serve";
        return client;
    }

    if (serveStatus && serveStatus.TCP && serveStatus.TCP["443"] && serveStatus.TCP["443"]["HTTPS"]) {
        client.status = "serving to tailnet";
    }

    if (!status.Self.Capabilities.includes("funnel")) {
        client.status = "need funnel";
        return client;   
    }

    if (serveStatus && serveStatus.AllowFunnel && serveStatus.AllowFunnel[`${nodeName}:443`]) {
        client.status = "serving to internet";
        return client;
    }

    return client;
}

export const registerClient = async (client: Client): Promise<void> => {
    const res = await fetch(XeURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
    });
    if (!res.ok) {
        throw new Error(`registerClient failed: ${res.status}`);
    }
}