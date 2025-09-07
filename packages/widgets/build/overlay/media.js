var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WidgetNode } from "../widget-node.js";
import { Composable, Mountable } from "../decorators.js";
let MediaVideoWidget = class MediaVideoWidget extends WidgetNode {
    get tag() {
        return 'video';
    }
    ;
};
MediaVideoWidget = __decorate([
    Mountable(),
    Composable()
], MediaVideoWidget);
export { MediaVideoWidget };
let MediaAudioWidget = class MediaAudioWidget extends WidgetNode {
    get tag() {
        return 'audio';
    }
    ;
};
MediaAudioWidget = __decorate([
    Mountable(),
    Composable()
], MediaAudioWidget);
export { MediaAudioWidget };
let MediaPictureWidget = class MediaPictureWidget extends WidgetNode {
    get tag() {
        return 'picture';
    }
    ;
};
MediaPictureWidget = __decorate([
    Mountable(),
    Composable()
], MediaPictureWidget);
export { MediaPictureWidget };
let MediaImageWidget = class MediaImageWidget extends WidgetNode {
    get tag() {
        return 'img';
    }
    ;
};
MediaImageWidget = __decorate([
    Mountable(),
    Composable()
], MediaImageWidget);
export { MediaImageWidget };
let MediaSourceWidget = class MediaSourceWidget extends WidgetNode {
    get tag() {
        return 'source';
    }
    ;
};
MediaSourceWidget = __decorate([
    Mountable(),
    Composable()
], MediaSourceWidget);
export { MediaSourceWidget };
export function Source(declaration) {
    return new MediaSourceWidget(declaration);
}
export function MediaSource(declaration) {
    return new MediaSourceWidget(declaration);
}
export function Picture(declaration) {
    return new MediaPictureWidget(declaration);
}
export function MediaPicture(declaration) {
    return new MediaPictureWidget(declaration);
}
export function Image(declaration) {
    return new MediaImageWidget({ ...declaration, children: undefined });
}
export function MediaImage(declaration) {
    return new MediaImageWidget({ ...declaration, children: undefined });
}
export function VideoPlayer(declaration) {
    return new MediaVideoWidget(declaration);
}
export function MediaVideo(declaration) {
    return new MediaVideoWidget(declaration);
}
export function AudioPlayer(declaration) {
    return new MediaAudioWidget(declaration);
}
export function MediaAudio(declaration) {
    return new MediaAudioWidget(declaration);
}
