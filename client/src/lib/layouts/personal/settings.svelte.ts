import { LayoutSettingsModel } from '$dummy/lib/layouts/layout.svelte';
import { getter } from '$dummy/lib/utils/options';
import { Properties, type PropertiesOptions, Property } from '$dummy/lib/utils/property.svelte';

export type DefaultLayoutSettingsPropertiesModelOptions = {
  settings: DefaultLayoutSettingsModel;
} & PropertiesOptions;

export class DefaultLayoutSettingsPropertiesModel extends Properties<DefaultLayoutSettingsPropertiesModelOptions> {
  data = $derived(this.options.settings.data);

  title = new Property<string>({
    delegate: this,
    value: getter(() => this.data.title),
    update: (value) => (this.data.title = value),
  });
}

export type DefaultLayoutSettings = {
  title: string;
};

export class DefaultLayoutSettingsModel extends LayoutSettingsModel<DefaultLayoutSettings> {
  isLoaded = true;

  properties = new DefaultLayoutSettingsPropertiesModel({
    settings: this,
    didUpdate: () => this.save(),
  });

  title = $derived(this.data.title);
}
