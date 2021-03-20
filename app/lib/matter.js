import frontMatter from 'front-matter';

export const matter = text => {
  let { attributes, body } = frontMatter(text);
  return { attributes, body };
}
