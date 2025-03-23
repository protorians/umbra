export namespace Environment {

    export enum Channel {
        Client = 'client',
        Server = 'server',
        Terminal = 'terminal',
    }

    export function GetChannel(): Channel {
        return (typeof globalThis?.window != 'undefined' && typeof globalThis?.document != 'undefined')
            ? Channel.Client
            : (process.pid ? Channel.Terminal : Channel.Server);
    }

    export const Client = GetChannel() === Channel.Client;

    export const Server = GetChannel() === Channel.Server;

    export const Terminal = GetChannel() === Channel.Terminal;
    
    export const Browser = globalThis.window?.document !== undefined;

    export const Node = globalThis.process?.versions?.node !== undefined;

    export const Bun = globalThis.process?.versions?.bun !== undefined;

    export const Deno = globalThis.Deno?.version?.deno !== undefined;

    export const Electron = globalThis.process?.versions?.electron !== undefined;

    export const Dom = globalThis.navigator?.userAgent?.includes('jsdom');

    // @ts-ignore
    const Platform = globalThis.navigator?.userAgentData?.platform;

    export const MacOs = Platform === 'macOS'
        || globalThis.navigator?.platform === 'MacIntel' || globalThis.navigator?.userAgent?.includes(' Mac ')
        || globalThis.process?.platform === 'darwin';

    export const Windows = Platform === 'Windows'
        || globalThis.navigator?.platform === 'Win32'
        || globalThis.process?.platform === 'win32';

    export const Linux = Platform === 'Linux' || globalThis.navigator?.platform?.startsWith('Linux') || globalThis.navigator?.userAgent?.includes(' Linux ')
        || globalThis.process?.platform === 'linux';

    export const iOS = Platform === 'iOS'
        || (globalThis.navigator?.platform === 'MacIntel' && globalThis.navigator?.maxTouchPoints > 1)
        || /iPad|iPhone|iPod/.test(globalThis.navigator?.platform);

    export const Android = Platform === 'Android'
        || globalThis.navigator?.platform === 'Android' || globalThis.navigator?.userAgent?.includes(' Android ')
        || globalThis.process?.platform === 'android';

}