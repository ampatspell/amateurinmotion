import Base, { attr, remark } from '../-base';
import { date, datetime } from '../../../util/datetime';

const transformNote = node => {
  let label;
  if(node.properties.label) {
    label = {
      type: 'element',
      tagName: 'div',
      properties: {
        className: [ 'label' ]
      },
      children: [
        {
          type: 'text',
          value: node.properties.label
        }
      ]
    };
    delete node.properties.label;
  }
  return {
    type: 'element',
    tagName: 'div',
    properties: {
      className: [ 'remark-note' ]
    },
    children: [
      label,
      {
        type: 'element',
        tagName: 'div',
        properties: {
          className: [ 'content' ]
        },
        children: [ ...node.children ]
      }
    ].filter(Boolean)
  };
};

const transformBlogExampleCounter = node => {
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

export default class Post extends Base {

  @attr('slug') slug;
  @attr('title') title;
  @attr('intro') intro;
  @attr('date') _date;
  @attr('notes') notes;

  @datetime('_date', 'dd.MM.yyyy') datetime;
  @date('datetime') date;

  @remark('body')
  tree(node) {
    let { type, tagName } = node;
    if(type === 'element' && tagName === 'a') {
      let href = node.properties.href;
      if(href.startsWith('http') || href.startsWith('mailto')) {
        node.properties.target = 'top';
      }
    } else if(tagName === 'note') {
      return transformNote(node);
    } else if(tagName === 'counter') {
      return transformBlogExampleCounter(node)
    }
    return node;
  }

  get isHidden() {
    return this.file.filename.startsWith('-');
  }

}
