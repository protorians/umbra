import {WidgetNode} from "../widget-node.js";
import {Composable, Mountable} from "../decorators.js";
import type {
  IImageAttributes,
  IPictureAttributes,
  IWidgetDeclaration,
  IVideoAttributes,
  ISourceProps
} from "../types/index.js";


/**
 * @description Video Widget
 */
@Mountable()
@Composable()
export class VideoWidget extends WidgetNode<HTMLVideoElement, IVideoAttributes> {
  get tag(): string {
    return 'video'
  };
}


/**
 * @description Picture Widget
 */
@Mountable()
@Composable()
export class PictureWidget extends WidgetNode<HTMLPictureElement, IPictureAttributes> {
  get tag(): string {
    return 'picture'
  };
}

/**
 * @description Image Widget
 */
@Mountable()
@Composable()
export class ImageWidget extends WidgetNode<HTMLImageElement, IImageAttributes> {
  get tag(): string {
    return 'img'
  };
}

/**
 * @description Source Widget
 */
@Mountable()
@Composable()
export class SourceWidget extends WidgetNode<HTMLSourceElement, ISourceProps> {
  get tag(): string {
    return 'source'
  };
}

/**
 * @description Construct's Function of `SourceWidget`
 * @param declaration
 * @constructor
 */
export function Source(declaration: IWidgetDeclaration<HTMLSourceElement, ISourceProps>): SourceWidget {
  return new SourceWidget(declaration)
}

/**
 * @description Construct's Function of `PictureWidget`
 * @param declaration
 * @constructor
 */
export function Picture(declaration: IWidgetDeclaration<HTMLPictureElement, IPictureAttributes>): PictureWidget {
  return new PictureWidget(declaration)
}

/**
 * @description Construct's Function of `ImageWidget`
 * @param declaration
 * @constructor
 */
export function Image(declaration: Omit<IWidgetDeclaration<HTMLImageElement, IImageAttributes>, 'children'>): ImageWidget {
  return new ImageWidget({...declaration, children: undefined})
}


/**
 * @description Construct's Function of `VideoWidget`
 * @param declaration
 * @constructor
 */
export function Video(declaration: IWidgetDeclaration<HTMLVideoElement, IVideoAttributes>): VideoWidget {
  return new VideoWidget(declaration)
}
