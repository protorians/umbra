export interface IProjectAssets {
    "fonts": string;
    "icons": string;
    "css": string;
    "images": string;
    "sounds": string;
    "videos": string;
}

export interface IProjectResource {
    icons: string[];
}

export interface IProjectConfig {
    source: string;
    assets?: Partial<IProjectAssets>;
    resources?: Partial<IProjectResource>;
}

export interface IConfigLoader<T>{

    get schematic(): T | undefined;

    get exists(): boolean;

    get(key: string): T[keyof T] | undefined;

    value<K extends keyof T>(key: K): T[K] | undefined;

    update<K extends keyof T>(key: K, value: T[K]): this;

    remove<K extends keyof T>(key: K): this;

    save(): boolean;

}