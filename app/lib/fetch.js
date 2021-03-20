import { resolveName } from './asset-map';
import fetch from 'fetch';

export const fetchMarkdown = async name => {
  let fullName = `markdown/${name}.md`;
  let res = await fetch(await resolveName(fullName));
  return await res.text();
}
