import {CraftArtifact} from "../enums/craft.js";
import {IBackendCraftingTemplate} from "../types/index.js";
import {Vauban} from "./vauban.js";
import {camelCase, unCamelCase} from "@protorians/core"
import path from "node:path";


export class BackendCraft {

    /**
     * Resolves a crafting template by its type and identifier.
     *
     * @param {CraftArtifact} type - The type of the crafting artifact to resolve.
     * @param {string} identifier - Identifier used to locate the specific crafting template.
     * @return {IBackendCraftingTemplate | undefined} Returns the corresponding backend crafting template if found, otherwise undefined.
     */
    static resolve(type: CraftArtifact, identifier: string): IBackendCraftingTemplate | undefined {
        const key: string = type.toLowerCase();
        if (typeof this[key] == 'function') {
            return this[key](identifier);
        }
        return undefined;
    }


    /**
     * Generates an action file structure with the template code for a specified identifier.
     *
     * @param {string} identifier - The unique identifier used to generate the action file.
     * @return {IBackendCraftingTemplate} An object containing the filename, directory, and template code for the action file.
     */
    static action(identifier: string): IBackendCraftingTemplate {
        return {
            filename: `${unCamelCase(identifier)}.action.ts`,
            directory: Vauban.config.$.directories?.actions!,
            code: `"use server";
export async function ${camelCase(`${identifier}-action`)}(): Promise<any>{}
`
        }
    }


    /**
     * Generates a backend crafting template for a component.
     *
     * @param {string} identifier - The unique identifier for the component.
     * @return {IBackendCraftingTemplate} The backend crafting template, including filename, directory, and code content for the specified component.
     */
    static component(identifier: string): IBackendCraftingTemplate {
        return {
            filename: `${unCamelCase(identifier)}.component.ts`,
            directory: Vauban.config.$.directories?.components!,
            code: `import {type IWidgetNode, Layer} from "@protorians/widgets";
export function ${camelCase(`${identifier}-component`)}(): IWidgetNode<any, any>{
    return Layer({
        children: undefined,
    })
}
`
        }
    }


    /**
     * Generates a backend crafting template for a helper function, including its filename, directory, and code structure.
     *
     * @param {string} identifier - A unique identifier used to construct the helper's file name and code structure.
     * @return {IBackendCraftingTemplate} The backend crafting template object containing the filename, directory, and code snippet.
     */
    static helper(identifier: string): IBackendCraftingTemplate {
        return {
            filename: `${unCamelCase(identifier)}.helper.ts`,
            directory: Vauban.config.$.directories?.helpers!,
            code: `
export function ${camelCase(`${identifier}-helper`)}(){
}
`
        }
    }


    /**
     * Generates a backend API crafting template with a specified identifier.
     *
     * @param {string} identifier - The identifier for the API file and class naming.
     * @return {IBackendCraftingTemplate} Returns an object containing the filename, directory, and formatted code for the API.
     */
    static config(identifier: string): IBackendCraftingTemplate {
        return {
            filename: `${unCamelCase(identifier)}.config.ts`,
            directory: Vauban.config.$.directories?.configs!,
            code: `
export const ${camelCase(`${identifier}-config`)} = {
}`
        }
    }


    static theme(identifier: string): IBackendCraftingTemplate {
        return {
            filename: `${unCamelCase(identifier)}.theme.ts`,
            directory: Vauban.config.$.directories?.themes!,
            code: `import {ColorPalette} from "@protorians/widgets";
import {KatonTheme} from "@widgetui/katon-theme";

ColorPalette.light = {
    one: 'oklch(35.53% 0.1458 29.23)',
    two: 'oklch(46.56% 0.1458 29.23)',
    three: 'oklch(70.71% 0.1373 75.91)',
    four: 'oklch(0.702 0.151 69.456)',
    five: 'oklch(83.82% 0.143 98.46)',
    text: 'oklch(0.123 0.05 29.234)',
    tint: 'oklch(0.973 0 89.876)',
    error: 'oklch(48.42% 0.1891 28.19)',
    warning: 'oklch(0.705 0.137 103.58)',
    success: 'oklch(55.04% 0.1827 142.37)',
    white: 'oklch(100% 0 0)',
    black: 'oklch(0% 0 0)',
}

ColorPalette.dark = {
    one: 'oklch(0.572 0.205 26.647)',
    two: 'oklch(0.649 0.154 27.817)',
    three: 'oklch(0.772 0.116 79.594)',
    four: 'oklch(0.666 0.102 78.278)',
    five: 'oklch(83.82% 0.143 98.46)',
    text: 'oklch(1 0 89.876)',
    tint: 'oklch(4.79% 0 0)',
    error: 'oklch(51.58% 0.1891 28.19)',
    warning: 'oklch(0.753 0.103 103.572)',
    success: 'oklch(44.96% 0.1827 142.37)',
    white: 'oklch(100% 0 0)',
    black: 'oklch(0% 0 0)',
}

export const ${camelCase(`${identifier}-theme`)} = (new KatonTheme).attach('html');`
        }
    }


    /**
     * Generates a backend API crafting template with a specified identifier.
     *
     * @param {string} identifier - The identifier for the API file and class naming.
     * @return {IBackendCraftingTemplate} Returns an object containing the filename, directory, and formatted code for the API.
     */
    static api(identifier: string): IBackendCraftingTemplate {
        return {
            filename: `${unCamelCase(identifier)}.api.ts`,
            directory: Vauban.config.$.directories?.api!,
            code: `import {ApiController} from "@protorians/vauban";

export default class ${camelCase(`${identifier}-api`)} extends ApiController {
    /**
     * Get Method
     */
    async Get(): Promise<any>{}
    
    /**
     * Post Method
     */
    async Post(): Promise<any>{}
    
    /**
     * Put Method
     */
    async Put(): Promise<any>{}
    
    /**
     * Delete Method
     */
    async Delete(): Promise<any>{}
}`
        }
    }


    /**
     * Generates a backend crafting template for a service based on the provided identifier.
     *
     * @param {string} identifier - The unique identifier used to create the service file and class name.
     * @return {IBackendCraftingTemplate} An object containing the filename, directory path, and code for the service.
     */
    static service(identifier: string): IBackendCraftingTemplate {
        return {
            filename: `${unCamelCase(identifier)}.service.ts`,
            directory: Vauban.config.$.directories?.services!,
            code: `import {ServiceController} from "@protorians/vauban";

export default class ${camelCase(`${identifier}-service`)} extends ServiceController {
}`
        }
    }


    /**
     * Processes the given identifier to generate a backend crafting template.
     *
     * @param {string} identifier - A string identifier used to generate the backend crafting template.
     * @return {IBackendCraftingTemplate} An object containing the filename, directory, and code for the generated template.
     */
    static view(identifier: string): IBackendCraftingTemplate {
        const pathname = identifier.split('/').map(i => unCamelCase(i)).join('/')
        return {
            filename: path.join(`${pathname}`, 'index.ts'),
            directory: Vauban.config.$.directories?.views!,
            code: `import {Layer, Override, StatefulView, Text} from "@protorians/widgets"

export default class extends StatefulView {

    @Override() body() {
        return Layer({
            children: Text({
                children: '/${pathname}',
            })
        })
    }

}`
        }
    }

}