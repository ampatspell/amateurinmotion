import File from '../file';

export default class MetadataFile extends File {

  constructor(owner, { text }) {
    super(owner);
    this.json = JSON.parse(text);
  }

}
