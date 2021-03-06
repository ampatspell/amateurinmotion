import Model from '../-model';
import { inject as service } from "@ember/service";
import { sortedBy } from '../../util/array';

export default class Projects extends Model {

  @service content;
  @service models;

  all = null;

  async load() {
    this.all = sortedBy(await Promise.all(this.content.filter(file => {
      return file.directory === 'projects' && file.type === 'markdown';
    }).map(file => {
      return this.models.create('content/projects/project', { file }).load();
    })), project => project.position);
    return this;
  }

}
