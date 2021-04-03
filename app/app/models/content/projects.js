import Model from '../-model';
import { inject as service } from "@ember/service";

export default class Projects extends Model {

  @service('ember-remark@files') files;
  @service('ember-remark@models') models;

  all = null;

  async load() {
    this.all = await Promise.all(this.files.filter(file => {
      return file.directory === 'projects' && file.type === 'markdown';
    }).map(file => {
      return this.models.create('content/projects/project', { file }).load();
    }));
    return this;
  }

}
