import { helper } from '@ember/component/helper';
import { widow as _widow } from '../util/string';

export default helper(function widow([ string ]) {
  return _widow(string);
});
