import Component from '@glimmer/component';
import outdent from 'outdent';

export default class RouteIndexComponent extends Component {

  content = outdent`
  # Hello

  this is *paragraph*

  <Gallery name="foof"></Gallery>

  \`\`\` javascript
  let foo = { ok: true };
  \`\`\`

  another paragraph

  ![](one.png)

  `;

  onPreprocess(node) {
    if(node.tagName === 'gallery') {
      let name = node.properties.name;
      return {
        type: 'component',
        name: 'block/remark/gallery',
        model: {
          name
        }
      };
    } else if(node.tagName === 'img') {
      node.properties.src = `https://64.media.tumblr.com/ce1ca5212821c5285737b2b7404b1322/tumblr_pcjt3xUKNf1qz5jeho1_1280.jpg`;
    }
    return node;
  }

}
