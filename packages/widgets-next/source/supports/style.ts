import {DynamicParameterBag, IDynamicParametersBag, IParameter} from "@protorians/parameters-bag";
import type {IStyleDeclaration, IStyleParameterBag, IStyleProps} from "../types/style";


export class IStyle implements IStyleParameterBag {

    readonly parameters: IDynamicParametersBag<IStyleDeclaration>;

    constructor(declaration: IStyleDeclaration) {
        this.parameters = new DynamicParameterBag<IStyleDeclaration>(this.transformProps(declaration));
    }

    protected transformProps(declaration: IStyleDeclaration): IStyleProps {
        const props = {} as IStyleProps;

        for (const [key, value] of Object.entries(declaration))
            props[key] = {
                value,
                defaultValue: undefined,
                callable: () => {
                    console.log('callable', key, value)
                    return value
                }
            } as IParameter<IStyleDeclaration>;

        return props;
    }

    render() {

    }

}