import { mapGalleryById } from "$dummy/lib/galleries/gallery.svelte";
import { PageSettingsModel } from "$dummy/lib/pages/page.svelte";
import { existing } from "$dummy/lib/utils/existing";
import { getter } from "$dummy/lib/utils/options";
import { Properties, Property, type PropertiesOptions } from "$dummy/lib/utils/property.svelte";

export type IndexPageSettings = {
  gallery?: string;
}

export type IndexPageSettingsPropertiesModelOptions = {
  settings: IndexPageSettingsModel;
} & PropertiesOptions;

export class IndexPageSettingsPropertiesModel extends Properties<IndexPageSettingsPropertiesModelOptions> {
  data = $derived(this.options.settings.data);

  gallery = new Property<string | undefined>({
    delegate: this,
    value: getter(() => this.data.gallery),
    update: (value) => (this.data.gallery = value),
  });
}

export class IndexPageSettingsModel extends PageSettingsModel<IndexPageSettings> {
  properties = new IndexPageSettingsPropertiesModel({
    settings: this,
    didUpdate: () => this.save(),
  });

  _gallery = mapGalleryById({
    id: getter(() => this.data.gallery),
  });

  gallery = $derived(existing(this._gallery.content));

  isLoaded = $derived(this.gallery?.isLoaded ?? true);

  dependencies = [this._gallery];
}
