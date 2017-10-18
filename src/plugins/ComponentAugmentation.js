export default class ComponentAugmentation {
  constructor(componentName) {
    this.componentName = componentName;
    this.augmentations = {};
  }

  insertAfter(index, component) {
    this.augmentations[index] = component;
  }

  performAugmentation(parent, vdom) {
    let componentIndex = -1;
    for (let childNodeIndex = 0; childNodeIndex < vdom.children.length; childNodeIndex += 1) {
      const vnode = vdom.children[childNodeIndex];
      // Only count element nodes for now
      if (vnode.tag) {
        componentIndex += 1;
        const augmentationComponent = this.augmentations[componentIndex];
        if (augmentationComponent) {
          const childVNode = parent.$createElement(augmentationComponent);
          if (!childVNode.componentOptions.tag) {
            childVNode.componentOptions.tag = augmentationComponent.name;
          }
          vdom.children.splice(childNodeIndex + 1, 0, childVNode);
          childNodeIndex += 1;
        }
      }
    }

    return vdom;
  }
}
