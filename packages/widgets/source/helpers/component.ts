import { TextUtility } from "@protorians/core";


export function extractComponentName(name: string, suffix?: string): string {
  name = TextUtility.unCamelCase(name);
  name = (suffix) ? name.replace(new RegExp(`-${suffix}`, "i"), '') : name;
  name = name.replace(new RegExp(`-view`, "i"), '');
  name = name.replace(new RegExp(`-widget`, "i"), '');
  name = name.replace(new RegExp(`-kit`, "i"), '');
  name = name.replace(new RegExp(`-module`, "i"), '');
  return TextUtility.camelCase(name);
}
