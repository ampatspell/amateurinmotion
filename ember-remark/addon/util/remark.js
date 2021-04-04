import unified from 'unified';
import parse from 'remark-parse';
import breaks from 'remark-breaks';
import remarkrehype from 'remark-rehype';
import raw from 'rehype-raw';
import highlight from 'remark-highlight.js';
import { cached } from "tracked-toolbox";
import { tracked } from "@glimmer/tracking";
import { assert } from '@ember/debug';

class Compiler {
  constructor(tree) {
    this.tree = tree;
  }
  compile() {
    return this.tree;
  }
}

function compiler() {
  this.Compiler = Compiler;
}

let pipe = unified()
  .use(parse)
  .use(breaks)
  .use(highlight)
  .use(remarkrehype, { allowDangerousHtml: true })
  .use(raw)
  .use(compiler);

export const toTree = async (string, visitor) => {
  if(!string || typeof string !== 'string') {
    return null;
  }
  let vfile = await pipe.process(string);
  let root = vfile.result;
  if(visitor) {
    root = visit(root, visitor);
  }
  return root;
}

//

export const visit = (node, visitor) => {
  node = visitor(node);
  if(node) {
    let children = [];
    if(node.children) {
      node.children.forEach(child => {
        child = visit(child, visitor);
        if(child) {
          children.push(child);
        }
      });
      node.children = children;
    }
  }
  return node;
}

//

const attributes = [ 'src', 'alt', 'href', 'target' ];

export const toDOM = tree => {
  let components = [];

  const toElements = (parent, nodes=[]) => {
    nodes?.forEach(node => {
      let el = toElement(node);
      if(el) {
        parent.appendChild(el);
      }
    });
    return parent;
  };

  const createElement = (name, node, className) => {
    let element = document.createElement(name);
    let properties = node.properties;
    if(properties) {
      properties.className?.forEach(className => {
        element.classList.add(className);
      });
      for(let key in properties) {
        if(attributes.includes(key)) {
          let value = properties[key];
          element[key] = value;
        } else {
          // temporary
          if(key !== 'className') {
            console.warn('Unmapped node property', key);
          }
        }
      }
    }
    if(className) {
      element.classList.add(className);
    }
    return element;
  }

  const toElement = node => {
    if(node) {
      let { type } = node;
      if(type === 'root') {
        let element = createElement('div', node, 'root');
        return toElements(element, node.children);
      } else if(type === 'element') {
        let element = createElement(node.tagName, node);
        return toElements(element, node.children);
      } else if(type === 'text') {
        return document.createTextNode(node.value);
      } else if(type === 'component') {
        let element = createElement(node.inline ? 'span' : 'div', node, 'component');
        let { name, model } = node;
        let content = toElements(document.createElement('span'), node.children);
        components.push({
          element,
          name,
          model,
          content
        });
        return element;
      }
      assert(`Unsupported node '${type}'`, false);
    }
  }

  let element = toElement(tree);

  return {
    element,
    components
  };
}

//

class RemarkContent {

  promise = null;
  @tracked isLoading = true;
  @tracked isLoaded = false;
  @tracked isError = false;
  @tracked error = null;
  @tracked content = null;

  load(opts) {
    let { type } = Object.assign({ type: 'swallow' }, opts);
    return this.promise.then(() => this, err => {
      if(type === 'swallow' || type === 'silent') {
        if(type !== 'silent') {
          console.error(err);
        }
        return this;
      }
      return Promise.reject(err);
    });
  }

}

// @remark('body')
// tree(node) {
//   let { type, tagName } = node;
//   if(tagName === 'a') {
//     node.properties.target = 'top';
//   }
//   return node;
// }
export const remark = bodyKey => (target, key, descriptor) => cached(target, key, {
  get() {
    let body = this[bodyKey];
    let visitor = descriptor.value?.bind(this);
    let tree = new RemarkContent();
    let promise = toTree(body, visitor);
    tree.promise = promise;
    promise.then(content => {
      tree.isLoaded = true;
      tree.isLoading = false;
      tree.content = content;
    }, err => {
      tree.isError = true;
      tree.isLoading = false;
      tree.error = err;
    });
    return tree;
  }
});
