import Route from '@ember/routing/route';
import { file } from '../-basic';

export default class MentorshipIndexRoute extends Route {

  async model() {
    let mentorship = await file(this, 'pages/mentorship.md', 'pages/page');
    return {
      mentorship
    };
  }

}
