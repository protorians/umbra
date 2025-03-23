import {CommonTheme, IModalOptions, type IThemeSettings} from "@widgetui/core";
import {KatonButton} from "./composites/button/index.js";
import {
    type IButtonAttributes,
    type IButtonAttributesBase,
    type ICommonAttributes,
    type IWidgetDeclaration,
} from "@protorians/widgets";
import {KatonButtonProps} from "./composites/button/type.js";
import {KatonHelmet} from "./composites/helmet/index.js";
import {KatonHelmetProps} from "./composites/helmet/type.js";
import {KatonViewProps} from "./composites/view/type.js";
import {KatonView} from "./composites/view/index.js";
import {KatonSkeleton} from "./composites/skeleton/index.js";
import {KatonSkeletonProps} from "./composites/skeleton/type.js";
import {KatonLayer} from "./composites/layer/index.js";
import {KatonLayerProps} from "./composites/layer/type.js";
import {KatonNavbar} from "./composites/navbar/index.js";
import {KatonNavbarProps} from "./composites/navbar/type.js";
import {KatonScrollArea} from "./composites/scroll-area/index.js";
import {KatonScrollAreaProps} from "./composites/scroll-area/type.js";
import { KatonModal } from "./composites/modal/index.js";
import { KatonSheet } from "./composites/sheet/index.js";
import { KatonSheetProps } from "./composites/sheet/type.js";
import {Color, IWidgetNode} from "@protorians/widgets/~esm/index.js";
import { KatonProgress } from "./composites/progress/index.js";
import { KatonProgressProps } from "./composites/progress/type.js";


export class KatonTheme extends CommonTheme {

    get name(): string {
        return 'katon';
    }

    protected prepareSettings(settings: Partial<IThemeSettings>): Partial<IThemeSettings> {
        settings = super.prepareSettings(settings);

        settings.radius = '.7rem';
        settings.blurred = '2rem';
        settings.spacing = '.4rem';
        settings.borderWidth = '1px';
        settings.borderStyle = 'solid';
        settings.borderColor = Color.tint_100;

        return settings;
    }

    Helmet(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes & KatonHelmetProps>) {
        return KatonHelmet(declaration)
    }

    Navbar(declaration: IWidgetDeclaration<HTMLElement, ICommonAttributes & KatonNavbarProps>) {
        return KatonNavbar(this, declaration)
    }

    Button(
        declaration: IWidgetDeclaration<HTMLButtonElement, KatonButtonProps & IButtonAttributes & IButtonAttributesBase>
    ) {
        return KatonButton(declaration)
    }

    View(declaration: IWidgetDeclaration<HTMLElement, KatonViewProps & ICommonAttributes>,) {
        return KatonView(declaration)
    }

    Skeleton(declaration: IWidgetDeclaration<HTMLElement, KatonSkeletonProps & ICommonAttributes>,) {
        return KatonSkeleton(declaration)
    }

    Layer(declaration: IWidgetDeclaration<HTMLElement, KatonLayerProps & ICommonAttributes>) {
        return KatonLayer(declaration)
    }

    ScrollArea(declaration: IWidgetDeclaration<HTMLElement, KatonScrollAreaProps & ICommonAttributes>) {
        return KatonScrollArea(declaration)
    }

    Modal(declaration: Omit<IWidgetDeclaration<HTMLElement, Partial<IModalOptions> & ICommonAttributes>, 'children'>){
        return KatonModal(declaration)
    }

    Sheet(declaration: Omit<IWidgetDeclaration<HTMLElement, Partial<KatonSheetProps> & ICommonAttributes>, 'children'>){
        return KatonSheet(declaration)
    }

    Progress(declaration: Omit<IWidgetDeclaration<HTMLElement, KatonProgressProps & ICommonAttributes>, 'children'>): IWidgetNode<any, any> | undefined {
        return KatonProgress(declaration);
    }

}

