import { FolderByIdModel } from '$dummy/lib/assets/folder.svelte';
import { isLoaded } from '$dummy/lib/firebase/fire/utils.svelte';
import { PageSettingsModel } from '$dummy/lib/pages/page.svelte';
import { getter } from '$dummy/lib/utils/options';
import { DataModelProperties, data } from '$dummy/lib/utils/property.svelte';

export type GalleryPageSettings = {
  title: string;
  folder?: string;
};

export class GalleryPageSettingsPropertiesModel extends DataModelProperties<GalleryPageSettings> {
  readonly title = data(this, 'title');
  readonly folder = data(this, 'folder');
}

export class GalleryPageSettingsModel extends PageSettingsModel<GalleryPageSettings> {
  readonly properties = new GalleryPageSettingsPropertiesModel({
    model: this,
  });

  readonly title = $derived(this.data.title);

  readonly _folder = new FolderByIdModel({
    id: getter(() => this.data.folder),
  });

  readonly folder = $derived(this._folder.existing);

  readonly isLoaded = $derived(isLoaded([this._folder]));
  readonly dependencies = [this._folder];

  async load() {
    await this._folder.load();
  }
}
