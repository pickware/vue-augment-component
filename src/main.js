// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import GlobalAugment from './plugins/GlobalAugment';
import viisonAppExtension from './extensions/ViisonAppExtension';

Vue.use(GlobalAugment);
viisonAppExtension();

Vue.config.productionTip = false;

const patchVNode = () => {
  const VNode = Vue.prototype._e('').constructor;
  Object.defineProperty(VNode.prototype, 'nodeType', {
    get: function nodeType() {
      return 1;
    },
  });
  Object.defineProperty(VNode.prototype, 'nodeName', {
    get: function nodeName() {
      if (this.componentOptions) {
        return this.componentOptions.tag.toLowerCase();
      } else if (this.tag) {
        return this.tag.toLowerCase();
      }
      return undefined;
    },
  });
  Object.defineProperty(VNode.prototype, 'parentNode', {
    get: function parentNode() {
      return this.parent;
    },
  });
  Object.defineProperty(VNode.prototype, 'childNodes', {
    get: function childNodes() {
      return this.children || [];
    },
  });
  VNode.prototype.getElementById = function getElementById(id) {
    if (this.data && this.data.attr) {
      return this.data.attr.id;
    }
    return undefined;
  };
  VNode.prototype.getElementsByTagName = function getElementsByTagName(tagName) {
    const lcTagName = tagName.toLowerCase();
    const matchingElements = [];
    this.childNodes.forEach((child) => {
      if (child.nodeName === lcTagName) {
        matchingElements.push(child);
      }
      child.getElementsByTagName(tagName).forEach((result) => {
        matchingElements.push(result);
      });
    });

    return matchingElements;
  };
};

/* eslint-disable no-new */
new Vue({
  beforeCreate: patchVNode,
  el: '#app',
  template: '<App/>',
  components: { App },
});
