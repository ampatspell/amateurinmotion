import { browser } from '$app/environment';

export class Identifier {
  private get key() {
    const host = document.location.host;
    return `identifier:${host}`;
  }

  private generate() {
    return window.crypto?.randomUUID();
  }

  private get _value() {
    if (browser) {
      try {
        const key = this.key;
        let value = window.localStorage?.getItem(this.key);
        if (!value) {
          value = this.generate();
          if (value) {
            window.localStorage.setItem(key, value);
          }
        }
        return value;
      } catch (err: unknown) {
        console.log((err as Error).stack);
      }
    }
    return undefined;
  }

  readonly current = $derived(this._value);
}

let _identifier: Identifier | undefined;

export const getIdentifier = () => {
  if (!_identifier) {
    _identifier = new Identifier();
  }
  return _identifier;
};
