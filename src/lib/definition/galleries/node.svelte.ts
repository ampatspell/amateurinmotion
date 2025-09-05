import LucideFlame from '$d2/icons/lucide--flame.svelte';
import { data } from '$d2/lib/base/utils/property.svelte';
import { NodeDetailsModel } from '$d2/lib/nodes/node/details.svelte';
import { NodeModel } from '$d2/lib/nodes/node/node.svelte';
import { NodePropertiesModel } from '$d2/lib/nodes/node/properties.svelte';

export class GalleriesNodePropertiesModel extends NodePropertiesModel<'galleries'> {
  readonly title = data(this, 'title');

  readonly paths = [];
}

export class GalleriesNodeDetailsModel extends NodeDetailsModel<'galleries'> {
  readonly isLoaded = $derived(true);
  readonly dependencies = [];

  async load() {}
}

export class GalleriesNodeModel extends NodeModel<'galleries'> {
  readonly properties: GalleriesNodePropertiesModel = new GalleriesNodePropertiesModel({ model: this });
  readonly details: GalleriesNodeDetailsModel = new GalleriesNodeDetailsModel({ model: this });

  readonly name = 'Galleries';
  readonly icon = LucideFlame;

  readonly title = $derived(this.data.properties.title);
}
