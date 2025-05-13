import {IAnimetricSlimOptions} from "@protorians/animetric";

export class KatonModalAnimations {

    static get entry(): IAnimetricSlimOptions {
        return {
            from: {
                opacity: '0',
                transform: 'translateY(70%)'
            },
            to: {
                opacity: '1',
                transform: 'translateY(0%)'
            },
            duration: 200,
        }
    }

    static get exit(): IAnimetricSlimOptions {
        return {
            from: {
                opacity: '1',
                transform: 'translateY(0%)'
            },
            to: {
                opacity: '0',
                transform: 'translateY(70%)'
            },
            duration: 200,
        }
    }

}