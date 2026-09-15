// See https://svelte.dev/docs/kit/types#app.d.ts

import type { roles } from './env';
import type { Variants } from './params';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  namespace Tiny {
    export type Thumbnail = Variants;
    export type Role = (typeof roles)[number];
  }
}

export {};
