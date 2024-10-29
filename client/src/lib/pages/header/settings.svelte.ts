import { PageSettingsModel } from "$dummy/lib/pages/page.svelte";

export type HeaderPageSettings = Record<string, undefined>;

export class HeaderPageSettingsModel extends PageSettingsModel<HeaderPageSettings> {
  // TODO: Whyyy
  isLoaded = $state(true);
}
