---
slug: 01-render-comonents-inside-markdown
title: Render Ember.js components inside markdown
intro: Quick tip on how to render Ember.js components inside markdown using in-element helper.
date: 21.03.2021
---

Ember.js recently introduced `{{in-element}}` helper which let's you render markkup and components outside of current component, in arbitrary DOM element.

So, let's say you have this `thing` component and you want to render that `something` component somewhere else:

``` hbs
<!-- components/block/thing.hbs -->
<div class="block-thing">
  {{#in-element this.targetElement}}
    <Block::Something/>
  {{/in-element}}
</div>
```

``` js
// components/block/thing.js
export default class BlockThingComponent extends Component {

  get targetElement() {
    // or better yet ask some kind of service for an element
    return document.querySelector('.somewhere-else');
  }

}
```

Pretty nifty feature if you ask me.

But the thing is, this nifty `in-element` thing can also be used to
