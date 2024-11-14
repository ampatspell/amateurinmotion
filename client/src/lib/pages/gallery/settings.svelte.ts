import { isLoaded } from '$dummy/lib/firebase/fire/utils.svelte';
import { GalleryByIdModel } from '$dummy/lib/galleries/gallery.svelte';
import { PageSettingsModel } from '$dummy/lib/pages/page.svelte';
import { getter } from '$dummy/lib/utils/options';
import { DataModelProperties, data } from '$dummy/lib/utils/property.svelte';

export type GalleryPageSettings = {
  title: string;
  gallery?: string;
};

export class GalleryPageSettingsPropertiesModel extends DataModelProperties<GalleryPageSettings> {
  readonly title = data(this, 'title');
  readonly gallery = data(this, 'gallery');
}

export class GalleryPageSettingsModel extends PageSettingsModel<GalleryPageSettings> {
  readonly properties = new GalleryPageSettingsPropertiesModel({
    model: this,
  });

  readonly title = $derived(this.data.title);

  readonly _gallery = new GalleryByIdModel({
    id: getter(() => this.data.gallery),
  });

  readonly gallery = $derived(this._gallery.existing);

  isLoaded = $derived(isLoaded([this._gallery]));
  dependencies = [this._gallery];
}
