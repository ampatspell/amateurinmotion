import { GalleryByIdModel } from '$dummy/lib/galleries/gallery.svelte';
import { PageSettingsModel } from '$dummy/lib/pages/page.svelte';
import { getter } from '$dummy/lib/utils/options';
import { data, DataModelProperties } from '$dummy/lib/utils/property.svelte';

export type IndexPageSettings = {
  gallery?: string;
};

export class IndexPageSettingsPropertiesModel extends DataModelProperties<IndexPageSettings> {
  gallery = data(this, 'gallery');
}

export class IndexPageSettingsModel extends PageSettingsModel<IndexPageSettings> {
  properties = new IndexPageSettingsPropertiesModel({
    model: this,
  });

  _gallery = new GalleryByIdModel({
    id: getter(() => this.data.gallery),
  });

  gallery = $derived(this._gallery.existing);

  isLoaded = $derived(this._gallery.isLoaded);
  dependencies = [this._gallery];
}
