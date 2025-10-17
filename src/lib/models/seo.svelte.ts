import type { ExtensionSeoMetadata } from '$lib/directus/schema';
import { Model } from '@ampatspell/base/utils/model';
import { resolveImagePreset } from './utils';

export class SeoModel extends Model<{ data: { seo?: ExtensionSeoMetadata | null } }> {
  readonly seo = $derived(this.options.data.seo);

  readonly title = $derived(this.seo?.title);
  readonly metaDescription = $derived(this.seo?.meta_description);

  readonly image = $derived.by(() => {
    const id = this.seo?.og_image;
    if (id) {
      return resolveImagePreset(id, '1200x630');
    }
  });
}
