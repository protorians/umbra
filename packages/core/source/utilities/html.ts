export function AscendingDOMPath<T extends Node | HTMLElement>(
  child: T,
  validator: (parent: T) => boolean
): T | undefined {

  let node = child.parentElement;

  while (node != null) {

    if (validator(node as T)) {
      return node as T;
    }

    node = node.parentElement;

  }

  return undefined;

}

