export namespace HtmlUtility {

    export function escape(text: string) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/'/g, '&apos;')
            .replace(/"/g, '&quot;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
    }

    export function unescape(text: string) {
        return text
            .replace(/&amp/g, '&')
            .replace(/&apos/g, "'")
            .replace(/&quot/g, '"')
            .replace(/&gt/g, '>')
            .replace(/&lt/g, '<')
    }

    export function ascendingPath<T extends Node | HTMLElement>(
        child: T,
        validator: (parent: T) => boolean
    ): T | undefined {
        let node = child.parentElement;

        while (node != null) {
            if (validator(node as T)) {
                return node as T;
            }
            node = node.parentElement;
        }
        return undefined;
    }

}

