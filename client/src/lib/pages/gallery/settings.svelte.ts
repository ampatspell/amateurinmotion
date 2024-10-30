import { mapGalleryById } from '$dummy/lib/galleries/gallery.svelte';
import { PageSettingsModel } from '$dummy/lib/pages/page.svelte';
import { existing } from '$dummy/lib/utils/existing';
import { getter } from '$dummy/lib/utils/options';
import { Properties, Property, type PropertiesOptions } from '$dummy/lib/utils/property.svelte';

export type GalleryPageSettings = {
  title: string;
  gallery?: string;
};

export type GalleryPageSettingsPropertiesModelOptions = {
  settings: GalleryPageSettingsModel;
} & PropertiesOptions;

export class GalleryPageSettingsPropertiesModel extends Properties<GalleryPageSettingsPropertiesModelOptions> {
  data = $derived(this.options.settings.data);

  title = new Property<string>({
    delegate: this,
    value: getter(() => this.data.title),
    update: (value) => (this.data.title = value),
  });

  gallery = new Property<string | undefined>({
    delegate: this,
    value: getter(() => this.data.gallery),
    update: (value) => (this.data.gallery = value),
  });
}

export class GalleryPageSettingsModel extends PageSettingsModel<GalleryPageSettings> {
  properties = new GalleryPageSettingsPropertiesModel({
    settings: this,
    didUpdate: () => this.save(),
  });

  title = $derived(this.data.title);

  _gallery = mapGalleryById({
    id: getter(() => this.data.gallery),
  });

  gallery = $derived(existing(this._gallery.content));

  isLoaded = $derived(this.gallery?.isLoaded ?? true);

  dependencies = [this._gallery];
}
