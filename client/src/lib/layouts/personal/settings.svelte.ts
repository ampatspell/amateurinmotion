import { LayoutSettingsModel } from '$dummy/lib/layouts/layout.svelte';
import { data, DataModelProperties } from '$dummy/lib/utils/property.svelte';

export type DefaultLayoutSettings = {
  title: string;
};

export class DefaultLayoutSettingsPropertiesModel extends DataModelProperties<DefaultLayoutSettings> {
  readonly title = data(this, 'title');
}

export class DefaultLayoutSettingsModel extends LayoutSettingsModel<DefaultLayoutSettings> {
  readonly properties = new DefaultLayoutSettingsPropertiesModel({
    model: this,
  });

  readonly title = $derived(this.data.title);

  isLoaded = true;
}
