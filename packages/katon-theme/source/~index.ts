import {
  Style,
  Section,
  type IWidgetNode, IStyleDeclaration,
} from "@protorians/widgets";


export type IKatonHelmetProps = {
  foreColor?: string;
  backColor?: string;
  left?: IWidgetNode<any, any>;
  center?: IWidgetNode<any, any>;
  right?: IWidgetNode<any, any>;
}

export type IKatonStyleMap = {
  helmet: Partial<IStyleDeclaration>
}

export namespace Katon {

  export const palette = {
    one : '#0071e3',
    two : '#01a6ea',
    three : '#0071e3',
    four : '#01a6ea',
    five : '#01a6ea',
    text : '#000000',
    tint : '#EFEFEF',
    error : '#ff0000',
    warning : '#caa13f',
    success : '#50a34a',
  }

  export const Styling: IKatonStyleMap = {

    helmet : {
      minHeight: '48px',
      backgroundColor: 'red',
      color: palette.text,
      gap: .5,
      position: 'sticky',
      top: 0,
      left: '0',
      right: '0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backdropFilter: 'blur(2rem)',
    }

  }

  export function helmet(props: IKatonHelmetProps): IWidgetNode<any, any> {
    return Section({
      style: Style({
        ...Styling.helmet,
        backgroundColor: props.backColor || Styling.helmet.backgroundColor,
        color: props.foreColor || Styling.helmet.color,
      }),
      children: [
        props.left?.style({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start'
        }),

        props.center?.style({
          flex: '1 1 auto'
        }),

        props.right?.style({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end'
        }),
      ]
    })
  }

  export function body() {
  }

  export function navbar() {
  }

  export function toolbox() {
  }

}