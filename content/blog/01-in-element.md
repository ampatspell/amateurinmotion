---
slug: 01-render-comonents-inside-markdown
title: Render Ember.js components inside markdown
intro: Quick tip on how to render Ember.js components inside markdown using in-element helper.
date: 21.03.2021
---

Ever wanted to have Ember.js components in your rendered markdown? Turns out it's quite easy to do with Ember's recently introduced `{{in-element}}` helper.

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

But the thing is, this nifty `in-element` thing can also be used to

# but markdown?

