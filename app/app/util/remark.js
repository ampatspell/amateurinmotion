import unified from 'unified';
import parse from 'remark-parse';
import breaks from 'remark-breaks';
import remarkrehype from 'remark-rehype';
import raw from 'rehype-raw';
import highlight from 'remark-highlight.js';
import { cached } from "tracked-toolbox";
import { tracked } from "@glimmer/tracking";

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

class RemarkContent {
  @tracked isLoading = true;
  @tracked isLoaded = false;
  @tracked content = null;
}

export const remark = bodyKey => (target, key, descriptor) => cached(target, key, {
  get() {
    let body = this[bodyKey];
    let visitor = descriptor.value?.bind(this);
    let tree = new RemarkContent();
    toTree(body, visitor).then(content => {
      tree.isLoaded = true;
      tree.isLoading = false;
      tree.content = content;
    });
    return tree;
  }
});
