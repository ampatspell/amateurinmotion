import { DateTime } from 'luxon';
import { cached } from "tracked-toolbox";

export const datetime = (dateKey, format) => (target, key) => cached(target, key, {
  get() {
    let value = this[dateKey];
    let dt = DateTime.fromFormat(value, format, { zone: 'EST' });
    if(!dt.isValid) {
      console.warn('Invalid date', value, this);
    }
    return dt;
  }
});

export const date = (dateTimeKey) => () => ({
  get() {
    return this[dateTimeKey].toJSDate();
  }
});
