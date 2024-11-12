import { isLoaded } from '$dummy/lib/firebase/fire/utils.svelte';
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
  readonly data = $derived(this.options.settings.data);

  readonly title = new Property<string>({
    delegate: this,
    value: getter(() => this.data.title),
    update: (value) => (this.data.title = value),
  });

  readonly gallery = new Property<string | undefined>({
    delegate: this,
    value: getter(() => this.data.gallery),
    update: (value) => (this.data.gallery = value),
  });
}

export class GalleryPageSettingsModel extends PageSettingsModel<GalleryPageSettings> {
  readonly properties = new GalleryPageSettingsPropertiesModel({
    settings: this,
    didUpdate: () => this.save(),
  });

  readonly title = $derived(this.data.title);

  readonly __gallery = mapGalleryById({
    id: getter(() => this.data.gallery),
  });

  readonly _gallery = $derived(this.__gallery.content);
  readonly gallery = $derived(existing(this._gallery));

  readonly isLoaded = $derived(isLoaded([this._gallery]));
  readonly dependencies = [this.__gallery];
}
