import { isLoaded } from '$dummy/lib/firebase/fire/utils.svelte';
import { GalleryByIdModel } from '$dummy/lib/galleries/gallery.svelte';
import { PageSettingsModel } from '$dummy/lib/pages/page.svelte';
import { BasePagesByIdsModel } from '$dummy/lib/pages/pages.svelte';
import { getter } from '$dummy/lib/utils/options';
import { data, DataModelProperties } from '$dummy/lib/utils/property.svelte';

export type IndexPageSettings = {
  gallery?: string;
  pages: string[];
};

export class IndexPageSettingsPropertiesModel extends DataModelProperties<IndexPageSettings> {
  readonly gallery = data(this, 'gallery');
  readonly pages = data(this, 'pages');
}

export class IndexPageSettingsModel extends PageSettingsModel<IndexPageSettings> {
  properties = new IndexPageSettingsPropertiesModel({
    model: this,
  });

  _gallery = new GalleryByIdModel({
    id: getter(() => this.data.gallery),
  });

  _pages = new BasePagesByIdsModel({
    ids: getter(() => this.data.pages),
  });

  gallery = $derived(this._gallery.existing);
  pages = $derived(this._pages.existing);

  isLoaded = $derived(isLoaded([this._gallery, this._pages]));
  dependencies = [this._gallery, this._pages];
}
