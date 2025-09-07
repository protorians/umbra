import { IColorExtended, IColorKey } from "@protorians/colorimetric";
export type IColoringLayer = {
    fore: IColorExtended<IColorKey>;
    back: IColorExtended<IColorKey> | null;
    edge: IColorExtended<IColorKey> | null;
};
