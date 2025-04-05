import {Server} from "@protorians/paladin";

(async function main() {
    (new Server('test'))
        .port(5711)
        .logger(true)
        .start()
})()