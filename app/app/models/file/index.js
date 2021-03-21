import File from '../file';

export default class IndexFile extends File {

  constructor(owner, { text }) {
    super(owner);
    this.json = JSON.parse(text);
  }

}
