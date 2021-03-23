import { helper } from '@ember/component/helper';

export default helper(function dt([ dt ]) {
  return dt?.toFormat('DDD');
});
