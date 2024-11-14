import { LayoutSettingsModel } from '$dummy/lib/layouts/layout.svelte';
import { data, DataModelProperties } from '$dummy/lib/utils/property.svelte';

export class DefaultLayoutSettingsPropertiesModel extends DataModelProperties<DefaultLayoutSettings> {
  title = data(this, 'title');
  pages = data(this, 'pages');
}

export type DefaultLayoutSettings = {
  title: string;
  pages: string[];
};

export class DefaultLayoutSettingsModel extends LayoutSettingsModel<DefaultLayoutSettings> {
  properties = new DefaultLayoutSettingsPropertiesModel({
    model: this,
  });

  title = $derived(this.data.title);

  isLoaded = true;
}
