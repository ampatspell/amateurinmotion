import { LayoutSettingsModel } from '$dummy/lib/layouts/layout.svelte';
import { Properties, type PropertiesOptions, data } from '$dummy/lib/utils/property.svelte';

export type DefaultLayoutSettingsPropertiesModelOptions = {
  settings: DefaultLayoutSettingsModel;
} & PropertiesOptions;

export class DefaultLayoutSettingsPropertiesModel extends Properties<DefaultLayoutSettingsPropertiesModelOptions> {
  data = $derived(this.options.settings.data);

  title = data(this, 'title');
  pages = data(this, 'pages');
}

export type DefaultLayoutSettings = {
  title: string;
  pages: string[];
};

export class DefaultLayoutSettingsModel extends LayoutSettingsModel<DefaultLayoutSettings> {
  isLoaded = true;

  properties = new DefaultLayoutSettingsPropertiesModel({
    settings: this,
    didUpdate: () => this.save(),
  });

  title = $derived(this.data.title);
}
