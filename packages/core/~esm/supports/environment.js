export var Environment;
(function (Environment) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6;
    let Channel;
    (function (Channel) {
        Channel["Client"] = "client";
        Channel["Server"] = "server";
        Channel["Terminal"] = "terminal";
    })(Channel = Environment.Channel || (Environment.Channel = {}));
    function GetChannel() {
        return (typeof (globalThis === null || globalThis === void 0 ? void 0 : globalThis.window) != 'undefined' && typeof (globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) != 'undefined')
            ? Channel.Client
            : (process.pid ? Channel.Terminal : Channel.Server);
    }
    Environment.GetChannel = GetChannel;
    Environment.Client = GetChannel() === Channel.Client;
    Environment.Server = GetChannel() === Channel.Server;
    Environment.Terminal = GetChannel() === Channel.Terminal;
    Environment.Browser = ((_a = globalThis.window) === null || _a === void 0 ? void 0 : _a.document) !== undefined;
    Environment.Node = ((_c = (_b = globalThis.process) === null || _b === void 0 ? void 0 : _b.versions) === null || _c === void 0 ? void 0 : _c.node) !== undefined;
    Environment.Bun = ((_e = (_d = globalThis.process) === null || _d === void 0 ? void 0 : _d.versions) === null || _e === void 0 ? void 0 : _e.bun) !== undefined;
    Environment.Deno = ((_g = (_f = globalThis.Deno) === null || _f === void 0 ? void 0 : _f.version) === null || _g === void 0 ? void 0 : _g.deno) !== undefined;
    Environment.Electron = ((_j = (_h = globalThis.process) === null || _h === void 0 ? void 0 : _h.versions) === null || _j === void 0 ? void 0 : _j.electron) !== undefined;
    Environment.Dom = (_l = (_k = globalThis.navigator) === null || _k === void 0 ? void 0 : _k.userAgent) === null || _l === void 0 ? void 0 : _l.includes('jsdom');
    const Platform = (_o = (_m = globalThis.navigator) === null || _m === void 0 ? void 0 : _m.userAgentData) === null || _o === void 0 ? void 0 : _o.platform;
    Environment.MacOs = Platform === 'macOS'
        || ((_p = globalThis.navigator) === null || _p === void 0 ? void 0 : _p.platform) === 'MacIntel' || ((_r = (_q = globalThis.navigator) === null || _q === void 0 ? void 0 : _q.userAgent) === null || _r === void 0 ? void 0 : _r.includes(' Mac '))
        || ((_s = globalThis.process) === null || _s === void 0 ? void 0 : _s.platform) === 'darwin';
    Environment.Windows = Platform === 'Windows'
        || ((_t = globalThis.navigator) === null || _t === void 0 ? void 0 : _t.platform) === 'Win32'
        || ((_u = globalThis.process) === null || _u === void 0 ? void 0 : _u.platform) === 'win32';
    Environment.Linux = Platform === 'Linux' || ((_w = (_v = globalThis.navigator) === null || _v === void 0 ? void 0 : _v.platform) === null || _w === void 0 ? void 0 : _w.startsWith('Linux')) || ((_y = (_x = globalThis.navigator) === null || _x === void 0 ? void 0 : _x.userAgent) === null || _y === void 0 ? void 0 : _y.includes(' Linux '))
        || ((_z = globalThis.process) === null || _z === void 0 ? void 0 : _z.platform) === 'linux';
    Environment.iOS = Platform === 'iOS'
        || (((_0 = globalThis.navigator) === null || _0 === void 0 ? void 0 : _0.platform) === 'MacIntel' && ((_1 = globalThis.navigator) === null || _1 === void 0 ? void 0 : _1.maxTouchPoints) > 1)
        || /iPad|iPhone|iPod/.test((_2 = globalThis.navigator) === null || _2 === void 0 ? void 0 : _2.platform);
    Environment.Android = Platform === 'Android'
        || ((_3 = globalThis.navigator) === null || _3 === void 0 ? void 0 : _3.platform) === 'Android' || ((_5 = (_4 = globalThis.navigator) === null || _4 === void 0 ? void 0 : _4.userAgent) === null || _5 === void 0 ? void 0 : _5.includes(' Android '))
        || ((_6 = globalThis.process) === null || _6 === void 0 ? void 0 : _6.platform) === 'android';
})(Environment || (Environment = {}));
