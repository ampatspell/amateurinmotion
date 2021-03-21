``` javascript
let file = await this.files.file('hello.md').load();
```

``` javascript
@action
onPreprocess(node) {
  if(node.tagName === 'img') {
    let src = node.properties.src;
    if(src.startsWith('/')) {
      let path = `content${src}`;
      let resolved = this.assetMap.resolve(path);
      node.properties.src = resolved;
    }
  } else if(node.tagName === 'gallery') {
    let name = node.properties.name;
    return {
      type: 'component',
      name: 'block/remark/gallery',
      model: {
        name
      }
    };
  }
  return node;
}

```

``` hbs
<Block::Remark class="content"
  @content={{this.body}}
  @onPreprocess={{this.onPreprocess}}
/>
```
