var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WidgetNode } from "../widget-node.js";
import { Composable, Mountable } from "../decorators.js";
let FormWidget = class FormWidget extends WidgetNode {
    get tag() {
        return 'form';
    }
    ;
};
FormWidget = __decorate([
    Mountable(),
    Composable()
], FormWidget);
export { FormWidget };
let LabelWidget = class LabelWidget extends WidgetNode {
    get tag() {
        return 'label';
    }
    ;
    get kind() {
        return 'text';
    }
};
LabelWidget = __decorate([
    Mountable(),
    Composable()
], LabelWidget);
export { LabelWidget };
let InputWidget = class InputWidget extends WidgetNode {
    get tag() {
        return 'input';
    }
    ;
    get kind() {
        return 'input';
    }
};
InputWidget = __decorate([
    Mountable(),
    Composable()
], InputWidget);
export { InputWidget };
let InputAreaWidget = class InputAreaWidget extends WidgetNode {
    get tag() {
        return 'textarea';
    }
    ;
    get kind() {
        return 'input';
    }
};
InputAreaWidget = __decorate([
    Mountable(),
    Composable()
], InputAreaWidget);
export { InputAreaWidget };
let SelectWidget = class SelectWidget extends WidgetNode {
    get tag() {
        return 'select';
    }
    ;
    get kind() {
        return 'input';
    }
};
SelectWidget = __decorate([
    Mountable(),
    Composable()
], SelectWidget);
export { SelectWidget };
let OptionWidget = class OptionWidget extends WidgetNode {
    get tag() {
        return 'option';
    }
    ;
    get kind() {
        return 'input';
    }
};
OptionWidget = __decorate([
    Mountable(),
    Composable()
], OptionWidget);
export { OptionWidget };
export function Option(declaration) {
    return new OptionWidget({ ...declaration, children: declaration.label });
}
let OptionGroupWidget = class OptionGroupWidget extends WidgetNode {
    get tag() {
        return 'optgroup';
    }
    ;
};
OptionGroupWidget = __decorate([
    Mountable(),
    Composable()
], OptionGroupWidget);
export { OptionGroupWidget };
export function Form(declaration) {
    return new FormWidget(declaration);
}
export function Label(declaration) {
    return new LabelWidget(declaration);
}
export function Input(declaration) {
    return new InputWidget({ ...declaration, children: undefined });
}
export function InputArea(declaration) {
    return new InputAreaWidget(declaration);
}
export function Select(declaration) {
    return new SelectWidget(declaration);
}
export function OptionGroup(declaration) {
    return new OptionGroupWidget(declaration);
}
