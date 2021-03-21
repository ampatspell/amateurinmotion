import Model from './model';
import { inject as service } from "@ember/service";

export default class Projects extends Model {

  @service files;
  @service models;

  all = null;

  async load() {
    this.all = await Promise.all(this.files.filter(file => {
      return file.directory === 'projects' && file.type === 'markdown';
    }).reverse().map(file => {
      return this.models.create('project', { file }).load();
    }));
    return this;
  }



}
