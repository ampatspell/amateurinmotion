import { PageSettingsModel } from "$dummy/lib/pages/page.svelte";

export type IndexPageSettings = Record<string, undefined>;

export class IndexPageSettingsModel extends PageSettingsModel<IndexPageSettings> {
  // TODO: Whyyy
  isLoaded = $state(true);
}
