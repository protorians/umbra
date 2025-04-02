import {Color, Column, IInputType, Input, ItalicText, Row, Style} from "@protorians/widgets";
import {Theme} from "@/theme/main";


export type FieldsetTextProps = {
    type?: IInputType;
    label?: string;
    value?: string;
    icon?: string;
    name?: string;
    autoComplete?: boolean;
}


export function FieldsetText({icon, name, type, label, value, autoComplete}: FieldsetTextProps) {
    return Column({
        style:{
            gap: .5,
        },
        children: [
            Row({
                style: {
                    alignItems: 'center',
                    gap: 1,
                    paddingX: 1,
                    paddingY: .5,
                    fontSize: 'medium',
                    borderColor: Color.text_100_a1,
                    borderStyle: 'solid',
                    borderWidth: Theme.settings.borderWidth,
                    borderRadius: Theme.settings.radius,
                    color: Color.text,
                    backgroundColor: 'transparent',
                    transition: `color, borderColor, background-color, border-color, box-shadow`,
                    transitionBehavior: 'ease-out',
                    transitionDuration: '300ms',
                    '&:focus-within': Style({
                        color: Color.one,
                        borderColor: Color.text_a3,
                        backgroundColor: Color.tint_100_a1,
                    }),
                    '&:focus-within i': Style({
                        color: Color.text,
                    }),
                },
                children: [
                    ItalicText({
                        style: {
                            color: 'inherit',
                        },
                        className: icon || 'fas fa-circle'
                    }),
                    Input({
                        style: {
                            color: Color.text,
                            background: 'transparent',
                            borderColor: 'transparent',
                            outline: 'none',
                            flex: '1 1 auto',
                            '&:focus': Style({
                                background: 'transparent',
                                borderColor: 'transparent',
                                outline: 'none',
                            }),
                        },
                        type,
                        name,
                        autocomplete: autoComplete ? 'on' : 'off',
                        placeholder: label,
                        value: value,
                    })
                ]
            }),
        ]
    })
}