import {IColoringLayer, LayerVariant} from "@widgetui/core";

export function resolveColoringLayerOutlined(color: LayerVariant): IColoringLayer {
    switch (color) {
        case LayerVariant.Text:
            return {fore: 'text', back: null, edge: 'text-a1',}

        case LayerVariant.Primary:
            return {fore: 'one', back: null, edge: 'one',}

        case LayerVariant.Secondary:
            return {fore: 'three', back: null, edge: 'three',}

        case LayerVariant.Error:
            return {fore: 'error', back: null, edge: 'error',}

        case LayerVariant.Success:
            return {fore: 'success', back: null, edge: 'success',}

        case LayerVariant.Info:
            return {fore: 'text', back: null, edge: 'text-a2',}

        case LayerVariant.Warning:
            return {fore: 'warning', back: null, edge: 'warning',}

        case LayerVariant.Link:
            return {fore: 'one', back: null, edge: null,}

        case LayerVariant.White:
            return {fore: 'white', back: null, edge: "white-800",}

        case LayerVariant.Black:
            return {fore: 'black', back: null, edge: "black-800",}

        case LayerVariant.Revert:
            return {fore: 'text-100', back: null, edge: "text-100",}

        default:
            return {fore: 'text', back: null, edge: 'text-100-a7',}
    }
}

export function resolveColoringLayer(color: LayerVariant): IColoringLayer {
    switch (color) {
        case LayerVariant.Text:
            return {fore: 'text', back: null, edge: null,}

        case LayerVariant.Primary:
            return {fore: 'white', back: 'one', edge: 'one-100-a1',}

        case LayerVariant.Secondary:
            return {fore: 'white', back: 'three', edge: 'three-100-a1',}

        case LayerVariant.Error:
            return {fore: 'white', back: 'error', edge: 'error-100-a1',}

        case LayerVariant.Success:
            return {fore: 'white', back: 'success', edge: 'success-100-a1',}

        case LayerVariant.Info:
            return {fore: 'text', back: 'tint', edge: 'tint-100',}

        case LayerVariant.Warning:
            return {fore: 'white', back: 'warning', edge: 'warning-100-a1',}

        case LayerVariant.Link:
            return {fore: 'one', back: null, edge: null,}

        case LayerVariant.White:
            return {fore: 'black', back: 'white', edge: "white-800",}

        case LayerVariant.Black:
            return {fore: 'white', back: 'black', edge: "black-800",}

        case LayerVariant.Revert:
            return {fore: 'tint-100', back: "text", edge: "tint-100",}

        default:
            return {fore: 'text', back: 'tint-100-a9', edge: 'tint-100-a9',}
    }
}
