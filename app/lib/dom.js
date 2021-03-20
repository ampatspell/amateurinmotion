import { assert } from '@ember/debug';

const defaultPreprocess = node => node;
const attributes = [ 'src', 'alt' ];

export const toDom = (tree, preprocess=defaultPreprocess) => {
  let components = [];

  const toElements = (parent, nodes=[]) => {
    nodes.forEach(node => {
      let el = toElement(node);
      if(el) {
        parent.appendChild(el);
      }
    });
    return parent;
  };

  const createElement = (name, node, className) => {
    let el = document.createElement(name);
    let properties = node.properties;
    if(properties) {
      properties.className?.forEach(className => {
        el.classList.add(className);
      });
      for(let key in properties) {
        if(attributes.includes(key)) {
          let value = properties[key];
          el[key] = value;
        }
      }
    }
    if(className) {
      el.classList.add(className);
    }
    return el;
  }

  const toElement = node => {
    if(node) {
      node = preprocess(node);
      if(node) {
        let { type } = node;
        if(type === 'root') {
          let el = createElement('div', node, 'root');
          return toElements(el, node.children);
        } else if(type === 'element') {
          let el = createElement(node.tagName, node);
          return toElements(el, node.children);
        } else if(type === 'text') {
          return document.createTextNode(node.value);
        } else if(type === 'component') {
          let el = createElement('div', node, 'component');
          components.push({
            el,
            node
          });
          return toElements(el, node.children);
        }
        assert(`Unsupported node '${type}'`, false);
      }
    }
  }

  let root = toElement(tree);

  return {
    root,
    components
  };
}
