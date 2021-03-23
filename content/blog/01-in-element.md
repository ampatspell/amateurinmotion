---
slug: 01-render-comonents-inside-markdown
title: Render Ember.js components inside markdown
intro: Quick tip on how to render Ember.js components inside markdown using in-element helper.
date: 23.03.2021
notes:
  - Ember.js v3.25.1
---

Ever wanted to have live Ember.js components in your rendered markdown? I mean, something like this `Counter`:

``` markdown
# Plain markdown

<Counter value="0">How many times you clicked?</Counter>

* something
* else
```

Rendered with Ember.js component which receives attribute values, inner content and does something with it:

<Counter value="0">How many times you clicked?</Counter>

> [counter.hbs](https://github.com/ampatspell/amateurinmotion/blob/master/app/app/components/remark/blog/counter.hbs), [counter.js](https://github.com/ampatspell/amateurinmotion/blob/master/app/app/components/remark/blog/counter.js)

Well, it turns out its quite easy to do with Ember's recently introduced `{{in-element}}` helper.

# {{in-element}} what?

Here is the [official documentation](https://api.emberjs.com/ember/3.25/classes/Ember.Templates.helpers/methods/in-element?anchor=in-element):

> The `in-element` helper renders its block content outside of the regular flow, into a DOM element given by its `destinationElement` positional argument.

So, let's say you have this `<Block::Beach/>` component and you want to render your `<Block::Hamster/>` component on the moon because hamsters doesn't like beaches:

``` hbs
<!-- components/block/beach.hbs -->
<div class="block-beach">
  {{#in-element this.moonElement}}
    <Block::Hamster/>
  {{/in-element}}
</div>
```

``` js
// components/block/beach.js
export default class BlockBeachComponent extends Component {

  get moonElement() {
    // or better yet ask some kind of service for an element
    return document.querySelector('.moon');
  }

}
```

And that's it, `<Block::Hamster/>` will be rendered inside `moon` element which certainly is not the beach.

Pretty nifty if you ask me.

# But the markdown part?

Well, markdown is just a DOM you insert into the app by using `innerHTML` or `{{this.markdownRootElement}}`. Might as well do some figuring out which Ember components should go where and just do `in-element` in a for loop right after static content is inserted.

Overall, the idea is as simple as this:

``` hbs
{{!-- insert markdown built as tree of DOM elements --}}
{{this.content.element}}

{{!-- iterate through all components we need to insert --}}
{{#each this.content.components as |hash|}}
  {{!-- in-element target is somewhere in inserted this.content.element above --}}
  {{#in-element hash.element}}
    {{!-- render component --}}
    {{component hash.name model=hash.model}}
  {{/in-element}}
{{/each}}
```

Now let's look at how I got there in this blog as an example.

## Parsing

For markdown parsing I use [Unified](https://unifiedjs.com/), [Remark](https://remark.js.org/) and bunch of other plugins to create a tree of javacript objects where each represents a single DOM element.

``` javascript
import unified from 'unified';
import parse from 'remark-parse';
import breaks from 'remark-breaks';
import highlight from 'remark-highlight.js';
import remarkrehype from 'remark-rehype';
import raw from 'rehype-raw';

let pipe = unified()
  .use(parse)
  .use(breaks)
  .use(highlight)
  .use(remarkrehype, { allowDangerousHtml: true })
  .use(raw)
  .use(compiler); // this compiler just returns raw tree
```

and the result is object like this:

``` json
{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tagName": "p",
      "properties": {},
      "children": [
        {
          "type": "text",
          "value": "Ever wanted to have live Ember.js components in your rendered markdown?…",
        }
```

Also, if `allowDangerousHtml` is set to `true` for `remark-rehype`, this tree will include non-standard HTML elements. For example:

``` html
<Counter value="0">How many clicks?</Counter>
```

Will be parsed to:

``` json
{
  "type": "element",
  "tagName": "counter",
  "properties": {
    "value": "0"
  },
  "children": [
    {
      "type": "text",
      "value": "How many clicks?",
    }
  ]
}
```

Using simple helper to walk nodes recursively, we can selectively replace non-standard elements with generic `"type": "component"`:

``` js
root = walk(root, node => {
  let { type, tagName } = node;
  if(tagName === 'counter') {
    let value = parseInt(node.properties.value);
    let text = node.children[0]?.value;
    return {
      type: 'component',
      name: 'remark/blog/counter',
      model: {
        value,
        text
      }
    };
  }
  return node;
});
```

``` json
{
  "type": "component",
  "name": "remark/blog/counter",
  "model": {
    "value": "0",
    "text": "How many clicks?"
  }
}
```

Now we have generic tree with `component` nodes sprinkled in and we're ready to create DOM.

## DOM

For this I went with a basic `node` to `document.createElement` implementation which just goes through all nodes, creates DOM elements or text nodes. If it encounters `component` node, it just creates `div` element and adds `{ element, node }` to an array.

So, the result is root element for static markdown content which also includes placeholder `div` elements where Ember components will be rendered into. And also an array of component placeholders to node mapping:

``` js
let dom = {
  element, // HTMLDivElement with all the content as children
  components: [
    {
      element, // HTMLDivElement
      name: "remark/blog/counter",
      model: {
        value: "0",
        text: "How many clcks?"
      }
    },
    …
  ]
}
```

## Rendering

Now we can render.

First – static HTML and then components:

``` hbs
<div class="block-remark" ...attributes {{did-update this.didUpdateContent this.content}}>
  {{#if this.dom}}

    {{!-- inserts root DOM element --}}
    {{this.dom.element}}

    {{!-- render components into placeholders --}}
    {{#each this.dom.components as |hash|}}
      {{#in-element hash.element}}
        {{!-- inserts component into previously inserted dom node above --}}
        {{component hash.name model=hash.model}}
      {{/in-element}}
    {{/each}}

  {{/if}}
</div>
```

## Component

And for each component we're in our cosy Ember.js space:

``` hbs
{{!-- components/remark/blog/counter.hbs --}}
<div class="remark-blog-counter">
  <div class="action">
    <input type="button" value="Click" {{on "click" this.onClick}}/>
  </div>
  <div class="details">
    <div class="text">{{@model.text}}</div>
    <div class="value">{{this.value}}!</div>
  </div>
</div>
```

``` js
// components/remark/blog/counter.js
import Component from '@glimmer/component';
import { action } from "@ember/object";
import { localCopy  } from "tracked-toolbox";

export default class RemarkBlogCounterComponent extends Component {

  @localCopy('args.model.value') value;

  @action
  onClick() {
    this.value++;
  }

}
```

# Implementation details

Here are links to all the moving parts I'm using for this blog:

* [`util/remark.js`](https://github.com/ampatspell/amateurinmotion/blob/master/app/app/util/remark.js)
  * `toTree` → parses markdown to rehype
  * `remark` → decorator that creates rehype from string and transforms raw tree nodes
  * `toDOM` → creates DOM and component mapping from rehype
* [`blog/post.js`](https://github.com/ampatspell/amateurinmotion/blob/master/app/app/models/content/blog/post.js) → example `remark` decorator usage
* [`<Block::Remark/>`](https://github.com/ampatspell/amateurinmotion/blob/master/app/app/components/block/remark.hbs) → renders DOM and components in placeholders
