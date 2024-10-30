import { PageSettingsModel } from '$dummy/lib/pages/page.svelte';
import { getter } from '$dummy/lib/utils/options';
import { Properties, Property, type PropertiesOptions } from '$dummy/lib/utils/property.svelte';

export type HeaderPageSettings = {
  title: string;
  links: string;
};

export type HeaderPageSettingsPropertiesModelOptions = {
  settings: HeaderPageSettingsModel;
} & PropertiesOptions;

export class HeaderPageSettingsPropertiesModel extends Properties<HeaderPageSettingsPropertiesModelOptions> {
  data = $derived(this.options.settings.data);

  title = new Property<string>({
    delegate: this,
    value: getter(() => this.data.title),
    update: (value) => (this.data.title = value),
  });

  links = new Property<string>({
    delegate: this,
    value: getter(() => this.data.links),
    update: (value) => (this.data.links = value),
  });
}

export class HeaderPageSettingsModel extends PageSettingsModel<HeaderPageSettings> {
  properties = new HeaderPageSettingsPropertiesModel({
    settings: this,
    didUpdate: () => this.save(),
  });

  title = $derived(this.data.title);
  links = $derived(this.data.links);

  isLoaded = $state(true);
}
