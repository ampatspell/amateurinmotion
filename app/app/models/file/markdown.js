import File from '../file';
import frontMatter from 'front-matter';

export default class MarkdownFile extends File {

  constructor(owner, { text }) {
    super(owner);
    let { attributes, body } = frontMatter(text);
    this.attributes = attributes;
    this.body = body;
  }

}
