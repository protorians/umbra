import {WidgetNode} from "../widget-node.js";
import {Composable, Mountable} from "../decorators.js";
import type {
  IImageAttributes,
  IPictureAttributes,
  IWidgetDeclaration,
  IVideoAttributes,
  ISourceProps, IAudioAttributes
} from "../types/index.js";

/**
 * @description Video Widget
 */
@Mountable()
@Composable()
export class MediaVideoWidget extends WidgetNode<HTMLVideoElement, IVideoAttributes> {
  get tag(): string {
    return 'video'
  };
}


/**
 * @description Video Widget
 */
@Mountable()
@Composable()
export class MediaAudioWidget extends WidgetNode<HTMLVideoElement, IAudioAttributes> {
  get tag(): string {
    return 'audio'
  };
}


/**
 * @description Picture Widget
 */
@Mountable()
@Composable()
export class MediaPictureWidget extends WidgetNode<HTMLPictureElement, IPictureAttributes> {
  get tag(): string {
    return 'picture'
  };
}

/**
 * @description Image Widget
 */
@Mountable()
@Composable()
export class MediaImageWidget extends WidgetNode<HTMLImageElement, IImageAttributes> {
  get tag(): string {
    return 'img'
  };
}

/**
 * @description Source Widget
 */
@Mountable()
@Composable()
export class MediaSourceWidget extends WidgetNode<HTMLSourceElement, ISourceProps> {
  get tag(): string {
    return 'source'
  };
}

/**
 * @description Construct's Function of `SourceWidget`
 * @param declaration
 * @constructor
 * @deprecated use `MediaSource` now
 */
export function Source(declaration: IWidgetDeclaration<HTMLSourceElement, ISourceProps>): MediaSourceWidget {
  return new MediaSourceWidget(declaration)
}

/**
 * @description Construct's Function of `SourceWidget`
 * @param declaration
 * @constructor
 */
export function MediaSource(declaration: IWidgetDeclaration<HTMLSourceElement, ISourceProps>): MediaSourceWidget {
  return new MediaSourceWidget(declaration)
}

/**
 * @description Construct's Function of `PictureWidget`
 * @param declaration
 * @constructor
 * @deprecated Use `MediaPicture` now
 */
export function Picture(declaration: IWidgetDeclaration<HTMLPictureElement, IPictureAttributes>): MediaPictureWidget {
  return new MediaPictureWidget(declaration)
}

/**
 * @description Construct's Function of `PictureWidget`
 * @param declaration
 * @constructor
 */
export function MediaPicture(declaration: IWidgetDeclaration<HTMLPictureElement, IPictureAttributes>): MediaPictureWidget {
  return new MediaPictureWidget(declaration)
}

/**
 * @description Construct's Function of `ImageWidget`
 * @param declaration
 * @constructor
 */
export function Image(declaration: Omit<IWidgetDeclaration<HTMLImageElement, IImageAttributes>, 'children'>): MediaImageWidget {
  return new MediaImageWidget({...declaration, children: undefined})
}

/**
 * @description Construct's Function of `ImageWidget`
 * @param declaration
 * @constructor
 * @deprecated Use `MediaImage` now
 */
export function MediaImage(declaration: Omit<IWidgetDeclaration<HTMLImageElement, IImageAttributes>, 'children'>): MediaImageWidget {
  return new MediaImageWidget({...declaration, children: undefined})
}


/**
 * @description Construct's Function of `VideoWidget`
 * @param declaration
 * @constructor
 * @deprecated Use `MediaVideo` now
 */
export function VideoPlayer(declaration: IWidgetDeclaration<HTMLVideoElement, IVideoAttributes>): MediaVideoWidget {
  return new MediaVideoWidget(declaration)
}

/**
 * @description Construct's Function of `VideoWidget`
 * @param declaration
 * @constructor
 */
export function MediaVideo(declaration: IWidgetDeclaration<HTMLVideoElement, IVideoAttributes>): MediaVideoWidget {
  return new MediaVideoWidget(declaration)
}


/**
 * @description Construct's Function of `VideoWidget`
 * @param declaration
 * @constructor
 * @deprecated Use `MediaAudio` now
 */
export function AudioPlayer(declaration: IWidgetDeclaration<HTMLVideoElement, IAudioAttributes>): MediaAudioWidget {
  return new MediaAudioWidget(declaration)
}

/**
 * @description Construct's Function of `VideoWidget`
 * @param declaration
 * @constructor
 */
export function MediaAudio(declaration: IWidgetDeclaration<HTMLVideoElement, IAudioAttributes>): MediaAudioWidget {
  return new MediaAudioWidget(declaration)
}
