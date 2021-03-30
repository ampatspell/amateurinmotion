import Route from '@ember/routing/route';
import { page } from '../-page';

export default class TrainingIndexRoute extends Route {

  async model() {
    let training = await page(this, 'pages/training.md');
    return {
      training
    };
  }

}
