import {
    Column,
    declarationExplodes,
    IChildren,
    ICommonAttributes,
    IWidgetDeclaration,
    PopupType,
    PositionX,
    PositionY, Row, SmallText,
} from "@protorians/widgets";
import {ThemeDialogProps} from "./type.js";
import {IModal, IModalOptions, ModalKit} from "../../kits/index.js";
import {DialogStyle} from "./style.js";
import type {ITheme} from "../../types/index.js";
import {LayerVariant} from "../../enums.js";


export function ThemeDialog(
    theme: ITheme,
    declarations: IWidgetDeclaration<HTMLElement, ICommonAttributes & ThemeDialogProps>
): IChildren<any> {

    const {extended} = declarationExplodes<IWidgetDeclaration<HTMLElement, ICommonAttributes & ThemeDialogProps>, ThemeDialogProps>(
        declarations, [
            'variant',
            'scoped',
            'trigger',
            'children',
            'ariaTitle',
            'ariaDescription',
            'opened',
            'icon',
            'title',
            'animateIn',
            'animateOut',
            'actions'
        ]
    );
    const variant = extended.variant || LayerVariant.Normal;
    const coloring = theme.coloring(variant);

    return ModalKit.callable((modal: IModal): IModalOptions => {
        return {
            locked: true,
            blurred: true,
            opened: extended.opened,
            scoped: extended.scoped,
            ariaTitle: extended.ariaTitle,
            ariaDescription: extended.ariaDescription,
            animateIn: extended.animateIn,
            animateOut: extended.animateOut,
            type: PopupType.Dialog,
            position: [PositionX.Center, PositionY.Center],
            trigger: extended.trigger!,
            children: Column({
                style: DialogStyle.Container(theme, coloring),
                children: [
                    Row({
                        style: DialogStyle.Content(),
                        children: [
                            extended.icon ? Row({
                                style: DialogStyle.Icon(),
                                children: extended.icon,
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
                                            children: extended.title || 'Alert'
                                        }),
                                    }),
                                    Column({
                                        style: {
                                            paddingX: 1,
                                            paddingBottom: 1,
                                        },
                                        children: extended.children!
                                    }),
                                ]
                            }),
                        ]
                    }),
                    Row({
                        style: DialogStyle.Buttons(theme, coloring),
                        children: extended.actions ? extended.actions(modal) : [],
                    }),
                ]
            }),
        }
    })
}