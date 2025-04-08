import {IServerConfig} from "@protorians/paladin";

export default function VaubanConfig(): IServerConfig {
    return {
        port: process.env.PORT || 3000,
        directories: {
            source: "./source",
            actions: "./source/actions",
            api: "./source/api",
            assets: "./source/assets",
            images: "./source/assets/images",
            fonts: "./source/assets/fonts",
            css: "./source/assets/css",
            videos: "./source/assets/videos",
            sounds: "./source/assets/sounds",
            svg: "./source/assets/svg",
            configs: "./configs",
            database: "./database",
            entities: "./source/entities",
            factories: "./database/factories",
            migrations: "./database/migrations",
            repositories: "./source/repositories",
            schemas: "./database/schemas",
            seeders: "./database/seeders",
            components: "./source/components",
            helpers: "./source/helpers",
            payloads: "./source/payloads",
            services: "./source/services",
            themes: "./source/themes",
            views: "./source/views",
        }
    }
}