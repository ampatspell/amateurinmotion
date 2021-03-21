const path = require('path');
const glob = require('glob');
const fs = require('fs');

let list = (dir, extensions) => new Promise((resolve, reject) => {
  glob(`**/*.+(${extensions.join('|')})`, { cwd: dir, nodir: true }, (err, arg) => {
    if(err) {
      return reject(err);
    }
    resolve(arg);
  });
});

let readFile = (dir, file, ...args) => new Promise((resolve, reject) => {
  fs.readFile(path.join(dir, file), ...args, (err, arg) => {
    if(err) {
      return reject(err);
    }
    resolve(arg);
  });
});

let markdown = async (dir, file) => {
  let matter = require('front-matter');
  let content = await readFile(dir, file, 'utf-8');
  let { attributes } = matter(content);
  return {
    attributes
  };
}

let build = async (dir, extensions) => {
  let files = await list(dir, extensions);

  let hash = {};
  await Promise.all(files.map(async file => {
    let meta = null;
    if(file.endsWith('.md')) {
      meta = await markdown(dir, file);
    }
    hash[file] = meta;
  }));

  let string = JSON.stringify(hash, null, 2);
  console.log(string);
  return `${string}\n`;
}

module.exports = build;
