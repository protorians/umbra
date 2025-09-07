import { WidgetNode } from "../widget-node.js";
import type { IImageAttributes, IPictureAttributes, IWidgetDeclaration, IVideoAttributes, ISourceProps, IAudioAttributes } from "../types/index.js";
export declare class MediaVideoWidget extends WidgetNode<HTMLVideoElement, IVideoAttributes> {
    get tag(): string;
}
export declare class MediaAudioWidget extends WidgetNode<HTMLVideoElement, IAudioAttributes> {
    get tag(): string;
}
export declare class MediaPictureWidget extends WidgetNode<HTMLPictureElement, IPictureAttributes> {
    get tag(): string;
}
export declare class MediaImageWidget extends WidgetNode<HTMLImageElement, IImageAttributes> {
    get tag(): string;
}
export declare class MediaSourceWidget extends WidgetNode<HTMLSourceElement, ISourceProps> {
    get tag(): string;
}
export declare function Source(declaration: IWidgetDeclaration<HTMLSourceElement, ISourceProps>): MediaSourceWidget;
export declare function MediaSource(declaration: IWidgetDeclaration<HTMLSourceElement, ISourceProps>): MediaSourceWidget;
export declare function Picture(declaration: IWidgetDeclaration<HTMLPictureElement, IPictureAttributes>): MediaPictureWidget;
export declare function MediaPicture(declaration: IWidgetDeclaration<HTMLPictureElement, IPictureAttributes>): MediaPictureWidget;
export declare function Image(declaration: Omit<IWidgetDeclaration<HTMLImageElement, IImageAttributes>, 'children'>): MediaImageWidget;
export declare function MediaImage(declaration: Omit<IWidgetDeclaration<HTMLImageElement, IImageAttributes>, 'children'>): MediaImageWidget;
export declare function VideoPlayer(declaration: IWidgetDeclaration<HTMLVideoElement, IVideoAttributes>): MediaVideoWidget;
export declare function MediaVideo(declaration: IWidgetDeclaration<HTMLVideoElement, IVideoAttributes>): MediaVideoWidget;
export declare function AudioPlayer(declaration: IWidgetDeclaration<HTMLVideoElement, IAudioAttributes>): MediaAudioWidget;
export declare function MediaAudio(declaration: IWidgetDeclaration<HTMLVideoElement, IAudioAttributes>): MediaAudioWidget;
