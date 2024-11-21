import { FolderByIdModel } from '$dummy/lib/assets/folder.svelte';
import { isLoaded } from '$dummy/lib/firebase/fire/utils.svelte';
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

  _folder = new FolderByIdModel({
    id: getter(() => this.data.gallery),
  });

  _pages = new BasePagesByIdsModel({
    ids: getter(() => this.data.pages),
  });

  folder = $derived(this._folder.existing);
  pages = $derived(this._pages.existing);

  isLoaded = $derived(isLoaded([this._folder, this._pages]));
  dependencies = [this._folder, this._pages];

  async load() {
    await Promise.all([this._folder.load(), this._pages.load()]);
  }
}
