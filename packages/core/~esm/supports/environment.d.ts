export declare namespace Environment {
    enum Channel {
        Client = "client",
        Server = "server",
        Terminal = "terminal"
    }
    function GetChannel(): Channel;
    const Client: boolean;
    const Server: boolean;
    const Terminal: boolean;
    const Browser: boolean;
    const Node: boolean;
    const Bun: boolean;
    const Deno: boolean;
    const Electron: boolean;
    const Dom: boolean;
    const MacOs: boolean;
    const Windows: boolean;
    const Linux: boolean;
    const iOS: boolean;
    const Android: boolean;
}
