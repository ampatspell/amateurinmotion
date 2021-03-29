import Route from '@ember/routing/route';
import { file } from '../-basic';

export default class TrainingIndexRoute extends Route {

  async model() {
    let training = await file(this, 'pages/training.md', 'pages/page');
    return {
      training
    };
  }

}
