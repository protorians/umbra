import {
    Column,
    IChildren,
    PopupType,
    PositionX,
    PositionY, Row, SmallText,
} from "@protorians/widgets";
import {ThemeDialogOptions} from "./type.js";
import {IModal, IModalOptions, ModalKit} from "../../kits/index.js";
import {DialogStyle} from "./style.js";
import type {ITheme} from "../../types/index.js";
import {LayerVariant} from "../../enums.js";


export function ThemeDialog(
    theme: ITheme,
    declarations: ThemeDialogOptions
): IChildren<any> {

    const variant = declarations.variant || LayerVariant.Normal;
    const coloring = theme.coloringResolves(variant);

    return ModalKit.callable((modal: IModal): IModalOptions => {
        return {
            locked: true,
            blurred: true,
            opened: declarations.opened,
            scoped: declarations.scoped,
            ariaTitle: declarations.ariaTitle,
            ariaDescription: declarations.ariaDescription,
            animateIn: declarations.animateIn,
            animateOut: declarations.animateOut,
            type: PopupType.Dialog,
            position: [PositionX.Center, PositionY.Center],
            trigger: declarations.trigger!,
            children: Column({
                style: DialogStyle.Container(theme, coloring),
                children: [
                    Row({
                        style: DialogStyle.Content(),
                        children: [
                            declarations.icon ? Row({
                                style: DialogStyle.Icon(),
                                children: declarations.icon,
                            }) : undefined,
                            Column({
                                style: {
                                    gap: 0,
                                    flex: '1 1 auto',
                                },
                                children: [
                                    Row({
                                        style: {
                                            paddingTop: 1,
                                            paddingX: 1,
                                            opacity: '.5',
                                        },
                                        children: SmallText({
                                            children: declarations.title || 'Alert'
                                        }),
                                    }),
                                    Column({
                                        style: {
                                            paddingX: 1,
                                            paddingBottom: 1,
                                        },
                                        children: declarations.children!
                                    }),
                                ]
                            }),
                        ]
                    }),
                    Row({
                        style: DialogStyle.Buttons(theme, coloring),
                        children: declarations.actions ? declarations.actions(modal) : [],
                    }),
                ]
            }),
        }
    })
}