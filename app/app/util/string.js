export const widow = text => {
  if(typeof text !== 'string') {
    return text;
  }

  if (text.length === 0) {
    return text;
  }

  let words = text.split(' ');

  if (words.length === 1) {
    return words[0];
  }

  let last = words.pop();

  words = words.join(' ');

  return `${words}\u00A0${last}`;
}
