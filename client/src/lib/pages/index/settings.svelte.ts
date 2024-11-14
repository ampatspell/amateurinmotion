import { GalleryByIdModel } from '$dummy/lib/galleries/gallery.svelte';
import { PageSettingsModel } from '$dummy/lib/pages/page.svelte';
import { getter } from '$dummy/lib/utils/options';
import { Properties, data, type PropertiesOptions } from '$dummy/lib/utils/property.svelte';

export type IndexPageSettings = {
  gallery?: string;
};

export type IndexPageSettingsPropertiesModelOptions = {
  settings: IndexPageSettingsModel;
} & PropertiesOptions;

export class IndexPageSettingsPropertiesModel extends Properties<IndexPageSettingsPropertiesModelOptions> {
  data = $derived(this.options.settings.data);
  gallery = data(this, 'gallery');
}

export class IndexPageSettingsModel extends PageSettingsModel<IndexPageSettings> {
  properties = new IndexPageSettingsPropertiesModel({
    settings: this,
    didUpdate: () => this.save(),
  });

  _gallery = new GalleryByIdModel({
    id: getter(() => this.data.gallery),
  });

  gallery = $derived(this._gallery.existing);

  isLoaded = $derived(this._gallery.isLoaded);
  dependencies = [this._gallery];
}
