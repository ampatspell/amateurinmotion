---
slug: 01-render-comonents-inside-markdown
title: Render Ember.js components inside markdown
intro: Quick tip on how to render Ember.js components inside markdown using in-element helper.
date: 21.03.2021
---

Ever wanted to have Ember.js components in your rendered markdown?

I mean someting like this:

``` html
<Counter value="0">How many times you clicked?</Counter>
```

Which renders as this:

<Counter value="0">How many times you clicked?</Counter>

Turns out it's quite easy to do with Ember's recently introduced `{{in-element}}` helper.

# in-element what?

Here is [official documentation](https://api.emberjs.com/ember/3.25/classes/Ember.Templates.helpers/methods/in-element?anchor=in-element):

> The `in-element` helper renders its block content outside of the regular flow, into a DOM element given by its `destinationElement` positional argument.

So, let's say you have this `<Blog::Thing/>` component and you want to render that `<Block::Something/>` component somewhere outside:

``` hbs
<!-- components/block/thing.hbs -->
<div class="block-thing">
  {{#in-element this.destinationElement}}
    <Block::Something/>
  {{/in-element}}
</div>
```

``` js
// components/block/thing.js
export default class BlockThingComponent extends Component {

  get destinationElement() {
    // or better yet ask some kind of service for an element
    return document.querySelector('.somewhere-else');
  }

}
```

And that's it, `<Block::Something/>` will be rendered inside `.somewhere-else` element. Pretty nifty feature if you ask me.

# but markdown?

Well, markdown is just a DOM you insert into the app by using `innerHTML`, `el.appendChild` or `{{this.markdownRootElement}}`, might as well do some figuring out which ember components should go where and just do `in-element` in for loop right after static content is inserted.

## Parsing

For this blog I'm using [Remark](https://remark.js.org/) and list of plugins to parse markdown files into tree of objects:

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
  .use(compiler); // compiler just returns raw tree
```

and the result of that is:

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
          "value": "Ever wanted to have Ember.js components in your rendered markdown?…",
        }
```

This tree can be easily walked and modified.

For example, if markdown file has the following:

``` html
<Counter value="0">How many clicks?</Counter>
```

It will be parsed to:

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

And tree walker can take all the relevant data and replace it with:

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

Now we have generic tree with `component` nodes sprinkled in.

## Rendering

For rendering I went with basic node to `document.createElement` implementation which just goes through all nodes and creates DOM elements or text nodes. And for `component` nodes it creates `<div class="component">…</div>`

> …

Now we have the mapping of DOM elements and nodes:

``` js
[
  {
    el: HTMLDivElement
    node: {
      type: "component",
      name: "remark/blog/counter",
      model: {
        value: "0",
        text: "How many clcks?"
      }
    }
  },
  …
]
```

``` hbs
<div class="block-remark" ...attributes {{did-update this.didUpdateContent @content}}>
  {{#if this.content}}
    {{this.content.root}} {{!-- inserts root DOM element --}}
    {{#each this.content.components as |hash|}}
      {{#in-element hash.el}}
        {{!-- inserts component into previously inserted dom node above --}}
        {{component hash.node.name model=hash.node.model}}
      {{/in-element}}
    {{/each}}
  {{/if}}
</div>
```

From there, for each custom component we're in Ember.js space

``` hbs
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
